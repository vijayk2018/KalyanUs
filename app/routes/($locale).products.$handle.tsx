import {redirect, useLoaderData} from 'react-router';
import type {Route} from './+types/products.$handle';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import {ProductPrice} from '~/components/ProductPrice';
import {ProductImage} from '~/components/ProductImage';
import {ProductForm} from '~/components/ProductForm';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {useState, useEffect, useRef, useMemo, type FormEvent} from 'react';
import {ChevronUp, ChevronDown, ChevronLeft, ChevronRight, VideoIcon, StoreIcon, EyeIcon, HeartIcon, PhoneIcon, X, ShieldCheck, RefreshCcw, BadgeDollarSign, Info, MapPin} from "lucide-react";
import ImageModal from '~/components/ImageCarousal';
import { FaWhatsapp } from "react-icons/fa";
import levelNew from '../assets/levelnew.png';
import GoldIngot from '../assets/goldIngot.svg';
import Forever from '../assets/forever.svg';
import Exchange from '../assets/exchange.svg';
import ProductInformation from '../assets/search.svg'
import {useToast} from '~/components/useToast';
import { ToastContainer } from '~/components/Toast';

export const meta: Route.MetaFunction = ({data}) => {
  return [
    {title: `Hydrogen | ${data?.product.title ?? ''}`},
    {
      rel: 'canonical',
      href: `/products/${data?.product.handle}`,
    },
  ];
};

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context, params, request}: Route.LoaderArgs) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{product}] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {handle, selectedOptions: getSelectedProductOptions(request)},
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  // The API handle might be localized, so redirect to the localized handle
  redirectIfHandleIsLocalized(request, {handle, data: product});

  return {
    product,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context, params}: Route.LoaderArgs) {
  // Put any API calls that is not critical to be available on first page render
  // For example: product reviews, product recommendations, social feeds.

  return {};
}

type TabRow = {
  label: string;
  value: string;
  highlight?: boolean;
};

const parseTabRows = (rawValue: string | null | undefined): TabRow[] => {
  if (!rawValue) return [];

  return rawValue
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [labelPart, ...valueParts] = line.split('|');
      const label = labelPart?.trim() ?? '';
      const value = valueParts.join('|').trim();
      return {label, value: value || '—'};
    })
    .filter((item) => item.label.length > 0);
};

const TabContent = ({tabData}: {tabData: TabRow[]}) => (
  <div className="bg-[#fdfaf5] rounded-lg p-4 text-sm text-gray-700 space-y-3">
    {tabData.map((item, index) => (
      <div
        key={index}
        className={`flex justify-between pb-2 ${
          index !== tabData.length - 1 ? "border-b" : ""
        } ${item.highlight ? "font-semibold text-base pt-3" : ""}`}
      >
        <span className="text-black font-semibold">{item.label}:</span>
        <span className="font-medium">{item.value}</span>
      </div>
    ))}
  </div>
);

export default function Product() {
  const {product} = useLoaderData<typeof loader>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const reviewFormRef = useRef<HTMLDivElement | null>(null);
  const productTabsRef = useRef<HTMLDivElement | null>(null);
  const visibleCount = 3;

  const images = product.images?.nodes || [];
  const productRating = useMemo(() => {
    const rawValue = product.rating?.value;
    if (!rawValue) return null;

    const parsedNumber = Number(rawValue);
    if (!Number.isNaN(parsedNumber)) {
      return Math.min(5, Math.max(0, parsedNumber));
    }

    try {
      const parsedJson = JSON.parse(rawValue) as {value?: string | number};
      const ratingFromJson = Number(parsedJson?.value);
      if (!Number.isNaN(ratingFromJson)) {
        return Math.min(5, Math.max(0, ratingFromJson));
      }
    } catch {
      // Ignore JSON parse errors and fall back to null rating.
    }

    return null;
  }, [product.rating?.value]);

  const handleUp = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleDown = () => {
    if (startIndex + visibleCount < images.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [showVideoDateField, setShowVideoDateField] = useState(false);
  const [activeTab, setActiveTab] = useState("summary");
  const [deliveryPincode, setDeliveryPincode] = useState('');
  const [reviewNickname, setReviewNickname] = useState('');
  const [reviewSummary, setReviewSummary] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewPhoto, setReviewPhoto] = useState<File | null>(null);
  const [callbackName, setCallbackName] = useState('');
  const [callbackEmail, setCallbackEmail] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [videoCallDate, setVideoCallDate] = useState('');
  const [videoCallName, setVideoCallName] = useState('');
  const [videoCallEmail, setVideoCallEmail] = useState('');
  const [videoCallPhone, setVideoCallPhone] = useState('');
  const {showSuccess, showError, toasts, removeToast} = useToast();
  const productTabs = useMemo(
    () => ({
      summary: parseTabRows(product.tabSummary?.value),
      diamond: parseTabRows(product.tabDiamondGemstone?.value),
      metal: parseTabRows(product.tabMetalDetails?.value),
      price: parseTabRows(product.tabPriceBreakup?.value),
    }),
    [
      product.tabSummary?.value,
      product.tabDiamondGemstone?.value,
      product.tabMetalDetails?.value,
      product.tabPriceBreakup?.value,
    ],
  );
  const summaryStats = useMemo(
    () =>
      [
        {label: 'Metal', value: product.metal?.value},
        {label: 'Diamond', value: product.diamond?.value},
        {label: 'Gemstone', value: product.gemstone?.value},
      ].filter((item) => Boolean(item.value?.trim())),
    [product.metal?.value, product.diamond?.value, product.gemstone?.value],
  );
  const callbackButtonLabel = product.callbackButtonText?.value?.trim() || 'Notify Me';
  const shouldShowDelivery = product.showDelivery?.value
    ? product.showDelivery.value.toLowerCase() === 'true'
    : true;

  // ✅ FIRST get variant
  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  // ✅ THEN use state
  const [selectedImage, setSelectedImage] = useState(
    selectedVariant?.image?.url
  );

  // ✅ update when variant changes
  useEffect(() => {
    setSelectedImage(selectedVariant?.image?.url);
  }, [selectedVariant]);

  const scrollToReviewForm = () => {
    reviewFormRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const scrollToProductTabs = () => {
    productTabsRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const handleReviewSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !reviewNickname.trim() ||
      !reviewSummary.trim() ||
      !reviewText.trim() ||
      !reviewPhoto
    ) {
      showError('Please fill all required review fields.');
      return;
    }
    showSuccess('Review submitted successfully.');
    setReviewNickname('');
    setReviewSummary('');
    setReviewText('');
    setReviewPhoto(null);
  };

  const handleCallbackSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !callbackName.trim() ||
      !callbackEmail.trim() ||
      !callbackPhone.trim()
    ) {
      showError('Please fill all callback form fields.');
      return;
    }
    setIsCallbackOpen(false);
    showSuccess('Callback request submitted successfully.');
    setCallbackName('');
    setCallbackEmail('');
    setCallbackPhone('');
  };

  const handleDeliverySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!deliveryPincode.trim()) {
      showError('Please enter a pincode.');
      return;
    }
    showSuccess('Delivery details submitted successfully.');
    setDeliveryPincode('');
  };

  const handleVideoCallSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !videoCallName.trim() ||
      !videoCallEmail.trim() ||
      !videoCallPhone.trim() ||
      (showVideoDateField && !videoCallDate)
    ) {
      showError('Please fill all required video call fields.');
      return;
    }
    setIsVideoCallOpen(false);
    showSuccess('Video call request submitted successfully.');
    setShowVideoDateField(false);
    setVideoCallDate('');
    setVideoCallName('');
    setVideoCallEmail('');
    setVideoCallPhone('');
  };

  return (
    <div className='bg-[#fdfaf5] 2xl:px-[5rem] lg:px-[4rem]'>
      <p className='text-[14px] text-gray-400 px-6 pt-4 font-sans'><a href='/'> Home</a> | <span className='text-black'>{product.title}</span></p>
      <div className="mx-auto px-6 py-10 w-full flex flex-col lg:flex-row lg:gap-[5rem] items-center">
        
        {/* LEFT SIDE */}
        <div className="flex gap-4 items-center justify-center w-full lg:w-[55%]">
        
          {/* LEFT: Thumbnail Carousel */}
          <div className="hidden lg:flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-2 justify-items-start">
            <div className="flex flex-col items-center gap-2">

              {/* 🔼 UP ARROW */}
              <button
                onClick={handleUp}
                className="p-2 bg-white shadow rounded-full hover:bg-gray-100 disabled:opacity-30"
                disabled={startIndex === 0}
              >
                <ChevronUp size={20} />
              </button>

              {/* 🔽 VISIBLE IMAGES (ONLY 3) */}
              <div className="flex flex-col gap-3">
                {images.slice(startIndex, startIndex + visibleCount).map((img, i) => {
                  const actualIndex = startIndex + i;

                  return (
                    <img
                      key={actualIndex}
                      src={img.url}
                      onClick={() => setCurrentIndex(actualIndex)}
                      className={`w-30 h-30 object-contain border rounded cursor-pointer transition-all duration-200
                      ${
                        currentIndex === actualIndex
                          ? "border-red-500 "
                          : "border-gray-300"
                      }`}
                      alt={img.altText || `Product image ${actualIndex + 1}`}
                    />
                  );
                })}
              </div>

              {/* 🔽 DOWN ARROW */}
              <button
                onClick={handleDown}
                className="p-2 bg-white shadow rounded-full hover:bg-gray-100 disabled:opacity-30"
                disabled={startIndex + visibleCount >= images.length}
              >
                 <ChevronDown size={20} />
              </button>
            </div>
          </div>

          {/* RIGHT: Main Image Carousel */}
          <div className="relative flex-1 flex items-center justify-center bg-[#fdfaf5] rounded-lg p-6 group">

            {/* LEFT ARROW */}
            <button
              onClick={prevImage}
              className="hidden lg:block absolute left-2 opacity-0 group-hover:opacity-100 transition duration-300 bg-white shadow p-2 rounded-full hover:bg-gray-100 disabled:opacity-30"
              disabled={currentIndex === 0}
            >
              <ChevronLeft size={20} />
            </button>

            {/* IMAGE WRAPPER (fixed size) */}
            <div className="flex items-center justify-center">
              <img
                src={images[currentIndex]?.url}
                onClick={() => setIsOpen(true)}
                className="hidden lg:block max-h-full max-w-full object-contain cursor-pointer"
                alt="image"
              />
              <img
                src={images[currentIndex]?.url || images[0]?.url}
                onClick={() => setIsOpen(true)}
                className="lg:hidden h-full w-full object-contain cursor-pointer"
                alt="image"
              />
            </div>

            {/* Mobile carousel controls */}
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              className="lg:hidden absolute -left-4 top-1/2 -translate-y-1/2 rounded-full p-2 text-gray-400 hover:text-gray-600 disabled:opacity-30"
              disabled={currentIndex === 0}
              aria-label="Previous image"
            >
              <ChevronLeft size={60} strokeWidth={1.5} />
            </button>
            <button
              onClick={() =>
                setCurrentIndex((prev) => Math.min(images.length - 1, prev + 1))
              }
              className="lg:hidden absolute -right-4 top-1/2 -translate-y-1/2 rounded-full p-2 text-gray-400 hover:text-gray-600 disabled:opacity-30"
              disabled={currentIndex === images.length - 1}
              aria-label="Next image"
            >
              <ChevronRight size={60} strokeWidth={1.5} />
            </button>

            {images.length > 1 ? (
              <div className="lg:hidden absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
                {images.map((_, index) => (
                  <button
                    key={`dot-${index}`}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 w-2 rounded-full transition ${
                      index === currentIndex ? 'bg-[#cf254a]' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            ) : null}

            {/* RIGHT ARROW */}
            <button
              onClick={nextImage}
              className="hidden lg:block absolute right-2 opacity-0 group-hover:opacity-100 transition duration-300 bg-white shadow p-2 rounded-full hover:bg-gray-100 disabled:opacity-30"
              disabled={currentIndex === images.length - 1}
            >
              <ChevronRight size={20} />
            </button>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6 w-full lg:w-[45%]">
          <div className="space-y-6">

            {/* Title */}
            <p className="text-4xl text-[#000] font-serif font-regular">
              {product.title}
            </p>

            {/* SKU + Rating + Review */}
            <div className="flex items-start justify-between">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-[18px] text-black">
                <span className="font-sans">SKU {product.styleNo?.value || selectedVariant?.sku || '—'}</span>
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center gap-1 text-2xl"
                    aria-label={
                      productRating !== null
                        ? `Rated ${productRating} out of 5`
                        : 'No rating yet'
                    }
                  >
                    {Array.from({length: 5}).map((_, i) => {
                      if (productRating === null) {
                        return (
                          <span key={`star-${i}`} className="text-gray-300">
                            ★
                          </span>
                        );
                      }
                      const starPosition = i + 1;
                      const isFull = productRating >= starPosition;
                      const isHalf = !isFull && productRating >= starPosition - 0.5;

                      return (
                        <span
                          key={`star-${i}`}
                          className={
                            isFull
                              ? 'text-yellow-400'
                              : isHalf
                                ? 'text-yellow-300'
                                : 'text-gray-300'
                          }
                        >
                          ★
                        </span>
                      );
                    })}
                  </div>
                  {productRating !== null ? (
                    <span className="text-sm text-gray-600 font-sans">
                      {productRating.toFixed(1)}
                    </span>
                  ) : null}
                  <button
                    type="button"
                    onClick={scrollToReviewForm}
                    className="hover:underline hover:text-black font-sans cursor-pointer"
                  >
                    Write a review
                  </button>
                </div>
              </div>
              {product.offerText?.value && (
                <div className="relative inline-block">
                  <div className="bg-[#cf254a] text-white text-[14px] px-4 py-2 font-sans font-bold">
                    {product.offerText?.value}
                  </div>

                  {/* Arrow */}
                  <div className="absolute left-0 top-0 w-0 h-0 border-t-[18px] border-b-[18px] border-r-[18px] border-t-transparent border-b-transparent border-r-[#cf254a] -translate-x-full"></div>
                </div>
              )}
            </div>

            {/* Price Section */}
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">
                <span className="text-3xl font-semibold text-black font-sans">
                  ₹{selectedVariant?.price.amount}
                </span>

                {selectedVariant?.compareAtPrice && (
                  <span className="line-through text-gray-400 text-lg font-sans">
                    ₹{selectedVariant.compareAtPrice.amount}
                  </span>
                )}
              </div>

              {selectedVariant?.compareAtPrice && (
                <span className="bg-[#cf254a] text-white text-xs px-4 py-2 rounded-full font-sans">
                  {Math.round(
                    ((selectedVariant.compareAtPrice.amount -
                      selectedVariant.price.amount) /
                      selectedVariant.compareAtPrice.amount) *
                      100
                  )}% off on Diamond prices
                </span>
              )}
            </div>

            {/* Product Summary */}
            <div>
              <h3 className="text-2xl font-medium mb-3 font-sans">Product Summary</h3>

              <div
                className={`bg-white rounded-xl p-4 grid text-center text-sm ${
                  summaryStats.length === 1
                    ? 'grid-cols-1'
                    : summaryStats.length === 2
                      ? 'grid-cols-2 divide-x'
                      : 'grid-cols-3 divide-x'
                }`}
              >
                {summaryStats.map((item) => (
                  <div key={item.label}>
                    <p className="text-gray-500 font-sans">{item.label}</p>
                    <p className="font-semibold text-gray-800 font-sans text-lg">
                      {item.value || '—'}
                    </p>
                  </div>
                ))}
              </div>

              {/* View Details */}
              <button
                type="button"
                onClick={scrollToProductTabs}
                className="cursor-pointer w-full mb-3 bg-[#ffeef2] text-gray-700 py-3 text-lg font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-[#f2dce6] font-sans"
              >
                <EyeIcon />
                View Product Details & Price Breakup
              </button>

              {/* <p className="text-lg font-semibold text-gray-500 mt-2">
                <div
                  className="text-gray-600 text-lg font-semibold font-sans"
                  dangerouslySetInnerHTML={{__html: product.descriptionHtml}}
                />
              </p> */}
            </div>

            {/* Variants */}
            {/* <ProductForm
              productOptions={productOptions}
              selectedVariant={selectedVariant}
            /> */}

            {/* Delivery Submit */}
            {shouldShowDelivery ? (
              <form
                className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_240px]"
                onSubmit={handleDeliverySubmit}
              >
                <div className="flex overflow-hidden rounded-md border border-[#efc4cf] bg-white">
                  <div className="flex  items-center justify-center gap-2 border-r border-[#efc4cf] px-4 text-lg text-gray-700">
                    <span className="font-sans">Delivery</span>
                    <MapPin size={18} className="text-black" />
                  </div>
                  <input
                    type="text"
                    placeholder="400064"
                    value={deliveryPincode}
                    onChange={(event) => setDeliveryPincode(event.target.value)}
                    className="w-full bg-white px-4 text-center text-lg font-sans text-gray-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="py-2 rounded-md bg-[#f6e6ed] text-lg font-medium text-black hover:bg-[#f2dce6]"
                >
                  Submit
                </button>
              </form>
            ) : null}

            {/* Mobile Buttons */}
            <div className="flex items-center gap-4 md:hidden justify-center px-[2rem]">
              <button
                type="button"
                onClick={() => setIsCallbackOpen(true)}
                className="flex-1 bg-[#cf254a] text-white py-3 text-lg rounded-lg font-semibold hover:bg-red-700 font-sans cursor-pointer"
              >
                {callbackButtonLabel}
              </button>

              <button className="border border-red-300 p-2 rounded-lg text-red-500 hover:bg-red-50 w-[52px] h-[52px] flex items-center justify-center cursor-pointer justify-self-start">
                <HeartIcon size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 md:hidden">
              <div className="text-[#000000] flex items-center justify-center gap-2">
                <VideoIcon size={22} />
                <span className="text-lg font-semibold font-sans">Live Video Call</span>
              </div>

              <button
                type="button"
                onClick={() => setIsVideoCallOpen(true)}
                className="border border-[#cf254a] text-[#cf254a] rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-[#f4cfd3] cursor-pointer"
              >
                <span className="text-lg font-medium uppercase font-sans">Schedule a Video Call</span>
              </button>

              <div className="text-[#000000] flex items-center justify-center gap-2">
                <StoreIcon size={22} />
                <span className="text-lg font-semibold font-sans">Store Availablity</span>
              </div>

              <button className="border border-[#cf254a] text-[#cf254a] rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-[#f4cfd3] cursor-pointer">
                <span className="text-lg font-medium uppercase font-sans">Find in Store</span>
              </button>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden md:grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setIsCallbackOpen(true)}
                className="flex-1 bg-[#cf254a] text-white py-3 text-lg rounded-lg font-semibold hover:bg-red-700 font-sans cursor-pointer"
              >
                {callbackButtonLabel}
              </button>

              <button className="border border-red-300 p-2 rounded-lg text-red-500 hover:bg-red-50 max-w-10 flex items-center justify-center cursor-pointer">
                <HeartIcon size={18} />
              </button>
            </div>

            <div className="hidden md:grid grid-cols-2 gap-4">
              <div className="text-[#000000] flex items-center justify-center gap-2 ">
                <VideoIcon size={22} />
                <span className="text-lg font-semibold font-sans ">Live Video Call</span>
              </div>

              <div className="text-[#000000] flex items-center justify-center gap-2 ">
                <StoreIcon size={22} />
                <span className="text-lg font-semibold font-sans">Store Availablity</span>
              </div>
            </div>

            <div className="hidden md:grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setIsVideoCallOpen(true)}
                className="border border-[#cf254a] text-[#cf254a] rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-[#f4cfd3] cursor-pointer"
              >
                <span className="text-lg font-medium uppercase font-sans">Schedule a Video Call</span>
              </button>

              <button className="border border-[#cf254a] text-[#cf254a] rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-[#f4cfd3] cursor-pointer">
                <span className="text-lg font-medium uppercase font-sans">Find in Store</span>
              </button>
            </div>

            

          </div>
          

        </div>

        {/* Analytics */}
        <Analytics.ProductView
          data={{
            products: [
              {
                id: product.id,
                title: product.title,
                price: selectedVariant?.price.amount || '0',
                vendor: product.vendor,
                variantId: selectedVariant?.id || '',
                variantTitle: selectedVariant?.title || '',
                quantity: 1,
              },
            ],
          }}
        />
      </div>
      {/* PRODUCT DETAILS + REVIEW SECTION */}
      <div className="bg-white rounded-xl p-6 space-y-6">
        <div className='grid lg:grid-cols-5  gap-16'>
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="space-y-2">
              {/* Heading */}
              <p className="text-3xl font-semibold text-[#000] font-sans">
                Product Details
              </p>

              {/* Style Number */}
              <p className="text-lg font-medium text-red-500 font-sans">
                Style No. {product.styleNo?.value || selectedVariant?.sku || '—'}
              </p>

              {/* Description */}
              <p className="text-lg text-gray-600 leading-relaxed pt-5 font-sans">
                {product.shortDescription?.value || product.description}
              </p>
            </div>
          
            {/* Tabs */}
            <div
              ref={productTabsRef}
              id="product-tabs"
              className="scroll-mt-64 mt-8"
            >
              {/* Desktop/Tablet tabs */}
              <div className="hidden lg:flex gap-4 py-2 text-sm flex-wrap">
                <button
                  onClick={() => setActiveTab("summary")}
                  className={`px-4 py-2 rounded-md font-sans font-semibold text-[16px] ${
                    activeTab === "summary"
                      ? "bg-[#cf254a] text-white"
                      : "text-black"
                  }`}
                >
                  Product Summary
                </button>

                <button
                  onClick={() => setActiveTab("diamond")}
                  className={`px-4 py-2 rounded-md  font-sans font-semibold text-[16px] ${
                    activeTab === "diamond"
                      ? "bg-[#cf254a] text-white"
                      : "text-black"
                  }`}
                >
                  Diamond / Gemstone Details
                </button>

                <button
                  onClick={() => setActiveTab("metal")}
                  className={`px-4 py-2 rounded-md font-semibold text-[16px] ${
                    activeTab === "metal"
                      ? "bg-[#cf254a] text-white"
                      : "text-black"
                  }`}
                >
                  Metal Details
                </button>

                <button
                  onClick={() => setActiveTab("price")}
                  className={`px-4 py-2 rounded-md font-sans font-semibold text-[16px] ${
                    activeTab === "price"
                      ? "bg-[#cf254a] text-white"
                      : "text-black"
                  }`}
                >
                  Price Breakup
                </button>
              </div>
            </div>

            {/* Desktop/Tablet tab content */}
            <div className="hidden lg:block">
              <TabContent tabData={productTabs[activeTab as keyof typeof productTabs] || []} />
            </div>

            {/* Mobile tabs */}
            <div className="lg:hidden space-y-4">
              <div className="flex flex-col gap-2 text-sm">
                {[
                  {key: 'summary', label: 'Product Summary'},
                  {key: 'diamond', label: 'Diamond / Gemstone Details'},
                  {key: 'metal', label: 'Metal Details'},
                  {key: 'price', label: 'Price Breakup'},
                ].map((tab) => (
                  <div key={tab.key} className="space-y-2">
                    <button
                      onClick={() => setActiveTab(tab.key)}
                      className={`w-full px-3 py-2 rounded-md text-left font-sans font-semibold text-[16px] ${
                        activeTab === tab.key ? 'bg-[#cf254a] text-white' : 'text-black'
                      }`}
                    >
                      {tab.label}
                    </button>
                    {activeTab === tab.key ? (
                      <TabContent tabData={productTabs[tab.key as keyof typeof productTabs] || []} />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-[#fdfaf5] rounded-lg p-4 md:flex flex-1  justify-between items-center text-sm mt-5">
              <div className='space-y-2 md:space-y-0'>
                <p className="font-medium text-gray-800 font-sans md:whitespace-nowrap">
                  Need help to find the best jewellery for you?
                </p>
                <p className="text-gray-500 text-xs font-sans">
                  We are available for your assistance
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 text-gray-600 mt-5 md:mt-0 w-full justify-center items-center">
                <button className="hover:text-black flex items-center gap-1 font-sans">
                  <FaWhatsapp size={24} className='text-gray-500'/>
                  <span>Chat with Experts</span>
                </button>
                <button className="hover:text-black flex items-center gap-1 font-sans">
                  <PhoneIcon size={18} /> 
                  <span>Request a Callback</span>
                </button>
              </div>
            </div>
          </div>

          {/* REVIEW FORM */}
          <form
            ref={reviewFormRef}
            id="review-form"
            className="scroll-mt-46 bg-[#fdfaf5] rounded-xl md:p-8 p-8 lg:my-0 my-6 space-y-4 lg:col-span-2"
            onSubmit={handleReviewSubmit}
          >
            <p className="text-lg text-gray-700 pb-4 font-sans">
              You're reviewing:{" "}
              <span className="font-bold text-black font-sans">
                {product.title}
              </span>
            </p>

            <div className='mt-5'>
              <p className="text-md text-gray-900 font-sans">Nickname <span className="text-red-500">*</span></p>
              <input
                type="text"
                className="w-full border border-[#CCCCCC] bg-white rounded-md p-2 mt-1 focus:outline-none"
                value={reviewNickname}
                onChange={(event) => setReviewNickname(event.target.value)}
              />
            </div>

            <div>
              <p className="text-md text-gray-900 font-sans">Summary <span className="text-red-500">*</span></p>
              <input
                type="text"
                className="w-full border border-[#CCCCCC] bg-white rounded-md p-2 mt-1 focus:outline-none"
                value={reviewSummary}
                onChange={(event) => setReviewSummary(event.target.value)}
              />
            </div>

            <div>
              <p className="text-md text-gray-900 font-sans">Review <span className="text-red-500">*</span></p>
              <textarea
                rows={4}
                className="w-full border border-[#CCCCCC] bg-white rounded-md p-2 mt-1 focus:outline-none"
                value={reviewText}
                onChange={(event) => setReviewText(event.target.value)}
              />
            </div>

            <div>
              <p className="text-md text-black font-semibold font-sans">Add your photo <span className="text-red-500">*</span></p>
              <input
                type="file"
                className="text-sm border border-[#CCCCCC] bg-white rounded-md p-2 focus:outline-none max-w-40"
                onChange={(event) =>
                  setReviewPhoto(event.target.files?.[0] ?? null)
                }
              />
            </div>

            <div className='flex justify-center'>
              <button
                type="submit"
                className="bg-[#cf254a] text-white px-6 py-2 font-sans hover:bg-red-600 w-full"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>

      </div>
      {/* New Section */}
      <section className="lg:mt-8 2xl:px-[5rem] lg:px-[4rem] lg:py-48 lg:mb-0 mb-6 py-5 mt-0 bg-white">
        <div className="mx-auto relative">
          <div className="absolute 2xl:-top-42 2xl:-left-22 xl:-top-26 xl:-left-28 lg:-top-22 lg:-left-28">
            <img
              src={levelNew}
              alt="Kalyan assurance"
              className="2xl:h-full 2xl:w-full lg:w-[80%] lg:h-full object-cover lg:block hidden"
            />
          </div>
          <div className='px-8 lg:px-0'>
            <div className="grid 2xl:gap-6 lg:gap-4 gap-8 px-6 py-12 grid-cols-2 lg:grid-cols-5 bg-[#f7ebe2]">
              <div className=' lg:block hidden'>
                <div className="space-y-2 text-center"></div>
              </div>
              <div className="space-y-2 text-center">
                <img src={GoldIngot} alt="Purity Assured" className='w-12 h-12 mx-auto' />
                <h3 className="font-sans 2xl:text-lg lg:text-[15px] text-[15px] text-[#812b3a] font-bold">Purity Assured</h3>
                <p className="2xl:text-[15px] lg:text-[12px] text-[10px] text-gray-700">
                  All our ornaments are BIS hallmarked. The jewellery is examined in the Carat…
                </p>
              </div>
              <div className="space-y-2 text-center">
                <img src={Forever} alt="Free Lifetime Maintenance" className='w-12 h-12 mx-auto' />
                <h3 className="font-sans 2xl:text-lg lg:text-[15px] text-[15px] text-[#812b3a] font-bold">Free Lifetime Maintenance</h3>
                <p className="2xl:text-[15px] lg:text-[12px] text-[10px] text-gray-700">
                  We assure Free Lifetime Maintenance for all our ornaments…
                </p>
              </div>
              <div className="space-y-2 text-center">
                <img src={Exchange} alt="Exchange / Buy Back" className='w-12 h-12 mx-auto' />
                <h3 className="font-sans 2xl:text-lg lg:text-[15px] text-[15px] text-[#812b3a] font-bold">Exchange / Buy Back</h3>
                <p className="2xl:text-[15px] lg:text-[12px] text-[10px] text-gray-700">
                  Zero deduction on Net Weight* upon exchange. 2% deduction on Net…
                </p>
              </div>
              <div className="space-y-2 text-center">
                <img src={ProductInformation} alt="Product Information" className='w-12 h-12 mx-auto' />
                <h3 className="font-sans 2xl:text-lg lg:text-[15px] text-[15px] text-[#812b3a] font-bold">Product Information</h3>
                <p className="2xl:text-[15px] lg:text-[12px] text-[10px] text-gray-700">
                  The Gold rate is billed ONLY on the Net Weight*. The weight of Other Materials…
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {isOpen && (
        <ImageModal
          images={images}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          onClose={() => setIsOpen(false)}
        />
      )}
      {isCallbackOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setIsCallbackOpen(false)}
        >
          <div
            className="w-full max-w-[430px] rounded-md bg-gray-100 p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between">
              <h3 className="text-3xl font-light text-gray-800">Request a Callback</h3>
              <button
                type="button"
                onClick={() => setIsCallbackOpen(false)}
                className="rounded p-1 text-gray-500 transition hover:bg-gray-100 hover:text-black"
                aria-label="Close callback form"
              >
                <X size={18} />
              </button>
            </div>

            <p className="mb-4 text-xs text-gray-600">
              Need assistance or have questions? We are here to help! Fill out
              the details below, and we&apos;ll get back to you as soon as
              possible.
            </p>

            <form className="space-y-3" onSubmit={handleCallbackSubmit}>
              <div>
                <label className="mb-1 block text-sm text-gray-700">Name</label>
                <input
                  type="text"
                  className="w-full rounded border border-[#CCCCCC] bg-white px-3 py-2 text-sm focus:outline-none"
                  value={callbackName}
                  onChange={(event) => setCallbackName(event.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full rounded border border-[#CCCCCC] bg-white px-3 py-2 text-sm focus:outline-none"
                  value={callbackEmail}
                  onChange={(event) => setCallbackEmail(event.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-700">Phone</label>
                <div className="flex items-center rounded border border-[#CCCCCC] bg-white px-3 py-2">
                  <span className="mr-2 text-sm text-gray-600">+1</span>
                  <input
                    type="tel"
                    className="w-full text-sm focus:outline-none"
                    value={callbackPhone}
                    onChange={(event) => setCallbackPhone(event.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-2 w-full bg-[#cf254a] py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
      {isVideoCallOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start pt-[4rem] justify-center bg-black/50 px-4"
          onClick={() => setIsVideoCallOpen(false)}
        >
          <div
            className="w-full max-w-[620px] rounded-md bg-white p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between border-b pb-3">
              <h3 className="text-3xl font-light text-gray-800">Schedule a Video Call</h3>
              <button
                type="button"
                onClick={() => setIsVideoCallOpen(false)}
                className="rounded p-1 text-gray-500 transition hover:bg-gray-100 hover:text-black"
                aria-label="Close video call form"
              >
                <X size={18} />
              </button>
            </div>

            <p className="mb-3 text-xs text-gray-600 px-5">Available days: Monday</p>

            <div className='px-5'>
              <button
                type="button"
                onClick={() => setShowVideoDateField((prev) => !prev)}
                className={`mb-3 ${showVideoDateField ? 'bg-[#f2dce6] text-black' :  'bg-[#cf254a] text-white'} px-4 py-2 text-sm  hover:bg-red-700`}
              >
                Pick A Date
              </button>
            </div>

            <form className="space-y-3 px-5" onSubmit={handleVideoCallSubmit}>
              {showVideoDateField ? (
                <input
                  type="date"
                  value={videoCallDate}
                  onChange={(event) => setVideoCallDate(event.target.value)}
                  className="w-full rounded border border-[#CCCCCC] bg-white px-3 py-2 text-sm focus:outline-none"
                />
              ) : null}
              <input
                type="text"
                placeholder="Your Name"
                value={videoCallName}
                onChange={(event) => setVideoCallName(event.target.value)}
                className="w-full rounded border border-[#CCCCCC] bg-white px-3 py-2 text-sm focus:outline-none"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={videoCallEmail}
                onChange={(event) => setVideoCallEmail(event.target.value)}
                className="w-full rounded border border-[#CCCCCC] bg-white px-3 py-2 text-sm focus:outline-none"
              />
              <div className="flex items-center rounded border border-[#CCCCCC] bg-white px-3 py-2">
                <span className="mr-2 text-sm text-gray-600">+1</span>
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={videoCallPhone}
                  onChange={(event) => setVideoCallPhone(event.target.value)}
                  className="w-full text-sm focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="mt-2 w-full bg-[#cf254a] py-2.5 text-sm  rounded-md font-semibold text-white hover:bg-red-700"
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      )}

      <ToastContainer
        toasts={toasts}
        onRemoveToast={removeToast}
      />
    </div>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
` as const;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    rating: metafield(namespace: "custom", key: "rating") {
      value
    }
    styleNo: metafield(namespace: "custom", key: "style_no") {
      value
    }
    shortDescription: metafield(namespace: "custom", key: "short_description") {
      value
    }
    tabSummary: metafield(namespace: "custom", key: "tab_summary") {
      value
    }
    tabDiamondGemstone: metafield(namespace: "custom", key: "tab_diamond_gemstone") {
      value
    }
    tabMetalDetails: metafield(namespace: "custom", key: "tab_metal_definition") {
      value
    }
    tabPriceBreakup: metafield(namespace: "custom", key: "tab_price_breakup") {
      value
    }
    offerText: metafield(namespace: "custom", key: "offer") {
      value
    }
    callbackButtonText: metafield(namespace: "custom", key: "callback_button_text") {
      value
    }
    showDelivery: metafield(namespace: "custom", key: "show_delivery") {
      value
    }
    metal: metafield(namespace: "custom", key: "metal") {
      value
    }
    diamond: metafield(namespace: "custom", key: "diamond") {
      value
    }
    gemstone: metafield(namespace: "custom", key: "gemstone") {
      value
    }

    # ✅ ADD HERE
    images(first: 10) {
      nodes {
        id
        url
        altText
      }
    }

    encodedVariantExistence
    encodedVariantAvailability

    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }

    selectedOrFirstAvailableVariant(
      selectedOptions: $selectedOptions,
      ignoreUnknownOptions: true,
      caseInsensitiveMatch: true
    ) {
      ...ProductVariant
    }

    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }

    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
` as const;
