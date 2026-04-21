import {useLoaderData} from 'react-router';
import type {Route} from './+types/blogs.$blogHandle.$articleHandle';
import {Image} from '@shopify/hydrogen';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import blogMainBanner from '~/assets/blogMainBanner.jpg';
import {FaFacebookF, FaInstagram} from 'react-icons/fa';
import {FaXTwitter} from 'react-icons/fa6';

const FACEBOOK_URL =
  'https://www.facebook.com/people/Kalyan-Jewellers-USA/61568511923298/';
const INSTAGRAM_URL = 'https://www.instagram.com/kalyanjewellersusa/';
const TWITTER_URL = 'https://x.com/KalyaninUSA';

export const meta: Route.MetaFunction = ({data}) => {
  return [{title: ` ${data?.article.title ?? ''} article`}];
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
async function loadCriticalData({context, request, params}: Route.LoaderArgs) {
  const {blogHandle, articleHandle} = params;

  if (!articleHandle || !blogHandle) {
    throw new Response('Not found', {status: 404});
  }

  const [{blog}] = await Promise.all([
    context.storefront.query(ARTICLE_QUERY, {
      variables: {blogHandle, articleHandle},
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!blog?.articleByHandle) {
    throw new Response(null, {status: 404});
  }

  redirectIfHandleIsLocalized(
    request,
    {
      handle: articleHandle,
      data: blog.articleByHandle,
    },
    {
      handle: blogHandle,
      data: blog,
    },
  );

  const article = blog.articleByHandle;

  return {article};
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  return {};
}

export default function Article() {
  const {article} = useLoaderData<typeof loader>();
  const {title, image, contentHtml} = article;

  return (
    <div className="w-full bg-[#f5f5f5]">
      <img
        src={blogMainBanner}
        alt="Blogs"
        className="h-[270px] w-full object-cover md:h-[360px]"
      />

      <div className="2xl:px-[5rem] lg:px-[4rem] py-[5rem] max-w-7xl mx-auto">
        {image ? (
          <div className="w-full overflow-hidden">
            <Image
              data={image}
              
              loading="eager"
              className=""
            />
          </div>
        ) : null}

        <h1 className="mx-auto  max-w-7xl pt-6 font-sans text-3xl font-semibold uppercase text-[#1f1f1f]">
          {title}
        </h1>

        <div
          dangerouslySetInnerHTML={{__html: contentHtml}}
          className="prose prose-lg mx-auto mt-6 max-w-7xl font-sans leading-8 text-[#3b3b3b]"
        />

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

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog#field-blog-articlebyhandle
const ARTICLE_QUERY = `#graphql
  query Article(
    $articleHandle: String!
    $blogHandle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    blog(handle: $blogHandle) {
      handle
      articleByHandle(handle: $articleHandle) {
        handle
        title
        contentHtml
        publishedAt
        author: authorV2 {
          name
        }
        image {
          id
          altText
          url
          width
          height
        }
        seo {
          description
          title
        }
      }
    }
  }
` as const;
