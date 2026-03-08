import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  Award,
  Battery,
  Camera,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Cpu,
  CreditCard,
  Gift,
  HardDrive,
  Loader2,
  MessageCircle,
  Monitor,
  Package,
  Phone,
  RotateCcw,
  Shield,
  ShoppingCart,
  Star,
  Tag,
  ThumbsUp,
  Truck,
  Wallet,
  Wifi,
  X,
  ZoomIn,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import type { Review } from "./backend.d";
import {
  useAllReviews,
  useSubmitOffer,
  useSubmitReview,
} from "./hooks/useQueries";

/* ── Constants ─────────────────────────────────────────── */
const PRODUCT = {
  name: "iPhone 16 Pro",
  variant: "Natural Titanium · 256GB",
  salePrice: 14999,
  mrp: 134900,
  discount: 89,
  soldCount: 127,
};

const GALLERY_IMAGES = [
  {
    src: "/assets/generated/iphone16pro-hero.dim_1200x700.jpg",
    alt: "iPhone 16 Pro Hero Shot",
    id: "hero",
  },
  {
    src: "/assets/generated/iphone16pro-front.dim_800x1000.jpg",
    alt: "Front View",
    id: "front",
  },
  {
    src: "/assets/generated/iphone16pro-back.dim_800x1000.jpg",
    alt: "Rear View",
    id: "back",
  },
  {
    src: "/assets/generated/iphone16pro-side.dim_800x1000.jpg",
    alt: "Side Profile",
    id: "side",
  },
  {
    src: "/assets/generated/iphone16pro-inbox.dim_800x800.jpg",
    alt: "What's in the Box",
    id: "inbox",
  },
];

const GALLERY_OCIDS = [
  "gallery.item.1",
  "gallery.item.2",
  "gallery.item.3",
  "gallery.item.4",
  "gallery.item.5",
] as const;

const SPECS = [
  {
    icon: Battery,
    label: "Battery Health",
    value: "92%",
    color: "text-green-600",
  },
  {
    icon: HardDrive,
    label: "Storage",
    value: "256 GB",
    color: "text-blue-600",
  },
  { icon: Wifi, label: "Network", value: "Unlocked", color: "text-purple-600" },
  {
    icon: Monitor,
    label: "Display",
    value: '6.3" OLED',
    color: "text-cyan-600",
  },
  { icon: Cpu, label: "Chip", value: "A18 Pro", color: "text-orange-600" },
  {
    icon: Camera,
    label: "Camera",
    value: "48MP Triple",
    color: "text-rose-600",
  },
];

const SEED_REVIEWS = [
  {
    name: "Rajesh K.",
    rating: 5,
    comment:
      "Absolutely stunning phone! Battery is great and the screen is flawless. Best refurbished deal I've found.",
    date: "2 weeks ago",
    location: "Mumbai",
  },
  {
    name: "Priya M.",
    rating: 5,
    comment:
      "Came exactly as described. Feels brand new. Very happy with the purchase! Packaging was excellent.",
    date: "3 weeks ago",
    location: "Bangalore",
  },
  {
    name: "Arjun S.",
    rating: 4,
    comment:
      "Great deal! Minor scratch on back as mentioned but barely noticeable. Fast shipping too. Highly recommend.",
    date: "1 month ago",
    location: "Delhi",
  },
];

const RATING_BREAKDOWN = [
  { stars: 5, pct: 78 },
  { stars: 4, pct: 15 },
  { stars: 3, pct: 5 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 1 },
];

const BANK_OFFERS = [
  {
    bank: "HDFC Bank",
    offer: "10% off on HDFC Credit Cards, up to ₹1,500",
    icon: "credit",
  },
  {
    bank: "ICICI Bank",
    offer: "5% Cashback on ICICI Debit Cards, up to ₹750",
    icon: "credit",
  },
  {
    bank: "SBI Cards",
    offer: "No Cost EMI available on SBI Credit Cards",
    icon: "credit",
  },
  {
    bank: "Axis Bank",
    offer: "Flat ₹600 off on Axis Bank Buzz Credit Card",
    icon: "credit",
  },
  {
    bank: "Kotak Bank",
    offer: "7.5% off on Kotak Bank Credit Card, up to ₹1,000",
    icon: "credit",
  },
  {
    bank: "Amazon Pay",
    offer: "5% cashback with Amazon Pay ICICI Bank Card",
    icon: "wallet",
  },
  {
    bank: "PhonePe",
    offer: "Flat ₹200 cashback on PhonePe UPI payment (min ₹10,000)",
    icon: "wallet",
  },
];

const EXTRA_OFFERS = [
  {
    label: "Coupon Code",
    detail: "Use code FIRST500 for ₹500 off on your first order",
    icon: "tag",
  },
  {
    label: "Refer & Earn",
    detail: "Refer a friend and both get ₹300 off on next purchase",
    icon: "gift",
  },
];

const MORE_PHONES = [
  {
    id: "ip15pro",
    name: "iPhone 15 Pro",
    variant: "Blue Titanium · 128GB",
    price: 10999,
    mrp: 119900,
    discount: 91,
    condition: "Grade A",
    battery: "89%",
  },
  {
    id: "ip14pro",
    name: "iPhone 14 Pro",
    variant: "Deep Purple · 256GB",
    price: 8999,
    mrp: 109900,
    discount: 92,
    condition: "Grade A+",
    battery: "91%",
  },
  {
    id: "s24ultra",
    name: "Samsung S24 Ultra",
    variant: "Titanium Black · 256GB",
    price: 12999,
    mrp: 129999,
    discount: 90,
    condition: "Like New",
    battery: "94%",
  },
  {
    id: "op12",
    name: "OnePlus 12",
    variant: "Flowy Emerald · 256GB",
    price: 4999,
    mrp: 69999,
    discount: 93,
    condition: "Grade A",
    battery: "96%",
  },
];

/* ── Helpers ────────────────────────────────────────────── */
function formatPrice(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

function StarDisplay({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          className={
            s <= Math.round(rating)
              ? "star-filled fill-amber-400 text-amber-400"
              : "star-empty text-gray-300"
          }
        />
      ))}
    </span>
  );
}

function StarInput({
  value,
  onChange,
}: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="inline-flex gap-1" aria-label="Star rating">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          onMouseEnter={() => setHovered(s)}
          onMouseLeave={() => setHovered(0)}
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          aria-label={`${s} star`}
          aria-pressed={s <= value}
        >
          <Star
            size={24}
            className={
              s <= (hovered || value)
                ? "fill-amber-400 text-amber-400 transition-colors"
                : "text-gray-300 transition-colors"
            }
          />
        </button>
      ))}
    </div>
  );
}

/* ── Main App ───────────────────────────────────────────── */
export default function App() {
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const [offerOpen, setOfferOpen] = useState(false);
  const [buyOpen, setBuyOpen] = useState(false);
  const [offerSuccess, setOfferSuccess] = useState(false);
  const [buySuccess, setBuySuccess] = useState(false);

  // Offer form
  const [offerName, setOfferName] = useState("");
  const [offerContact, setOfferContact] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  // Buy form
  const [buyName, setBuyName] = useState("");
  const [buyPhone, setBuyPhone] = useState("");
  const [buyAddress, setBuyAddress] = useState("");

  // Review form
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");

  const { data: liveReviews = [] } = useAllReviews();
  const submitReview = useSubmitReview();
  const submitOffer = useSubmitOffer();

  const openLightbox = useCallback((idx: number) => {
    setLightboxIdx(idx);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const handleOfferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerName || !offerContact || !offerPrice) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      await submitOffer.mutateAsync({
        name: offerName,
        contact: offerContact,
        price: Number.parseInt(offerPrice),
      });
      setOfferSuccess(true);
    } catch {
      toast.error("Failed to submit offer. Please try again.");
    }
  };

  const handleBuySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyName || !buyPhone || !buyAddress) {
      toast.error("Please fill all fields");
      return;
    }
    const message = `Hello! I'd like to order:\n\nProduct: iPhone 16 Pro (Natural Titanium, 256GB)\nPrice: ₹14,999\n\nName: ${buyName}\nPhone: ${buyPhone}\nAddress: ${buyAddress}\n\nPlease confirm my order. Thank you!`;
    const whatsappUrl = `https://wa.me/919671870287?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    setBuySuccess(true);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment || reviewRating === 0) {
      toast.error("Please fill all fields and select a rating");
      return;
    }
    try {
      await submitReview.mutateAsync({
        name: reviewName,
        rating: reviewRating,
        comment: reviewComment,
      });
      setReviewName("");
      setReviewRating(0);
      setReviewComment("");
      toast.success("Thank you for your review!");
    } catch {
      toast.error("Failed to submit review. Please try again.");
    }
  };

  const prevGallery = useCallback(
    () =>
      setGalleryIdx(
        (i) => (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length,
      ),
    [],
  );
  const nextGallery = useCallback(
    () => setGalleryIdx((i) => (i + 1) % GALLERY_IMAGES.length),
    [],
  );
  const prevLightbox = useCallback(
    () =>
      setLightboxIdx(
        (i) => (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length,
      ),
    [],
  );
  const nextLightbox = useCallback(
    () => setLightboxIdx((i) => (i + 1) % GALLERY_IMAGES.length),
    [],
  );

  return (
    <div className="min-h-screen bg-background font-sans pb-24 md:pb-0">
      <Toaster position="top-center" />

      {/* ── Sticky Header ──────────────────────────────── */}
      <header
        data-ocid="header.section"
        className="sticky top-0 z-40 bg-white border-b border-border shadow-xs"
      >
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Package size={16} className="text-white" />
            </div>
            <span className="font-display font-bold text-lg text-foreground tracking-tight">
              RefurbishedHub
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a
              href="#gallery"
              className="hover:text-foreground transition-colors"
              data-ocid="header.link"
            >
              Gallery
            </a>
            <a
              href="#specs"
              className="hover:text-foreground transition-colors"
              data-ocid="header.link"
            >
              Specs
            </a>
            <a
              href="#reviews"
              className="hover:text-foreground transition-colors"
              data-ocid="header.link"
            >
              Reviews
            </a>
          </nav>
          <button
            type="button"
            className="relative p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Cart"
          >
            <ShoppingCart size={20} />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              1
            </span>
          </button>
        </div>
      </header>

      {/* ── Hero Section ───────────────────────────────── */}
      <section
        data-ocid="hero.section"
        className="bg-gradient-to-b from-slate-50 to-white"
      >
        <motion.div
          className="max-w-5xl mx-auto px-4 pt-6 pb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Breadcrumb */}
          <p className="text-xs text-muted-foreground mb-4">
            Home / Smartphones / iPhone 16 Pro
          </p>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Hero Image */}
            <div className="w-full md:w-1/2">
              <button
                type="button"
                className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-white shadow-card border border-border cursor-zoom-in focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => openLightbox(0)}
                onKeyDown={(e) => e.key === "Enter" && openLightbox(0)}
                aria-label="View hero image fullscreen"
              >
                <img
                  src="/assets/generated/iphone16pro-hero.dim_1200x700.jpg"
                  alt="iPhone 16 Pro Natural Titanium"
                  className="w-full h-full object-cover gallery-img"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <Badge className="bg-green-500 text-white font-bold text-xs border-0 shadow">
                    {PRODUCT.discount}% OFF
                  </Badge>
                  <Badge className="bg-amber-500 text-white font-bold text-xs border-0 shadow">
                    LIKE NEW
                  </Badge>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/40 text-white rounded-lg p-1.5">
                  <ZoomIn size={16} />
                </div>
              </button>
            </div>

            {/* Hero Info */}
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              <div>
                <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">
                  Certified Pre-Owned · Grade A Condition
                </p>
                <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground leading-tight">
                  Pristine iPhone 16 Pro –{" "}
                  <span className="text-primary">Like New Performance</span> at
                  a Used Price
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {PRODUCT.variant}
                </p>
              </div>

              {/* Rating bar */}
              <div className="flex items-center gap-2 flex-wrap">
                <StarDisplay rating={4.7} size={14} />
                <span className="text-sm font-semibold text-foreground">
                  4.7
                </span>
                <span className="text-xs text-muted-foreground">
                  (186 ratings)
                </span>
                <Badge
                  variant="outline"
                  className="text-xs border-green-500 text-green-600"
                >
                  ✓ In Stock
                </Badge>
                <span className="text-xs text-muted-foreground">
                  🔥 {PRODUCT.soldCount} sold this week
                </span>
              </div>

              {/* Price block */}
              <div className="bg-slate-50 rounded-xl p-4 border border-border">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-display font-black text-4xl text-foreground">
                    {formatPrice(PRODUCT.salePrice)}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(PRODUCT.mrp)}
                  </span>
                  <Badge className="bg-green-500/10 text-green-700 border border-green-200 text-sm font-bold">
                    {PRODUCT.discount}% OFF
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Inclusive of all taxes · Free delivery
                </p>
              </div>

              {/* CTAs */}
              <div className="flex gap-3 flex-wrap">
                <Button
                  data-ocid="hero.primary_button"
                  size="lg"
                  className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold text-base shadow-cta min-w-[140px]"
                  onClick={() => setBuyOpen(true)}
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Buy Now
                </Button>
                <Button
                  data-ocid="hero.secondary_button"
                  size="lg"
                  variant="outline"
                  className="flex-1 border-2 border-primary text-primary font-bold text-base hover:bg-primary/5 min-w-[140px]"
                  onClick={() => setOfferOpen(true)}
                >
                  <Tag size={18} className="mr-2" />
                  Make an Offer
                </Button>
              </div>

              {/* Trust row */}
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Shield size={12} className="text-green-600" /> Secure
                  Checkout
                </span>
                <span className="flex items-center gap-1">
                  <RotateCcw size={12} className="text-blue-600" /> 7-Day
                  Returns
                </span>
                <span className="flex items-center gap-1">
                  <Award size={12} className="text-amber-600" /> 1-Year Warranty
                </span>
                <span className="flex items-center gap-1">
                  <Truck size={12} className="text-purple-600" /> Free Delivery
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Condition Gallery ──────────────────────────── */}
      <section
        id="gallery"
        data-ocid="gallery.section"
        className="max-w-5xl mx-auto px-4 py-8"
      >
        <h2 className="font-display font-bold text-xl mb-4 text-foreground">
          Product Gallery
        </h2>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Main image */}
          <button
            type="button"
            className="relative flex-1 aspect-video rounded-xl overflow-hidden bg-white border border-border shadow-card cursor-zoom-in focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => openLightbox(galleryIdx)}
            onKeyDown={(e) => e.key === "Enter" && openLightbox(galleryIdx)}
            aria-label={`View ${GALLERY_IMAGES[galleryIdx].alt} fullscreen`}
          >
            <img
              src={GALLERY_IMAGES[galleryIdx].src}
              alt={GALLERY_IMAGES[galleryIdx].alt}
              className="w-full h-full object-contain gallery-img p-4"
            />
            <div className="absolute bottom-3 right-3 bg-black/40 text-white rounded-lg p-1.5">
              <ZoomIn size={14} />
            </div>
            {/* Nav arrows */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevGallery();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-card rounded-full p-1.5 border border-border focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Previous image"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextGallery();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-card rounded-full p-1.5 border border-border focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Next image"
            >
              <ChevronRight size={16} />
            </button>
          </button>

          {/* Thumbnails */}
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto">
            {GALLERY_IMAGES.map((img, i) => (
              <button
                type="button"
                key={img.id}
                data-ocid={GALLERY_OCIDS[i]}
                onClick={() => setGalleryIdx(i)}
                className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all focus-visible:ring-2 focus-visible:ring-ring ${
                  galleryIdx === i
                    ? "border-primary shadow-cta"
                    : "border-border hover:border-muted-foreground"
                }`}
                aria-label={img.alt}
                aria-pressed={galleryIdx === i}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Key Specs ──────────────────────────────────── */}
      <section
        id="specs"
        data-ocid="specs.section"
        className="bg-white border-y border-border py-8"
      >
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-display font-bold text-xl mb-6 text-foreground">
            Key Specifications
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {SPECS.map(({ icon: Icon, label, value, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.35 }}
                className="bg-slate-50 rounded-xl p-4 border border-border flex items-center gap-3 shadow-xs"
              >
                <div className={`p-2.5 rounded-lg bg-white shadow-xs ${color}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground leading-none mb-0.5">
                    {label}
                  </p>
                  <p className="font-display font-bold text-sm text-foreground">
                    {value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Discount & Offers ──────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="font-display font-bold text-xl mb-4 text-foreground">
          Offers & Bank Discounts
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {/* Bank offers */}
          <div className="bg-white rounded-xl border border-border shadow-xs p-4">
            <p className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
              <CreditCard size={16} className="text-primary" /> Bank Offers
            </p>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {BANK_OFFERS.map((o) => (
                <div
                  key={o.bank}
                  className="flex gap-2 text-sm items-start py-1 border-b border-border last:border-0"
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {o.icon === "wallet" ? (
                      <Wallet size={14} className="text-green-500" />
                    ) : (
                      <CreditCard size={14} className="text-blue-500" />
                    )}
                  </div>
                  <span>
                    <span className="font-semibold">{o.bank}:</span> {o.offer}
                  </span>
                </div>
              ))}
            </div>
            {/* Extra offers */}
            <div className="mt-3 space-y-2 border-t border-border pt-3">
              {EXTRA_OFFERS.map((o) => (
                <div key={o.label} className="flex gap-2 text-sm items-start">
                  <div className="mt-0.5 flex-shrink-0">
                    {o.icon === "gift" ? (
                      <Gift size={14} className="text-purple-500" />
                    ) : (
                      <Tag size={14} className="text-amber-500" />
                    )}
                  </div>
                  <span>
                    <span className="font-semibold">{o.label}:</span> {o.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* EMI & Exchange */}
          <div className="space-y-3">
            <div className="bg-white rounded-xl border border-border shadow-xs p-4">
              <p className="font-semibold text-sm text-foreground mb-1 flex items-center gap-2">
                <Tag size={16} className="text-amber-500" /> No Cost EMI
              </p>
              <p className="text-sm text-muted-foreground">
                Starting at{" "}
                <span className="font-bold text-foreground">₹1,250/month</span>{" "}
                for 12 months
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Available on select credit cards
              </p>
            </div>
            <div className="bg-white rounded-xl border border-border shadow-xs p-4">
              <p className="font-semibold text-sm text-foreground mb-1 flex items-center gap-2">
                <RotateCcw size={16} className="text-blue-500" /> Exchange Offer
              </p>
              <p className="text-sm text-muted-foreground">
                Get up to{" "}
                <span className="font-bold text-foreground">₹8,000 off</span> on
                exchange of your old phone
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 shadow-xs p-4">
              <p className="font-semibold text-sm text-foreground mb-1 flex items-center gap-2">
                <MessageCircle size={16} className="text-green-600" /> Order on
                WhatsApp
              </p>
              <p className="text-sm text-muted-foreground">
                Chat directly with us to get exclusive deals and faster order
                processing.
              </p>
              <button
                type="button"
                onClick={() =>
                  window.open(
                    "https://wa.me/919671870287?text=Hi!+I'm+interested+in+buying+iPhone+16+Pro+at+₹14,999.+Please+share+details.",
                    "_blank",
                  )
                }
                className="mt-2 flex items-center gap-2 text-xs font-bold text-green-700 hover:text-green-800 transition-colors"
              >
                <MessageCircle size={13} /> Chat Now on WhatsApp →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Transparency Section ───────────────────────── */}
      <section
        data-ocid="transparency.section"
        className="bg-slate-50 border-y border-border py-8"
      >
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-display font-bold text-xl mb-2 text-foreground">
            Full Transparency
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            We believe in being completely honest about the condition of our
            devices.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Cosmetic Condition */}
            <div className="bg-white rounded-xl border border-border shadow-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-amber-50 rounded-lg">
                  <Monitor size={18} className="text-amber-600" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base">
                    Cosmetic Condition
                  </h3>
                  <Badge className="bg-green-100 text-green-700 border-0 text-xs">
                    Grade A – Like New
                  </Badge>
                </div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <CheckCircle2
                    size={15}
                    className="text-green-500 mt-0.5 flex-shrink-0"
                  />
                  <span>
                    Screen: <strong>Pristine</strong> – zero scratches or marks
                  </span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2
                    size={15}
                    className="text-amber-500 mt-0.5 flex-shrink-0"
                  />
                  <span>
                    Back: Very minor hairline scratch on titanium (not visible
                    under normal use)
                  </span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2
                    size={15}
                    className="text-green-500 mt-0.5 flex-shrink-0"
                  />
                  <span>
                    Frame: <strong>Perfect</strong> – no dents or bends
                  </span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2
                    size={15}
                    className="text-green-500 mt-0.5 flex-shrink-0"
                  />
                  <span>
                    Buttons: <strong>Fully functional</strong> – Action Button
                    working
                  </span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2
                    size={15}
                    className="text-green-500 mt-0.5 flex-shrink-0"
                  />
                  <span>
                    Battery health: <strong>92%</strong> – excellent for daily
                    use
                  </span>
                </li>
              </ul>
            </div>

            {/* In the Box */}
            <div className="bg-white rounded-xl border border-border shadow-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Package size={18} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base">
                    What's in the Box
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Everything you need, day one
                  </p>
                </div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <CheckCircle2
                    size={15}
                    className="text-green-500 mt-0.5 flex-shrink-0"
                  />
                  <span>iPhone 16 Pro (Natural Titanium)</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2
                    size={15}
                    className="text-green-500 mt-0.5 flex-shrink-0"
                  />
                  <span>
                    Original <strong>USB-C cable</strong> (Apple certified)
                  </span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2
                    size={15}
                    className="text-green-500 mt-0.5 flex-shrink-0"
                  />
                  <span>
                    <strong>Clear protective case</strong> (fits perfectly)
                  </span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2
                    size={15}
                    className="text-green-500 mt-0.5 flex-shrink-0"
                  />
                  <span>SIM ejector tool</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2
                    size={15}
                    className="text-green-500 mt-0.5 flex-shrink-0"
                  />
                  <span>Microfiber cleaning cloth</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2
                    size={15}
                    className="text-green-500 mt-0.5 flex-shrink-0"
                  />
                  <span>RefurbishedHub quality certificate</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── More Phones You'll Love ────────────────────── */}
      <section
        data-ocid="more_phones.section"
        className="max-w-5xl mx-auto px-4 py-8"
      >
        <h2 className="font-display font-bold text-xl mb-2 text-foreground">
          More Phones You'll Love
        </h2>
        <p className="text-sm text-muted-foreground mb-5">
          All certified pre-owned · Grade A condition · Free delivery
        </p>
        <div className="flex gap-4 overflow-x-auto pb-3 lg:grid lg:grid-cols-4 lg:overflow-visible scrollbar-hide snap-x snap-mandatory">
          {MORE_PHONES.map((phone, i) => (
            <motion.div
              key={phone.id}
              data-ocid={`more_phones.item.${i + 1}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.35 }}
              className="flex-shrink-0 w-64 lg:w-auto snap-start bg-white rounded-xl border border-border shadow-xs hover:shadow-card transition-shadow p-4 flex flex-col gap-2"
            >
              <div className="flex items-start justify-between gap-1">
                <div className="flex-1 min-w-0">
                  <p className="font-display font-bold text-sm text-foreground leading-tight truncate">
                    {phone.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    {phone.variant}
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-700 border-0 text-[10px] flex-shrink-0">
                  {phone.condition}
                </Badge>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1 text-green-600 font-semibold">
                  <Battery size={11} />
                  {phone.battery}
                </span>
                <span className="text-muted-foreground">Battery Health</span>
              </div>

              <div className="mt-auto pt-2 border-t border-border">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-display font-black text-lg text-foreground">
                    ₹{phone.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs text-muted-foreground line-through">
                    ₹{phone.mrp.toLocaleString("en-IN")}
                  </span>
                  <Badge className="bg-green-500/10 text-green-700 border border-green-200 text-[10px] font-bold">
                    {phone.discount}% OFF
                  </Badge>
                </div>
              </div>

              <button
                type="button"
                data-ocid={`more_phones.button.${i + 1}`}
                onClick={() =>
                  window.open(
                    `https://wa.me/919671870287?text=${encodeURIComponent(`I'm interested in ${phone.name} at ₹${phone.price.toLocaleString("en-IN")}. Please share details.`)}`,
                    "_blank",
                  )
                }
                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors mt-1"
              >
                <MessageCircle size={13} />
                Buy on WhatsApp
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Customer Reviews ───────────────────────────── */}
      <section
        id="reviews"
        data-ocid="reviews.section"
        className="max-w-5xl mx-auto px-4 py-8"
      >
        <h2 className="font-display font-bold text-xl mb-6 text-foreground">
          Customer Reviews
        </h2>

        {/* Aggregate Rating */}
        <div className="bg-white rounded-xl border border-border shadow-card p-5 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center justify-center min-w-[120px] py-2">
              <p className="font-display font-black text-5xl text-foreground">
                4.7
              </p>
              <StarDisplay rating={4.7} size={20} />
              <p className="text-xs text-muted-foreground mt-1">out of 5</p>
              <p className="text-xs text-muted-foreground">186 ratings</p>
            </div>
            <Separator
              orientation="vertical"
              className="hidden md:block h-auto"
            />
            <div className="flex-1 space-y-2">
              {RATING_BREAKDOWN.map(({ stars, pct }) => (
                <div key={stars} className="flex items-center gap-2">
                  <span className="text-xs w-5 text-right text-muted-foreground">
                    {stars}
                  </span>
                  <Star
                    size={11}
                    className="fill-amber-400 text-amber-400 flex-shrink-0"
                  />
                  <Progress value={pct} className="flex-1 h-2" />
                  <span className="text-xs w-8 text-muted-foreground">
                    {pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Seed Reviews */}
        <div className="space-y-4 mb-6">
          {SEED_REVIEWS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl border border-border shadow-xs p-4"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      {r.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {r.location} · {r.date}
                    </p>
                  </div>
                </div>
                <StarDisplay rating={r.rating} size={13} />
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                {r.comment}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <button
                  type="button"
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ThumbsUp size={12} /> Helpful
                </button>
                <Badge className="bg-green-100 text-green-700 border-0 text-xs">
                  Verified Purchase
                </Badge>
              </div>
            </motion.div>
          ))}

          {/* Live reviews from backend */}
          {(liveReviews as Review[]).map((r) => (
            <div
              key={`${r.name}-${String(r.date)}`}
              className="bg-white rounded-xl border border-border shadow-xs p-4"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      {r.name}
                    </p>
                  </div>
                </div>
                <StarDisplay rating={Number(r.rating)} size={13} />
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                {r.comment}
              </p>
            </div>
          ))}
        </div>

        {/* Write a Review form */}
        <div className="bg-slate-50 rounded-xl border border-border p-5">
          <h3 className="font-display font-bold text-base mb-4">
            Write a Review
          </h3>
          <form onSubmit={handleReviewSubmit} className="space-y-3">
            <div>
              <label
                htmlFor="review-name"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block"
              >
                Your Name
              </label>
              <Input
                id="review-name"
                data-ocid="reviews.input"
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                placeholder="Enter your name"
                className="bg-white"
              />
            </div>
            <div>
              <label
                htmlFor="review-rating"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block"
              >
                Rating
              </label>
              <div id="review-rating">
                <StarInput value={reviewRating} onChange={setReviewRating} />
              </div>
            </div>
            <div>
              <label
                htmlFor="review-comment"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block"
              >
                Your Review
              </label>
              <Textarea
                id="review-comment"
                data-ocid="reviews.textarea"
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Share your experience with this product..."
                className="bg-white resize-none"
                rows={3}
              />
            </div>
            <Button
              data-ocid="reviews.submit_button"
              type="submit"
              disabled={submitReview.isPending}
              className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-semibold"
            >
              {submitReview.isPending ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />{" "}
                  Submitting...
                </>
              ) : (
                "Submit Review"
              )}
            </Button>
          </form>
        </div>
      </section>

      {/* ── Secure Purchase Footer ─────────────────────── */}
      <footer data-ocid="footer.section" className="bg-foreground text-white">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <h3 className="font-display font-bold text-lg mb-6 text-center">
            Secure & Trusted Shopping
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              {
                icon: Shield,
                title: "Secure Checkout",
                desc: "256-bit SSL encryption",
              },
              {
                icon: RotateCcw,
                title: "7-Day Returns",
                desc: "No questions asked",
              },
              {
                icon: Award,
                title: "1-Year Warranty",
                desc: "Parts & labour covered",
              },
              {
                icon: CheckCircle2,
                title: "100% Authentic",
                desc: "Certified refurbished",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex flex-col items-center text-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10"
              >
                <Icon size={24} className="text-green-400" />
                <p className="font-semibold text-sm">{title}</p>
                <p className="text-xs text-white/60">{desc}</p>
              </div>
            ))}
          </div>

          {/* Payment methods */}
          <div className="text-center mb-6">
            <p className="text-xs text-white/50 mb-3 uppercase tracking-widest">
              Accepted Payment Methods
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "Visa",
                "Mastercard",
                "UPI",
                "Paytm",
                "Google Pay",
                "Net Banking",
                "EMI",
              ].map((m) => (
                <span
                  key={m}
                  className="px-3 py-1 text-xs font-semibold rounded-full border border-white/20 bg-white/5 text-white/80"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          <Separator className="bg-white/10 mb-6" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                <Package size={14} className="text-white" />
              </div>
              <span className="font-display font-bold text-base">
                RefurbishedHub
              </span>
            </div>
            <p className="text-xs text-white/50">
              © {new Date().getFullYear()}. Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white/80"
              >
                caffeine.ai
              </a>
            </p>
            <div className="flex gap-4 text-xs text-white/50">
              <button type="button" className="hover:text-white/80">
                Privacy Policy
              </button>
              <button type="button" className="hover:text-white/80">
                Terms of Service
              </button>
              <button type="button" className="hover:text-white/80">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Sticky Bottom CTA Bar (mobile) ─────────────── */}
      <div
        data-ocid="sticky.bar"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border shadow-modal pb-safe"
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex-1 min-w-0">
            <p className="font-display font-black text-xl text-foreground leading-none">
              {formatPrice(PRODUCT.salePrice)}
            </p>
            <p className="text-xs text-green-600 font-semibold">
              {PRODUCT.discount}% off ·{" "}
              <span className="text-muted-foreground line-through">
                {formatPrice(PRODUCT.mrp)}
              </span>
            </p>
          </div>
          <Button
            data-ocid="sticky.primary_button"
            size="sm"
            className="bg-primary hover:bg-primary/90 text-white font-bold px-5 shadow-cta"
            onClick={() => setBuyOpen(true)}
          >
            Buy Now
          </Button>
          <Button
            data-ocid="sticky.secondary_button"
            size="sm"
            variant="outline"
            className="border-primary text-primary font-bold px-4 hover:bg-primary/5"
            onClick={() => setOfferOpen(true)}
          >
            Offer
          </Button>
        </div>
      </div>

      {/* ── Lightbox Modal ─────────────────────────────── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
            aria-label="Image lightbox"
          >
            <button
              type="button"
              className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full focus-visible:ring-2 focus-visible:ring-white"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevLightbox();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/10 rounded-full focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>
            <motion.img
              key={lightboxIdx}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={GALLERY_IMAGES[lightboxIdx].src}
              alt={GALLERY_IMAGES[lightboxIdx].alt}
              className="max-h-[85vh] max-w-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextLightbox();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/10 rounded-full focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
            <div className="absolute bottom-6 flex gap-2">
              {GALLERY_IMAGES.map((_, i) => (
                <button
                  type="button"
                  key={GALLERY_IMAGES[i].id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIdx(i);
                  }}
                  className={`h-2 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-white ${i === lightboxIdx ? "bg-white w-5" : "bg-white/40 w-2"}`}
                  aria-label={`Image ${i + 1}`}
                  aria-pressed={i === lightboxIdx}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Make an Offer Modal ────────────────────────── */}
      <Dialog
        open={offerOpen}
        onOpenChange={(o) => {
          setOfferOpen(o);
          if (!o) {
            setOfferSuccess(false);
            setOfferName("");
            setOfferContact("");
            setOfferPrice("");
          }
        }}
      >
        <DialogContent data-ocid="offer.dialog" className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              Make an Offer
            </DialogTitle>
          </DialogHeader>
          {offerSuccess ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <CheckCircle2 size={48} className="text-green-500 mx-auto mb-3" />
              <p className="font-display font-bold text-lg">Offer Submitted!</p>
              <p className="text-sm text-muted-foreground mt-1">
                We'll review your offer and contact you within 24 hours.
              </p>
              <Button
                className="mt-4 w-full"
                onClick={() => setOfferOpen(false)}
              >
                Done
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleOfferSubmit} className="space-y-4 mt-2">
              <div>
                <label
                  htmlFor="offer-name"
                  className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block"
                >
                  Your Name
                </label>
                <Input
                  id="offer-name"
                  data-ocid="offer.input"
                  value={offerName}
                  onChange={(e) => setOfferName(e.target.value)}
                  placeholder="Full name"
                />
              </div>
              <div>
                <label
                  htmlFor="offer-contact"
                  className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block"
                >
                  Phone / Email
                </label>
                <Input
                  id="offer-contact"
                  value={offerContact}
                  onChange={(e) => setOfferContact(e.target.value)}
                  placeholder="How should we reach you?"
                />
              </div>
              <div>
                <label
                  htmlFor="offer-price"
                  className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block"
                >
                  Your Offer Price (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                    ₹
                  </span>
                  <Input
                    id="offer-price"
                    type="number"
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(e.target.value)}
                    placeholder="e.g. 13000"
                    className="pl-7"
                    min={1000}
                    max={14998}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Current price is {formatPrice(PRODUCT.salePrice)}
                </p>
              </div>
              <div className="flex gap-3 pt-1">
                <Button
                  data-ocid="offer.cancel_button"
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setOfferOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  data-ocid="offer.submit_button"
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold"
                  disabled={submitOffer.isPending}
                >
                  {submitOffer.isPending ? (
                    <>
                      <Loader2 size={14} className="mr-2 animate-spin" />{" "}
                      Submitting...
                    </>
                  ) : (
                    "Submit Offer"
                  )}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Buy Now Modal ──────────────────────────────── */}
      <Dialog
        open={buyOpen}
        onOpenChange={(o) => {
          setBuyOpen(o);
          if (!o) {
            setBuySuccess(false);
            setBuyName("");
            setBuyPhone("");
            setBuyAddress("");
          }
        }}
      >
        <DialogContent data-ocid="buynow.dialog" className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              Order Summary
            </DialogTitle>
          </DialogHeader>
          {buySuccess ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <CheckCircle2 size={48} className="text-green-500 mx-auto mb-3" />
              <p className="font-display font-bold text-xl">Order Placed! 🎉</p>
              <p className="text-sm text-muted-foreground mt-2">
                Your order details have been sent via WhatsApp! We'll confirm
                within 2 hours.
              </p>
              <Button
                className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-bold"
                onClick={() => {
                  const message = `Hello! I'd like to order:\n\nProduct: iPhone 16 Pro (Natural Titanium, 256GB)\nPrice: ₹14,999\n\nName: ${buyName}\nPhone: ${buyPhone}\nAddress: ${buyAddress}\n\nPlease confirm my order. Thank you!`;
                  window.open(
                    `https://wa.me/919671870287?text=${encodeURIComponent(message)}`,
                    "_blank",
                  );
                }}
              >
                <MessageCircle size={16} className="mr-2" />
                Open WhatsApp
              </Button>
              <Button
                className="mt-3 w-full"
                variant="outline"
                onClick={() => setBuyOpen(false)}
              >
                Done
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleBuySubmit} className="space-y-4 mt-2">
              {/* Order item summary */}
              <div className="bg-slate-50 rounded-xl p-3 border border-border flex items-center gap-3">
                <img
                  src="/assets/generated/iphone16pro-front.dim_800x1000.jpg"
                  alt="iPhone 16 Pro"
                  className="w-12 h-14 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground truncate">
                    iPhone 16 Pro · Natural Titanium
                  </p>
                  <p className="text-xs text-muted-foreground">
                    256GB · Grade A
                  </p>
                  <p className="font-display font-black text-lg text-foreground">
                    {formatPrice(PRODUCT.salePrice)}
                  </p>
                </div>
              </div>

              <div>
                <label
                  htmlFor="buy-name"
                  className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block"
                >
                  Full Name
                </label>
                <Input
                  id="buy-name"
                  value={buyName}
                  onChange={(e) => setBuyName(e.target.value)}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label
                  htmlFor="buy-phone"
                  className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <Phone
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    id="buy-phone"
                    value={buyPhone}
                    onChange={(e) => setBuyPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="pl-8"
                    type="tel"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="buy-address"
                  className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block"
                >
                  Delivery Address
                </label>
                <Textarea
                  id="buy-address"
                  value={buyAddress}
                  onChange={(e) => setBuyAddress(e.target.value)}
                  placeholder="House No., Street, City, State, PIN code"
                  rows={2}
                  className="resize-none"
                />
              </div>

              {/* Price summary */}
              <div className="bg-slate-50 rounded-xl p-3 border border-border space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price</span>
                  <span>{formatPrice(PRODUCT.salePrice)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>- {formatPrice(PRODUCT.mrp - PRODUCT.salePrice)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Delivery</span>
                  <span className="font-semibold">FREE</span>
                </div>
                <Separator className="my-1" />
                <div className="flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span>{formatPrice(PRODUCT.salePrice)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  data-ocid="buynow.cancel_button"
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setBuyOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  data-ocid="buynow.submit_button"
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold"
                >
                  <Shield size={14} className="mr-2" />
                  Confirm Order
                </Button>
              </div>
              <p className="text-xs text-center text-muted-foreground">
                🔒 Secure payment · Free returns within 7 days
              </p>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
