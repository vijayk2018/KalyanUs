import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import {Heart} from 'lucide-react';
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';

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
  return (
    <Link
      className="group block rounded-xl border border-[#d9dbe9] bg-[#fdfaf5] p-1 transition-all duration-300 hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)]"
      key={product.id}
      prefetch="intent"
      to={variantUrl}
    >
      <div className="relative rounded-lg bg-[#fdfaf5] p-3">
        <Heart
          size={28}
          className="absolute top-4 right-6 text-gray-300 transition "
        />
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
