import { Timestamp } from 'firebase/firestore';
import type { UserRole } from '../constants/roles';

export interface User {
  uid: string;
  email?: string;
  phone: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  isVerified: boolean;
  isActive: boolean;
  city?: string;
  location?: GeoPoint;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
}

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface ClientProfile extends User {
  role: 'client';
  favorites: string[];
  addresses: Address[];
}

export interface VendorProfile extends User {
  role: 'vendor' | 'vendor_wa';
  shopName: string;
  description?: string;
  logo?: string;
  banner?: string;
  category: string;
  rating: number;
  totalSales: number;
  whatsappChannels?: string[];
}

export interface BoutiqueProfile extends User {
  role: 'boutique';
  shopName: string;
  description?: string;
  logo?: string;
  banner?: string;
  type: 'online' | 'physical' | 'both';
  address?: string;
  openingHours?: OpeningHours;
  rccm?: string;
  nif?: string;
  paymentMethods: PaymentMethodConfig[];
  rating: number;
  totalSales: number;
  teamMembers?: TeamMember[];
}

export interface DeliveryProfile extends User {
  role: 'delivery';
  vehicleType: 'moto' | 'car' | 'bike' | 'foot';
  cniRecto?: string;
  cniVerso?: string;
  isOnline: boolean;
  isAvailable: boolean;
  currentLocation?: GeoPoint;
  activeOrderId?: string;
  totalDeliveries: number;
  earnings: number;
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  district?: string;
  coordinates?: GeoPoint;
  isDefault: boolean;
}

export interface OpeningHours {
  monday: { open: string; close: string } | null;
  tuesday: { open: string; close: string } | null;
  wednesday: { open: string; close: string } | null;
  thursday: { open: string; close: string } | null;
  friday: { open: string; close: string } | null;
  saturday: { open: string; close: string } | null;
  sunday: { open: string; close: string } | null;
}

export interface PaymentMethodConfig {
  type: 'airtel_money' | 'moov_money' | 'stripe';
  number?: string;
  isActive: boolean;
}

export interface TeamMember {
  uid: string;
  name: string;
  email: string;
  role: 'admin' | 'seller' | 'delivery';
  isActive: boolean;
}