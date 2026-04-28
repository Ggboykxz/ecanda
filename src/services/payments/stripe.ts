import { initPaymentSheet, presentPaymentSheet, createPaymentMethod } from '@stripe/stripe-react-native';

export const STRIPE_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder';

export const STRIPE_TEST_CARDS = {
  success: '4242424242424242',
  declined: '4000000000000002',
};

export const StripePaymentService = {
  initialize: async () => {
    try {
      await initPaymentSheet({
        merchantDisplayName: 'ECANDA',
      });
      return { success: true };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: message };
    }
  },

  presentPaymentSheet: async (clientSecret: string) => {
    try {
      const result = await presentPaymentSheet({ clientSecret });
      if (result.error) {
        return { success: false, error: result.error.message };
      }
      return { success: true, paymentResult: result };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: message };
    }
  },

  createPaymentMethod: async (cardDetails: { number: string; expMonth: number; expYear: number; cvc: string }) => {
    try {
      const result = await createPaymentMethod({
        card: {
          number: cardDetails.number,
          expMonth: cardDetails.expMonth,
          expYear: cardDetails.expYear,
          cvc: cardDetails.cvc,
        },
      });
      if (result.error) {
        return { success: false, error: result.error.message };
      }
      return { success: true, paymentMethodId: result.paymentMethod?.id };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: message };
    }
  },
};