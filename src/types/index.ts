export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: Category;
  author: Author;
  coverImage: string;
  publishedAt: string;
  featured: boolean;
  tags: string[];
  readTime: number;
  comments: Comment[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  approved: boolean;
}

export interface Incident {
  id: string;
  type: "security" | "safety" | "maintenance" | "general";
  title: string;
  description: string;
  status: "open" | "investigating" | "resolved";
  reportedAt: string;
  updatedAt: string;
  reportedBy: string;
  location: string;
  priority: "low" | "medium" | "high" | "critical";
}

export interface Alert {
  id: string;
  type: "emergency" | "warning" | "info" | "update";
  title: string;
  message: string;
  createdAt: string;
  expiresAt?: string;
  active: boolean;
  priority: "low" | "medium" | "high" | "critical";
}

export interface Business {
  id: string;
  name: string;
  category: string;
  description: string;
  phone: string;
  email: string;
  website?: string;
  address: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  image: string;
  hours: string;
}

export interface Resident {
  id: string;
  name: string;
  unit: string;
  street: string;
  role: "resident" | "trustee" | "admin";
  avatar?: string;
  bio?: string;
  joinedAt: string;
  verified: boolean;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  category: "community" | "event" | "lifestyle" | "security";
  uploadedAt: string;
  width: number;
  height: number;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  seller: Resident;
  status: "available" | "sold" | "pending";
  createdAt: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  type: "notice" | "announcement" | "warning";
  pinned: boolean;
  createdAt: string;
  expiresAt?: string;
  author: string;
}

export interface StreetCount {
  street: string;
  count: number;
  total: number;
}

export interface LevyMonth {
  id: string;
  monthLabel: string;
  streetCounts: StreetCount[];
}
