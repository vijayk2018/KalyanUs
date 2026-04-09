import type {Route} from './+types/collections.all';
import {Link, useLoaderData} from 'react-router';
import {getPaginationVariables} from '@shopify/hydrogen';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {ProductItem} from '~/components/ProductItem';
import type {CollectionItemFragment} from 'storefrontapi.generated';
import { Filter, FilterIcon, SlidersHorizontal } from 'lucide-react';
import { RiFilterFill } from 'react-icons/ri';

export const meta: Route.MetaFunction = () => {
  return [{title: `Hydrogen | Products`}];
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
async function loadCriticalData({context, request}: Route.LoaderArgs) {
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 20,
  });

  const [{products}, {collections}] = await Promise.all([
    storefront.query(CATALOG_QUERY, {
      variables: {...paginationVariables},
    }),
    storefront.query(COLLECTION_BANNER_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);
  const bannerImage = collections.nodes[0]?.image ?? null;
  return {products, bannerImage};
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  return {};
}

export default function Collection() {
  const {products, bannerImage} = useLoaderData<typeof loader>();

  return (
    <>
    {bannerImage?.url ? (
      <img
        src={bannerImage.url}
        className="w-full h-full object-contained"
        alt={bannerImage.altText ?? 'Collection banner'}
      />
    ) : null}
    <div className='bg-[#f8f7f1] flex flex-col py-8 2xl:px-[5rem] lg:px-[4rem]'>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Filters"
            className="p-2 rounded bg-black text-white shadow-sm"
          >
            <RiFilterFill size={18} aria-hidden />
          </button>
          <h1 className="text-4xl font-normal text-[#999]">
            Bangles{' '}
            <span className="font-normal text-3xl text-[#000]">
              (34 items)
            </span>
          </h1>
        </div>

        <div className="mt-2 flex items-center justify-between gap-4  text-[#000] md:text-[13px]">
          <div className="flex flex-wrap items-center gap-1">
            <Link to="/" className="transition hover:text-[#333] text-[16px]">
              Home
            </Link>
            <span aria-hidden>|</span>
            <Link
              to="/#shop-by-category"
              className="transition hover:text-[#333] text-[16px]"
            >
              Collection
            </Link>
            <span aria-hidden>|</span>
            <span className="text-[16px] transition hover:text-[#333">Bangles</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#000] text-lg">Sort By:</span>
            <button
              type="button"
              className="rounded bg-transparent text-[#a30014] text-lg"
            >
              Relevance
            </button>
          </div>
        </div>
    </div>
    <div className="collection mt-[8rem] 2xl:px-[5rem] lg:px-[4rem]">
      <PaginatedResourceSection<CollectionItemFragment>
        connection={products}
        resourcesClassName="products-grid"
      >
        {({node: product, index}) => (
          <ProductItem
            key={product.id}
            product={product}
            loading={index < 4 ? 'eager' : undefined}
          />
        )}
      </PaginatedResourceSection>
    </div>
    </> 
  );
}

const COLLECTION_ITEM_FRAGMENT = `#graphql
  fragment MoneyCollectionItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment CollectionItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyCollectionItem
      }
      maxVariantPrice {
        ...MoneyCollectionItem
      }
    }
  }
` as const;

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/product
const CATALOG_QUERY = `#graphql
  query Catalog(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        ...CollectionItem
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  ${COLLECTION_ITEM_FRAGMENT}
` as const;

const COLLECTION_BANNER_QUERY = `#graphql
  query CollectionBanner($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        id
        title
        image {
          id
          url
          altText
          width
          height
        }
      }
    }
  }
` as const;
