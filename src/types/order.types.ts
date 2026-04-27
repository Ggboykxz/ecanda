import { Timestamp } from 'firebase/firestore';
import type { GeoPoint } from './user.types';

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'picked_up'
  | 'delivering'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  productId: string;
  vendorId: string;
  title: string;
  image: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  clientId: string;
  vendorId: string;
  deliveryId?: string;
  items: OrderItem[];
  status: OrderStatus;
  payment: PaymentInfo;
  subtotal: number;
  deliveryFee: number;
  commission: number;
  total: number;
  deliveryAddress: DeliveryAddress;
  timeline: TimelineEvent[];
  notes?: string;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
}

export interface PaymentInfo {
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  providerRef?: string;
}

export type PaymentMethod = 'airtel_money' | 'moov_money' | 'visa' | 'mastercard' | 'cash';
export type PaymentStatus = 'pending' | 'success' | 'failed' | 'refunded';

export interface DeliveryAddress {
  label: string;
  street: string;
  city: string;
  district?: string;
  coordinates?: GeoPoint;
  recipientName: string;
  recipientPhone: string;
}

export interface TimelineEvent {
  status: OrderStatus;
  timestamp: Timestamp | Date;
  note?: string;
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'En attente',
  confirmed: 'Confirmé',
  preparing: 'En préparation',
  picked_up: 'Retiré',
  delivering: 'En livraison',
  delivered: 'Livré',
  cancelled: 'Annulé',
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  pending: '#F59E0B',
  confirmed: '#3B82F6',
  preparing: '#8B5CF6',
  picked_up: '#6366F1',
  delivering: '#00D4AA',
  delivered: '#10B981',
  cancelled: '#EF4444',
};