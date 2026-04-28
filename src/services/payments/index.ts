import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebase/config';
import type { PaymentRequest, PaymentResponse } from '../../types/payment.types';

export type PaymentMethod = 'airtel_money' | 'moov_money' | 'visa' | 'mastercard';

export const initiatePayment = async (request: PaymentRequest): Promise<PaymentResponse> => {
  try {
    const initiateFn = httpsCallable(functions, 'initiatePayment');
    const result = await initiateFn(request);
    return result.data as PaymentResponse;
  } catch (error: unknown) {
    console.error('Payment initiation error:', error);
    const message = error instanceof Error ? error.message : 'Erreur lors du paiement';
    return {
      success: false,
      message,
    };
  }
};

export const checkPaymentStatus = async (transactionId: string): Promise<PaymentResponse> => {
  try {
    const statusFn = httpsCallable(functions, 'checkPaymentStatus');
    const result = await statusFn({ transactionId });
    return result.data as PaymentResponse;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur lors de la vérification';
    return {
      success: false,
      message,
    };
  }
};

export const getPaymentMethods = (): { method: PaymentMethod; label: string; icon: string }[] => [
  { method: 'airtel_money', label: 'Airtel Money', icon: 'phone-portrait' },
  { method: 'moov_money', label: 'Moov Money', icon: 'phone-portrait' },
  { method: 'visa', label: 'Visa', icon: 'card' },
  { method: 'mastercard', label: 'Mastercard', icon: 'card' },
];

export const formatPhoneForPayment = (phone: string, method: 'airtel_money' | 'moov_money'): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('241')) {
    return `+${cleaned}`;
  }
  if (cleaned.startsWith('0')) {
    return `+241${cleaned.slice(1)}`;
  }
  return `+241${cleaned}`;
};

export const isMobileMoneyMethod = (method: PaymentMethod): boolean => {
  return method === 'airtel_money' || method === 'moov_money';
};

export const isCardMethod = (method: PaymentMethod): boolean => {
  return method === 'visa' || method === 'mastercard';
};