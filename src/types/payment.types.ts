import { Timestamp } from 'firebase/firestore';
import type { PaymentMethod, PaymentStatus } from './order.types';

export interface Payment {
  id: string;
  orderId: string;
  userId: string;
  method: PaymentMethod;
  amount: number;
  currency: 'XAF';
  status: PaymentStatus;
  providerRef?: string;
  metadata?: Record<string, unknown>;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
}

export interface PaymentRequest {
  method: PaymentMethod;
  orderId: string;
  amount: number;
  currency: string;
  phone?: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  message?: string;
  providerData?: {
    redirectUrl?: string;
    status: string;
  };
}

export interface AirtelMoneyConfig {
  merchantId: string;
  apiKey: string;
  callbackUrl: string;
  environment: 'sandbox' | 'production';
}

export interface MoovMoneyConfig {
  partnerId: string;
  apiKey: string;
  callbackUrl: string;
  environment: 'sandbox' | 'production';
}

export interface StripeConfig {
  publishableKey: string;
  merchantId: string;
  countryCode: 'GA';
}