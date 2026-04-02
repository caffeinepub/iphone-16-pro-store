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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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
  Heart,
  Loader2,
  MessageCircle,
  Monitor,
  Package,
  Phone,
  RotateCcw,
  Search,
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
import { useCallback, useEffect, useState } from "react";
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
    value: "100%",
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
      "Battery health 100% is absolutely true! Phone feels brand new. Best refurbished deal ever. Screen is flawless.",
    date: "2 days ago",
    location: "Mumbai",
  },
  {
    name: "Priya M.",
    rating: 5,
    comment:
      "Came exactly as described. 100% battery health confirmed in settings! Very happy. Packaging was excellent.",
    date: "4 days ago",
    location: "Bangalore",
  },
  {
    name: "Arjun S.",
    rating: 5,
    comment:
      "Genuinely 100% battery health. Lasts all day easily. Fast shipping. Highly recommend RefurbishedHub!",
    date: "1 week ago",
    location: "Delhi",
  },
  {
    name: "Sneha R.",
    rating: 5,
    comment:
      "iPhone 15 Pro with 100% battery — absolutely like new. Couldn't be happier. WhatsApp ordering was super easy.",
    date: "1 week ago",
    location: "Chennai",
  },
  {
    name: "Vikram T.",
    rating: 5,
    comment:
      "Got Samsung S24 Ultra. 100% battery health as promised. Performance is amazing. Great value for money!",
    date: "10 days ago",
    location: "Hyderabad",
  },
  {
    name: "Ananya B.",
    rating: 5,
    comment:
      "iPhone 14 Pro in mint condition. Battery 100%. Looks brand new. Will definitely buy again. 5 stars!",
    date: "2 weeks ago",
    location: "Pune",
  },
  {
    name: "Rahul D.",
    rating: 4,
    comment:
      "Very good condition phone. Battery health 100% as advertised. Minor cosmetic marks but nothing noticeable.",
    date: "2 weeks ago",
    location: "Kolkata",
  },
  {
    name: "Meera N.",
    rating: 5,
    comment:
      "Excellent purchase! iPhone 13 Pro with 100% battery. Fast delivery in 2 days. Trustworthy seller.",
    date: "3 weeks ago",
    location: "Jaipur",
  },
  {
    name: "Suresh P.",
    rating: 5,
    comment:
      "Samsung Z Fold 5 arrived in perfect condition. Battery 100%. The best deal I could find online!",
    date: "3 weeks ago",
    location: "Ahmedabad",
  },
  {
    name: "Kavitha L.",
    rating: 5,
    comment:
      "iPhone 12 Pro Max — works like new phone. Battery 100% verified. Great customer service via WhatsApp.",
    date: "3 weeks ago",
    location: "Lucknow",
  },
  {
    name: "Deepak M.",
    rating: 4,
    comment:
      "OnePlus 12 with 100% battery health. Excellent performance. Delivery was quick and packaging was secure.",
    date: "1 month ago",
    location: "Chandigarh",
  },
  {
    name: "Pooja S.",
    rating: 5,
    comment:
      "Ordered iPhone 16 Plus. Got it with 100% battery. Screen is perfect. Will recommend to all friends!",
    date: "1 month ago",
    location: "Nagpur",
  },
  {
    name: "Kiran B.",
    rating: 5,
    comment:
      "Google Pixel 8 Pro arrived in like-new condition. 100% battery health. Amazing camera. Very satisfied.",
    date: "1 month ago",
    location: "Bhopal",
  },
  {
    name: "Lakshmi T.",
    rating: 5,
    comment:
      "iPhone SE 3rd Gen — tiny but mighty! 100% battery. Great for my parents. Perfect budget option.",
    date: "5 weeks ago",
    location: "Coimbatore",
  },
  {
    name: "Santosh H.",
    rating: 5,
    comment:
      "Best site for refurbished phones in India! Samsung S23 Ultra with 100% battery. Saved ₹70,000!",
    date: "5 weeks ago",
    location: "Indore",
  },
  {
    name: "Nisha G.",
    rating: 5,
    comment:
      "iPhone 11 Pro — great condition! Battery at 100%. My kids use it for studies. Very happy purchase.",
    date: "6 weeks ago",
    location: "Patna",
  },
  {
    name: "Aditya K.",
    rating: 5,
    comment:
      "Xiaomi 14 Ultra at this price with 100% battery is unbelievable. Highly recommend RefurbishedHub!",
    date: "6 weeks ago",
    location: "Surat",
  },
  {
    name: "Geeta R.",
    rating: 4,
    comment:
      "iPhone 14 in great condition. Battery 100%. Slight delay in delivery but quality made up for it.",
    date: "2 months ago",
    location: "Vadodara",
  },
  {
    name: "Mohan C.",
    rating: 5,
    comment:
      "OPPO Reno 10 Pro+ looks brand new. Battery 100%. Camera is fantastic. Will buy more phones here.",
    date: "2 months ago",
    location: "Ludhiana",
  },
  {
    name: "Divya P.",
    rating: 5,
    comment:
      "iPhone XR for my mom — 100% battery, works perfectly! She loves it. Super value for money.",
    date: "2 months ago",
    location: "Nashik",
  },
  {
    name: "Rohit S.",
    rating: 5,
    comment:
      "Purchased iPhone 15 Plus. Battery 100% confirmed immediately. Very professional packaging and delivery.",
    date: "2 months ago",
    location: "Agra",
  },
  {
    name: "Sunita K.",
    rating: 5,
    comment:
      "Nothing Phone 2 arrived spotless. Battery 100%. Unique design and great performance. Very happy!",
    date: "2 months ago",
    location: "Varanasi",
  },
  {
    name: "Manoj V.",
    rating: 4,
    comment:
      "Samsung Galaxy A54 — solid phone at great price. Battery 100%. Good for daily use. Recommended.",
    date: "3 months ago",
    location: "Rajkot",
  },
  {
    name: "Pallavi A.",
    rating: 5,
    comment:
      "iPhone 13 in perfect condition with 100% battery! Couldn't tell it was pre-owned. Amazing deal!",
    date: "3 months ago",
    location: "Amritsar",
  },
  {
    name: "Harish N.",
    rating: 5,
    comment:
      "ASUS ROG Phone 8 for gaming — 100% battery, zero issues. Delivered quickly. Best gaming phone deal!",
    date: "3 months ago",
    location: "Jodhpur",
  },
  {
    name: "Chitra M.",
    rating: 5,
    comment:
      "Bought iPhone 12 for my daughter. Battery 100%. She's thrilled! Looks as good as new. Great service.",
    date: "3 months ago",
    location: "Visakhapatnam",
  },
  {
    name: "Sanjay T.",
    rating: 5,
    comment:
      "OnePlus Nord 3 — amazing value. Battery 100% as stated. Fast charging is incredible. Very satisfied.",
    date: "4 months ago",
    location: "Ranchi",
  },
  {
    name: "Bhavna R.",
    rating: 5,
    comment:
      "Google Pixel 7 Pro delivered perfectly. Battery 100%. Camera beats phones twice the price. Excellent!",
    date: "4 months ago",
    location: "Guwahati",
  },
  {
    name: "Praveen K.",
    rating: 4,
    comment:
      "Samsung S22 Ultra in good condition. Battery 100%. Some minor wear but very minor. Overall great buy.",
    date: "4 months ago",
    location: "Mysore",
  },
  {
    name: "Asha L.",
    rating: 5,
    comment:
      "iPhone XS Max works perfectly. Battery 100%. Bought for elderly father — easy to use. Great choice!",
    date: "4 months ago",
    location: "Tiruchirappalli",
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
    id: "ip16plus",
    name: "iPhone 16 Plus",
    variant: "Ultramarine · 256GB",
    price: 13999,
    mrp: 124900,
    discount: 89,
    condition: "Like New",
    battery: "100%",
  },
  {
    id: "ip16",
    name: "iPhone 16",
    variant: "Black · 128GB",
    price: 11999,
    mrp: 79900,
    discount: 85,
    condition: "Like New",
    battery: "100%",
  },
  {
    id: "ip15promax",
    name: "iPhone 15 Pro Max",
    variant: "Black Titanium · 256GB",
    price: 14499,
    mrp: 159900,
    discount: 91,
    condition: "Grade A+",
    battery: "100%",
  },
  {
    id: "ip15pro",
    name: "iPhone 15 Pro",
    variant: "Blue Titanium · 128GB",
    price: 10999,
    mrp: 119900,
    discount: 91,
    condition: "Grade A",
    battery: "100%",
  },
  {
    id: "ip15plus",
    name: "iPhone 15 Plus",
    variant: "Yellow · 128GB",
    price: 12999,
    mrp: 89900,
    discount: 90,
    condition: "Grade A",
    battery: "100%",
  },
  {
    id: "ip15",
    name: "iPhone 15",
    variant: "Green · 128GB",
    price: 10999,
    mrp: 79900,
    discount: 91,
    condition: "Grade A",
    battery: "100%",
  },
  {
    id: "ip14promax",
    name: "iPhone 14 Pro Max",
    variant: "Space Black · 256GB",
    price: 10499,
    mrp: 139900,
    discount: 93,
    condition: "Grade A+",
    battery: "100%",
  },
  {
    id: "ip14pro",
    name: "iPhone 14 Pro",
    variant: "Deep Purple · 256GB",
    price: 11499,
    mrp: 109900,
    discount: 92,
    condition: "Grade A+",
    battery: "100%",
  },
  {
    id: "ip14plus",
    name: "iPhone 14 Plus",
    variant: "Red · 128GB",
    price: 10499,
    mrp: 89900,
    discount: 93,
    condition: "Grade A",
    battery: "100%",
  },
  {
    id: "ip14",
    name: "iPhone 14",
    variant: "Midnight · 128GB",
    price: 10199,
    mrp: 79900,
    discount: 93,
    condition: "Grade A",
    battery: "100%",
  },
  {
    id: "ip13promax",
    name: "iPhone 13 Pro Max",
    variant: "Alpine Green · 256GB",
    price: 10999,
    mrp: 129900,
    discount: 93,
    condition: "Grade A",
    battery: "100%",
  },
  {
    id: "ip13pro",
    name: "iPhone 13 Pro",
    variant: "Sierra Blue · 128GB",
    price: 10499,
    mrp: 119900,
    discount: 94,
    condition: "Grade A",
    battery: "100%",
  },
  {
    id: "ip13",
    name: "iPhone 13",
    variant: "Pink · 128GB",
    price: 10199,
    mrp: 69900,
    discount: 94,
    condition: "Grade A",
    battery: "100%",
  },
  {
    id: "ip12promax",
    name: "iPhone 12 Pro Max",
    variant: "Pacific Blue · 256GB",
    price: 10499,
    mrp: 109900,
    discount: 95,
    condition: "Grade B+",
    battery: "100%",
  },
  {
    id: "ip12pro",
    name: "iPhone 12 Pro",
    variant: "Gold · 128GB",
    price: 10299,
    mrp: 99900,
    discount: 95,
    condition: "Grade B+",
    battery: "100%",
  },
  {
    id: "ip12",
    name: "iPhone 12",
    variant: "Blue · 64GB",
    price: 10099,
    mrp: 69900,
    discount: 95,
    condition: "Grade B+",
    battery: "100%",
  },
  {
    id: "ip11promax",
    name: "iPhone 11 Pro Max",
    variant: "Midnight Green · 256GB",
    price: 10299,
    mrp: 89900,
    discount: 96,
    condition: "Grade B",
    battery: "100%",
  },
  {
    id: "ip11pro",
    name: "iPhone 11 Pro",
    variant: "Space Grey · 64GB",
    price: 10199,
    mrp: 79900,
    discount: 96,
    condition: "Grade B",
    battery: "100%",
  },
  {
    id: "ip11",
    name: "iPhone 11",
    variant: "Purple · 64GB",
    price: 10099,
    mrp: 59900,
    discount: 97,
    condition: "Grade B",
    battery: "100%",
  },
  {
    id: "ipse3",
    name: "iPhone SE (3rd Gen)",
    variant: "Starlight · 64GB",
    price: 10099,
    mrp: 49900,
    discount: 96,
    condition: "Grade A",
    battery: "100%",
  },
  {
    id: "ipxr",
    name: "iPhone XR",
    variant: "Coral · 64GB",
    price: 10099,
    mrp: 49900,
    discount: 97,
    condition: "Grade B",
    battery: "100%",
  },
  {
    id: "ipxsmax",
    name: "iPhone XS Max",
    variant: "Gold · 64GB",
    price: 10099,
    mrp: 64900,
    discount: 98,
    condition: "Grade B",
    battery: "100%",
  },
  {
    id: "ipxs",
    name: "iPhone XS",
    variant: "Silver · 64GB",
    price: 10099,
    mrp: 54900,
    discount: 98,
    condition: "Grade B",
    battery: "100%",
  },
  {
    id: "ipse2",
    name: "iPhone SE (2nd Gen)",
    variant: "White · 64GB",
    price: 10099,
    mrp: 44900,
    discount: 97,
    condition: "Grade A",
    battery: "100%",
  },
  {
    id: "ip13mini",
    name: "iPhone 13 Mini",
    variant: "Pink · 128GB",
    price: 10299,
    mrp: 69900,
    discount: 95,
    condition: "Grade A",
    battery: "100%",
  },
  {
    id: "ip12mini",
    name: "iPhone 12 Mini",
    variant: "Blue · 64GB",
    price: 10099,
    mrp: 59900,
    discount: 98,
    condition: "Grade B+",
    battery: "100%",
  },
];

/* ── Brand Image Mapping ────────────────────────────── */
const IPHONE_IMAGE: Record<string, string> = {
  ip16promax: "/assets/generated/iphone-16promax.dim_400x500.jpg",
  ip16plus: "/assets/generated/iphone-16plus.dim_400x500.jpg",
  ip16: "/assets/generated/iphone-16.dim_400x500.jpg",
  ip15promax: "/assets/generated/iphone-15promax.dim_400x500.jpg",
  ip15pro: "/assets/generated/iphone-15pro.dim_400x500.jpg",
  ip15plus: "/assets/generated/iphone-15plus.dim_400x500.jpg",
  ip15: "/assets/generated/iphone-15.dim_400x500.jpg",
  ip14promax: "/assets/generated/iphone-14promax.dim_400x500.jpg",
  ip14pro: "/assets/generated/iphone-14pro.dim_400x500.jpg",
  ip14plus: "/assets/generated/iphone-14plus.dim_400x500.jpg",
  ip14: "/assets/generated/iphone-14.dim_400x500.jpg",
  ip13promax: "/assets/generated/iphone-13promax.dim_400x500.jpg",
  ip13pro: "/assets/generated/iphone-13pro.dim_400x500.jpg",
  ip13: "/assets/generated/iphone-13.dim_400x500.jpg",
  ip12promax: "/assets/generated/iphone-12promax.dim_400x500.jpg",
  ip12pro: "/assets/generated/iphone-12pro.dim_400x500.jpg",
  ip12: "/assets/generated/iphone-12.dim_400x500.jpg",
  ip11promax: "/assets/generated/iphone-11promax.dim_400x500.jpg",
  ip11pro: "/assets/generated/iphone-11pro.dim_400x500.jpg",
  ip11: "/assets/generated/iphone-11.dim_400x500.jpg",
  ipse3: "/assets/generated/iphone-se3.dim_400x500.jpg",
  ipxr: "/assets/generated/iphone-xr.dim_400x500.jpg",
  ipxsmax: "/assets/generated/iphone-xsmax.dim_400x500.jpg",
  ipxs: "/assets/generated/iphone-xs.dim_400x500.jpg",
  ipse2: "/assets/generated/iphone-se2.dim_400x500.jpg",
  ip13mini: "/assets/generated/iphone-13mini.dim_400x500.jpg",
  ip12mini: "/assets/generated/iphone-12mini.dim_400x500.jpg",
};

function getPhoneImage(id: string): string {
  return IPHONE_IMAGE[id] || "/assets/generated/phone-iphone.dim_400x500.jpg";
}

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
  const [welcomeOpen, setWelcomeOpen] = useState(() => {
    return !sessionStorage.getItem("welcome_shown");
  });
  const [offerOpen, setOfferOpen] = useState(false);
  const [buyOpen, setBuyOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<
    null | (typeof MORE_PHONES)[0]
  >(null);
  const [offerSuccess, setOfferSuccess] = useState(false);

  // Offer form
  const [offerName, setOfferName] = useState("");
  const [offerContact, setOfferContact] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  // Buy form
  const [buyName, setBuyName] = useState("");
  const [buyPhone, setBuyPhone] = useState("");
  const [buyAddress, setBuyAddress] = useState("");
  const [buyStep, setBuyStep] = useState<1 | 2>(1);
  const [trackingId, setTrackingId] = useState("");

  // Review form
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");

  // Catalog state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [sortBy, setSortBy] = useState("discount");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    10000, 150000,
  ]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [trackId, setTrackId] = useState("");
  const [trackResult, setTrackResult] = useState<"found" | "invalid" | null>(
    null,
  );
  const [cart, setCart] = useState<Array<{ id: string; cartKey: number }>>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (id: string) => {
    setCart((prev) => [...prev, { id, cartKey: Date.now() + prev.length }]);
    toast.success("Added to cart!");
  };

  const removeFromCart = (cartKey: number) => {
    setCart((prev) => prev.filter((item) => item.cartKey !== cartKey));
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleCompare = (id: string) => {
    setCompareList((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 2) {
        toast.error("You can only compare 2 phones at a time.");
        return prev;
      }
      return [...prev, id];
    });
  };

  const filteredPhones = MORE_PHONES.filter((p) => {
    const matchSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchBrand =
      selectedBrand === "All"
        ? true
        : selectedBrand === "iPhone SE/XR"
          ? p.name.startsWith("iPhone SE") ||
            p.name.startsWith("iPhone XR") ||
            p.name.startsWith("iPhone XS")
          : p.name.startsWith(selectedBrand);
    const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    return matchSearch && matchBrand && matchPrice;
  }).sort((a, b) => {
    if (sortBy === "price_asc") return a.price - b.price;
    if (sortBy === "price_desc") return b.price - a.price;
    return b.discount - a.discount;
  });

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

  const generateTrackingId = () => {
    const rand = Math.floor(10000 + Math.random() * 90000);
    return `TRK-${new Date().getFullYear()}-${rand}`;
  };

  const handleBuySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyName || !buyPhone || !buyAddress) {
      toast.error("Please fill all fields");
      return;
    }

    const productName = selectedProduct
      ? `${selectedProduct.name} (${selectedProduct.variant})`
      : "iPhone 16 Pro (Natural Titanium, 256GB)";
    const productPrice = selectedProduct
      ? `₹${selectedProduct.price.toLocaleString("en-IN")}`
      : "₹14,999";

    const trkId = generateTrackingId();
    setTrackingId(trkId);
    const message = `Hello! New Order Placed!\n\nTracking ID: ${trkId}\nProduct: ${productName}\nPrice: ${productPrice}\n\nName: ${buyName}\nPhone: ${buyPhone}\nAddress: ${buyAddress}\n\nBooking Amount: ₹299\n\nPlease confirm dispatch. Thank you!`;
    window.open(
      `https://wa.me/919289429308?text=${encodeURIComponent(message)}`,
      "_blank",
    );
    setBuyStep(2);
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
            <a
              href="#track"
              className="hover:text-foreground transition-colors"
              data-ocid="header.link"
            >
              Track Order
            </a>
          </nav>
          <button
            type="button"
            data-ocid="header.button"
            className="relative p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Cart"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingCart size={20} />
            {cart.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
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
                  <Badge className="bg-blue-500 text-white font-bold text-xs border-0 shadow">
                    Used: 1-2 Days Only
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
                  (847 ratings)
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
                    "https://wa.me/919289429308?text=Hi!+I'm+interested+in+buying+iPhone+16+Pro+at+₹14,999.+Please+share+details.",
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
                    Battery health: <strong>100%</strong> – perfect for daily
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

      {/* ── Phone Catalog (Flipkart-style) ──────────────── */}
      <section
        data-ocid="catalog.section"
        className="max-w-6xl mx-auto px-4 py-8"
      >
        <h2 className="font-display font-bold text-2xl mb-1 text-foreground">
          All Phones
        </h2>
        <p className="text-sm text-muted-foreground mb-5">
          26+ certified pre-owned iPhones · All 100% battery health · Used just
          1-2 days
        </p>

        {/* Search bar */}
        <div className="relative mb-4">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            data-ocid="catalog.search_input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search phones..."
            className="pl-9 bg-white"
          />
        </div>

        {/* Price Range Filter */}
        <div className="flex flex-wrap items-center gap-3 mb-4 p-3 bg-white rounded-xl border border-border">
          <span className="text-xs font-semibold text-muted-foreground">
            Price Range:
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">₹</span>
            <input
              type="number"
              data-ocid="catalog.price_min.input"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value) || 0, priceRange[1]])
              }
              className="w-24 h-7 text-xs border border-border rounded-md px-2 bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Min"
            />
            <span className="text-xs text-muted-foreground">–</span>
            <span className="text-xs text-muted-foreground">₹</span>
            <input
              type="number"
              data-ocid="catalog.price_max.input"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value) || 0])
              }
              className="w-24 h-7 text-xs border border-border rounded-md px-2 bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Max"
            />
          </div>
          <button
            type="button"
            data-ocid="catalog.reset.button"
            onClick={() => setPriceRange([10000, 150000])}
            className="text-xs text-primary font-semibold hover:underline"
          >
            Reset
          </button>
          <span className="text-xs text-muted-foreground ml-auto">
            ₹{priceRange[0].toLocaleString("en-IN")} – ₹
            {priceRange[1].toLocaleString("en-IN")}
          </span>
        </div>

        {/* Brand filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          {[
            "All",
            "iPhone 16",
            "iPhone 15",
            "iPhone 14",
            "iPhone 13",
            "iPhone 12",
            "iPhone 11",
            "iPhone SE/XR",
          ].map((brand) => (
            <button
              key={brand}
              type="button"
              data-ocid="catalog.tab"
              onClick={() => setSelectedBrand(brand)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                selectedBrand === brand
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-foreground border-border hover:border-primary hover:text-primary"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Sort + results count row */}
        <div className="flex items-center justify-between mb-4 gap-3">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filteredPhones.length}
            </span>{" "}
            phones
          </p>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 bg-white text-sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="discount">Best Discount</SelectItem>
              <SelectItem value="price_asc">Price: Low → High</SelectItem>
              <SelectItem value="price_desc">Price: High → Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filteredPhones.map((phone, i) => {
            const ratings = [
              234, 512, 789, 345, 672, 198, 423, 891, 567, 312, 741, 289, 634,
              156, 478, 823, 391, 645, 267, 534, 712, 188, 456, 901, 378, 623,
              244, 567, 832, 459, 213, 678, 345, 789, 123, 567, 890, 234, 678,
              412, 756, 323, 587, 145, 891, 467, 234, 678, 512, 389, 723,
            ][i % 51];
            const isInCart = cart.some((item) => item.id === phone.id);
            const isWishlisted = wishlist.includes(phone.id);
            const showUrgency = (i + 1) % 3 === 0;
            return (
              <motion.div
                key={phone.id}
                data-ocid={`catalog.item.${i + 1}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.04, 0.4), duration: 0.3 }}
                className="bg-white rounded-xl border border-border shadow-xs hover:shadow-card transition-all hover:-translate-y-0.5 flex flex-col overflow-hidden"
              >
                {/* Product image */}
                <div className="relative aspect-[3/4] bg-slate-50 overflow-hidden">
                  <img
                    src={getPhoneImage(phone.id)}
                    alt={phone.name}
                    className="w-full h-full object-contain p-3"
                  />
                  {/* Wishlist button */}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(phone.id)}
                    className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow border border-border hover:scale-110 transition-transform"
                    aria-label={
                      isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                    }
                  >
                    <Heart
                      size={14}
                      className={
                        isWishlisted
                          ? "fill-red-500 text-red-500"
                          : "text-muted-foreground"
                      }
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleCompare(phone.id)}
                    className={`absolute top-2 left-2 p-1 text-[9px] font-bold rounded-full shadow border transition-all ${
                      compareList.includes(phone.id)
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-muted-foreground border-border hover:border-primary hover:text-primary"
                    }`}
                    aria-label="Compare"
                  >
                    VS
                  </button>
                </div>

                {/* Card body */}
                <div className="p-2.5 flex flex-col gap-1.5 flex-1">
                  {/* Badges */}
                  <div className="flex flex-wrap gap-1">
                    <span className="text-[10px] font-bold bg-red-500/10 text-red-600 px-1.5 py-0.5 rounded">
                      {phone.discount}% off
                    </span>
                    <span className="text-[10px] font-bold bg-green-500/10 text-green-700 px-1.5 py-0.5 rounded">
                      Used: 1-2 Days
                    </span>
                    <span className="text-[10px] font-bold bg-blue-500/10 text-blue-700 px-1.5 py-0.5 rounded">
                      100% Battery
                    </span>
                  </div>

                  {/* Name */}
                  <p className="font-display font-bold text-sm text-foreground leading-tight line-clamp-2">
                    {phone.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {phone.variant}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="font-display font-black text-base text-foreground">
                      ₹{phone.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-muted-foreground line-through">
                      ₹{phone.mrp.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1">
                    <span className="inline-flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={10}
                          className={
                            s <= 4
                              ? "fill-amber-400 text-amber-400"
                              : s === 5
                                ? "text-gray-300"
                                : "fill-amber-400 text-amber-400"
                          }
                        />
                      ))}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      ({ratings})
                    </span>
                  </div>

                  {/* Delivery */}
                  <p className="text-[10px] text-green-600 font-semibold">
                    ✓ Free Delivery by Tomorrow
                  </p>

                  {/* Urgency */}
                  {showUrgency && (
                    <p className="text-[10px] text-red-500 font-semibold">
                      ⚡ Only 3 left!
                    </p>
                  )}

                  {/* Action buttons */}
                  <div className="flex flex-col gap-1.5 mt-auto pt-1.5">
                    <button
                      type="button"
                      data-ocid={`catalog.buynow.button.${i + 1}`}
                      onClick={() => {
                        setSelectedProduct(phone);
                        setBuyOpen(true);
                      }}
                      className="w-full text-[12px] font-bold py-2.5 px-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 active:opacity-90 transition-all shadow-md text-white border-0"
                    >
                      🛒 Buy Now — ₹299 Booking
                    </button>
                    <button
                      type="button"
                      onClick={() => addToCart(phone.id)}
                      className={`w-full text-[11px] font-bold py-1.5 px-2 rounded-lg border transition-colors ${
                        isInCart
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-primary border-primary hover:bg-primary/5"
                      }`}
                    >
                      {isInCart ? "✓ In Cart" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredPhones.length === 0 && (
          <div data-ocid="catalog.empty_state" className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No phones found for "{searchQuery}"
            </p>
            <button
              type="button"
              className="mt-3 text-primary text-sm font-semibold hover:underline"
              onClick={() => {
                setSearchQuery("");
                setSelectedBrand("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* ── Compare Bar ───────────────────────────────── */}
      <AnimatePresence>
        {compareList.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-20 md:bottom-4 left-0 right-0 z-40 flex justify-center px-4"
          >
            <div className="bg-foreground text-white rounded-2xl shadow-2xl px-4 py-3 flex items-center gap-4 max-w-lg w-full">
              <div className="flex-1 text-sm">
                <span className="font-bold">
                  Compare ({compareList.length}/2):
                </span>{" "}
                {compareList
                  .map((id) => MORE_PHONES.find((p) => p.id === id)?.name)
                  .filter(Boolean)
                  .join(" vs ")}
              </div>
              {compareList.length === 2 && (
                <button
                  type="button"
                  data-ocid="compare.open_modal_button"
                  onClick={() => setCompareOpen(true)}
                  className="bg-primary text-white text-sm font-bold px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  Compare Now
                </button>
              )}
              <button
                type="button"
                onClick={() => setCompareList([])}
                className="p-1 hover:opacity-70"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Compare Modal ──────────────────────────────── */}
      <Dialog open={compareOpen} onOpenChange={setCompareOpen}>
        <DialogContent data-ocid="compare.dialog" className="max-w-2xl w-full">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              Compare iPhones
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {compareList.map((id) => {
              const phone = MORE_PHONES.find((p) => p.id === id);
              if (!phone) return null;
              return (
                <div
                  key={id}
                  className="flex flex-col gap-2 border border-border rounded-xl p-3"
                >
                  <img
                    src={getPhoneImage(phone.id)}
                    alt={phone.name}
                    className="w-full h-40 object-contain bg-slate-50 rounded-lg p-2"
                  />
                  <p className="font-display font-black text-sm text-foreground">
                    {phone.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {phone.variant}
                  </p>
                  <table className="text-xs w-full">
                    <tbody>
                      {[
                        ["Price", `₹${phone.price.toLocaleString("en-IN")}`],
                        ["MRP", `₹${phone.mrp.toLocaleString("en-IN")}`],
                        ["Discount", `${phone.discount}% off`],
                        ["Battery", phone.battery],
                        ["Condition", phone.condition],
                      ].map(([label, val]) => (
                        <tr
                          key={label}
                          className="border-b border-border last:border-0"
                        >
                          <td className="py-1 text-muted-foreground font-medium w-20">
                            {label}
                          </td>
                          <td className="py-1 font-semibold text-foreground">
                            {val}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Button
                    data-ocid="compare.primary_button"
                    size="sm"
                    className="w-full mt-1 font-bold bg-primary hover:opacity-90"
                    onClick={() => {
                      setSelectedProduct(phone);
                      setBuyStep(1);
                      setBuyOpen(true);
                      setCompareOpen(false);
                    }}
                  >
                    Buy Now – ₹{phone.price.toLocaleString("en-IN")}
                  </Button>
                </div>
              );
            })}
          </div>
          <button
            type="button"
            data-ocid="compare.close_button"
            onClick={() => setCompareOpen(false)}
            className="mt-2 text-sm text-muted-foreground hover:text-foreground transition-colors text-center w-full"
          >
            Close
          </button>
        </DialogContent>
      </Dialog>

      {/* ── Cart Drawer ────────────────────────────────── */}
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent
          data-ocid="cart.sheet"
          className="w-full sm:max-w-md flex flex-col"
        >
          <SheetHeader>
            <SheetTitle className="font-display text-xl">
              Your Cart ({cart.length} {cart.length === 1 ? "item" : "items"})
            </SheetTitle>
          </SheetHeader>
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center">
              <ShoppingCart size={48} className="text-muted-foreground/30" />
              <p className="text-muted-foreground font-medium">
                Your cart is empty
              </p>
              <button
                type="button"
                data-ocid="cart.close_button"
                onClick={() => setCartOpen(false)}
                className="text-primary text-sm font-semibold hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1 pr-1">
                <div className="space-y-3 py-4">
                  {cart.map((item) => {
                    const phone = MORE_PHONES.find((p) => p.id === item.id);
                    if (!phone) return null;
                    return (
                      <div
                        key={item.cartKey}
                        className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-border"
                      >
                        <img
                          src={getPhoneImage(phone.id)}
                          alt={phone.name}
                          className="w-14 h-14 object-contain bg-white rounded-lg border border-border"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-foreground truncate">
                            {phone.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {phone.variant}
                          </p>
                          <p className="font-bold text-sm text-primary mt-0.5">
                            ₹{phone.price.toLocaleString("en-IN")}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.cartKey)}
                          className="p-1.5 hover:bg-red-50 rounded-lg text-muted-foreground hover:text-red-500 transition-colors"
                          aria-label="Remove"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>
                    ₹
                    {cart
                      .reduce((sum, item) => {
                        const p = MORE_PHONES.find((ph) => ph.id === item.id);
                        return sum + (p?.price ?? 0);
                      }, 0)
                      .toLocaleString("en-IN")}
                  </span>
                </div>
                <button
                  type="button"
                  data-ocid="cart.close_button"
                  onClick={() => {
                    const items = cart
                      .map((item) => {
                        const p = MORE_PHONES.find((ph) => ph.id === item.id);
                        return p
                          ? `• ${p.name} (${p.variant}) - ₹${p.price.toLocaleString("en-IN")}`
                          : "";
                      })
                      .filter(Boolean)
                      .join("\n");
                    const total = cart.reduce((sum, item) => {
                      const p = MORE_PHONES.find((ph) => ph.id === item.id);
                      return sum + (p?.price ?? 0);
                    }, 0);
                    const message = `Hello! I want to order these phones:\n\n${items}\n\nTotal: ₹${total.toLocaleString("en-IN")}\nPlease confirm availability. Thank you!`;
                    window.open(
                      `https://wa.me/919289429308?text=${encodeURIComponent(message)}`,
                      "_blank",
                    );
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-colors"
                >
                  <MessageCircle size={18} />
                  Order on WhatsApp
                </button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

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
              <p className="text-xs text-muted-foreground">847 ratings</p>
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
                className="text-sm font-bold text-blue-700 uppercase tracking-wide mb-1 block"
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
                className="text-sm font-bold text-blue-700 uppercase tracking-wide mb-1 block"
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
                className="text-sm font-bold text-blue-700 uppercase tracking-wide mb-1 block"
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

      {/* ── Track Your Order ──────────────────────────── */}
      <section
        id="track"
        data-ocid="track.section"
        className="max-w-2xl mx-auto px-4 py-12"
      >
        <div className="text-center mb-8">
          <h2 className="font-display font-black text-2xl md:text-3xl text-foreground mb-2">
            Track Your Order
          </h2>
          <p className="text-muted-foreground text-sm">
            Enter your Tracking ID to view your order status
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
          <div className="flex gap-2 mb-4">
            <Input
              data-ocid="track.input"
              value={trackId}
              onChange={(e) => {
                setTrackId(e.target.value);
                setTrackResult(null);
              }}
              placeholder="e.g. TRK-2026-84721"
              className="flex-1 font-mono"
            />
            <Button
              data-ocid="track.submit_button"
              onClick={() => {
                if (/^TRK-\d{4}-\d{5}$/.test(trackId.trim())) {
                  setTrackResult("found");
                } else {
                  setTrackResult("invalid");
                }
              }}
              className="bg-primary hover:opacity-90 font-bold"
            >
              Track Order
            </Button>
          </div>
          <AnimatePresence>
            {trackResult === "found" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                data-ocid="track.success_state"
                className="bg-green-50 border border-green-200 rounded-xl p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 size={20} className="text-green-600" />
                  <p className="font-bold text-green-800">Order Found!</p>
                </div>
                <p className="text-sm text-green-700 mb-1 font-semibold">
                  Tracking ID: <span className="font-mono">{trackId}</span>
                </p>
                <p className="text-sm text-green-700 mb-3">
                  📦 Status: <strong>Dispatched</strong> – Your phone is on the
                  way!
                </p>
                <a
                  href={`https://wa.me/919289429308?text=${encodeURIComponent(`Hello! I want to track my order. Tracking ID: ${trackId}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="track.primary_button"
                  className="inline-flex items-center gap-2 bg-green-600 text-white text-sm font-bold px-4 py-2 rounded-full hover:bg-green-700 transition-colors"
                >
                  <MessageCircle size={16} />
                  For real-time updates, contact on WhatsApp
                </a>
              </motion.div>
            )}
            {trackResult === "invalid" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                data-ocid="track.error_state"
                className="bg-red-50 border border-red-200 rounded-xl p-4"
              >
                <div className="flex items-center gap-2">
                  <X size={20} className="text-red-500" />
                  <p className="text-sm text-red-700 font-medium">
                    Invalid tracking ID format. Please check and try again.
                    (Expected format: TRK-2026-84721)
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
                  className="text-sm font-bold text-blue-700 uppercase tracking-wide mb-1 block"
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
                  className="text-sm font-bold text-blue-700 uppercase tracking-wide mb-1 block"
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
                  className="text-sm font-bold text-blue-700 uppercase tracking-wide mb-1 block"
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
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold shadow-lg"
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
            setBuyName("");
            setBuyPhone("");
            setBuyAddress("");
            setBuyStep(1);
            setTrackingId("");
            setSelectedProduct(null);
          }
        }}
      >
        <DialogContent
          data-ocid="buynow.dialog"
          className="sm:max-w-md max-h-[90vh] overflow-y-auto bg-white"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {buyStep === 1 ? "Order Details" : "Order Confirmed!"}
            </DialogTitle>
          </DialogHeader>

          {/* STEP 1: Order Form */}
          {buyStep === 1 && (
            <form onSubmit={handleBuySubmit} className="space-y-4 mt-2">
              {/* Order item summary */}
              <div className="bg-slate-50 rounded-xl p-3 border border-border flex items-center gap-3">
                <img
                  src={
                    selectedProduct
                      ? getPhoneImage(selectedProduct.id)
                      : "/assets/generated/iphone16pro-front.dim_800x1000.jpg"
                  }
                  alt={selectedProduct?.name || "iPhone 16 Pro"}
                  className="w-12 h-14 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground truncate">
                    {selectedProduct
                      ? `${selectedProduct.name} · ${selectedProduct.variant}`
                      : "iPhone 16 Pro · Natural Titanium"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Grade A · 100% Battery
                  </p>
                  <p className="font-display font-black text-lg text-foreground">
                    {selectedProduct
                      ? formatPrice(selectedProduct.price)
                      : formatPrice(PRODUCT.salePrice)}
                  </p>
                </div>
              </div>

              <div>
                <label
                  htmlFor="buy-name"
                  className="text-sm font-bold text-blue-700 uppercase tracking-wide mb-1 block"
                >
                  Full Name
                </label>
                <Input
                  id="buy-name"
                  data-ocid="buynow.name.input"
                  value={buyName}
                  onChange={(e) => setBuyName(e.target.value)}
                  placeholder="Your full name"
                  className="bg-white border-2 border-blue-200 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
                />
              </div>
              <div>
                <label
                  htmlFor="buy-phone"
                  className="text-sm font-bold text-blue-700 uppercase tracking-wide mb-1 block"
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
                    data-ocid="buynow.phone.input"
                    value={buyPhone}
                    onChange={(e) => setBuyPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="pl-8 bg-white border-2 border-blue-200 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
                    type="tel"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="buy-address"
                  className="text-sm font-bold text-blue-700 uppercase tracking-wide mb-1 block"
                >
                  Delivery Address
                </label>
                <Textarea
                  id="buy-address"
                  data-ocid="buynow.address.textarea"
                  value={buyAddress}
                  onChange={(e) => setBuyAddress(e.target.value)}
                  placeholder="House No., Street, City, State, PIN code"
                  rows={2}
                  className="resize-none bg-white border-2 border-blue-200 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
                />
              </div>

              {/* Price summary */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-3 border border-blue-200 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone Price</span>
                  <span className="font-semibold">
                    {selectedProduct
                      ? formatPrice(selectedProduct.price)
                      : formatPrice(PRODUCT.salePrice)}
                  </span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Delivery</span>
                  <span className="font-semibold">FREE</span>
                </div>
                <Separator className="my-1" />
                <div className="flex justify-between font-bold text-base">
                  <span>Booking Amount Now</span>
                  <span className="text-green-600">₹299</span>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Remaining balance paid on delivery
                </p>
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
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold shadow-lg"
                >
                  <Shield size={14} className="mr-2" />
                  Place Order on WhatsApp
                </Button>
              </div>
              <p className="text-xs text-center text-muted-foreground">
                📱 Order via WhatsApp · Free returns within 7 days
              </p>
            </form>
          )}

          {/* STEP 2: Confirmation with Tracking ID */}
          {buyStep === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 mt-2"
            >
              <div className="text-center py-4">
                <CheckCircle2
                  size={52}
                  className="text-green-500 mx-auto mb-3"
                />
                <p className="font-display font-black text-xl">Order Placed!</p>
                <p className="text-sm text-muted-foreground mt-1">
                  We'll confirm your order within 2 hours
                </p>
              </div>

              {/* Tracking ID Card */}
              <div className="bg-primary/5 border-2 border-primary rounded-xl p-4 text-center">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  Your Tracking ID
                </p>
                <p
                  data-ocid="order.tracking_id"
                  className="font-mono font-black text-2xl text-primary tracking-widest"
                >
                  {trackingId}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Save this to track your order
                </p>
              </div>

              {/* Order Details */}
              <div className="bg-slate-50 rounded-xl p-4 space-y-2 text-sm border border-border">
                <p className="font-semibold text-sm mb-2">Order Details</p>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Product</span>
                  <span className="font-medium text-right max-w-[55%] truncate">
                    iPhone 16 Pro · Natural Titanium
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium">{buyName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone</span>
                  <span className="font-medium">{buyPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Booking Paid</span>
                  <span className="font-medium text-green-600">₹299</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="text-amber-600 font-semibold">
                    Pending Confirmation
                  </span>
                </div>
              </div>

              <Button
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold"
                onClick={() => {
                  const message = `Hello! My order tracking ID is: ${trackingId}\n\nName: ${buyName}\nPhone: ${buyPhone}\n\nPlease update me on my order status.`;
                  window.open(
                    `https://wa.me/919289429308?text=${encodeURIComponent(message)}`,
                    "_blank",
                  );
                }}
              >
                <MessageCircle size={16} className="mr-2" />
                Track on WhatsApp
              </Button>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => setBuyOpen(false)}
              >
                Done
              </Button>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Welcome Offer Modal ─────────────────────── */}
      <Dialog
        open={welcomeOpen}
        onOpenChange={(o) => {
          if (!o) {
            sessionStorage.setItem("welcome_shown", "1");
            setWelcomeOpen(false);
          }
        }}
      >
        <DialogContent
          data-ocid="welcome.dialog"
          className="sm:max-w-sm text-center p-0 overflow-hidden rounded-2xl border-0"
        >
          <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 p-6 text-white relative">
            <button
              type="button"
              onClick={() => {
                sessionStorage.setItem("welcome_shown", "1");
                setWelcomeOpen(false);
              }}
              className="absolute top-3 right-3 bg-white/20 hover:bg-white/30 rounded-full p-1 transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>
            <div className="text-4xl mb-2">🎉</div>
            <h2 className="font-display font-black text-2xl leading-tight">
              Special Offer!
            </h2>
            <p className="text-white/90 text-sm mt-1">
              Limited time deal — grab it fast!
            </p>
          </div>
          <div className="p-6 space-y-4 bg-white">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 font-black text-lg px-4 py-2 rounded-full border-2 border-red-300">
              <span>🔥</span>
              <span>89% OFF</span>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Booking Fee
              </p>
              <div className="flex items-baseline justify-center gap-3 mt-1">
                <span className="text-2xl text-muted-foreground line-through font-medium">
                  ₹2,699
                </span>
                <span className="text-4xl font-black text-green-600">₹299</span>
              </div>
            </div>
            <p className="text-base font-semibold text-foreground">
              Book <span className="text-primary">any iPhone</span> today at
              just ₹299!
            </p>
            <p className="text-xs text-muted-foreground">
              ✅ 100% Battery · ✅ 1-Year Warranty · ✅ Free Delivery
            </p>
            <Button
              data-ocid="welcome.primary_button"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-black text-lg py-6 rounded-xl shadow-lg"
              onClick={() => {
                sessionStorage.setItem("welcome_shown", "1");
                setWelcomeOpen(false);
                document
                  .getElementById("catalog")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              🛒 Grab This Deal Now!
            </Button>
            <button
              type="button"
              data-ocid="welcome.close_button"
              onClick={() => {
                sessionStorage.setItem("welcome_shown", "1");
                setWelcomeOpen(false);
              }}
              className="text-xs text-muted-foreground hover:text-foreground underline transition-colors"
            >
              No thanks, I&apos;ll browse first
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
