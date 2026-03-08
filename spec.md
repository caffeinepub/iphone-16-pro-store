# iPhone 16 Pro Store

## Current State
Single-product landing page for iPhone 16 Pro at ₹14,999. Has hero, gallery, specs, bank offers (3 bank discounts + EMI + exchange), transparency section, customer reviews, sticky mobile CTA, and Buy Now / Make an Offer modals. After Buy Now form is submitted, a success screen appears with no further action.

## Requested Changes (Diff)

### Add
- "More Phones" / related products section showing 3–4 additional refurbished phone listings (e.g. iPhone 15 Pro, iPhone 14 Pro, Samsung S24 Ultra, OnePlus 12) with price, condition badge, and a "Buy Now" CTA per card.
- Additional offers beyond the current 3 bank offers: add Axis Bank, Kotak Bank, Amazon Pay, and PhonePe wallet cashback offers; add a "Coupon Code" offer row (e.g. FIRST500 for ₹500 off); add a "Refer & Earn" blurb.
- WhatsApp redirect on order completion: after the Buy Now form is submitted and validated, instead of (or alongside) the success screen, automatically open WhatsApp (`https://wa.me/919671870287`) with a pre-filled message containing the customer's name, phone, address, and product details.

### Modify
- Buy Now success handler: after form submit, open WhatsApp link (`https://wa.me/919671870287?text=...`) with order details pre-filled in the message, then show the success screen.
- Offers section: expand bank offers list to include 5+ offers and add coupon/referral rows.

### Remove
- Nothing to remove.

## Implementation Plan
1. Add `MORE_PHONES` constant array with 4 phone listings (name, price, MRP, discount, condition, badge color).
2. Add "More Phones You'll Love" section after the Transparency section and before Reviews, rendering a horizontal scroll card grid on mobile and a 2-col/4-col grid on desktop. Each card has a "Buy Now" button linking back to the main product or showing a WhatsApp inquiry.
3. Expand `BANK_OFFERS` constant to include Axis Bank, Kotak Bank, Amazon Pay, PhonePe, and a coupon code row.
4. Add a coupon/promo row in the Offers section UI.
5. Update `handleBuySubmit` to construct a WhatsApp URL with the customer's name, phone, address, and product name/price, then call `window.open(whatsappUrl, '_blank')` before or alongside `setBuySuccess(true)`.
