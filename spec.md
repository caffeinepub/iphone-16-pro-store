# RefurbishedHub Mobile Store

## Current State
A multi-product refurbished phone store with 51+ products (iPhones, Samsung, OnePlus, Google Pixel, Xiaomi, etc.). Products are shown in a horizontal-scroll carousel with no images. No search, filter, or sort capability. No "used duration" badge. Single-product hero section for iPhone 16 Pro.

## Requested Changes (Diff)

### Add
- Product images for every phone card (brand-mapped: iPhone → phone-iphone image, Samsung → phone-samsung, OnePlus → phone-oneplus, Google Pixel → phone-pixel, all others → phone-android)
- "Used: 1-2 Days" badge on every product card and the hero section
- Flipkart-like features:
  - Search bar to filter phones by name
  - Category filter tabs: All, iPhone, Samsung, OnePlus, Google, Others
  - Sort dropdown: Price Low→High, High→Low, Discount %, Newest
  - Product grid (2 columns mobile, 3-4 columns desktop) replacing horizontal scroll
  - Wishlist (heart) icon per card
  - "Add to Cart" button per card with cart count in header
  - Delivery estimate badge: "Free Delivery by Tomorrow" on each card
  - "X left in stock" urgency text on some cards
  - Filter sidebar/drawer on mobile: price range, brand, condition

### Modify
- More Phones section: change from horizontal scroll to full product grid with images, search, filters
- Hero section: add "Used: 1-2 Days Only" badge
- Header: update cart count dynamically

### Remove
- Horizontal scroll product layout for the main catalog

## Implementation Plan
1. Add BRAND_IMAGE map to route each product to correct image path
2. Add useDays field or compute "Used: 1-2 Days" for all products
3. Add cart state (array of product IDs), wishlist state
4. Add search state + filter state (brand tab, sort, price range)
5. Replace the More Phones horizontal scroll with a full-width product grid section with search bar, category tabs, sort dropdown
6. Each product card: image on top, badges (discount %, used days, battery), name, variant, price, MRP, ratings, delivery info, Add to Cart + Wishlist buttons
7. Cart drawer/modal showing added items
8. Update header cart icon badge with live count
