import type {WishlistItem} from '~/lib/wishlist';

const WISHLIST_SESSION_KEY_PREFIX = 'wishlist:';

const CUSTOMER_ID_QUERY = `#graphql
  query WishlistCustomerId {
    customer {
      id
    }
  }
` as const;

const normalizeWishlist = (rawItems: unknown): WishlistItem[] => {
  if (!Array.isArray(rawItems)) return [];

  return rawItems
    .map((item) => {
      if (!item || typeof item !== 'object' || !('id' in item)) {
        return null;
      }

      const typed = item as WishlistItem;
      return {
        id: String(typed.id),
        title: typed.title || 'Product',
        handle: typed.handle,
        image: typed.image,
        price: typed.price,
        variantId: typed.variantId,
      };
    })
    .filter(Boolean) as WishlistItem[];
};

const getWishlistSessionKey = async (context: any) => {
  const isLoggedIn = await context.customerAccount.isLoggedIn();
  if (!isLoggedIn) return null;

  const {data} = await context.customerAccount.query(CUSTOMER_ID_QUERY);
  const customerId = data?.customer?.id;
  if (!customerId) return null;

  return `${WISHLIST_SESSION_KEY_PREFIX}${customerId}`;
};

export async function loader({context}: {context: any}) {
  const sessionKey = await getWishlistSessionKey(context);

  if (!sessionKey) {
    return Response.json({items: []}, {status: 401});
  }

  const items = normalizeWishlist(context.session.get(sessionKey) || []);
  return Response.json({items});
}

export async function action({request, context}: {request: Request; context: any}) {
  const sessionKey = await getWishlistSessionKey(context);
  if (!sessionKey) {
    return Response.json({ok: false}, {status: 401});
  }

  let payload: {operation?: 'add' | 'remove'; item?: WishlistItem};
  try {
    payload = await request.json();
  } catch {
    return Response.json({ok: false}, {status: 400});
  }

  const operation = payload.operation;
  const item = payload.item;
  if (!operation || !item?.id) {
    return Response.json({ok: false}, {status: 400});
  }

  const items = normalizeWishlist(context.session.get(sessionKey) || []);
  let nextItems = items;

  if (operation === 'add') {
    if (!items.some((entry) => entry.id === item.id)) {
      nextItems = [item, ...items];
    }
  } else if (operation === 'remove') {
    nextItems = items.filter((entry) => entry.id !== item.id);
  }

  context.session.set(sessionKey, nextItems);

  return Response.json(
    {ok: true},
    {
      headers: {
        'Set-Cookie': await context.session.commit(),
      },
    },
  );
}
