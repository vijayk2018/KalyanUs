import React from 'react';
import {Link} from 'react-router';

type Category = {
  id: string;
  title: string;
  handle: string;
  image: {
    url: string;
    altText: string | null;
  } | null;
  products?: {
    nodes: Array<{
      featuredImage: {
        url: string;
        altText: string | null;
      } | null;
    }>;
  };
};

type ShopByCategoryProps = {
  categories: Category[];
};

const CATEGORY_ORDER = [
  'bridal',
  'rings',
  'pendants',
  'chains',
  'necklaces',
  'earrings',
  'bracelets',
  'mangalsutras',
] as const;

const CATEGORY_KEYWORDS: Record<(typeof CATEGORY_ORDER)[number], string[]> = {
  bridal: ['bridal'],
  rings: ['rings'],
  pendants: ['pendants', 'pendant'],
  chains: ['chains', 'chain'],
  necklaces: ['necklaces', 'necklace'],
  earrings: ['earrings', 'earring'],
  bracelets: ['bracelets', 'bracelet'],
  mangalsutras: ['mangalsutras', 'mangalsutra'],
};

const CATEGORY_HANDLE_PRIORITY: Record<(typeof CATEGORY_ORDER)[number], string[]> = {
  bridal: ['bridal'],
  rings: ['rings', 'ring', 'rings-in-jewelry'],
  pendants: ['pendants', 'pendant', 'pendants-in-jewelry'],
  chains: ['chains', 'chain'],
  necklaces: ['necklaces', 'necklace'],
  earrings: ['earrings', 'earring'],
  bracelets: ['bracelets', 'bracelet'],
  mangalsutras: ['mangalsutras', 'mangalsutra'],
};

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function hasWholeWord(value: string, keyword: string) {
  const pattern = new RegExp(`\\b${escapeRegex(keyword.toLowerCase())}\\b`);
  return pattern.test(normalize(value));
}

function compact(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function hasLooseMatch(value: string, keyword: string) {
  const compactValue = compact(value);
  const compactKeyword = compact(keyword);

  // Prevent "earrings" from being captured by "ring"/"rings" fallback.
  if (
    (compactKeyword === 'ring' || compactKeyword === 'rings') &&
    (compactValue.includes('earring') || compactValue.includes('earrings'))
  ) {
    return false;
  }

  return compactValue.includes(compactKeyword);
}

const ShopByCategory: React.FC<ShopByCategoryProps> = ({categories}) => {
  const usedIds = new Set<string>();
  const orderedCategories = CATEGORY_ORDER.map((slot) => {
    const handleCandidates = CATEGORY_HANDLE_PRIORITY[slot];

    const byHandle = categories.find((item) => {
      if (usedIds.has(item.id)) return false;
      const itemHandle = item.handle.toLowerCase();
      return handleCandidates.some(
        (candidate) =>
          itemHandle === candidate ||
          itemHandle.includes(candidate) ||
          candidate.includes(itemHandle),
      );
    });
    if (byHandle) {
      usedIds.add(byHandle.id);
      return byHandle;
    }

    const byTitle = categories.find((item) => {
      if (usedIds.has(item.id)) return false;
      return CATEGORY_KEYWORDS[slot].some((keyword) =>
        hasWholeWord(item.title, keyword),
      );
    });
    if (byTitle) {
      usedIds.add(byTitle.id);
      return byTitle;
    }

    const byLoose = categories.find((item) => {
      if (usedIds.has(item.id)) return false;
      return CATEGORY_KEYWORDS[slot].some(
        (keyword) =>
          hasLooseMatch(item.handle, keyword) || hasLooseMatch(item.title, keyword),
      );
    });
    if (byLoose) {
      usedIds.add(byLoose.id);
      return byLoose;
    }

    return null;
  });

  const renderCard = (key: string, item: Category | null) => {
    if (!item) {
      return <div key={key} className="invisible h-full w-full " />;
    }
    const imageUrl = item.image?.url ?? item.products?.nodes?.[0]?.featuredImage?.url;
    const imageAlt =
      item.image?.altText ??
      item.products?.nodes?.[0]?.featuredImage?.altText ??
      item.title;

    return (
      <Link
        key={key}
        to={`/collections/${item.handle}`}
        reloadDocument
        className="block overflow-hidden rounded-xl cursor-pointer"
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover rounded-xl"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full min-h-[220px] w-full items-center justify-center rounded-xl bg-gray-200 p-4 text-center font-serif">
            {item.title}
          </div>
        )}
      </Link>
    );
  };

  return (
    <div
      id="shop-by-category"
      className="w-full bg-[#f5f5f5] lg:py-16 2xl:px-[5rem] lg:px-[4rem] p-6"
    >
      {/* Heading */}
      <div className="flex flex-col items-center justify-center mb-12 text-center">
        {/* <h2 className="text-5xl font-serif mb-2">
            Shop By Category
        </h2> */}
        <p className="heading-font text-6xl">
  Shop By Category
</p>
        <p className="text-black-800 mt-4 max-w-2xl font-serif">
            Explore an array of beautiful jewelry designed to suit every style.
            Shop your favourite categories and find the perfect piece to make any moment special.
        </p>
      </div>

      {/* Grid Layout */}
      <div className=" mx-auto flex items-center justify-center gap-10">
        {/* LEFT (1) */}
        <div className="flex items-center w-[18%] lg:block hidden">
          {renderCard('bridal', orderedCategories[0])}
        </div>

        {/* CENTER (2–7) */}
        <div className="flex flex-col gap-2 lg:w-[56%] w-full">
          <div className="flex items-start gap-6">
            {orderedCategories.slice(1, 4).map((item, index) => (
              <div key={`top-${index}`} className="overflow-hidden">
                {renderCard(`top-card-${index}`, item)}
              </div>
            ))}
          </div>
          <div className="flex items-end gap-6">
            {orderedCategories.slice(4, 7).map((item, index) => (
              <div key={`bottom-${index}`} className="overflow-hidden">
                {renderCard(`bottom-card-${index}`, item)}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT (8) */}
        <div className="flex items-center w-[18%]  lg:block hidden">
          {renderCard('mangalsutras', orderedCategories[7])}
        </div>
      </div>

    </div>
  );
};

export default ShopByCategory;