# iPhone 16 Pro Resale Landing Page

## Current State
New project with no existing code.

## Requested Changes (Diff)

### Add
- Full single-product e-commerce landing page for a pre-owned iPhone 16 Pro priced at ₹14,999
- Hero section: bold headline, original vs. sale price with discount badge, sticky CTA bar
- Condition Gallery: multi-angle product images with zoom/lightbox functionality
- Key Specs section: battery health, storage, network status with icons
- Transparency section: cosmetic wear details and box contents
- Reviews section: star ratings, individual review cards, aggregate score
- Trust/Secure Purchase footer: payment badges, return policy, warranty info
- Sticky bottom CTA bar (mobile-first): "Buy Now" and "Make an Offer" buttons
- Offer modal: simple form for users to submit a custom price offer
- Backend: store and retrieve reviews, store offer submissions

### Modify
- Nothing (new project)

### Remove
- Nothing (new project)

## Implementation Plan
1. Backend canister: endpoints for getting/adding reviews, submitting offers
2. Generate product images (hero, multiple angles)
3. Frontend:
   - Sticky header with brand name and cart icon
   - Hero section with headline, price, discount badge, CTA buttons
   - Condition Gallery with 4–5 angle images and zoom lightbox
   - Key Specs grid (battery health 92%, 256GB storage, unlocked)
   - Transparency section (cosmetic notes + box contents)
   - Reviews section (aggregate stars + individual cards)
   - Secure Purchase footer (payment icons, return policy)
   - Sticky bottom bar on mobile with Buy Now / Make an Offer
   - Make an Offer modal with price input and submit
