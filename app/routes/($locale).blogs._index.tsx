import {Link, useLoaderData} from 'react-router';
import type {Route} from './+types/blogs._index';
import blogMainBanner from '~/assets/blogMainBanner.jpg';
import blogOne from '~/assets/rakshaDetailBanner.jpg';
import blogTwo from '~/assets/VaralakshmiVrathamBanner.jpg';
import blogThree from '~/assets/teejBanner.jpg';
import {FaFacebookF, FaInstagram} from 'react-icons/fa';
import {FaXTwitter} from 'react-icons/fa6';

const FACEBOOK_URL =
  'https://www.facebook.com/people/Kalyan-Jewellers-USA/61568511923298/';
const INSTAGRAM_URL = 'https://www.instagram.com/kalyanjewellersusa/';
const TWITTER_URL = 'https://x.com/KalyaninUSA';

export const meta: Route.MetaFunction = () => {
  return [{title: ` Blogs`}];
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
  const [{blogs}] = await Promise.all([context.storefront.query(BLOGS_QUERY)]);
  return {featuredBlog: blogs.nodes[0] ?? null};
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  return {};
}

export default function Blogs() {
  const {featuredBlog} = useLoaderData<typeof loader>();
  const articles = featuredBlog?.articles?.nodes ?? [];
  const fallbackImages = [blogOne, blogTwo, blogThree];

  return (
    <div className="w-full bg-[#f5f5f5]">
      <div className="w-full">
        <img
          src={blogMainBanner}
          alt="Blogs"
          className="h-[270px] w-full object-cover md:h-[300px]"
        />
      </div>
      <div className="mx-auto max-w-[1100px] px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {articles.slice(0, 6).map((article, index) => {
            const imageUrl = article.image?.url || fallbackImages[index % fallbackImages.length];
            const articlePath = `/blogs/${article.blog.handle}/${article.handle}`;

            return (
              <Link key={article.id} to={articlePath} className="block transition-all duration-300 hover:rounded-md hover:shadow-2xl">
                <img
                  src={imageUrl}
                  alt={article.image?.altText || article.title}
                  className="h-[160px] w-full object-cover"
                />
                <p className="p-3 font-sans text-[20px] font-semibold text-black transition-all duration-300">
                  {article.title}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 flex items-center justify-center gap-3 text-sm text-black">
          <span>Share</span>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex p-2.5 items-center justify-center bg-[#bf1c47] text-white rounded-md"
            aria-label="Share on Facebook"
          >
            <FaFacebookF size={16} />
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex p-2.5 items-center justify-center bg-[#bf1c47] text-white rounded-md"
            aria-label="Share on Instagram"
          >
            <FaInstagram size={16} />
          </a>
          <a
            href={TWITTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex p-2.5 items-center justify-center bg-[#bf1c47] text-white rounded-md"
            aria-label="Share on X"
          >
            <FaXTwitter size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog
const BLOGS_QUERY = `#graphql
  query Blogs($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    blogs(first: 1) {
      nodes {
        title
        handle
        articles(first: 8, sortKey: PUBLISHED_AT, reverse: true) {
          nodes {
            id
            title
            handle
            blog {
              handle
            }
            image {
              url
              altText
            }
          }
        }
      }
    }
  }
` as const;
