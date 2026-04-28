import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, RADIUS, SHADOW } from '@/src/constants/theme';
import Badge from '@/src/components/ui/Badge';
import { formatXAF, formatRelativeTime } from '@/src/utils/formatCurrency';
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '@/src/types/order.types';

const MOCK_ORDERS = [
  {
    id: 'ORD-001',
    items: [
      { title: 'Poulet fermier - 2kg', image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400', quantity: 2, price: 8500 },
      { title: 'Beurre de karité', image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400', quantity: 1, price: 3500 },
    ],
    status: 'delivering' as const,
    total: 20500,
    deliveryFee: 1500,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    vendorName: 'Ferme du Nord',
  },
  {
    id: 'ORD-002',
    items: [
      { title: 'Sac en fibres naturelles', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400', quantity: 1, price: 15000 },
    ],
    status: 'delivered' as const,
    total: 15000,
    deliveryFee: 0,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    vendorName: 'Artisanat Gabon',
  },
  {
    id: 'ORD-003',
    items: [
      { title: 'Smartphone', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', quantity: 1, price: 125000 },
    ],
    status: 'pending' as const,
    total: 127000,
    deliveryFee: 2000,
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
    vendorName: 'Tech Libreville',
  },
];

export default function OrdersScreen() {
  const getStatusBadge = (status: string) => {
    const variant = status === 'delivered' ? 'success' : status === 'delivering' ? 'info' : status === 'pending' ? 'warning' : 'error';
    return <Badge label={ORDER_STATUS_LABELS[status as keyof typeof ORDER_STATUS_LABELS]} variant={variant} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes commandes</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {MOCK_ORDERS.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View>
                <Text style={styles.orderId}>{order.id}</Text>
                <Text style={styles.orderDate}>{formatRelativeTime(order.createdAt)}</Text>
              </View>
              {getStatusBadge(order.status)}
            </View>

            <View style={styles.orderItems}>
              {order.items.map((item, index) => (
                <View key={index} style={styles.orderItem}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} contentFit="cover" />
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.itemQty}>x{item.quantity}</Text>
                  </View>
                  <Text style={styles.itemPrice}>{formatXAF(item.price * item.quantity)}</Text>
                </View>
              ))}
            </View>

            <View style={styles.orderFooter}>
              <View style={styles.vendorInfo}>
                <Ionicons name="storefront-outline" size={16} color={COLORS.gray500} />
                <Text style={styles.vendorName}>{order.vendorName}</Text>
              </View>
              <View style={styles.totalInfo}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{formatXAF(order.total)}</Text>
              </View>
            </View>

            {order.status === 'delivering' && (
              <View style={styles.tracking}>
                <View style={styles.trackingStep}>
                  <View style={[styles.trackingDot, styles.trackingDotActive]} />
                  <Text style={styles.trackingText}>Commande confirmée</Text>
                </View>
                <View style={styles.trackingStep}>
                  <View style={[styles.trackingDot, styles.trackingDotActive]} />
                  <Text style={styles.trackingText}>En préparation</Text>
                </View>
                <View style={styles.trackingStep}>
                  <View style={[styles.trackingDot, styles.trackingDotActive]} />
                  <Text style={styles.trackingText}>En livraison</Text>
                </View>
                <View style={styles.trackingStep}>
                  <View style={styles.trackingDot} />
                  <Text style={[styles.trackingText, styles.trackingTextInactive]}>Livré</Text>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray50,
  },
  header: {
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
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  orderCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOW.sm,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  orderId: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.gray900,
  },
  orderDate: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray500,
    marginTop: 2,
  },
  orderItems: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.gray100,
    paddingVertical: SPACING.md,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  itemImage: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.gray100,
  },
  itemInfo: {
    flex: 1,
    marginLeft: SPACING.sm,
  },
  itemTitle: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray900,
  },
  itemQty: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray500,
  },
  itemPrice: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    color: COLORS.gray900,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  vendorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  vendorName: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray500,
  },
  totalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  totalLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray600,
  },
  totalValue: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.primary,
  },
  tracking: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray100,
  },
  trackingStep: {
    alignItems: 'center',
  },
  trackingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.gray200,
    marginBottom: 4,
  },
  trackingDotActive: {
    backgroundColor: COLORS.accent,
  },
  trackingText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray900,
    fontWeight: '500',
  },
  trackingTextInactive: {
    color: COLORS.gray400,
  },
});