import type {Route} from './+types/collections.all';
import {Link, useLoaderData, useSearchParams} from 'react-router';
import {getPaginationVariables} from '@shopify/hydrogen';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {ProductItem} from '~/components/ProductItem';
import {FilterDrawer} from '~/components/FilterDrawer';
import type {CollectionItemFragment} from 'storefrontapi.generated';
import { RiFilterFill } from 'react-icons/ri';
import {useMemo, useState} from 'react';

const SORT_OPTIONS = [
  {label: 'Relevance', value: 'relevance'},
  {label: "What's new", value: 'whats-new'},
  {label: 'Price - Low To High', value: 'price-asc'},
  {label: 'Price - High To Low', value: 'price-desc'},
] as const;

function isAvailabilityFilterInput(filterInput: string) {
  try {
    const parsed = JSON.parse(filterInput) as {available?: boolean};
    return typeof parsed.available === 'boolean';
  } catch {
    return false;
  }
}

function getSortVariables(sortParam: string | null) {
  switch (sortParam) {
    case 'whats-new':
      return {sortKey: 'CREATED_AT', reverse: true};
    case 'price-asc':
      return {sortKey: 'PRICE', reverse: false};
    case 'price-desc':
      return {sortKey: 'PRICE', reverse: true};
    case 'relevance':
    default:
      return {sortKey: 'CREATED_AT', reverse: true};
  }
}

export const meta: Route.MetaFunction = () => {
  return [{title: ` Products`}];
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
    pageBy: 16,
  });
  const sortParam = new URL(request.url).searchParams.get('sort');
  const sortVariables = getSortVariables(sortParam);

  const [{products}, {collections}] = await Promise.all([
    storefront.query(CATALOG_QUERY, {
      variables: {
        ...paginationVariables,
        sortKey: sortVariables.sortKey,
        reverse: sortVariables.reverse,
      },
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const selectedFilterInputs = searchParams.getAll('filter');
  const selectedSort = searchParams.get('sort') ?? 'relevance';
  const availableFilters: Array<{
    id: string;
    label: string;
    values: Array<{id: string; label: string; count: number; input: string}>;
  }> = [];

  const selectedFilterLabels = useMemo(
    () =>
      availableFilters
        .flatMap((filter) => filter.values)
        .filter((value) => selectedFilterInputs.includes(value.input))
        .map((value) => value.label),
    [availableFilters, selectedFilterInputs],
  );
  const filterSections = useMemo(
    () =>
      availableFilters.map((filter) => ({
        id: filter.id,
        label: filter.label,
        values: filter.values.map((value) => ({
          id: value.id,
          label: value.label,
          count: value.count,
          checked: selectedFilterInputs.includes(value.input),
          onToggle: () => toggleFilter(value.input),
        })),
      })),
    [availableFilters, selectedFilterInputs],
  );

  const toggleFilter = (filterInput: string) => {
    const nextParams = new URLSearchParams(searchParams);
    const existing = nextParams.getAll('filter');

    if (existing.includes(filterInput)) {
      const remaining = existing.filter((value) => value !== filterInput);
      nextParams.delete('filter');
      remaining.forEach((value) => nextParams.append('filter', value));
    } else {
      const nextExisting = isAvailabilityFilterInput(filterInput)
        ? existing.filter((value) => !isAvailabilityFilterInput(value))
        : existing;
      nextParams.delete('filter');
      nextExisting.forEach((value) => nextParams.append('filter', value));
      nextParams.append('filter', filterInput);
    }

    nextParams.delete('cursor');
    setSearchParams(nextParams);
  };

  const clearAllFilters = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('filter');
    nextParams.delete('cursor');
    setSearchParams(nextParams);
  };
  const selectedSortLabel =
    SORT_OPTIONS.find((option) => option.value === selectedSort)?.label ?? 'Relevance';

  const onSortSelect = (value: string) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('sort', value);
    nextParams.delete('cursor');
    setSearchParams(nextParams);
    setIsSortOpen(false);
  };

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
            onClick={() => setIsFilterOpen(true)}
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
            <span className="text-[16px] transition hover:text-[#333]">Bangles</span>
          </div>

          <div className="relative flex items-center gap-2">
            <span className="text-[#000] text-lg">Sort By:</span>
            <button
              type="button"
              className="rounded bg-transparent text-[#a30014] text-lg"
              onClick={() => setIsSortOpen((prev) => !prev)}
            >
              {selectedSortLabel}
            </button>
            {isSortOpen ? (
              <div className="absolute right-0 top-8 z-20 w-64 rounded-2xl bg-white p-3 shadow-lg">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => onSortSelect(option.value)}
                    className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-base hover:bg-gray-100"
                  >
                    <span className="w-4">{selectedSort === option.value ? '✓' : ''}</span>
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
    </div>
    <div className="collection mt-[8rem] 2xl:px-[5rem] lg:px-[4rem]">
      {/* {selectedFilterLabels.length ? (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {selectedFilterLabels.map((label) => (
            <span key={label} className="rounded bg-[#ececec] px-3 py-1 text-sm">
              {label}
            </span>
          ))}
          <button
            type="button"
            onClick={clearAllFilters}
            className="ml-2 text-sm text-[#a30014] underline"
          >
            Clear all
          </button>
        </div>
      ) : null} */}
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
    <FilterDrawer
      isOpen={isFilterOpen}
      onClose={() => setIsFilterOpen(false)}
      onClearAll={clearAllFilters}
      selectedCount={selectedFilterInputs.length}
      seeItemsCount={products.nodes.length}
      sections={filterSections}
    />
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
    $sortKey: ProductSortKeys
    $reverse: Boolean
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(
      sortKey: $sortKey
      reverse: $reverse
      first: $first
      last: $last
      before: $startCursor
      after: $endCursor
    ) {
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
