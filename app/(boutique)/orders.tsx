import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, RADIUS, SHADOW } from '@/src/constants/theme';
import { formatXAF, formatRelativeTime } from '@/src/utils/formatCurrency';
import { ORDER_STATUS_LABELS } from '@/src/types/order.types';
import type { OrderStatus } from '@/src/types/order.types';
import Badge from '@/src/components/ui/Badge';
import Button from '@/src/components/ui/Button';

const MOCK_ORDERS = [
  { id: 'ORD-001', customer: 'Marie K.', phone: '+241 77 XX XX XX', address: 'Libreville, Akanda', items: [{ title: 'Poulet fermier', qty: 2, price: 8500, image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400' }, { title: 'Beurre de karité', qty: 1, price: 3500, image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400' }], subtotal: 20500, deliveryFee: 1500, total: 22000, status: 'pending', payment: 'paid', createdAt: new Date(Date.now() - 15 * 60000) },
  { id: 'ORD-002', customer: 'Jean M.', phone: '+241 66 XX XX XX', address: 'Port-Gentil, Centre', items: [{ title: 'Sac en fibres', qty: 1, price: 15000, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400' }], subtotal: 15000, deliveryFee: 0, total: 15000, status: 'confirmed', payment: 'paid', createdAt: new Date(Date.now() - 45 * 60000) },
  { id: 'ORD-003', customer: 'Paul B.', phone: '+241 62 XX XX XX', address: 'Libreville, Bonendong', items: [{ title: 'Table basse', qty: 1, price: 45000, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400' }], subtotal: 45000, deliveryFee: 2000, total: 47000, status: 'preparing', payment: 'paid', createdAt: new Date(Date.now() - 2 * 3600000) },
];

export default function BoutiqueOrdersScreen() {
  const pendingOrders = MOCK_ORDERS.filter(o => o.status === 'pending').length;
  const confirmedOrders = MOCK_ORDERS.filter(o => o.status === 'confirmed' || o.status === 'preparing').length;
  const totalRevenue = MOCK_ORDERS.reduce((sum, o) => sum + o.total, 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}><Text style={styles.title}>Commandes</Text></View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}><Text style={styles.statValue}>{pendingOrders}</Text><Text style={styles.statLabel}>En attente</Text></View>
        <View style={styles.statCard}><Text style={styles.statValue}>{confirmedOrders}</Text><Text style={styles.statLabel}>En cours</Text></View>
        <View style={styles.statCard}><Text style={[styles.statValue, { color: COLORS.success }]}>{formatXAF(totalRevenue)}</Text><Text style={styles.statLabel}>Revenus</Text></View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {MOCK_ORDERS.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View><Text style={styles.orderId}>{order.id}</Text><Text style={styles.orderTime}>{formatRelativeTime(order.createdAt)}</Text></View>
              <Badge label={ORDER_STATUS_LABELS[order.status as OrderStatus]} variant={order.status === 'pending' ? 'warning' : order.status === 'delivered' ? 'success' : 'info'} />
            </View>

            <View style={styles.orderCustomer}>
              <Ionicons name="person-outline" size={14} color={COLORS.gray500} /><Text style={styles.customerName}>{order.customer}</Text>
              <Text style={styles.customerPhone}>{order.phone}</Text>
            </View>

            <View style={styles.orderAddress}>
              <Ionicons name="location-outline" size={14} color={COLORS.gray500} /><Text style={styles.addressText}>{order.address}</Text>
            </View>

            <View style={styles.orderItems}>
              {order.items.map((item, idx) => (
                <View key={idx} style={styles.orderItem}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="cover" />
                  <View style={styles.itemInfo}><Text style={styles.itemTitle}>{item.title}</Text><Text style={styles.itemQty}>x{item.qty}</Text></View>
                  <Text style={styles.itemPrice}>{formatXAF(item.price * item.qty)}</Text>
                </View>
              ))}
            </View>

            <View style={styles.orderFooter}>
              <View style={styles.paymentStatus}>
                <Ionicons name={order.payment === 'paid' ? 'checkmark-circle' : 'time'} size={16} color={order.payment === 'paid' ? COLORS.success : COLORS.warning} />
                <Text style={[paymentText, { color: order.payment === 'paid' ? COLORS.success : COLORS.warning }]}>{order.payment === 'paid' ? 'Payé' : 'En attente'}</Text>
              </View>
              <Text style={styles.orderTotal}>{formatXAF(order.total)}</Text>
            </View>

            <View style={styles.orderActions}>
              {order.status === 'pending' && <Button title="Confirmer" variant="primary" size="sm" onPress={() => {}} style={styles.actionBtn} />}
              {order.status === 'confirmed' && <Button title="En préparation" variant="secondary" size="sm" onPress={() => {}} style={styles.actionBtn} />}
              {order.status === 'preparing' && <Button title="Marquer prêt" variant="primary" size="sm" onPress={() => {}} style={styles.actionBtn} />}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.gray50 },
  header: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.md, paddingBottom: SPACING.md, backgroundColor: COLORS.white, ...SHADOW.sm },
  title: { fontSize: FONT_SIZE.xl, fontWeight: '700', color: COLORS.gray900 },
  statsRow: { flexDirection: 'row', padding: SPACING.lg, gap: SPACING.md },
  statCard: { flex: 1, backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md, alignItems: 'center', ...SHADOW.sm },
  statValue: { fontSize: FONT_SIZE.xl, fontWeight: '700', color: COLORS.gray900 },
  statLabel: { fontSize: FONT_SIZE.xs, color: COLORS.gray500 },
  content: { paddingHorizontal: SPACING.lg },
  orderCard: { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md, marginBottom: SPACING.md, ...SHADOW.sm },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: SPACING.sm },
  orderId: { fontSize: FONT_SIZE.md, fontWeight: '700', color: COLORS.gray900 },
  orderTime: { fontSize: FONT_SIZE.xs, color: COLORS.gray500 },
  orderCustomer: { flexDirection: 'row', alignItems: 'center', gap: SPACING.xs, marginBottom: SPACING.xs },
  customerName: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: COLORS.gray900 },
  customerPhone: { fontSize: FONT_SIZE.sm, color: COLORS.gray500 },
  orderAddress: { flexDirection: 'row', alignItems: 'center', gap: SPACING.xs, marginBottom: SPACING.md, paddingBottom: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.gray100 },
  addressText: { fontSize: FONT_SIZE.sm, color: COLORS.gray600 },
  orderItems: { marginBottom: SPACING.md },
  orderItem: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.xs },
  itemImage: { width: 40, height: 40, borderRadius: RADIUS.sm, backgroundColor: COLORS.gray100 },
  itemInfo: { flex: 1, marginLeft: SPACING.sm },
  itemTitle: { fontSize: FONT_SIZE.sm, color: COLORS.gray900 },
  itemQty: { fontSize: FONT_SIZE.xs, color: COLORS.gray500 },
  itemPrice: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: COLORS.gray900 },
  orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: SPACING.sm, borderTopWidth: 1, borderTopColor: COLORS.gray100 },
  paymentStatus: { flexDirection: 'row', alignItems: 'center', gap: SPACING.xs },
  orderTotal: { fontSize: FONT_SIZE.md, fontWeight: '700', color: COLORS.primary },
  orderActions: { flexDirection: 'row', marginTop: SPACING.md, gap: SPACING.sm },
  actionBtn: { flex: 1 },
});

const paymentText = { fontSize: FONT_SIZE.sm, fontWeight: '500' };
