import { Timestamp } from 'firebase/firestore';

export interface Product {
  id: string;
  vendorId: string;
  vendorType: 'vendor' | 'vendor_wa' | 'boutique';
  title: string;
  description: string;
  images: string[];
  price: number;
  comparePrice?: number;
  category: string;
  tags: string[];
  stock: number;
  isAvailable: boolean;
  city: string;
  deliveryZones: string[];
  rating: number;
  reviewsCount: number;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  attributes: Record<string, string>;
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  parentId?: string;
  subcategories?: string[];
  productCount: number;
}

export const CATEGORIES = [
  { id: 'alimentation', name: 'Alimentation', icon: 'nutrition-outline' },
  { id: 'mode', name: 'Mode & Vêtements', icon: 'shirt-outline' },
  { id: 'electronique', name: 'Électronique', icon: 'phone-portrait-outline' },
  { id: 'beauté', name: 'Beauté & Cosmétiques', icon: 'sparkles-outline' },
  { id: 'maison', name: 'Maison & Décoration', icon: 'home-outline' },
  { id: 'sport', name: 'Sports & Loisirs', icon: 'fitness-outline' },
  { id: 'jouets', name: 'Jouets & Enfants', icon: 'balloon-outline' },
  { id: 'services', name: 'Services', icon: 'construct-outline' },
  { id: 'vehicules', name: 'Véhicules', icon: 'car-outline' },
  { id: 'autres', name: 'Autres', icon: 'apps-outline' },
] as const;

export type CategoryId = typeof CATEGORIES[number]['id'];