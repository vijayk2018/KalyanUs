import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import {Heart} from 'lucide-react';
import {useEffect, useState} from 'react';
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';
import {addToWishlist, isInWishlist, loadWishlist, removeFromWishlist} from '~/lib/wishlist';

export function ProductItem({
  product,
  loading,
}: {
  product:
    | CollectionItemFragment
    | ProductItemFragment
    | RecommendedProductFragment;
  loading?: 'eager' | 'lazy';
}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    void loadWishlist().then(() => {
      setWishlisted(isInWishlist(product.id));
    });
  }, [product.id]);

  const handleWishlistToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (wishlisted) {
      removeFromWishlist(product.id);
      setWishlisted(false);
      return;
    }

    addToWishlist({
      id: product.id,
      title: product.title,
      handle: product.handle,
      image: image?.url,
      price: product.priceRange?.minVariantPrice?.amount,
    });
    setWishlisted(true);
  };

  return (
    <Link
      className="group block rounded-xl border border-[#d9dbe9] bg-[#fdfaf5] p-1 transition-all duration-300 hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)]"
      key={product.id}
      prefetch="intent"
      to={variantUrl}
    >
      <div className="relative rounded-lg bg-[#fdfaf5] p-3">
        <button
          type="button"
          onClick={handleWishlistToggle}
          className="absolute top-4 right-6 z-10"
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={28}
            className={`transition ${wishlisted ? 'text-black fill-black' : 'text-gray-300'}`}
          />
        </button>
        {image && (
          <Image
            alt={image.altText || product.title}
            aspectRatio="1/1"
            data={image}
            loading={loading}
            sizes="(min-width: 80em) 260px, (min-width: 48em) 25vw, 50vw"
            className="mx-auto h-[310px] w-full object-contain bg-white"
          />
        )}
      </div>

      <div className="p-3">
        <p className="text-[18px] font-medium text-[#c13b59]">
          <Money data={product.priceRange.minVariantPrice} />
        </p>
        <h4 className="mt-1 h-12 overflow-hidden text-sm leading-5 text-[#333]">
          {product.title}
        </h4>
      </div>
    </Link>
  );
}
