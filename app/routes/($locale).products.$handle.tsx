import { redirect, useLoaderData } from 'react-router';
import type { Route } from './+types/products.$handle';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import { ProductPrice } from '~/components/ProductPrice';
import { ProductImage } from '~/components/ProductImage';
import { ProductForm } from '~/components/ProductForm';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';
import { useState, useEffect, useRef, useMemo, type FormEvent } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, VideoIcon, ChevronRight, StoreIcon, EyeIcon, HeartIcon, PhoneIcon, X, ShieldCheck, RefreshCcw, BadgeDollarSign, Info, MapPin, Copy, Check } from "lucide-react";
import PhoneInput from 'react-phone-input-2';
import ImageModal from '~/components/ImageCarousal';
import { FaWhatsapp } from "react-icons/fa";
import levelNew from '../assets/levelnew.png';
import GoldIngot from '../assets/goldIngot.svg';
import Forever from '../assets/forever.svg';
import Exchange from '../assets/exchange.svg';
import ProductInformation from '../assets/search.svg'
import certificateGuideImage from '../assets/CertificateDetails.jpg';
import { useToast } from '~/components/useToast';
import { ToastContainer } from '~/components/Toast';
import { addToWishlist, isInWishlist, loadWishlist, removeFromWishlist } from '~/lib/wishlist';
import { SaleAssistButton } from '~/components/SaleAssistButton';
import { SaleAssistFloatingButton } from '~/components/SaleAssistFloatingButton';

export const meta: Route.MetaFunction = ({ data }) => {
  return [
    { title: ` ${data?.product.title ?? ''}` },
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

  return { ...deferredData, ...criticalData };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({ context, params, request }: Route.LoaderArgs) {
  const { handle } = params;
  const { storefront } = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{ product }] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: { handle, selectedOptions: getSelectedProductOptions(request) },
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!product?.id) {
    throw new Response(null, { status: 404 });
  }

  // The API handle might be localized, so redirect to the localized handle
  redirectIfHandleIsLocalized(request, { handle, data: product });

  return {
    product,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({ context, params }: Route.LoaderArgs) {
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
      return { label, value: value || '—' };
    })
    .filter((item) => item.label.length > 0);
};

const TabContent = ({ tabData }: { tabData: TabRow[] }) => (
  <div className="bg-[#fdfaf5] rounded-lg p-4 text-sm text-gray-700 space-y-3">
    {tabData.map((item, index) => (
      <div
        key={index}
        className={`flex justify-between pb-2 ${index !== tabData.length - 1 ? "border-b" : ""
          } ${item.highlight ? "font-semibold text-base pt-3" : ""}`}
      >
        <span className="text-black font-semibold">{item.label}:</span>
        <span
          className={`font-medium ${item.label.toLowerCase() === 'total price'
            ? 'font-semibold text-black'
            : ''
            }`}
        >
          {item.label.toLowerCase() === 'diamond price' ? (
            <DiamondPriceValue value={item.value} />
          ) : (
            item.value
          )}
        </span>
      </div>
    ))}
  </div>
);

const DiamondPriceValue = ({ value }: { value: string }) => {
  const currencyMatches =
    value.match(/[₹$]\s?\d+(?:,\d{3})*(?:\.\d+)?/g) || [];

  if (currencyMatches.length >= 2) {
    return (
      <span className="inline-flex items-center gap-2">
        <span className="text-gray-500 line-through">{currencyMatches[0]}</span>
        <span className="font-semibold text-black">{currencyMatches[1]}</span>
      </span>
    );
  }

  return <>{value}</>;
};

export default function Product() {
  const { product } = useLoaderData<typeof loader>();
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
      const parsedJson = JSON.parse(rawValue) as { value?: string | number };
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
  const [isDiamondCertificateGuideOpen, setIsDiamondCertificateGuideOpen] = useState(false);
  const [videoCallScheduleMode, setVideoCallScheduleMode] = useState<
    'today' | 'pick_date' | ''
  >('');
  const [activeTab, setActiveTab] = useState("summary");
  const [deliveryPincode, setDeliveryPincode] = useState('');
  const [reviewNickname, setReviewNickname] = useState('');
  const [reviewSummary, setReviewSummary] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewPhoto, setReviewPhoto] = useState<File | null>(null);
  const [isReviewSubmitting, setIsReviewSubmitting] = useState(false);
  const [reviewSuccessBanner, setReviewSuccessBanner] = useState('');
  const [callbackName, setCallbackName] = useState('');
  const [callbackEmail, setCallbackEmail] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackStoreLocation, setCallbackStoreLocation] = useState('');
  const [callbackNameError, setCallbackNameError] = useState('');
  const [callbackEmailError, setCallbackEmailError] = useState('');
  const [callbackPhoneError, setCallbackPhoneError] = useState('');
  const [isCallbackSubmitting, setIsCallbackSubmitting] = useState(false);
  const [videoCallDate, setVideoCallDate] = useState('');
  const [videoCallTime, setVideoCallTime] = useState('');
  const [videoCallName, setVideoCallName] = useState('');
  const [videoCallEmail, setVideoCallEmail] = useState('');
  const [videoCallPhone, setVideoCallPhone] = useState('');
  const [isVideoCallSubmitting, setIsVideoCallSubmitting] = useState(false);
  const [videoCallInlineError, setVideoCallInlineError] = useState('');
  const videoCallTimeSlots = ['11:39 pm', '3:00 pm', '12:00 pm', '5:00 pm'];
  const todayDate = useMemo(() => new Date().toISOString().split('T')[0], []);
  const { showSuccess, showError, toasts, removeToast } = useToast();
  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );
  const availableVideoCallTimeSlots = useMemo(() => {
    if (videoCallScheduleMode !== 'today') {
      return videoCallTimeSlots;
    }

    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    return videoCallTimeSlots.filter((slot) => {
      const [timePart, meridiem] = slot.trim().split(' ');
      const [rawHour, rawMinute] = timePart.split(':');
      let hour = Number(rawHour);
      const minute = Number(rawMinute);

      if (Number.isNaN(hour) || Number.isNaN(minute)) return false;
      const meridiemLower = meridiem?.toLowerCase();
      if (meridiemLower === 'pm' && hour !== 12) hour += 12;
      if (meridiemLower === 'am' && hour === 12) hour = 0;

      const slotMinutes = hour * 60 + minute;
      return slotMinutes >= nowMinutes;
    });
  }, [videoCallScheduleMode, videoCallTimeSlots]);
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
        { label: 'Metal', value: product.metal?.value },
        { label: 'Diamond', value: product.diamond?.value },
        { label: 'Gemstone', value: product.gemstone?.value },
      ].filter((item) => Boolean(item.value?.trim())),
    [product.metal?.value, product.diamond?.value, product.gemstone?.value],
  );
  const callbackButtonLabel = product.callbackButtonText?.value?.trim() || 'Notify Me';
  const shouldShowDelivery = product.showDelivery?.value
    ? product.showDelivery.value.toLowerCase() === 'true'
    : true;
  const saleAssistWidgetId = product.saleAssistWidgetId?.value?.trim() || '6a332aee-f9a2-4163-9fc2-a37720137da4';
  const styleNumber = product.styleNo?.value?.trim() || selectedVariant?.sku || '—';
  const [isStyleNumberCopied, setIsStyleNumberCopied] = useState(false);

  const shouldShowDiamondCertificateGuide = product.diamondCertificateGuide?.value
    ? product.diamondCertificateGuide.value.toLowerCase() === 'true'
    : false;

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

  const openDiamondCertificateGuide = () => {
    setIsDiamondCertificateGuideOpen(true);
  };

  const copyTextToClipboard = async (text: string) => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  };

  const handleCopyStyleNumber = async () => {
    if (!styleNumber || styleNumber === '—') {
      showError('Style number not available to copy.');
      return;
    }

    try {
      await copyTextToClipboard(styleNumber);
      setIsStyleNumberCopied(true);
      showSuccess('Style number copied.');
      window.setTimeout(() => setIsStyleNumberCopied(false), 1500);
    } catch {
      showError('Unable to copy style number.');
    }
  };

  const handleReviewSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const reviewFormElement = event.currentTarget;
    if (
      !reviewNickname.trim() ||
      !reviewSummary.trim() ||
      !reviewText.trim() ||
      !reviewPhoto
    ) {
      showError('Please fill all required review fields.');
      return;
    }

    try {
      setIsReviewSubmitting(true);
      setReviewSuccessBanner('');
      const payload = new FormData();
      payload.append('nickname', reviewNickname.trim());
      payload.append('summary', reviewSummary.trim());
      payload.append('review', reviewText.trim());
      payload.append('product_title', product.title);
      payload.append('product_handle', product.handle);
      payload.append('product_id', product.id);
      if (reviewPhoto) {
        payload.append('photo', reviewPhoto);
      }

      const response = await fetch('/api/review', {
        method: 'POST',
        body: payload,
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        showError(result.error || 'Failed to submit review.');
        return;
      }

      setReviewSuccessBanner('You submitted your review for moderation.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setReviewNickname('');
      setReviewSummary('');
      setReviewText('');
      setReviewPhoto(null);
      reviewFormElement.reset();
    } catch {
      showError('Failed to submit review. Please try again.');
    } finally {
      setIsReviewSubmitting(false);
    }
  };

  const closeCallbackModal = () => {
    setIsCallbackOpen(false);
    setCallbackName('');
    setCallbackEmail('');
    setCallbackPhone('');
    setCallbackStoreLocation('');
    setCallbackNameError('');
    setCallbackEmailError('');
    setCallbackPhoneError('');
  };

  const closeVideoCallModal = () => {
    setIsVideoCallOpen(false);
    setVideoCallInlineError('');
    setVideoCallScheduleMode('');
    setVideoCallDate('');
    setVideoCallTime('');
    setVideoCallName('');
    setVideoCallEmail('');
    setVideoCallIsdCode('+1');
    setVideoCallPhone('');
  };

  const handleCallbackSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = callbackName.trim();
    const trimmedEmail = callbackEmail.trim();
    const trimmedPhone = callbackPhone.trim();
    const isValidName = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/.test(trimmedName);
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(trimmedEmail);
    const isValidPhone = /^\d{10}$/.test(trimmedPhone);

    setCallbackNameError('');
    setCallbackEmailError('');
    setCallbackPhoneError('');

    if (
      !trimmedName ||
      !trimmedEmail ||
      !trimmedPhone ||
      !callbackStoreLocation.trim()
    ) {
      showError('Please fill all callback form fields.');
      return;
    }

    if (!isValidName) {
      setCallbackNameError('Please enter a valid name (letters, spaces, apostrophes, or hyphens only).');
      return;
    }

    if (!isValidEmail) {
      setCallbackEmailError('The email format is invalid.');
      return;
    }

    if (!isValidPhone) {
      setCallbackPhoneError('The phone number format is invalid.');
      return;
    }

    try {
      setIsCallbackSubmitting(true);
      const formData = new FormData(event.currentTarget);
      const payload = {
        name: String(formData.get('name') || ''),
        email: trimmedEmail,
        phone: trimmedPhone,
        preferred_store: String(formData.get('preferred_store') || ''),
        product_title: String(formData.get('product_title') || product.title),
        product_handle: String(formData.get('product_handle') || product.handle),
        product_id: String(formData.get('product_id') || product.id),
      };

      const response = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        const normalizedError = (result.error || '').toLowerCase();
        if (
          normalizedError.includes('name') &&
          normalizedError.includes('format')
        ) {
          setCallbackNameError(
            'Please enter a valid name (letters, spaces, apostrophes, or hyphens only).',
          );
          return;
        }
        showError(result.error || 'Failed to submit callback request.');
        return;
      }

      closeCallbackModal();
      showSuccess('Callback request submitted successfully.');
    } catch {
      showError('Failed to submit callback request. Please try again.');
    } finally {
      setIsCallbackSubmitting(false);
    }
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

  const handleVideoCallSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = videoCallName.trim();
    const trimmedEmail = videoCallEmail.trim();
    const trimmedPhone = videoCallPhone.trim();
    const isPastDateSelection = videoCallScheduleMode === 'pick_date' && videoCallDate < todayDate;
    const isPastTimeForToday =
      videoCallScheduleMode === 'today' &&
      videoCallTime.trim() &&
      !availableVideoCallTimeSlots.includes(videoCallTime);
    const isPhoneTenDigits = /^\d{10}$/.test(trimmedPhone);
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(trimmedEmail);

    if (!videoCallScheduleMode) {
      setVideoCallInlineError('Please select Today or Pick A Date.');
      return;
    }

    if (videoCallScheduleMode === 'today' && !videoCallTime.trim()) {
      setVideoCallInlineError('Please select a time slot.');
      return;
    }

    if (videoCallScheduleMode === 'pick_date' && !videoCallDate) {
      setVideoCallInlineError('Please select a date.');
      return;
    }

    if (isPastDateSelection || isPastTimeForToday) {
      setVideoCallInlineError('Please choose a current or future slot.');
      return;
    }

    if (!trimmedName) {
      setVideoCallInlineError('Please enter your name.');
      return;
    }

    if (!trimmedEmail || !isValidEmail) {
      setVideoCallInlineError('Please enter your email address.');
      return;
    }

    if (!trimmedPhone) {
      setVideoCallInlineError('The phone number format is invalid.');
      return;
    }

    if (!isPhoneTenDigits) {
      setVideoCallInlineError('Please enter a valid phone number (10 digits).');
      return;
    }
    try {
      setVideoCallInlineError('');
      setIsVideoCallSubmitting(true);
      const payload = {
        schedule_mode: videoCallScheduleMode,
        appointment_date: videoCallScheduleMode === 'pick_date' ? videoCallDate : '',
        appointment_time: videoCallScheduleMode === 'today' ? videoCallTime : '',
        name: trimmedName,
        email: trimmedEmail,
        isd_code: videoCallIsdCode.trim(),
        phone: trimmedPhone,
        product_title: product.title,
        product_handle: product.handle,
        product_id: product.id,
      };

      const response = await fetch('/api/video-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        setVideoCallInlineError(result.error || 'Failed to submit video call request.');
        return;
      }

      closeVideoCallModal();
      showSuccess('Video call request submitted successfully.');
    } catch {
      setVideoCallInlineError('Failed to submit video call request. Please try again.');
    } finally {
      setIsVideoCallSubmitting(false);
    }
  };

  const productId = product.id;
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    void loadWishlist().then(() => {
      setWishlisted(isInWishlist(productId));
    });
  }, [productId]);

  const handleWishlist = () => {
    if (wishlisted) {
      removeFromWishlist(productId);
      // showSuccess("Removed from wishlist");
    } else {
      addToWishlist({
        id: product.id,
        title: product.title,
        handle: product.handle,
        image: selectedVariant?.image?.url,
        price: selectedVariant?.price?.amount,
        variantId: selectedVariant?.id,
      });
    }

    setWishlisted(!wishlisted);
  };

  return (
    <div className='bg-[#fdfaf5] 2xl:px-[5rem] lg:px-[4rem]'>
      <div className='text-[14px] px-6 pt-4 font-helvetica-light flex items-center gap-1'>
        <a href='/' className="transition hover:text-[#333] text-black">Home</a>
        <span className="text-[#ccc]">|</span>
        <span className='text-black'>{product.title}</span>
      </div>

      {reviewSuccessBanner ? (
        <div className="mx-6 mt-4 flex items-center gap-3 bg-[#e2ede2] px-4 py-3 text-[#14813f]">
          <span className="text-lg leading-none">✓</span>
          <span className="font-sans text-base">{reviewSuccessBanner}</span>
        </div>
      ) : null}

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
                      ${currentIndex === actualIndex
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
                    className={`h-2 w-2 rounded-full transition ${index === currentIndex ? 'bg-[#cf254a]' : 'bg-gray-300'
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
            <p className="text-[35px] font-normal text-[#000] font-regular font-helvetica-otf">
              {product.title}
            </p>

            {/* SKU + Rating + Review */}
            <div className="flex items-start justify-between">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-[18px] text-black">
                <span className="font-helvetica-light">SKU {styleNumber}</span>
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center gap-1 text-2xl"
                    aria-label={
                      productRating !== null
                        ? `Rated ${productRating} out of 5`
                        : 'No rating yet'
                    }
                  >
                    {Array.from({ length: 5 }).map((_, i) => {
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
                    <span className="text-sm text-gray-600 font-helvetica-light">
                      {productRating.toFixed(1)}
                    </span>
                  ) : null}
                  <button
                    type="button"
                    onClick={scrollToReviewForm}
                    className="hover:underline hover:text-black font-helvetica-light  cursor-pointer"
                  >
                    Write a review
                  </button>
                </div>
              </div>

            </div>

            {/* Price Section */}
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">
                <span className="xl:text-3xl lg:text-lg font-semibold text-black font-sans">
                  ${selectedVariant?.price.amount}
                </span>

                {selectedVariant?.compareAtPrice && (
                  <span className="line-through text-gray-400 xl:text-lg lg:text-md font-sans">
                    ${selectedVariant.compareAtPrice.amount}
                  </span>
                )}
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

            {/* Product Summary */}
            <div>
              <h3 className="text-2xl font-normal mb-3 font-helvetica-light">Product Summary</h3>

              <div
                className={`bg-white rounded-xl p-4 grid text-center text-sm ${summaryStats.length === 1
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

              <p className="text-lg font-semibold text-gray-500 mt-2">
                <div
                  className="text-gray-600 text-lg font-semibold font-sans"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              </p>
            </div>

            {/* Variants */}
            {/* <ProductForm
              productOptions={productOptions}
              selectedVariant={selectedVariant}
            /> */}

            {/* Delivery Submit */}
            {/* {shouldShowDelivery ? (
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
            ) : null} */}

            {/* Mobile Buttons */}
            <div className="flex items-center gap-4 md:hidden justify-center px-[2rem]">
              <button
                type="button"
                onClick={() => setIsCallbackOpen(true)}
                className="flex-1 bg-[#cf254a] text-white py-3 text-lg rounded-lg font-semibold hover:bg-red-700 font-sans cursor-pointer"
              >
                {callbackButtonLabel}
              </button>

              {/* <button className="border border-red-300 p-2 rounded-lg text-red-500 hover:bg-red-50 w-[52px] h-[52px] flex items-center justify-center cursor-pointer justify-self-start">
                <HeartIcon size={18} />
              </button> */}
              <button
                onClick={handleWishlist}
                className={`border p-2 rounded-lg  w-[52px] h-[52px] flex items-center justify-center cursor-pointer justify-self-start ${wishlisted
                  ? "bg-red-500 text-white"
                  : "border-red-300 text-red-500 hover:bg-red-50"
                  }`}
              >
                <HeartIcon size={18} fill={wishlisted ? "white" : "none"} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 md:hidden">
              {/* <div className="text-[#000000] flex items-center justify-center gap-2">
                <VideoIcon size={22} />
                <span className="text-lg font-semibold font-sans">Live Video Call</span>
              </div> */}
              <SaleAssistButton
                widgetId={saleAssistWidgetId}
                label="Live Video Call"
                variant="pdp"
              />

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

              {/* <button className="border border-red-300 p-2 rounded-lg text-red-500 hover:bg-red-50 max-w-10 flex items-center justify-center cursor-pointer">
                <HeartIcon size={18} />
              </button> */}
              <button
                onClick={handleWishlist}
                className={`border p-2 rounded-lg max-w-15 flex items-center justify-center cursor-pointer ${wishlisted
                  ? "bg-red-500 text-white"
                  : "border-red-300 text-red-500 hover:bg-red-50"
                  }`}
              >
                <HeartIcon size={24} fill={wishlisted ? "white" : "none"} />
              </button>
            </div>

            <div className="hidden md:grid grid-cols-2 gap-4">
              {/* <div className="text-[#000000] flex items-center justify-center gap-2 ">
                <VideoIcon size={22} />
                <span className="text-lg font-semibold font-sans ">Live Video Call</span>
              </div> */}
              <SaleAssistButton
                widgetId={saleAssistWidgetId}
                label="Live Video Call"
                variant="pdp"
              />

              <div className="text-[#000000] flex items-center justify-center gap-2 -mb-[1rem]">
                <StoreIcon size={22} />
                <span className="text-lg font-medium font-sans">Store Availablity</span>
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
              <div className="flex flex-wrap items-center gap-3 text-lg font-thin text-red-500 font-helvetica-light">
                <p>Style No. {styleNumber}</p>
                <button
                  type="button"
                  onClick={() => void handleCopyStyleNumber()}
                  className="inline-flex items-center justify-center text-[#cf254a] hover:text-[#a61e3d]"
                  aria-label="Copy style number"
                  title="Copy style number"
                >
                  {isStyleNumberCopied ? <Check size={18} /> : <Copy size={18} />}
                </button>
                {shouldShowDiamondCertificateGuide ? (
                  <button
                    type="button"
                    onClick={openDiamondCertificateGuide}
                    className="cursor-pointer text-[#3f3f46] underline underline-offset-2 hover:text-black"
                  >
                    DIAMOND CERTIFICATE GUIDE
                  </button>
                ) : null}
              </div>

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
                  className={`px-4 py-2 rounded-md font-sans font-semibold text-[16px] ${activeTab === "summary"
                    ? "bg-[#cf254a] text-white"
                    : "text-black"
                    }`}
                >
                  Product Summary
                </button>

                <button
                  onClick={() => setActiveTab("diamond")}
                  className={`px-4 py-2 rounded-md  font-sans font-semibold text-[16px] ${activeTab === "diamond"
                    ? "bg-[#cf254a] text-white"
                    : "text-black"
                    }`}
                >
                  Diamond / Gemstone Details
                </button>

                <button
                  onClick={() => setActiveTab("metal")}
                  className={`px-4 py-2 rounded-md font-semibold text-[16px] ${activeTab === "metal"
                    ? "bg-[#cf254a] text-white"
                    : "text-black"
                    }`}
                >
                  Metal Details
                </button>

                <button
                  onClick={() => setActiveTab("price")}
                  className={`px-4 py-2 rounded-md font-sans font-semibold text-[16px] ${activeTab === "price"
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
              {activeTab === 'diamond' && shouldShowDiamondCertificateGuide ? (
                <p className="mt-4 text-sm text-gray-700 font-sans">
                  100% Natural and Certified Diamonds.
                </p>
              ) : null}
            </div>

            {/* Mobile tabs */}
            <div className="lg:hidden space-y-4">
              <div className="flex flex-col gap-2 text-sm">
                {[
                  { key: 'summary', label: 'Product Summary' },
                  { key: 'diamond', label: 'Diamond / Gemstone Details' },
                  { key: 'metal', label: 'Metal Details' },
                  { key: 'price', label: 'Price Breakup' },
                ].map((tab) => (
                  <div key={tab.key} className="space-y-2">
                    <button
                      onClick={() => setActiveTab(tab.key)}
                      className={`w-full px-3 py-2 rounded-md text-left font-sans font-semibold text-[16px] ${activeTab === tab.key ? 'bg-[#cf254a] text-white' : 'text-black'
                        }`}
                    >
                      {tab.label}
                    </button>
                    {activeTab === tab.key ? (
                      <>
                        <TabContent tabData={productTabs[tab.key as keyof typeof productTabs] || []} />
                        {tab.key === 'diamond' && shouldShowDiamondCertificateGuide ? (
                          <p className="mt-3 text-sm text-gray-700 font-sans">
                            100% Natural and Certified Diamonds.
                          </p>
                        ) : null}
                      </>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-[#fdfaf5] rounded-lg p-4 md:flex flex-1  md:justify-between md:items-center text-sm mt-5">
              <div className='space-y-2 md:space-y-0'>
                <p className="font-medium text-gray-800 font-sans md:whitespace-nowrap">
                  Need help to find the best jewellery for you?
                </p>
                <p className="text-gray-500 text-xs font-sans">
                  We are available for your assistance
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 text-gray-600 mt-5 md:mt-0 justify-center items-center">

                {/* WhatsApp */}
                <a
                  href="https://api.whatsapp.com/send?phone=919920024599&text=Hey%20Alia%2C%20Let%E2%80%99s%20Start!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1 font-sans"
                >
                  <FaWhatsapp
                    size={24}
                    className="text-gray-500 group-hover:text-red-500 transition-colors duration-200"
                  />
                  <span>Chat with Experts</span>
                </a>

                {/* Call Back */}
                <button className="group flex items-center gap-1 font-sans">
                  <PhoneIcon
                    size={18}
                    className="text-gray-500 group-hover:text-red-500 transition-colors duration-200"
                  />
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
                accept="image/*"
                className="mt-1 block text-xs text-black file:mr-2 file:rounded file:border file:border-[#bfbfbf] file:bg-white file:px-2 file:py-0.5 file:text-xs file:text-black hover:file:bg-[#f5f5f5]"
                onChange={(event) =>
                  setReviewPhoto(event.target.files?.[0] ?? null)
                }
              />
            </div>

            <div className='flex justify-center'>
              <button
                type="submit"
                disabled={isReviewSubmitting}
                className="bg-[#cf254a] text-white px-6 py-2 font-sans hover:bg-red-600 w-full"
              >
                {isReviewSubmitting ? 'Submitting...' : 'Submit Review'}
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
          onClick={closeCallbackModal}
        >
          <div
            className="w-full max-w-[400px]  bg-[#f1f1f1] p-[20px] shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between">
              <h3 className="text-3xl font-light text-gray-800">Request a Callback</h3>
              <button
                type="button"
                onClick={closeCallbackModal}
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
              {/* Hidden product fields for callback metaobject payload */}
              <input type="hidden" name="product_title" value={product.title} />
              <input type="hidden" name="product_handle" value={product.handle} />
              <input type="hidden" name="product_id" value={product.id} />

              <div>
                <label className="mb-1 block text-sm text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full rounded border border-[#CCCCCC] bg-white px-3 py-2 text-sm focus:outline-none"
                  value={callbackName}
                  onChange={(event) => {
                    setCallbackName(event.target.value);
                    if (callbackNameError) setCallbackNameError('');
                  }}
                />
                {callbackNameError ? (
                  <p className="mt-1 text-xs text-[#cf254a]">{callbackNameError}</p>
                ) : null}
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full rounded border border-[#CCCCCC] bg-white px-3 py-2 text-sm focus:outline-none"
                  value={callbackEmail}
                  onChange={(event) => {
                    setCallbackEmail(event.target.value);
                    if (callbackEmailError) setCallbackEmailError('');
                  }}
                />
                {callbackEmailError ? (
                  <p className="mt-1 text-xs text-[#cf254a]">{callbackEmailError}</p>
                ) : null}
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-700">Phone</label>
                <PhoneInput
                  country={'us'}
                  value={callbackPhone}
                  onChange={(value) => setCallbackPhone(value)}
                  specialLabel=""
                  inputProps={{
                    name: 'phone',
                    required: true,
                  }}
                  containerStyle={{
                    width: '100%',
                  }}
                  inputStyle={{
                    width: '100%',
                    height: '38px',
                    fontSize: '14px',
                    borderRadius: '0px',
                    border: '1px solid #CCCCCC',
                  }}
                  buttonStyle={{
                    borderRadius: '0px',
                    border: '1px solid #CCCCCC',
                    backgroundColor: '#fff',
                  }}
                />
                {callbackPhoneError ? (
                  <p className="mt-1 text-xs text-[#cf254a]">{callbackPhoneError}</p>
                ) : null}
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-700">Preferred Store</label>
                <select
                  name="preferred_store"
                  required
                  className="w-full rounded border border-[#CCCCCC] bg-white px-3 py-2 text-sm focus:outline-none"
                  value={callbackStoreLocation}
                  onChange={(event) => setCallbackStoreLocation(event.target.value)}
                >
                  <option value="">Select a store</option>
                  <option value="Kalyan Jewellers (New Jersey)">Kalyan Jewellers (New Jersey)</option>
                  <option value="Kalyan Jewellers (Chicago)">Kalyan Jewellers (Chicago)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isCallbackSubmitting}
                className="mt-2 w-full bg-[#cf254a] py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                {isCallbackSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      )}

      {isVideoCallOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start pt-[4rem] justify-center bg-black/50 px-4"
          onClick={closeVideoCallModal}
        >
          <div
            className="w-full max-w-[620px] bg-white p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between border-b pb-3">
              <p className="text-[25px] font-normal text-gray-800">Schedule a Video Call</p>
              <button
                type="button"
                onClick={closeVideoCallModal}
                className="rounded p-1 text-gray-500 transition hover:bg-gray-100 hover:text-black"
                aria-label="Close video call form"
              >
                <X size={18} />
              </button>
            </div>

            <p className="mb-3 text-[14px] text-gray-600 px-5">Available days: Monday</p>

            <div className='px-5 flex gap-3'>
              <button
                type="button"
                onClick={() => {
                  setVideoCallScheduleMode('today');
                  if (videoCallInlineError) setVideoCallInlineError('');
                }}
                className={`mb-3 rounded border px-4 py-2 text-sm ${videoCallScheduleMode === 'today'
                  ? 'bg-[#cf254a] text-white border-[#cf254a]'
                  : 'bg-gray-100 text-black border-[#cccccc]'
                  }`}
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => {
                  setVideoCallScheduleMode('pick_date');
                  if (videoCallInlineError) setVideoCallInlineError('');
                }}
                className={`mb-3 rounded border px-4 py-2 text-sm ${videoCallScheduleMode === 'pick_date'
                  ? 'bg-[#cf254a] text-white border-[#cf254a]'
                  : 'bg-gray-100 text-black border-[#cccccc]'
                  }`}
              >
                Pick A Date
              </button>
            </div>

            <form className="space-y-3 px-5" onSubmit={handleVideoCallSubmit}>
              {videoCallInlineError ? (
                <p className="rounded bg-[#f8dfe2] px-3 py-2 text-sm text-[#c63b57]">
                  {videoCallInlineError}
                </p>
              ) : null}

              {videoCallScheduleMode === 'today' ? (
                <div className="mb-1 flex flex-wrap gap-3">
                  {availableVideoCallTimeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => {
                        setVideoCallTime(slot);
                        if (videoCallInlineError) setVideoCallInlineError('');
                      }}
                      className={`rounded border px-4 py-2 text-sm ${videoCallTime === slot
                        ? 'border-[#cf254a] bg-[#cf254a] text-white'
                        : 'border-[#cccccc] bg-white text-black'
                        }`}
                    >
                      {slot}
                    </button>
                  ))}
                  {availableVideoCallTimeSlots.length === 0 ? (
                    <p className="text-xs text-gray-600">
                      No slots available for today. Please pick a date.
                    </p>
                  ) : null}
                </div>
              ) : null}
              {videoCallScheduleMode === 'pick_date' ? (
                <input
                  type="date"
                  min={todayDate}
                  value={videoCallDate}
                  onChange={(event) => {
                    setVideoCallDate(event.target.value);
                    if (videoCallInlineError) setVideoCallInlineError('');
                  }}
                  className="w-full rounded border border-[#CCCCCC] bg-white px-3 py-2 text-sm focus:outline-none"
                />
              ) : null}
              <input
                type="text"
                placeholder="Your Name"
                value={videoCallName}
                onChange={(event) => {
                  setVideoCallName(event.target.value);
                  if (videoCallInlineError) setVideoCallInlineError('');
                }}
                className="w-full rounded border border-[#CCCCCC] bg-white px-3 py-2 text-sm focus:outline-none"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={videoCallEmail}
                onChange={(event) => {
                  setVideoCallEmail(event.target.value);
                  if (videoCallInlineError) setVideoCallInlineError('');
                }}
                className="w-full rounded border border-[#CCCCCC] bg-white px-3 py-2 text-sm focus:outline-none"
              />
              <div className="w-full">
                <PhoneInput
                  country={'us'}
                  value={videoCallPhone}
                  onChange={(value) => setVideoCallPhone(value)}
                  specialLabel=""
                  inputProps={{
                    name: 'phone',
                    required: true,
                    placeholder: 'Mobile Number'
                  }}
                  containerStyle={{
                    width: '100%',
                  }}
                  inputStyle={{
                    width: '100%',
                    height: '40px',
                    fontSize: '14px',
                    borderRadius: '6px',
                    border: '1px solid #CCCCCC',
                  }}
                  buttonStyle={{
                    borderTopLeftRadius: '6px',
                    borderBottomLeftRadius: '6px',
                    border: '1px solid #CCCCCC',
                    backgroundColor: '#fff',
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={isVideoCallSubmitting}
                className="mt-2 w-full rounded-md bg-[#cf254a] py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isVideoCallSubmitting ? 'Submitting...' : 'Confirm'}
              </button>
            </form>
          </div>
        </div>
      )}

      {isDiamondCertificateGuideOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setIsDiamondCertificateGuideOpen(false)}
        >
          <div
            className="relative w-full max-w-[480px] rounded-md bg-white p-4 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsDiamondCertificateGuideOpen(false)}
              className="absolute right-3 top-3 rounded p-1 text-gray-600 transition hover:bg-gray-100 hover:text-black"
              aria-label="Close diamond certificate guide"
            >
              <X size={20} />
            </button>
            <div className="m-5">
              <img
                src={certificateGuideImage}
                alt="Diamond certificate guide"
                className="mx-auto h-auto max-h-[70vh] w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        toasts={toasts}
        onRemoveToast={removeToast}
      />

      {saleAssistWidgetId ? (
        <SaleAssistFloatingButton widgetId={saleAssistWidgetId} />
      ) : null}
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
    diamondCertificateGuide: metafield(namespace: "custom", key: "diamond_certificate_guide") {
      value
    }
    saleAssistWidgetId: metafield(namespace: "custom", key: "saleassist_widget_id") {
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
