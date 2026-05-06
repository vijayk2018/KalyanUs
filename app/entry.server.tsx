import {ServerRouter} from 'react-router';
import {isbot} from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {
  createContentSecurityPolicy,
  type HydrogenRouterContextProvider,
} from '@shopify/hydrogen';
import type {EntryContext} from 'react-router';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  reactRouterContext: EntryContext,
  context: HydrogenRouterContextProvider,
) {
  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    shop: {
      checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
      storeDomain: context.env.PUBLIC_STORE_DOMAIN,
    },
    defaultSrc: ["'self'", 'https://*.saleassist.ai', 'https://cdn.shopify.com'],
    scriptSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'https://static.saleassist.ai',
      'https://*.saleassist.ai',
      'https://cdn.socket.io',
      'https://cdnjs.cloudflare.com',
      'https://cdn.jsdelivr.net',
    ],
    connectSrc: [
      "'self'",
      'https://static.saleassist.ai',
      'https://*.saleassist.ai',
      'wss://*.saleassist.ai',
      'https://cdn.socket.io',
    ],
    styleSrc: ["'self'", 'https://fonts.googleapis.com'],
    fontSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'https://fonts.gstatic.com',
      'https://static.saleassist.ai',
      'https://*.saleassist.ai',
      'data:',
    ],
    imgSrc: [
      "'self'",
      'data:',
      'blob:',
      'https://cdn.shopify.com',
      'https://*.saleassist.ai',
      'https://*.twitch.tv',
      'https://i.ytimg.com',
    ],
    mediaSrc: [
      "'self'",
      'blob:',
      'https://*.saleassist.ai',
      'https://*.twitch.tv',
    ],
    frameSrc: [
      'https://www.youtube.com',
      'https://www.youtube-nocookie.com',
      'https://*.saleassist.ai',
      'https://*.twitch.tv',
    ],
  });

  const body = await renderToReadableStream(
    <NonceProvider>
      <ServerRouter
        context={reactRouterContext}
        url={request.url}
        nonce={nonce}
      />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
