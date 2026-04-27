import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebase/config';

interface AirtelPaymentRequest {
  phone: string;
  amount: number;
  reference: string;
  callbackUrl?: string;
}

interface AirtelPaymentResponse {
  success: boolean;
  transactionId?: string;
  message?: string;
  status?: string;
  redirectUrl?: string;
}

interface AirtelStatusResponse {
  success: boolean;
  status: 'pending' | 'success' | 'failed' | 'cancelled';
  message?: string;
  transactionId?: string;
  providerRef?: string;
}

export const airtelPaymentService = {
  initiatePayment: async (request: AirtelPaymentRequest): Promise<AirtelPaymentResponse> => {
    try {
      const initiateAirtelPayment = httpsCallable(functions, 'airtelPaymentInitiate');
      const result = await initiateAirtelPayment(request);
      return result.data as AirtelPaymentResponse;
    } catch (error: any) {
      console.error('Airtel payment error:', error);
      return {
        success: false,
        message: error.message || 'Erreur de paiement Airtel',
      };
    }
  },

  checkStatus: async (transactionId: string): Promise<AirtelStatusResponse> => {
    try {
      const checkAirtelStatus = httpsCallable(functions, 'airtelPaymentStatus');
      const result = await checkAirtelStatus({ transactionId });
      return result.data as AirtelStatusResponse;
    } catch (error: any) {
      console.error('Airtel status check error:', error);
      return {
        success: false,
        status: 'failed',
        message: error.message,
      };
    }
  },

  formatPhoneNumber: (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('241')) {
      return `+${cleaned}`;
    }
    if (cleaned.startsWith('0')) {
      return `+241${cleaned.slice(1)}`;
    }
    if (cleaned.startsWith('7') || cleaned.startsWith('8')) {
      return `+241${cleaned}`;
    }
    return `+241${cleaned}`;
  },

  isValidPhoneNumber: (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, '');
    const patterns = [
      /^2417[5678]\d{5}$/,
      /^2410[67]\d{5}$/,
      /^7[5678]\d{6}$/,
      /^0[67]\d{6}$/,
    ];
    return patterns.some(pattern => pattern.test(cleaned)) || cleaned.length >= 9;
  },

  getSupportedNetworks: () => ['Airtel'],

  getTestPhoneNumber: (): string => '+24177123456',
};

export const AIRTEL_ERRORS = {
  INVALID_PHONE: 'Numéro de téléphone invalide',
  INSUFFICIENT_BALANCE: 'Solde insuffisant',
  TRANSACTION_FAILED: 'Transaction échouée',
  NETWORK_ERROR: 'Erreur réseau',
  USER_CANCELLED: 'Opération annulée par l\'utilisateur',
  TIMEOUT: 'Délai d\'attente dépassé',
};

export default airtelPaymentService;