import {Link, useSearchParams} from 'react-router';
import {Image, Money, Pagination} from '@shopify/hydrogen';
import {urlWithTrackingParams, type RegularSearchReturn} from '~/lib/search';
import { ProductItem } from './ProductItem';
import { PaginatedResourceSection } from './PaginatedResourceSection';
import {FilterDrawer} from './FilterDrawer';
import type { CollectionItemFragment } from 'storefrontapi.generated';
import { RiFilterFill } from 'react-icons/ri';
import {useMemo, useState} from 'react';

const SORT_OPTIONS = [
  {label: 'Relevance', value: 'relevance'},
  {label: "What's new", value: 'whats-new'},
  {label: 'Price - Low To High', value: 'price-asc'},
  {label: 'Price - High To Low', value: 'price-desc'},
] as const;

type SearchItems = RegularSearchReturn['result']['items'];
type PartialSearchResult<ItemType extends keyof SearchItems> = Pick<
  SearchItems,
  ItemType
> &
  Pick<RegularSearchReturn, 'term'>;

type SearchResultsProps = RegularSearchReturn & {
  children: (args: SearchItems & {term: string}) => React.ReactNode;
};

export function SearchResults({
  term,
  result,
  children,
}: Omit<SearchResultsProps, 'error' | 'type'>) {
  if (!result?.total) {
    return null;
  }

  return children({...result.items, term});
}

SearchResults.Articles = SearchResultsArticles;
SearchResults.Pages = SearchResultsPages;
SearchResults.Products = SearchResultsProducts;
SearchResults.Empty = SearchResultsEmpty;

function SearchResultsArticles({
  term,
  articles,
}: PartialSearchResult<'articles'>) {
  if (!articles?.nodes.length) {
    return null;
  }

  return (
    <div className="search-result">
      <h2>Articles</h2>
      <div>
        {articles?.nodes?.map((article) => {
          const articleUrl = urlWithTrackingParams({
            baseUrl: `/blogs/${article.handle}`,
            trackingParams: article.trackingParameters,
            term,
          });

          return (
            <div className="search-results-item" key={article.id}>
              <Link prefetch="intent" to={articleUrl}>
                {article.title}
              </Link>
            </div>
          );
        })}
      </div>
      <br />
    </div>
  );
}

function SearchResultsPages({term, pages}: PartialSearchResult<'pages'>) {
  if (!pages?.nodes.length) {
    return null;
  }

  return (
    <div className="search-result">
      <h2>Pages</h2>
      <div>
        {pages?.nodes?.map((page) => {
          const pageUrl = urlWithTrackingParams({
            baseUrl: `/pages/${page.handle}`,
            trackingParams: page.trackingParameters,
            term,
          });

          return (
            <div className="search-results-item" key={page.id}>
              <Link prefetch="intent" to={pageUrl}>
                {page.title}
              </Link>
            </div>
          );
        })}
      </div>
      <br />
    </div>
  );
}

// function SearchResultsProducts({
//   term,
//   products,
// }: PartialSearchResult<'products'>) {
//   if (!products?.nodes.length) {
//     return null;
//   }

//   return (
//     <div className="search-result">
//       <h2>Products</h2>
//       <Pagination connection={products}>
//         {({nodes, isLoading, NextLink, PreviousLink}) => {
//           const ItemsMarkup = nodes.map((product) => {
//             const productUrl = urlWithTrackingParams({
//               baseUrl: `/products/${product.handle}`,
//               trackingParams: product.trackingParameters,
//               term,
//             });

//             const price = product?.selectedOrFirstAvailableVariant?.price;
//             const image = product?.selectedOrFirstAvailableVariant?.image;

//             return (
//               <div className="search-results-item" key={product.id}>
//                 <Link prefetch="intent" to={productUrl}>
//                   {image && (
//                     <Image data={image} alt={product.title} width={50} />
//                   )}
//                   <div>
//                     <p>{product.title}</p>
//                     <small>{price && <Money data={price} />}</small>
//                   </div>
//                 </Link>
//               </div>
//             );
//           });

//           return (
//             <div>
//               <div>
//                 <PreviousLink>
//                   {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
//                 </PreviousLink>
//               </div>
//               <div>
//                 {ItemsMarkup}
//                 <br />
//               </div>
//               <div>
//                 <NextLink>
//                   {isLoading ? 'Loading...' : <span>Load more ↓</span>}
//                 </NextLink>
//               </div>
//             </div>
//           );
//         }}
//       </Pagination>
//       <br />
//     </div>
//   );
// }

function SearchResultsProducts({
  term,
  products,
}: PartialSearchResult<'products'>) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedFilterInputs = searchParams.getAll('filter');
  const selectedSort = searchParams.get('sort') ?? 'relevance';
  const availableFilters =
    (products as unknown as {productFilters?: Array<any>}).productFilters ?? [];
  const selectedSortLabel =
    SORT_OPTIONS.find((option) => option.value === selectedSort)?.label ?? 'Relevance';

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

  const onSortSelect = (value: string) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('sort', value);
    nextParams.delete('cursor');
    setSearchParams(nextParams);
    setIsSortOpen(false);
  };

  const filterSections = useMemo(
    () =>
      availableFilters.map((filter) => ({
        id: filter.id,
        label: filter.label,
        values: (filter.values ?? []).map((value: any) => ({
          id: value.id,
          label: value.label,
          count: value.count,
          checked: selectedFilterInputs.includes(value.input),
          onToggle: () => toggleFilter(value.input),
        })),
      })),
    [availableFilters, selectedFilterInputs],
  );

  if (!products?.nodes.length) {
    return null;
  }

  return (
    <>
      
      {/* Header (like collection page) */}
      <div className="mt-2 flex items-center justify-between gap-4 2xl:px-[5rem] lg:px-[4rem] p-6 text-[#000] md:text-[13px]">
        <div className="flex flex-wrap items-center gap-1">
          <Link to="/" className="transition hover:text-[#333] text-[#ccc] text-[16px]">
            Home
          </Link>
          <span aria-hidden className='text-[#ccc]'>|</span>
          <div
            className="transition hover:text-[#333] text-[16px]"
          >
            Search results for:
          </div>
          <span className="text-[16px] transition hover:text-[#333]">
            "{term}"
          </span>
        </div> 
      </div>

      <div className="2xl:px-[5rem] lg:px-[4rem]">
        <h1 className="text-4xl text-[#000]">
          Search Results for: "{term}"{' '}
        </h1>
      </div>

      <div className='bg-[#f8f7f1] flex flex-col py-8 p-6 2xl:px-[5rem] lg:px-[4rem] lg:block hidden my-5'>
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
            
            <span className="font-normal text-3xl text-[#000]">
              ({products.nodes.length} items)
            </span>
          </h1>
        </div> 
        <div className="flex items-center gap-2 mt-3">
          <span className="text-[#000] text-lg">Sort By:</span>
          <div className="relative inline-block">
            <button
              type="button"
              className="rounded bg-transparent text-[#a30014] text-lg"
              onClick={() => setIsSortOpen((prev) => !prev)}
            >
              {selectedSortLabel}
            </button>
            {isSortOpen ? (
              <div className="absolute left-0 top-9 z-20 w-64 rounded-2xl bg-white p-3 shadow-lg">
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
      <div className='bg-[#f8f7f1] flex flex-col py-8 2xl:px-[5rem] lg:px-[4rem] p-6 lg:hidden my-5'>
        <div className="flex items-center gap-3">
          
          <h1 className="text-3xl font-normal text-[#999]">
            
            <span className="font-normal text-2xl text-[#000]">
              ({products.nodes.length} items)
            </span>
          </h1>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-[#000] text-lg">Sort By:</span>
          <div className="relative inline-block">
            <button
              type="button"
              className="rounded bg-transparent text-[#a30014] text-lg"
              onClick={() => setIsSortOpen((prev) => !prev)}
            >
              {selectedSortLabel}
            </button>
            {isSortOpen ? (
              <div className="absolute left-0 top-9 z-20 w-64 rounded-2xl bg-white p-3 shadow-lg">
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
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onClearAll={clearAllFilters}
        selectedCount={selectedFilterInputs.length}
        seeItemsCount={products.nodes.length}
        sections={filterSections}
        emptyMessage="No product filters found for this search."
      />
      

      {/* Grid Layout */}
      <div className="collection mt-[3rem] 2xl:px-[5rem] lg:px-[4rem] p-6">
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

function SearchResultsEmpty() {
  return <p>No results, try a different search.</p>;
}
