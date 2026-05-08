import type {WishlistItem} from '~/lib/wishlist';

const WISHLIST_SESSION_KEY_PREFIX = 'wishlist:';
const WISHLIST_NAMESPACE = 'custom';
const WISHLIST_KEY = 'wishlist';
const WISHLIST_COUNT_KEY = 'wishlist_count';
const PRODUCT_GID_PREFIX = 'gid://shopify/Product/';

const CUSTOMER_ID_QUERY = `
  query WishlistCustomerId {
    customer {
      id
    }
  }
` as const;

const ADMIN_GET_CUSTOMER_WISHLIST = `#graphql
  query AdminGetCustomerWishlist($id: ID!) {
    customer(id: $id) {
      id
      wishlist: metafield(namespace: "${WISHLIST_NAMESPACE}", key: "${WISHLIST_KEY}") {
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

const WISHLIST_PRODUCTS_QUERY = `#graphql
  query WishlistProducts($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        id
        title
        handle
        featuredImage {
          url
        }
        priceRange {
          minVariantPrice {
            amount
          }
        }
      }
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

const normalizeProductIds = (rawItems: unknown): string[] => {
  if (!Array.isArray(rawItems)) return [];

  return rawItems
    .map((item) => {
      if (typeof item === 'string') {
        return item.startsWith(PRODUCT_GID_PREFIX) ? item : null;
      }

      if (item && typeof item === 'object' && 'id' in item) {
        const productId = String((item as {id?: string}).id ?? '');
        return productId.startsWith(PRODUCT_GID_PREFIX) ? productId : null;
      }

      return null;
    })
    .filter((id): id is string => Boolean(id));
};

const getWishlistSessionKey = async (context: any) => {
  const isLoggedIn = await context.customerAccount.isLoggedIn();
  if (!isLoggedIn) return null;

  const {data} = await context.customerAccount.query(CUSTOMER_ID_QUERY);
  const customerId = data?.customer?.id;
  if (!customerId) return null;

  return `${WISHLIST_SESSION_KEY_PREFIX}${customerId}`;
};

const readWishlistFromCustomerMetafield = async (
  context: any,
  customerId: string,
): Promise<string[] | null> => {
  if (!context.admin?.graphql) return null;

  const response = await context.admin.graphql(ADMIN_GET_CUSTOMER_WISHLIST, {
    variables: {id: customerId},
  });
  const payload = await response.json();
  const rawWishlist = payload?.data?.customer?.wishlist?.value;

  if (!rawWishlist) return [];

  try {
    return normalizeProductIds(JSON.parse(rawWishlist));
  } catch {
    return [];
  }
};

const writeWishlistToCustomerMetafield = async (
  context: any,
  customerId: string,
  productIds: string[],
) => {
  if (!context.admin?.graphql) return false;

  const response = await context.admin.graphql(ADMIN_SET_CUSTOMER_WISHLIST, {
    variables: {
      metafields: [
        {
          ownerId: customerId,
          namespace: WISHLIST_NAMESPACE,
          key: WISHLIST_KEY,
          type: 'list.product_reference',
          value: JSON.stringify(productIds),
        },
        {
          ownerId: customerId,
          namespace: WISHLIST_NAMESPACE,
          key: WISHLIST_COUNT_KEY,
          type: 'number_integer',
          value: String(productIds.length),
        },
      ],
    },
  });

  const payload = await response.json();
  const userErrors = payload?.data?.metafieldsSet?.userErrors ?? [];
  return userErrors.length === 0;
};

const hydrateWishlistItems = async (
  context: any,
  productIds: string[],
): Promise<WishlistItem[]> => {
  if (!productIds.length) return [];
  if (!context.storefront?.query) {
    return productIds.map((id) => ({id, title: 'Product'}));
  }

  const data = await context.storefront.query(WISHLIST_PRODUCTS_QUERY, {
    variables: {ids: productIds},
  });

  const nodes = Array.isArray(data?.nodes) ? data.nodes : [];
  const productsById = new Map(
    nodes
      .filter(Boolean)
      .map((product: any) => [
        product.id,
        {
          id: product.id,
          title: product.title || 'Product',
          handle: product.handle,
          image: product.featuredImage?.url ?? null,
          price: product.priceRange?.minVariantPrice?.amount ?? null,
        } satisfies WishlistItem,
      ]),
  );

  return productIds.map((id) => productsById.get(id) ?? {id, title: 'Product'});
};

export async function loader({context}: {context: any}) {
  const sessionKey = await getWishlistSessionKey(context);

  if (!sessionKey) {
    return Response.json({items: [], count: 0}, {status: 401});
  }

  const customerId = sessionKey.slice(WISHLIST_SESSION_KEY_PREFIX.length);
  const metafieldProductIds = await readWishlistFromCustomerMetafield(context, customerId);
  const sessionItems = normalizeWishlist(context.session.get(sessionKey) || []);
  const productIds = metafieldProductIds ?? sessionItems.map((item) => item.id);
  const items = await hydrateWishlistItems(context, productIds);

  context.session.set(sessionKey, items);

  return Response.json(
    {items, count: items.length},
    {
      headers: {
        'Set-Cookie': await context.session.commit(),
      },
    },
  );
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

  const customerId = sessionKey.slice(WISHLIST_SESSION_KEY_PREFIX.length);
  const metafieldProductIds = await readWishlistFromCustomerMetafield(context, customerId);
  const sessionItems = normalizeWishlist(context.session.get(sessionKey) || []);
  const currentProductIds = metafieldProductIds ?? sessionItems.map((entry) => entry.id);
  let nextProductIds = currentProductIds;

  if (operation === 'add') {
    if (item.id.startsWith(PRODUCT_GID_PREFIX) && !currentProductIds.includes(item.id)) {
      nextProductIds = [item.id, ...currentProductIds];
    }
  } else if (operation === 'remove') {
    nextProductIds = currentProductIds.filter((productId) => productId !== item.id);
  }

  const hydratedItems = await hydrateWishlistItems(context, nextProductIds);
  context.session.set(sessionKey, hydratedItems);

  const didPersistToMetafield = await writeWishlistToCustomerMetafield(
    context,
    customerId,
    nextProductIds,
  );

  return Response.json(
    {
      ok: true,
      items: hydratedItems,
      count: hydratedItems.length,
      persisted: didPersistToMetafield ? 'metafield' : 'session',
    },
    {
      headers: {
        'Set-Cookie': await context.session.commit(),
      },
    },
  );
}
