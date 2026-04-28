import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, RADIUS, SHADOW } from '@/src/constants/theme';
import Button from '@/src/components/ui/Button';
import { formatXAF } from '@/src/utils/formatCurrency';

const MOCK_CART_ITEMS = [
  {
    id: '1',
    title: 'Poulet fermier - 2kg',
    image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400',
    price: 8500,
    quantity: 2,
    vendor: 'Ferme du Nord',
  },
  {
    id: '2',
    title: 'Beurre de karité naturel',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400',
    price: 3500,
    quantity: 1,
    vendor: 'Artisanat Local',
  },
];

export default function CartScreen() {
  const subtotal = MOCK_CART_ITEMS.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 1500;
  const total = subtotal + deliveryFee;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Panier</Text>
        <Text style={styles.itemCount}>{MOCK_CART_ITEMS.length} articles</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {MOCK_CART_ITEMS.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} contentFit="cover" />
            <View style={styles.itemDetails}>
              <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.itemVendor}>{item.vendor}</Text>
              <View style={styles.itemFooter}>
                <Text style={styles.itemPrice}>{formatXAF(item.price)}</Text>
                <View style={styles.quantityControl}>
                  <Pressable style={styles.quantityButton}>
                    <Ionicons name="remove" size={16} color={COLORS.gray600} />
                  </Pressable>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <Pressable style={styles.quantityButton}>
                    <Ionicons name="add" size={16} color={COLORS.gray600} />
                  </Pressable>
                </View>
              </View>
            </View>
            <Pressable style={styles.removeButton}>
              <Ionicons name="trash-outline" size={20} color={COLORS.error} />
            </Pressable>
          </View>
        ))}

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Résumé</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Sous-total</Text>
            <Text style={styles.summaryValue}>{formatXAF(subtotal)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Livraison</Text>
            <Text style={styles.summaryValue}>{formatXAF(deliveryFee)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatXAF(total)}</Text>
          </View>
        </View>

        <View style={styles.deliveryOption}>
          <View style={styles.deliveryIcon}>
            <Ionicons name="bicycle" size={24} color={COLORS.primary} />
          </View>
          <View style={styles.deliveryInfo}>
            <Text style={styles.deliveryTitle}>Livraison à domicile</Text>
            <Text style={styles.deliverySubtitle}>Livré dans 24-48h</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.gray400} />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.footerTotalLabel}>Total</Text>
          <Text style={styles.footerTotalValue}>{formatXAF(total)}</Text>
        </View>
        <Button
          title="Passer la commande"
          variant="primary"
          size="lg"
          fullWidth
          onPress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.white,
    ...SHADOW.sm,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: COLORS.gray900,
  },
  itemCount: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.sm,
    marginBottom: SPACING.md,
    ...SHADOW.sm,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.gray100,
  },
  itemDetails: {
    flex: 1,
    marginLeft: SPACING.sm,
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.gray900,
  },
  itemVendor: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray500,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.primary,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.gray900,
    minWidth: 24,
    textAlign: 'center',
  },
  removeButton: {
    padding: SPACING.xs,
  },
  summaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOW.sm,
  },
  summaryTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.gray900,
    marginBottom: SPACING.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  summaryLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray600,
  },
  summaryValue: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray900,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray200,
    marginVertical: SPACING.sm,
  },
  totalLabel: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.gray900,
  },
  totalValue: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.primary,
  },
  deliveryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    ...SHADOW.sm,
  },
  deliveryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${COLORS.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveryInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  deliveryTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.gray900,
  },
  deliverySubtitle: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
  },
  footer: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    paddingBottom: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray100,
    gap: SPACING.md,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerTotalLabel: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray600,
  },
  footerTotalValue: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: COLORS.primary,
  },
});