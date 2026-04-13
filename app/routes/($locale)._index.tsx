import {Await, useLoaderData, Link} from 'react-router';
import type {Route} from './+types/_index';
import {Suspense, useMemo, useState} from 'react';
import {BiLeftArrow, BiRightArrow} from 'react-icons/bi';
import {Image} from '@shopify/hydrogen';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import {ProductItem} from '~/components/ProductItem';
import {FilterDrawer} from '~/components/FilterDrawer';
import {MockShopNotice} from '~/components/MockShopNotice';
import { Home } from 'lucide-react';
import HomePage from '~/components/HomePage';
import { RiFilterFill } from 'react-icons/ri';
import banner from '../assets/NimahBanner.jpg'

export const meta: Route.MetaFunction = () => {
  return [{title: ' Home'}];
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
async function loadCriticalData({context}: Route.LoaderArgs) {
  const [{collections}, targeted, ringFallback, {products}, {shop}] =
    await Promise.all([
    context.storefront.query(HOME_COLLECTIONS_QUERY),
    context.storefront.query(HOME_TARGETED_COLLECTIONS_QUERY),
    context.storefront.query(HOME_RING_FALLBACK_QUERY),
    context.storefront.query(HOME_MEDIA_QUERY),
    context.storefront.query(HOME_TEMPLATE_MEDIA_QUERY),
    // Add other queries here, so that they are loaded in parallel
    ]);
  const homeMedia = products.nodes
    .map((product: any) => product.featuredImage)
    .filter((image: any): image is NonNullable<typeof image> => Boolean(image));
  const asMediaImage = (mf: unknown) => {
    const ref = (mf as any)?.reference;
    return ref?.__typename === 'MediaImage' ? ref.image : null;
  };
  const templateMedia1 =
    asMediaImage(shop.media_1) ?? asMediaImage(shop.media1) ?? null;
  const templateMedia2 =
    asMediaImage(shop.media_2) ?? asMediaImage(shop.media2) ?? null;
  const templateMedia3 = shop.media_3?.value ?? shop.media3?.value ?? null;
  const templateMedia4 = shop.media_4?.value ?? shop.media4?.value ?? null;

  console.log('Featured collection:', shop);

  const targetedCollections = [
    targeted.bridal,
    targeted.rings,
    targeted.ring,
    targeted.ringsInJewelry,
    targeted.pendants,
    targeted.pendant,
    targeted.pendantsInJewelry,
    targeted.chains,
    targeted.chain,
    targeted.necklaces,
    targeted.necklace,
    targeted.earrings,
    targeted.earring,
    targeted.bracelets,
    targeted.bracelet,
    targeted.mangalsutras,
    targeted.mangalsutra,
    ...ringFallback.collections.nodes,
  ].filter(Boolean);

  const collectionsMap = new Map<string, any>();
  for (const collection of [...collections.nodes, ...targetedCollections]) {
    collectionsMap.set(collection.id, collection);
  }

  return {
    isShopLinked: Boolean(context.env.PUBLIC_STORE_DOMAIN),
    featuredCollection: collections.nodes[0],
    collections: Array.from(collectionsMap.values()),
    media1: templateMedia1 ?? homeMedia[0] ?? null,
    media2: templateMedia2 ?? homeMedia[1] ?? null,
    media3: templateMedia3,
    media4: templateMedia4,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error: Error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  console.log('Homepage loader data:', data);
  return (
    <div className="home">
      {data.isShopLinked ? null : <MockShopNotice />}
      <HomePage
        media1={data.media1}
        media2={data.media2}
        media3={data.media3}
        media4={data.media4}
        collections={data.collections}
      />
    </div>
  );
}

function FeaturedCollection({
  collection,
}: {
  collection: FeaturedCollectionFragment;
}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image
            data={image}
            sizes="100vw"
            alt={image.altText || collection.title}
          />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

function RecommendedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery | null>;
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <>
      <img src={banner} className='w-full h-full object-contained' alt='banner' />
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
              <Link to="/collections" className="transition hover:text-[#333] text-[16px]">
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
      {/* <div className="collection mt-[8rem] 2xl:px-[5rem] lg:px-[4rem]"></div> */}
      <section
        className="recommended-products  2xl:px-[5rem] lg:px-[4rem]"
        aria-labelledby="recommended-products"
      >
        <h2 id="recommended-products">Recommended Products</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={products}>
            {(response) => (
              <div className="recommended-products-grid">
                {response
                  ? response.products.nodes.map((product) => (
                      <ProductItem key={product.id} product={product} />
                    ))
                  : null}
              </div>
            )}
          </Await>
        </Suspense>
        <br />
      </section>
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onClearAll={() => {}}
        selectedCount={0}
        seeItemsCount={0}
        sections={[]}
        emptyMessage="Home page filter popup is enabled. Hook this to a filtered query for live filtering."
      />
    </>
  );
}

const HOME_COLLECTIONS_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
    products(first: 1) {
      nodes {
        featuredImage {
          url
          altText
        }
      }
    }
  }
  query HomeCollections($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 250, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const HOME_TARGETED_COLLECTIONS_QUERY = `#graphql
  fragment TargetedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
    products(first: 1) {
      nodes {
        featuredImage {
          url
          altText
        }
      }
    }
  }
  query HomeTargetedCollections($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    bridal: collection(handle: "bridal") {
      ...TargetedCollection
    }
    rings: collection(handle: "rings") {
      ...TargetedCollection
    }
    ring: collection(handle: "ring") {
      ...TargetedCollection
    }
    ringsInJewelry: collection(handle: "rings-in-jewelry") {
      ...TargetedCollection
    }
    pendants: collection(handle: "pendants") {
      ...TargetedCollection
    }
    pendant: collection(handle: "pendant") {
      ...TargetedCollection
    }
    pendantsInJewelry: collection(handle: "pendants-in-jewelry") {
      ...TargetedCollection
    }
    chains: collection(handle: "chains") {
      ...TargetedCollection
    }
    chain: collection(handle: "chain") {
      ...TargetedCollection
    }
    necklaces: collection(handle: "necklaces") {
      ...TargetedCollection
    }
    necklace: collection(handle: "necklace") {
      ...TargetedCollection
    }
    earrings: collection(handle: "earrings") {
      ...TargetedCollection
    }
    earring: collection(handle: "earring") {
      ...TargetedCollection
    }
    bracelets: collection(handle: "bracelets") {
      ...TargetedCollection
    }
    bracelet: collection(handle: "bracelet") {
      ...TargetedCollection
    }
    mangalsutras: collection(handle: "mangalsutras") {
      ...TargetedCollection
    }
    mangalsutra: collection(handle: "mangalsutra") {
      ...TargetedCollection
    }
  }
` as const;

const HOME_RING_FALLBACK_QUERY = `#graphql
  fragment RingFallbackCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
    products(first: 1) {
      nodes {
        featuredImage {
          url
          altText
        }
      }
    }
  }
  query HomeRingFallback($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 10, query: "title:rings") {
      nodes {
        ...RingFallbackCollection
      }
    }
  }
` as const;

const HOME_MEDIA_QUERY = `#graphql
  query HomeMedia($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 10, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        id
        featuredImage {
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

const HOME_TEMPLATE_MEDIA_QUERY = `#graphql
  query HomeTemplateMedia($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    shop {
      media_1: metafield(namespace: "custom", key: "media_1") {
        reference {
          __typename
          ... on MediaImage {
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
      media_2: metafield(namespace: "custom", key: "media_2") {
        reference {
          __typename
          ... on MediaImage {
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
      media1: metafield(namespace: "custom", key: "media1") {
        reference {
          __typename
          ... on MediaImage {
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
      media2: metafield(namespace: "custom", key: "media2") {
        value
        reference {
          __typename
          ... on MediaImage {
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
      media_3: metafield(namespace: "custom", key: "media_3") {
        value
      }
      media_4: metafield(namespace: "custom", key: "media_4") {
        value
      }
      media3: metafield(namespace: "custom", key: "media3") {
        value
      }
      media4: metafield(namespace: "custom", key: "media4") {
        value
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
