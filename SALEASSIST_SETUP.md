# SaleAssist Vidsell — Hydrogen Integration Guide (Path A)

## What this does

- Merchant pastes the SaleAssist **widget ID** on any product in Shopify Admin
- Hydrogen fetches it via the Storefront API (metafield)
- A **"Live Demo" button** appears on that product's PDP
- On mobile, it also appears as a **sticky footer button**
- Clicking it launches the SaleAssist Vidsell video session

Products without a widget ID show no button — no broken UI.

---

## Files

| File | Where to put it |
|---|---|
| `SaleAssistButton.jsx` | `app/components/SaleAssistButton.jsx` |
| `products.$handle.jsx` | `app/routes/products.$handle.jsx` |
| `saleassist.css` | `app/styles/saleassist.css` |

---

## Step 1 — Create the metafield definition in Shopify Admin

1. Go to **Shopify Admin → Settings → Custom data**
2. Click **Products → Add definition**
3. Fill in:
   - **Name:** SaleAssist Widget ID
   - **Namespace and key:** `custom.saleassist_widget_id`
   - **Type:** Single line text
4. Click **Save**

---

## Step 2 — Copy files into your Hydrogen project

```
cp SaleAssistButton.jsx  your-hydrogen-app/app/components/
cp products.$handle.jsx  your-hydrogen-app/app/routes/
cp saleassist.css        your-hydrogen-app/app/styles/
```

---

## Step 3 — Import the CSS in root.jsx

Open `app/root.jsx` and add:

```js
import '~/styles/saleassist.css';
```

---

## Step 4 — Set widget IDs on products

For each product that should have a Live Demo button:

1. Open the product in **Shopify Admin → Products**
2. Scroll to the **Metafields** section at the bottom
3. Paste your SaleAssist widget ID into **SaleAssist Widget ID**
   Example: `6a332aee-f9a2-4163-9fc2-a37720137da4`
4. Click **Save**

> Your widget ID comes from the SaleAssist dashboard.
> The one in the integration doc is: 6a332aee-f9a2-4163-9fc2-a37720137da4

---

## Step 5 — Test locally

```bash
npm run dev
```

Visit a product that has the widget ID set. You should see:
- "Live Demo" button in the CTA row (desktop + mobile)
- Sticky footer button on mobile (≤768px viewport)

Clicking either button opens the SaleAssist Vidsell session.

---

## How the widget ID is loaded

```
Shopify Admin
  └── Merchant sets custom.saleassist_widget_id on product
        └── Hydrogen loader queries Storefront API (GraphQL)
              └── saleAssistWidgetId.value passed to <SaleAssistButton>
                    └── SaleAssist script loaded once, widget mounted
                          └── Customer clicks → Vidsell session opens
```

---

## Customising the button label or style

In `products.$handle.jsx`, change the `label` prop:

```jsx
<SaleAssistButton widgetId={widgetId} label="Talk to an Expert" />
```

Button colours live in `saleassist.css` — update `.saleassist-pdp-btn`
and `.saleassist-sticky-btn` to match your brand.

---

## Frequently asked questions

**Can I use the same widget ID on multiple products?**
Yes. One widget ID can be shared across all products or you can have
per-product IDs — SaleAssist handles routing on their end.

**Does this affect page load speed?**
No. The SaleAssist script (`widget.js`) is loaded asynchronously and
only once per page session. Products without a widget ID don't load it at all.

**What if the SaleAssist script fails to load?**
The component fails silently — the button simply won't appear.
Your add-to-cart and other CTAs are unaffected.

**Do I need to remove the old VideoCall.jsx files?**
Yes, the previous `VideoCall.jsx` and `api.video-room.js` are replaced
by `SaleAssistButton.jsx`. You can delete them.
