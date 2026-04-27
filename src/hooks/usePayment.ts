import { useState, useCallback } from 'react';
import { airtelPaymentService, AIRTEL_ERRORS } from '../services/payments/airtel';
import { formatXAF } from '../utils/formatCurrency';
import { useUIStore } from '../stores/uiStore';

interface UseAirtelPaymentReturn {
  initiatePayment: (phone: string, amount: number, reference: string) => Promise<{ success: boolean; transactionId?: string; message?: string }>;
  checkStatus: (transactionId: string) => Promise<{ success: boolean; status?: string; message?: string }>;
  isValidPhone: (phone: string) => boolean;
  loading: boolean;
  error: string | null;
}

export const useAirtelPayment = (): UseAirtelPaymentReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useUIStore();

  const initiatePayment = useCallback(async (
    phone: string,
    amount: number,
    reference: string
  ) => {
    setLoading(true);
    setError(null);

    if (!airtelPaymentService.isValidPhoneNumber(phone)) {
      setError(AIRTEL_ERRORS.INVALID_PHONE);
      addToast({ type: 'error', message: AIRTEL_ERRORS.INVALID_PHONE });
      setLoading(false);
      return { success: false, message: AIRTEL_ERRORS.INVALID_PHONE };
    }

    const formattedPhone = airtelPaymentService.formatPhoneNumber(phone);

    try {
      const response = await airtelPaymentService.initiatePayment({
        phone: formattedPhone,
        amount,
        reference,
      });

      if (response.success) {
        addToast({ type: 'success', message: 'Paiement initiated. Check your phone for USSD prompt.' });
        return {
          success: true,
          transactionId: response.transactionId,
          message: response.message,
        };
      } else {
        setError(response.message || AIRTEL_ERRORS.TRANSACTION_FAILED);
        addToast({ type: 'error', message: response.message || 'Paiement échoué' });
        return { success: false, message: response.message };
      }
    } catch (err: any) {
      const errorMessage = err.message || AIRTEL_ERRORS.NETWORK_ERROR;
      setError(errorMessage);
      addToast({ type: 'error', message: errorMessage });
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  const checkStatus = useCallback(async (transactionId: string) => {
    setLoading(true);
    try {
      const response = await airtelPaymentService.checkStatus(transactionId);
      return { success: response.success, status: response.status, message: response.message };
    } catch (err: any) {
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const isValidPhone = useCallback((phone: string) => {
    return airtelPaymentService.isValidPhoneNumber(phone);
  }, []);

  return {
    initiatePayment,
    checkStatus,
    isValidPhone,
    loading,
    error,
  };
};

export default useAirtelPayment;