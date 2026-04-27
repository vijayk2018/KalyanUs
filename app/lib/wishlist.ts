export type WishlistItem = {
  id: string;
  title: string;
  handle?: string;
  image?: string | null;
  price?: string | null;
  variantId?: string | null;
};

let wishlistCache: WishlistItem[] = [];
let loadingPromise: Promise<WishlistItem[]> | null = null;

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

const notify = () => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event('wishlistUpdated'));
};

const fetchWishlist = async (): Promise<WishlistItem[]> => {
  const response = await fetch('/api/wishlist', {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    return [];
  }

  const payload = (await response.json()) as {items?: unknown};
  return normalizeWishlist(payload.items ?? []);
};

const persistWishlist = async (operation: 'add' | 'remove', item: WishlistItem) => {
  const response = await fetch('/api/wishlist', {
    method: 'POST',
    credentials: 'include',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({operation, item}),
  });

  if (!response.ok) {
    throw new Error('Unable to update wishlist');
  }
};

export const loadWishlist = async () => {
  if (typeof window === 'undefined') return [];
  if (loadingPromise) return loadingPromise;

  // Always refresh from server so wishlist stays user-specific
  // across login/logout and account switches in the same tab.
  loadingPromise = fetchWishlist()
    .then((items) => {
      wishlistCache = items;
      notify();
      return wishlistCache;
    })
    .catch(() => {
      wishlistCache = [];
      notify();
      return wishlistCache;
    })
    .finally(() => {
      loadingPromise = null;
    });

  return loadingPromise;
};

export const getWishlist = (): WishlistItem[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  if (!loadingPromise && wishlistCache.length === 0) {
    void loadWishlist();
  }
  return wishlistCache;
};

export const clearWishlistCache = () => {
  wishlistCache = [];
  notify();
};

export const addToWishlist = (item: WishlistItem) => {
  if (typeof window === 'undefined') return;
  const shouldProceed = window.dispatchEvent(
    new CustomEvent('wishlist:add-attempt', {
      cancelable: true,
      detail: {productId: item.id},
    }),
  );

  if (!shouldProceed) return;

  const items = [...getWishlist()];
  if (!items.some((entry) => entry.id === item.id)) {
    wishlistCache = [item, ...items];
    notify();
    void persistWishlist('add', item).catch(() => {
      wishlistCache = items;
      notify();
    });
  }
};

export const removeFromWishlist = (productId: string) => {
  const previous = [...getWishlist()];
  const targetItem = previous.find((entry) => entry.id === productId);
  if (!targetItem) return;

  wishlistCache = previous.filter((item) => item.id !== productId);
  notify();

  void persistWishlist('remove', targetItem).catch(() => {
    wishlistCache = previous;
    notify();
  });
};

export const isInWishlist = (productId: string) => {
  return getWishlist().some((item) => item.id === productId);
};