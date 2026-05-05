export interface Product {
  name: string;
  cat: string;
  price: string;
  rating: string;
  tag: "new" | "sale" | null;
  desc: string;
}

export const products: Product[] = [
  {
    name: "Veil Jacket",
    cat: "Apparel",
    price: "$380",
    rating: "★★★★★",
    tag: "new",
    desc: "Relaxed oversized silhouette in heavyweight organic cotton twill. Unlined for drape. Four external pockets.",
  },
  {
    name: "Abyss Trousers",
    cat: "Apparel",
    price: "$220",
    rating: "★★★★☆",
    tag: null,
    desc: "High-rise wide-leg cut. Crepe fabric with subtle sheen. Invisible zip closure at side.",
  },
  {
    name: "Void Sneaker",
    cat: "Footwear",
    price: "$310",
    rating: "★★★★★",
    tag: "sale",
    desc: "Chunky sole construction. Full grain leather upper. Tonal lace hardware. Unisex sizing.",
  },
  {
    name: "Umbra Clutch",
    cat: "Bags",
    price: "$195",
    rating: "★★★★☆",
    tag: "new",
    desc: "Structured evening clutch. Matte python-embossed vegan leather. Magnetic closure.",
  },
  {
    name: "Shade Knitwear",
    cat: "Apparel",
    price: "$165",
    rating: "★★★★★",
    tag: null,
    desc: "100% Merino wool. Ribbed collar and cuffs. Relaxed boxy fit. Hand wash only.",
  },
  {
    name: "Noir Crossbody",
    cat: "Bags",
    price: "$275",
    rating: "★★★★☆",
    tag: null,
    desc: "Pebbled full-grain leather. Adjustable strap with brass hardware. Interior zip pocket.",
  },
];

export const marqueeItems: string[] = [
  "Free Shipping Over $150",
  "New Drop: Void Collection",
  "Sustainably Sourced",
  "Members Get 20% Off",
  "Worldwide Delivery",
  "30-Day Returns",
];

export const categories = [
  { icon: "◈", name: "Bags", count: "42 pieces", key: "bags" },
  { icon: "⌇", name: "Apparel", count: "68 pieces", key: "apparel" },
  { icon: "⍓", name: "Footwear", count: "29 pieces", key: "footwear" },
  { icon: "◉", name: "Accessories", count: "55 pieces", key: "accessories" },
];

export const productShapes: string[] = [
  `<svg width="70" height="70" viewBox="0 0 70 70"><rect x="15" y="10" width="40" height="50" stroke="#888" stroke-width="1" fill="none"/><path d="M25 10 C25 2 45 2 45 10" stroke="#888" stroke-width="1" fill="none"/><circle cx="35" cy="25" r="4" stroke="#c8ff4a" stroke-width="1" fill="none"/></svg>`,
  `<svg width="70" height="70" viewBox="0 0 70 70"><path d="M10 55 L20 15 L50 15 L60 55 Z" stroke="#888" stroke-width="1" fill="none"/><line x1="20" y1="25" x2="50" y2="25" stroke="#c8ff4a" stroke-width="0.5"/></svg>`,
  `<svg width="70" height="70" viewBox="0 0 70 70"><ellipse cx="35" cy="40" rx="22" ry="20" stroke="#888" stroke-width="1" fill="none"/><rect x="25" y="20" width="20" height="10" rx="5" stroke="#c8ff4a" stroke-width="1" fill="none"/></svg>`,
  `<svg width="70" height="70" viewBox="0 0 70 70"><path d="M35 8 L60 25 L60 55 L10 55 L10 25 Z" stroke="#888" stroke-width="1" fill="none"/><circle cx="35" cy="40" r="6" stroke="#c8ff4a" stroke-width="1" fill="none"/></svg>`,
  `<svg width="70" height="70" viewBox="0 0 70 70"><rect x="10" y="20" width="50" height="40" stroke="#888" stroke-width="1" fill="none"/><path d="M20 20 C20 10 50 10 50 20" stroke="#c8ff4a" stroke-width="1" fill="none"/></svg>`,
  `<svg width="70" height="70" viewBox="0 0 70 70"><circle cx="35" cy="35" r="25" stroke="#888" stroke-width="1" fill="none"/><line x1="10" y1="35" x2="60" y2="35" stroke="#c8ff4a" stroke-width="0.5"/><line x1="35" y1="10" x2="35" y2="60" stroke="#c8ff4a" stroke-width="0.5"/></svg>`,
];
