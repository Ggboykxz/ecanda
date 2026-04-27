import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, RADIUS, SHADOW } from '../../../src/constants/theme';
import { formatXAF, formatRelativeTime } from '../../../src/utils/formatCurrency';
import { ORDER_STATUS_LABELS } from '../../../src/types/order.types';
import Badge from '../../../src/components/ui/Badge';

const MOCK_ORDERS = [
  { id: 'ORD-001', customer: 'Marie K.', phone: '+241 77 XX XX XX', items: [{ title: 'Poulet fermier', qty: 2, price: 8500, image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400' }], total: 17500, deliveryFee: 1500, status: 'pending', createdAt: new Date(Date.now() - 15 * 60000) },
  { id: 'ORD-002', customer: 'Jean M.', phone: '+241 66 XX XX XX', items: [{ title: 'Sac en fibres', qty: 1, price: 15000, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400' }], total: 15000, deliveryFee: 0, status: 'confirmed', createdAt: new Date(Date.now() - 45 * 60000) },
  { id: 'ORD-003', customer: 'Paul B.', phone: '+241 62 XX XX XX', items: [{ title: 'Beurre de karité', qty: 4, price: 3500, image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400' }], total: 14000, deliveryFee: 0, status: 'preparing', createdAt: new Date(Date.now() - 2 * 3600000) },
  { id: 'ORD-004', customer: 'Sophie L.', phone: '+241 65 XX XX XX', items: [{ title: 'Table basse', qty: 1, price: 45000, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400' }], total: 45000, deliveryFee: 2000, status: 'delivered', createdAt: new Date(Date.now() - 24 * 3600000) },
];

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'pending': return 'warning';
    case 'confirmed': return 'info';
    case 'preparing': return 'secondary';
    case 'delivered': return 'success';
    case 'cancelled': return 'error';
    default: return 'primary';
  }
};

export default function VendorOrdersScreen() {
  const pendingOrders = MOCK_ORDERS.filter(o => o.status === 'pending').length;
  const totalRevenue = MOCK_ORDERS.reduce((sum, o) => sum + o.total, 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Commandes</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <View style={[styles.statIcon, { backgroundColor: `${COLORS.warning}15` }]}>
            <Ionicons name="time" size={20} color={COLORS.warning} />
          </View>
          <Text style={styles.statValue}>{pendingOrders}</Text>
          <Text style={styles.statLabel}>En attente</Text>
        </View>
        <View style={styles.statItem}>
          <View style={[styles.statIcon, { backgroundColor: `${COLORS.success}15` }]}>
            <Ionicons name="cash" size={20} color={COLORS.success} />
          </View>
          <Text style={styles.statValue}>{formatXAF(totalRevenue)}</Text>
          <Text style={styles.statLabel}>Revenus</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {MOCK_ORDERS.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View>
                <Text style={styles.orderId}>{order.id}</Text>
                <Text style={styles.orderTime}>{formatRelativeTime(order.createdAt)}</Text>
              </View>
              <Badge label={ORDER_STATUS_LABELS[order.status as keyof typeof ORDER_STATUS_LABELS]} variant={getStatusVariant(order.status) as any} />
            </View>

            <View style={styles.orderCustomer}>
              <Ionicons name="person-outline" size={16} color={COLORS.gray500} />
              <Text style={styles.customerName}>{order.customer}</Text>
              <Text style={styles.customerPhone}>{order.phone}</Text>
            </View>

            <View style={styles.orderItems}>
              {order.items.map((item, index) => (
                <View key={index} style={styles.orderItem}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} contentFit="cover" />
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemQty}>x{item.qty}</Text>
                  </View>
                  <Text style={styles.itemPrice}>{formatXAF(item.price * item.qty)}</Text>
                </View>
              ))}
            </View>

            <View style={styles.orderFooter}>
              <View style={styles.deliveryInfo}>
                <Ionicons name="bicycle-outline" size={16} color={COLORS.gray500} />
                <Text style={styles.deliveryText}>
                  {order.deliveryFee > 0 ? `Livraison: ${formatXAF(order.deliveryFee)}` : 'Retrait en main propre'}
                </Text>
              </View>
              <Text style={styles.orderTotal}>{formatXAF(order.total)}</Text>
            </View>

            <View style={styles.orderActions}>
              {order.status === 'pending' && (
                <>
                  <Pressable style={[styles.actionButton, styles.acceptButton]}>
                    <Ionicons name="checkmark" size={18} color={COLORS.white} />
                    <Text style={styles.actionButtonText}>Accepter</Text>
                  </Pressable>
                  <Pressable style={[styles.actionButton, styles.rejectButton]}>
                    <Ionicons name="close" size={18} color={COLORS.error} />
                    <Text style={[styles.actionButtonText, { color: COLORS.error }]}>Refuser</Text>
                  </Pressable>
                </>
              )}
              {order.status === 'confirmed' && (
                <Pressable style={[styles.actionButton, styles.prepareButton]}>
                  <Ionicons name="restaurant" size={18} color={COLORS.white} />
                  <Text style={styles.actionButtonText}>Marquer prêt</Text>
                </Pressable>
              )}
              {order.status === 'preparing' && (
                <Pressable style={[styles.actionButton, styles.deliverButton]}>
                  <Ionicons name="bicycle" size={18} color={COLORS.white} />
                  <Text style={styles.actionButtonText}>Remis au livreur</Text>
                </Pressable>
              )}
            </View>
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
  statsRow: {
    flexDirection: 'row',
    margin: SPACING.lg,
    gap: SPACING.md,
  },
  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    ...SHADOW.sm,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  statValue: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.gray900,
    flex: 1,
  },
  statLabel: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray500,
  },
  content: {
    paddingHorizontal: SPACING.lg,
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
    marginBottom: SPACING.sm,
  },
  orderId: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.gray900,
  },
  orderTime: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray500,
  },
  orderCustomer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginBottom: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  customerName: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    color: COLORS.gray900,
  },
  customerPhone: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
  },
  orderItems: {
    marginBottom: SPACING.md,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  itemImage: {
    width: 40,
    height: 40,
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
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray100,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  deliveryText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray500,
  },
  orderTotal: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.primary,
  },
  orderActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
    gap: SPACING.xs,
  },
  acceptButton: {
    backgroundColor: COLORS.success,
  },
  rejectButton: {
    backgroundColor: COLORS.gray100,
  },
  prepareButton: {
    backgroundColor: COLORS.info,
  },
  deliverButton: {
    backgroundColor: COLORS.primary,
  },
  actionButtonText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    color: COLORS.white,
  },
});