import {Link, redirect, useLoaderData, useSearchParams} from 'react-router';
import type {Route} from './+types/collections.$handle';
import {Analytics, getPaginationVariables, Image} from '@shopify/hydrogen';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {ProductItem} from '~/components/ProductItem';
import {FilterDrawer} from '~/components/FilterDrawer';
import type {ProductItemFragment} from 'storefrontapi.generated';
import {SlidersHorizontal} from 'lucide-react';
import banner from '../assets/banner2.jpg'
import { RiFilterFill } from 'react-icons/ri';
import {useMemo, useState} from 'react';

const SORT_OPTIONS = [
  {label: 'Relevance', value: 'relevance'},
  {label: "What's new", value: 'whats-new'},
  {label: 'Price - Low To High', value: 'price-asc'},
  {label: 'Price - High To Low', value: 'price-desc'},
] as const;

function getSortVariables(sortParam: string | null) {
  switch (sortParam) {
    case 'whats-new':
      return {sortKey: 'CREATED', reverse: true};
    case 'price-asc':
      return {sortKey: 'PRICE', reverse: false};
    case 'price-desc':
      return {sortKey: 'PRICE', reverse: true};
    case 'relevance':
    default:
      return {sortKey: 'MANUAL', reverse: false};
  }
}

export const meta: Route.MetaFunction = ({data}) => {
  return [{title: ` ${data?.collection.title ?? ''} Collection`}];
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
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 20,
  });
  const selectedFilters = request.url
    ? Array.from(new URL(request.url).searchParams.getAll('filter'))
        .map((value) => {
          try {
            return JSON.parse(value);
          } catch {
            return null;
          }
        })
        .filter(Boolean)
    : [];
  const sortParam = new URL(request.url).searchParams.get('sort');
  const sortVariables = getSortVariables(sortParam);

  if (!handle) {
    throw redirect('/collections');
  }

  const [{collection}] = await Promise.all([
    storefront.query(COLLECTION_QUERY, {
      variables: {
        handle,
        ...paginationVariables,
        filters: selectedFilters,
        sortKey: sortVariables.sortKey,
        reverse: sortVariables.reverse,
      },
      // Add other queries here, so that they are loaded in parallel
    }),
  ]);

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }

  // The API handle might be localized, so redirect to the localized handle
  redirectIfHandleIsLocalized(request, {handle, data: collection});

  return {
    collection,
  };
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
  const {collection} = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const totalCount = collection.products?.nodes?.length || 0;
  const selectedFilterInputs = searchParams.getAll('filter');
  const selectedSort = searchParams.get('sort') ?? 'relevance';
  const availableFilters = collection.products?.filters ?? [];

  const selectedFilterLabels = useMemo(() => {
    return availableFilters
      .flatMap((filter) => filter.values)
      .filter((value) => selectedFilterInputs.includes(value.input))
      .map((value) => value.label);
  }, [availableFilters, selectedFilterInputs]);
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
    {/* Desktop View */}
      <div className='bg-[#f8f7f1] flex flex-col py-8 2xl:px-[5rem] lg:px-[4rem] p-6 lg:block hidden'>
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
            {collection.title}{' '}
            <span className="font-normal text-3xl text-[#000]">
              ({totalCount} items)
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
            <span className="text-[16px] transition hover:text-[#333]">
              {collection.title}
            </span>
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

      {/* Mobile View */}
      <div className='bg-[#f8f7f1] flex flex-col py-8 2xl:px-[5rem] lg:px-[4rem] p-6 lg:hidden '>
        <div className="flex items-center gap-3">
          
          <h1 className="text-3xl font-normal text-[#999]">
            {collection.title}{' '}
            <span className="font-normal text-2xl text-[#000]">
              ({totalCount} items)
            </span>
          </h1>
        </div>

        <div className="mt-2 flex flex-col gap-4  text-[#000] md:text-[13px]">
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
            <span className="text-[16px] transition hover:text-[#333]">
              {collection.title}
            </span>
          </div>

          <div className='flex justify-between items-center'>
            <button
              type="button"
              aria-label="Filters"
              className="p-2 rounded bg-black text-white shadow-sm"
              onClick={() => setIsFilterOpen(true)}
            >
              <RiFilterFill size={18} aria-hidden />
            </button>
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
      </div>

      <div className="collection  2xl:px-[5rem] lg:px-[4rem] p-6">
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
        {/* <h1 className="mb-2 text-3xl font-medium">{collection.title}</h1>
        <p className="collection-description">{collection.description}</p> */}
        <PaginatedResourceSection<ProductItemFragment>
          connection={collection.products}
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
        <Analytics.CollectionView
          data={{
            collection: {
              id: collection.id,
              handle: collection.handle,
            },
          }}
        />
      </div>
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onClearAll={clearAllFilters}
        selectedCount={selectedFilterInputs.length}
        seeItemsCount={totalCount}
        sections={filterSections}
      />
    </>

  );
}

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
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
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
  }
` as const;

// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $filters: [ProductFilter!]
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image {
        id
        url
        altText
        width
        height
      }
      products(
        filters: $filters
        sortKey: $sortKey
        reverse: $reverse
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        filters {
          id
          label
          type
          values {
            id
            label
            count
            input
          }
        }
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
` as const;
