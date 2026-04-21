const WISHLIST_KEY = 'wishlist_items';

export type WishlistItem = {
  id: string;
  title: string;
  handle?: string;
  image?: string | null;
  price?: string | null;
  variantId?: string | null;
};

const normalizeWishlist = (rawItems: unknown): WishlistItem[] => {
  if (!Array.isArray(rawItems)) return [];

  return rawItems
    .map((item) => {
      if (typeof item === 'string') {
        return {id: item, title: 'Product'};
      }

      if (item && typeof item === 'object' && 'id' in item) {
        const typed = item as WishlistItem;
        return {
          id: String(typed.id),
          title: typed.title || 'Product',
          handle: typed.handle,
          image: typed.image,
          price: typed.price,
          variantId: typed.variantId,
        };
      }

      return null;
    })
    .filter(Boolean) as WishlistItem[];
};

export const getWishlist = (): WishlistItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
    return normalizeWishlist(raw);
  } catch {
    return [];
  }
};

export const saveWishlist = (items: WishlistItem[]) => {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
};

const notify = () => {
  window.dispatchEvent(new Event('wishlistUpdated'));
};

export const addToWishlist = (item: WishlistItem) => {
  const shouldProceed = window.dispatchEvent(
    new CustomEvent('wishlist:add-attempt', {
      cancelable: true,
      detail: {productId: item.id},
    }),
  );

  if (!shouldProceed) return;

  const items = getWishlist();
  if (!items.some((entry) => entry.id === item.id)) {
    items.unshift(item);
    saveWishlist(items);
    notify();
  }
};

export const removeFromWishlist = (productId: string) => {
  const items = getWishlist().filter((item) => item.id !== productId);
  saveWishlist(items);
  notify();
};

export const isInWishlist = (productId: string) => {
  return getWishlist().some((item) => item.id === productId);
};