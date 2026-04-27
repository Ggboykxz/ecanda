import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebase/config';

interface MoovPaymentRequest {
  phone: string;
  amount: number;
  reference: string;
  callbackUrl?: string;
}

interface MoovPaymentResponse {
  success: boolean;
  transactionId?: string;
  message?: string;
  status?: string;
  otpRequired?: boolean;
}

interface MoovStatusResponse {
  success: boolean;
  status: 'pending' | 'success' | 'failed' | 'cancelled';
  message?: string;
  transactionId?: string;
  providerRef?: string;
}

export const moovPaymentService = {
  initiatePayment: async (request: MoovPaymentRequest): Promise<MoovPaymentResponse> => {
    try {
      const initiateMoovPayment = httpsCallable(functions, 'moovPaymentInitiate');
      const result = await initiateMoovPayment(request);
      return result.data as MoovPaymentResponse;
    } catch (error: any) {
      console.error('Moov payment error:', error);
      return {
        success: false,
        message: error.message || 'Erreur de paiement Moov',
      };
    }
  },

  verifyOTP: async (transactionId: string, otp: string): Promise<MoovPaymentResponse> => {
    try {
      const verifyMoovOTP = httpsCallable(functions, 'moovPaymentVerifyOTP');
      const result = await verifyMoovOTP({ transactionId, otp });
      return result.data as MoovPaymentResponse;
    } catch (error: any) {
      console.error('Moov OTP verification error:', error);
      return {
        success: false,
        message: error.message || 'Erreur de vérification OTP',
      };
    }
  },

  checkStatus: async (transactionId: string): Promise<MoovStatusResponse> => {
    try {
      const checkMoovStatus = httpsCallable(functions, 'moovPaymentStatus');
      const result = await checkMoovStatus({ transactionId });
      return result.data as MoovStatusResponse;
    } catch (error: any) {
      console.error('Moov status check error:', error);
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
    if (cleaned.startsWith('6') || cleaned.startsWith('5')) {
      return `+241${cleaned}`;
    }
    return `+241${cleaned}`;
  },

  isValidPhoneNumber: (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, '');
    const patterns = [
      /^2416[256]\d{5}$/,
      /^2415[89]\d{5}$/,
      /^6[256]\d{6}$/,
      /^5[89]\d{6}$/,
    ];
    return patterns.some(pattern => pattern.test(cleaned)) || cleaned.length >= 9;
  },

  getSupportedNetworks: () => ['Moov Africa'],

  getTestPhoneNumber: (): string => '+24166123456',
};

export const MOOV_ERRORS = {
  INVALID_PHONE: 'Numéro de téléphone invalide',
  INSUFFICIENT_BALANCE: 'Solde insuffisant',
  TRANSACTION_FAILED: 'Transaction échouée',
  NETWORK_ERROR: 'Erreur réseau',
  USER_CANCELLED: 'Opération annulée par l\'utilisateur',
  OTP_REQUIRED: 'Code OTP requis',
  OTP_INVALID: 'Code OTP invalide',
  TIMEOUT: 'Délai d\'attente dépassé',
};

export default moovPaymentService;