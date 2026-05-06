import type {WishlistItem} from '~/lib/wishlist';

const WISHLIST_SESSION_KEY_PREFIX = 'wishlist:';
const WISHLIST_NAMESPACE = 'custom';
const WISHLIST_KEY = 'wishlist';
const WISHLIST_COUNT_KEY = 'wishlist_count';

const CUSTOMER_ID_QUERY = `
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

const ADMIN_GET_CUSTOMER_WISHLIST = `#graphql
  query AdminGetCustomerWishlist($id: ID!) {
    customer(id: $id) {
      id
      wishlist: metafield(namespace: "${WISHLIST_NAMESPACE}", key: "${WISHLIST_KEY}") {
        value
      }
      wishlistCount: metafield(namespace: "${WISHLIST_NAMESPACE}", key: "${WISHLIST_COUNT_KEY}") {
        value
      }
    }
  }
` as const;

const ADMIN_SET_CUSTOMER_WISHLIST = `#graphql
  mutation AdminSetCustomerWishlist($metafields: [MetafieldsSetInput!]!) {
    metafieldsSet(metafields: $metafields) {
      metafields {
        id
        key
      }
      userErrors {
        field
        message
      }
    }
  }
` as const;

const readWishlistFromCustomerMetafield = async (
  context: any,
  customerId: string,
): Promise<WishlistItem[] | null> => {
  if (!context.admin?.graphql) return null;

  const response = await context.admin.graphql(ADMIN_GET_CUSTOMER_WISHLIST, {
    variables: {id: customerId},
  });
  const payload = await response.json();
  const rawWishlist = payload?.data?.customer?.wishlist?.value;

  if (!rawWishlist) return [];

  try {
    return normalizeWishlist(JSON.parse(rawWishlist));
  } catch {
    return [];
  }
};

const writeWishlistToCustomerMetafield = async (
  context: any,
  customerId: string,
  items: WishlistItem[],
) => {
  if (!context.admin?.graphql) return false;

  const response = await context.admin.graphql(ADMIN_SET_CUSTOMER_WISHLIST, {
    variables: {
      metafields: [
        {
          ownerId: customerId,
          namespace: WISHLIST_NAMESPACE,
          key: WISHLIST_KEY,
          type: 'json',
          value: JSON.stringify(items),
        },
        {
          ownerId: customerId,
          namespace: WISHLIST_NAMESPACE,
          key: WISHLIST_COUNT_KEY,
          type: 'number_integer',
          value: String(items.length),
        },
      ],
    },
  });

  const payload = await response.json();
  const userErrors = payload?.data?.metafieldsSet?.userErrors ?? [];
  return userErrors.length === 0;
};

export async function loader({context}: {context: any}) {
  const sessionKey = await getWishlistSessionKey(context);

  if (!sessionKey) {
    return Response.json({items: []}, {status: 401});
  }

  const customerId = sessionKey.slice(WISHLIST_SESSION_KEY_PREFIX.length);
  const metafieldItems = await readWishlistFromCustomerMetafield(context, customerId);
  const items =
    metafieldItems ?? normalizeWishlist(context.session.get(sessionKey) || []);
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

  const customerId = sessionKey.slice(WISHLIST_SESSION_KEY_PREFIX.length);
  const didPersistToMetafield = await writeWishlistToCustomerMetafield(
    context,
    customerId,
    nextItems,
  );

  return Response.json(
    {ok: true, persisted: didPersistToMetafield ? 'metafield' : 'session'},
    {
      headers: {
        'Set-Cookie': await context.session.commit(),
      },
    },
  );
}
