import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { useStripe as useStripeCore } from '@stripe/stripe-react-native';
import { useState, useCallback } from 'react';
import { initPaymentSheet, presentPaymentSheet, createPaymentMethod, createPaymentIntent } from '@stripe/stripe-react-native';
import { STRIPE_PUBLISHABLE_KEY } from '../../../config/env';

export const StripePaymentService = {
  initialize: async () => {
    try {
      await initPaymentSheet({
        merchantDisplayName: 'ECANDA',
        stripeSecretKey: process.env.STRIPE_SECRET_KEY,
      });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  createPaymentIntent: async (amount: number, currency: string = 'XAF', customerId?: string) => {
    try {
      const response = await createPaymentIntent({
        amount,
        currency,
        customer: customerId,
      });
      return { success: true, clientSecret: response.paymentIntent?.client_secret };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  presentPaymentSheet: async (clientSecret: string) => {
    try {
      const result = await presentPaymentSheet({
        clientSecret,
      });
      if (result.error) {
        return { success: false, error: result.error.message };
      }
      return { success: true, paymentResult: result };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  createPaymentMethod: async (cardDetails: { number: string; expMonth: number; expYear: number; cvc: string }) => {
    try {
      const result = await createPaymentMethod({
        card: cardDetails,
      });
      if (result.error) {
        return { success: false, error: result.error.message };
      }
      return { success: true, paymentMethodId: result.paymentMethod?.id };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
};

export const useStripePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processPayment = useCallback(async (amount: number, orderId: string) => {
    setLoading(true);
    setError(null);

    try {
      const { clientSecret, error: intentError } = await StripePaymentService.createPaymentIntent(
        amount,
        'XAF'
      );

      if (intentError || !clientSecret) {
        setError(intentError || 'Erreur de paiement');
        return { success: false, error: intentError };
      }

      const { paymentResult, error: sheetError } = await StripePaymentService.presentPaymentSheet(clientSecret);

      if (sheetError) {
        setError(sheetError);
        return { success: false, error: sheetError };
      }

      return { success: true, paymentResult };
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  return { processPayment, loading, error };
};

export const STRIPE_TEST_CARDS = {
  VISA: '4242424242424242',
  MASTERCARD: '5555555555554444',
  DECLINE: '4000000000000002',
};

export default StripePaymentService;