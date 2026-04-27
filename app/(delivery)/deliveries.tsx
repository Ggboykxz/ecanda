import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, RADIUS, SHADOW } from '../../../src/constants/theme';
import { formatXAF, formatRelativeTime } from '../../../src/utils/formatCurrency';
import { ORDER_STATUS_LABELS } from '../../../src/types/order.types';
import Badge from '../../../src/components/ui/Badge';

const deliveries = [
  { id: 'DEL-001', vendor: 'Ferme du Nord', items: [{ title: 'Poulet fermier', image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400', qty: 2 }], pickup: 'Libreville Centre', delivery: 'Akanda', earnings: 2500, status: 'in_progress', createdAt: new Date(Date.now() - 30 * 60000) },
  { id: 'DEL-002', vendor: 'Artisanat Gabon', items: [{ title: 'Sac en fibres', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400', qty: 1 }], pickup: 'Owendo', delivery: 'Ntoum', earnings: 3500, status: 'delivered', createdAt: new Date(Date.now() - 2 * 3600000) },
  { id: 'DEL-003', vendor: 'Tech Libreville', items: [{ title: 'Accessoires', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', qty: 1 }], pickup: 'Bonendong', delivery: 'PK8', earnings: 2000, status: 'delivered', createdAt: new Date(Date.now() - 5 * 3600000) },
];

export default function DeliveryDeliveriesScreen() {
  const inProgress = deliveries.filter(d => d.status === 'in_progress').length;
  const completed = deliveries.filter(d => d.status === 'delivered').length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes livraisons</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: `${COLORS.info}15` }]}>
          <Ionicons name="bicycle" size={24} color={COLORS.info} />
          <Text style={styles.statValue}>{inProgress}</Text>
          <Text style={styles.statLabel}>En cours</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: `${COLORS.success}15` }]}>
          <Ionicons name="checkmark-circle" size={24} color={COLORS.success} />
          <Text style={styles.statValue}>{completed}</Text>
          <Text style={styles.statLabel}>Terminées</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {deliveries.map((delivery) => (
          <View key={delivery.id} style={styles.deliveryCard}>
            <View style={styles.deliveryHeader}>
              <Text style={styles.deliveryId}>{delivery.id}</Text>
              <Badge
                label={delivery.status === 'in_progress' ? 'En cours' : 'Livré'}
                variant={delivery.status === 'in_progress' ? 'info' : 'success'}
              />
            </View>

            <Text style={styles.vendorName}>{delivery.vendor}</Text>

            <View style={styles.routePreview}>
              <View style={styles.routePointPreview}>
                <Ionicons name="location" size={16} color={COLORS.warning} />
                <Text style={styles.routeTextPreview}>{delivery.pickup}</Text>
              </View>
              <Ionicons name="arrow-down" size={16} color={COLORS.gray300} />
              <View style={styles.routePointPreview}>
                <Ionicons name="flag" size={16} color={COLORS.success} />
                <Text style={styles.routeTextPreview}>{delivery.delivery}</Text>
              </View>
            </View>

            <View style={styles.itemsRow}>
              {delivery.items.map((item, idx) => (
                <View key={idx} style={styles.itemPreview}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} contentFit="cover" />
                  <Text style={styles.itemQty}>x{item.qty}</Text>
                </View>
              ))}
            </View>

            <View style={styles.deliveryFooter}>
              <View style={styles.earningsInfo}>
                <Text style={styles.earningsLabel}>Gain</Text>
                <Text style={styles.earningsValue}>{formatXAF(delivery.earnings)}</Text>
              </View>
              {delivery.status === 'in_progress' ? (
                <Pressable style={styles.actionButton}>
                  <Ionicons name="navigate" size={18} color={COLORS.white} />
                  <Text style={styles.actionButtonText}>Naviguer</Text>
                </Pressable>
              ) : (
                <View style={styles.completedBadge}>
                  <Ionicons name="checkmark-circle" size={18} color={COLORS.success} />
                  <Text style={styles.completedText}>Terminé</Text>
                </View>
              )}
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
  statCard: { flex: 1, borderRadius: RADIUS.lg, padding: SPACING.md, alignItems: 'center', ...SHADOW.sm },
  statValue: { fontSize: FONT_SIZE.xl, fontWeight: '700', color: COLORS.gray900, marginTop: SPACING.xs },
  statLabel: { fontSize: FONT_SIZE.xs, color: COLORS.gray500 },
  content: { paddingHorizontal: SPACING.lg },
  deliveryCard: { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md, marginBottom: SPACING.md, ...SHADOW.sm },
  deliveryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.xs },
  deliveryId: { fontSize: FONT_SIZE.sm, color: COLORS.gray500 },
  vendorName: { fontSize: FONT_SIZE.md, fontWeight: '600', color: COLORS.gray900, marginBottom: SPACING.sm },
  routePreview: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginBottom: SPACING.md, padding: SPACING.sm, backgroundColor: COLORS.gray50, borderRadius: RADIUS.md },
  routePointPreview: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: SPACING.xs },
  routeTextPreview: { fontSize: FONT_SIZE.sm, color: COLORS.gray700 },
  itemsRow: { flexDirection: 'row', gap: SPACING.xs, marginBottom: SPACING.md },
  itemPreview: { position: 'relative' },
  itemImage: { width: 40, height: 40, borderRadius: RADIUS.sm, backgroundColor: COLORS.gray100 },
  itemQty: { position: 'absolute', bottom: -4, right: -4, backgroundColor: COLORS.primary, color: COLORS.white, fontSize: 10, fontWeight: '600', paddingHorizontal: 4, borderRadius: 4 },
  deliveryFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: SPACING.sm, borderTopWidth: 1, borderTopColor: COLORS.gray100 },
  earningsInfo: {},
  earningsLabel: { fontSize: FONT_SIZE.xs, color: COLORS.gray500 },
  earningsValue: { fontSize: FONT_SIZE.md, fontWeight: '700', color: COLORS.success },
  actionButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, borderRadius: RADIUS.md, gap: SPACING.xs },
  actionButtonText: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: COLORS.white },
  completedBadge: { flexDirection: 'row', alignItems: 'center', gap: SPACING.xs },
  completedText: { fontSize: FONT_SIZE.sm, color: COLORS.success, fontWeight: '500' },
});