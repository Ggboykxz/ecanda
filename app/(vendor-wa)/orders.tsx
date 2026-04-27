import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, RADIUS, SHADOW } from '../../../src/constants/theme';
import { formatXAF, formatRelativeTime } from '../../../src/utils/formatCurrency';
import { ORDER_STATUS_LABELS } from '../../../src/types/order.types';
import Badge from '../../../src/components/ui/Badge';

const MOCK_ORDERS = [
  { id: 'ORD-001', source: 'Groupe Famille', customer: 'Marie K.', phone: '+241 77 XX XX XX', items: [{ title: 'Sac en fibres', qty: 1, price: 15000, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400' }], total: 15500, status: 'pending', createdAt: new Date(Date.now() - 15 * 60000) },
  { id: 'ORD-002', source: 'Clients Réguliers', customer: 'Jean M.', phone: '+241 66 XX XX XX', items: [{ title: 'Beurre de karité', qty: 2, price: 3500, image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400' }], total: 7500, status: 'confirmed', createdAt: new Date(Date.now() - 45 * 60000) },
  { id: 'ORD-003', source: 'Nouvelle Collection', customer: 'Paul B.', phone: '+241 62 XX XX XX', items: [{ title: 'T-shirt Coton', qty: 3, price: 8000, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400' }], total: 24000, status: 'delivered', createdAt: new Date(Date.now() - 24 * 3600000) },
];

export default function VendorWAOrdersScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Commandes WhatsApp</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {MOCK_ORDERS.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View>
                <View style={styles.sourceTag}>
                  <Ionicons name="logo-whatsapp" size={12} color={COLORS.success} />
                  <Text style={styles.sourceText}>{order.source}</Text>
                </View>
                <Text style={styles.orderId}>{order.id}</Text>
              </View>
              <Badge label={ORDER_STATUS_LABELS[order.status]} variant={order.status === 'delivered' ? 'success' : order.status === 'pending' ? 'warning' : 'info'} />
            </View>

            <View style={styles.orderCustomer}>
              <Text style={styles.customerName}>{order.customer}</Text>
              <Text style={styles.customerPhone}>{order.phone}</Text>
              <Text style={styles.orderTime}>{formatRelativeTime(order.createdAt)}</Text>
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
              <Text style={styles.orderTotal}>{formatXAF(order.total)}</Text>
              <View style={styles.orderActions}>
                <Pressable style={styles.whatsappAction}>
                  <Ionicons name="logo-whatsapp" size={16} color={COLORS.white} />
                  <Text style={styles.whatsappActionText}>Contacter</Text>
                </Pressable>
              </View>
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
  content: { padding: SPACING.lg },
  orderCard: { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md, marginBottom: SPACING.md, ...SHADOW.sm },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: SPACING.sm },
  sourceTag: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 },
  sourceText: { fontSize: FONT_SIZE.xs, color: COLORS.success },
  orderId: { fontSize: FONT_SIZE.md, fontWeight: '700', color: COLORS.gray900 },
  orderCustomer: { marginBottom: SPACING.md, paddingBottom: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.gray100 },
  customerName: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: COLORS.gray900 },
  customerPhone: { fontSize: FONT_SIZE.sm, color: COLORS.gray500 },
  orderTime: { fontSize: FONT_SIZE.xs, color: COLORS.gray400 },
  orderItems: { marginBottom: SPACING.md },
  orderItem: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.xs },
  itemImage: { width: 40, height: 40, borderRadius: RADIUS.sm, backgroundColor: COLORS.gray100 },
  itemInfo: { flex: 1, marginLeft: SPACING.sm },
  itemTitle: { fontSize: FONT_SIZE.sm, color: COLORS.gray900 },
  itemQty: { fontSize: FONT_SIZE.xs, color: COLORS.gray500 },
  itemPrice: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: COLORS.gray900 },
  orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: SPACING.sm, borderTopWidth: 1, borderTopColor: COLORS.gray100 },
  orderTotal: { fontSize: FONT_SIZE.md, fontWeight: '700', color: COLORS.primary },
  orderActions: { flexDirection: 'row', gap: SPACING.sm },
  whatsappAction: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.success, paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: RADIUS.md, gap: SPACING.xs },
  whatsappActionText: { fontSize: FONT_SIZE.xs, fontWeight: '600', color: COLORS.white },
});