import { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useRef, useMemo, useCallback } from 'react';
import { COLORS, SPACING, FONT_SIZE, RADIUS, SHADOW } from '../constants/theme';
import { formatXAF } from '../utils/formatCurrency';
import Button from './ui/Button';
import Input from './ui/Input';
import { airtelPaymentService } from '../services/payments/airtel';
import { moovPaymentService } from '../services/payments/moov';
import { StripePaymentService, STRIPE_TEST_CARDS } from '../services/payments/stripe';
import { useUIStore } from '../stores/uiStore';

type PaymentMethod = 'airtel_money' | 'moov_money' | 'visa' | 'mastercard';

interface PaymentSheetProps {
  isVisible: boolean;
  onClose: () => void;
  amount: number;
  orderId: string;
  onSuccess: (transactionId: string, method: PaymentMethod) => void;
  onError: (error: string) => void;
}

export const PaymentSheet: React.FC<PaymentSheetProps> = ({
  isVisible,
  onClose,
  amount,
  orderId,
  onSuccess,
  onError,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const { addToast } = useUIStore();

  const isMobileMoney = selectedMethod === 'airtel_money' || selectedMethod === 'moov_money';
  const isCard = selectedMethod === 'visa' || selectedMethod === 'mastercard';

  const handlePayment = async () => {
    if (!selectedMethod) return;

    setLoading(true);

    try {
      if (selectedMethod === 'airtel_money') {
        const formattedPhone = airtelPaymentService.formatPhoneNumber(phone);
        const response = await airtelPaymentService.initiatePayment({
          phone: formattedPhone,
          amount,
          reference: orderId,
        });

        if (response.success && response.transactionId) {
          addToast({ type: 'success', message: 'Paiement réussi!' });
          onSuccess(response.transactionId, selectedMethod);
        } else {
          addToast({ type: 'error', message: response.message || 'Paiement échoué' });
          onError(response.message || 'Paiement échoué');
        }
      } else if (selectedMethod === 'moov_money') {
        if (!otpSent) {
          const formattedPhone = moovPaymentService.formatPhoneNumber(phone);
          const response = await moovPaymentService.initiatePayment({
            phone: formattedPhone,
            amount,
            reference: orderId,
          });

          if (response.success && response.otpRequired) {
            setOtpSent(true);
            addToast({ type: 'info', message: 'Code OTP envoyé à votre téléphone' });
          } else if (response.success) {
            addToast({ type: 'success', message: 'Paiement réussi!' });
            onSuccess(response.transactionId || orderId, selectedMethod);
          } else {
            addToast({ type: 'error', message: response.message || 'Paiement échoué' });
            onError(response.message || 'Paiement échoué');
          }
        } else {
          const response = await moovPaymentService.verifyOTP(orderId, otp);
          if (response.success) {
            addToast({ type: 'success', message: 'Paiement réussi!' });
            onSuccess(orderId, selectedMethod);
          } else {
            addToast({ type: 'error', message: response.message || 'Code OTP invalide' });
          }
        }
      } else if (isCard) {
        const result = await StripePaymentService.createPaymentIntent(amount, 'XAF');
        if (result.success && result.clientSecret) {
          const sheetResult = await StripePaymentService.presentPaymentSheet(result.clientSecret);
          if (sheetResult.success) {
            addToast({ type: 'success', message: 'Paiement par carte réussi!' });
            onSuccess(orderId, selectedMethod);
          } else {
            addToast({ type: 'error', message: sheetResult.error || 'Paiement échoué' });
            onError(sheetResult.error || 'Paiement échoué');
          }
        } else {
          onError(result.error || 'Erreur Stripe');
        }
      }
    } catch (error: any) {
      addToast({ type: 'error', message: error.message || 'Une erreur est survenue' });
      onError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedMethod(null);
    setPhone('');
    setOtp('');
    setOtpSent(false);
    setLoading(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const renderPaymentMethods = () => (
    <View style={styles.methodsContainer}>
      <Text style={styles.sectionTitle}>Choisir le moyen de paiement</Text>
      
      <Pressable style={styles.methodCard} onPress={() => setSelectedMethod('airtel_money')}>
        <View style={[styles.methodIcon, { backgroundColor: '#E8F5E9' }]}>
          <Ionicons name="phone-portrait" size={24} color="#2E7D32" />
        </View>
        <View style={styles.methodInfo}>
          <Text style={styles.methodName}>Airtel Money</Text>
          <Text style={styles.methodSubtext}>Paiement mobile rapide</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={COLORS.gray400} />
      </Pressable>

      <Pressable style={styles.methodCard} onPress={() => setSelectedMethod('moov_money')}>
        <View style={[styles.methodIcon, { backgroundColor: '#FFF3E0' }]}>
          <Ionicons name="phone-portrait" size={24} color="#E65100" />
        </View>
        <View style={styles.methodInfo}>
          <Text style={styles.methodName}>Moov Money</Text>
          <Text style={styles.methodSubtext}>Paiement mobile</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={COLORS.gray400} />
      </Pressable>

      <Pressable style={styles.methodCard} onPress={() => setSelectedMethod('visa')}>
        <View style={[styles.methodIcon, { backgroundColor: '#E3F2FD' }]}>
          <Ionicons name="card" size={24} color="#1565C0" />
        </View>
        <View style={styles.methodInfo}>
          <Text style={styles.methodName}>Visa</Text>
          <Text style={styles.methodSubtext}>Carte bancaire</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={COLORS.gray400} />
      </Pressable>

      <Pressable style={styles.methodCard} onPress={() => setSelectedMethod('mastercard')}>
        <View style={[styles.methodIcon, { backgroundColor: '#FFF8E1' }]}>
          <Ionicons name="card" size={24} color="#FF8F00" />
        </View>
        <View style={styles.methodInfo}>
          <Text style={styles.methodName}>Mastercard</Text>
          <Text style={styles.methodSubtext}>Carte bancaire</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={COLORS.gray400} />
      </Pressable>
    </View>
  );

  const renderPaymentForm = () => (
    <View style={styles.formContainer}>
      <Pressable style={styles.backButton} onPress={() => setSelectedMethod(null)}>
        <Ionicons name="arrow-back" size={20} color={COLORS.gray700} />
        <Text style={styles.backText}>Retour</Text>
      </Pressable>

      <Text style={styles.formTitle}>
        {selectedMethod === 'airtel_money' ? 'Paiement Airtel Money' :
         selectedMethod === 'moov_money' ? 'Paiement Moov Money' :
         'Paiement par carte'}
      </Text>

      <View style={styles.amountContainer}>
        <Text style={styles.amountLabel}>Montant</Text>
        <Text style={styles.amountValue}>{formatXAF(amount)}</Text>
      </View>

      {isMobileMoney && (
        <>
          <Input
            label="Numéro de téléphone"
            placeholder="+241 77 XX XX XX"
            value={phone}
            onChangeText={setPhone}
            leftIcon="call-outline"
            keyboardType="phone-pad"
          />

          {otpSent && (
            <Input
              label="Code OTP"
              placeholder="Entrez le code OTP"
              value={otp}
              onChangeText={setOtp}
              leftIcon="key-outline"
              keyboardType="number-pad"
              maxLength={6}
            />
          )}

          <Text style={styles.hint}>
            {selectedMethod === 'moov_money' && !otpSent 
              ? 'Vous recevrez un code OTP par SMS'
              : 'Vous recevrez une notification USSD sur votre téléphone'}
          </Text>
        </>
      )}

      {isCard && (
        <View style={styles.cardInfo}>
          <Ionicons name="information-circle" size={20} color={COLORS.info} />
          <Text style={styles.cardInfoText}>
            Test: {STRIPE_TEST_CARDS.VISA} • CVC: 123 • Exp: 12/30
          </Text>
        </View>
      )}

      <Button
        title={loading ? 'Traitement...' : otpSent ? 'Vérifier OTP' : 'Payer maintenant'}
        onPress={handlePayment}
        disabled={loading || (isMobileMoney && !phone)}
        fullWidth
        style={styles.payButton}
      />
    </View>
  );

  if (!isVisible) return null;

  return (
    <Modal visible={isVisible} transparent animationType="slide" onRequestClose={handleClose}>
      <Pressable style={styles.overlay} onPress={handleClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <View style={styles.handle} />
          
          <ScrollView showsVerticalScrollIndicator={false}>
            {selectedMethod ? renderPaymentForm() : renderPaymentMethods()}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xxl,
    maxHeight: '80%',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.gray300,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.gray900,
    marginBottom: SPACING.lg,
  },
  methodsContainer: {
    paddingTop: SPACING.sm,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray50,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  methodName: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.gray900,
  },
  methodSubtext: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
  },
  formContainer: {
    paddingTop: SPACING.sm,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  backText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray700,
    marginLeft: SPACING.xs,
  },
  formTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.gray900,
    marginBottom: SPACING.lg,
  },
  amountContainer: {
    backgroundColor: COLORS.gray50,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  amountLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
  },
  amountValue: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: SPACING.xs,
  },
  hint: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
    marginBottom: SPACING.lg,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${COLORS.info}15`,
    borderRadius: RADIUS.md,
    padding: SPACING.sm,
    marginBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  cardInfoText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.info,
    flex: 1,
  },
  payButton: {
    marginTop: SPACING.md,
  },
});

export default PaymentSheet;