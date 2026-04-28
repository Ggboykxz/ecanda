import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Link } from 'expo-router';
import { COLORS, SPACING, FONT_SIZE, RADIUS, SHADOW } from '@/src/constants/theme';
import { formatXAF, formatRelativeTime } from '@/src/utils/formatCurrency';
import Badge from '@/src/components/ui/Badge';

const stats = [
  { label: 'Ventes today', value: '125 000', icon: 'trending-up', color: COLORS.success },
  { label: 'Commandes', value: '28', icon: 'receipt', color: COLORS.info },
  { label: 'Produits', value: '156', icon: 'cube', color: COLORS.warning },
  { label: 'Note', value: '4.8', icon: 'star', color: COLORS.accentAlt },
];

const recentOrders = [
  { id: 'ORD-001', customer: 'Marie K.', total: 45000, status: 'preparing', items: 3, time: new Date(Date.now() - 15 * 60000) },
  { id: 'ORD-002', customer: 'Jean M.', total: 28500, status: 'confirmed', items: 2, time: new Date(Date.now() - 45 * 60000) },
  { id: 'ORD-003', customer: 'Paul B.', total: 85000, status: 'pending', items: 5, time: new Date(Date.now() - 2 * 3600000) },
];

const quickActions = [
  { label: 'Ajouter produit', icon: 'add-circle', route: '/(boutique)/catalog/add' },
  { label: 'Commandes', icon: 'receipt', route: '/(boutique)/orders' },
  { label: 'Analytics', icon: 'stats-chart', route: '/(boutique)/analytics' },
  { label: 'Paramètres', icon: 'settings', route: '/(boutique)/settings' },
];

export default function BoutiqueDashboardScreen() {
  const todayRevenue = 125000;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>Bonjour 👋</Text>
          <Text style={styles.shopName}>Ma Super Boutique</Text>
        </View>
        <Pressable style={styles.profileButton}>
          <Ionicons name="person" size={24} color={COLORS.gray900} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.duration(300)}>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: `${stat.color}15` }]}>
                  <Ionicons name={stat.icon as any} size={20} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.revenueCard}>
            <View style={styles.revenueHeader}>
              <View>
                <Text style={styles.revenueLabel}>Revenus aujourd'hui</Text>
                <Text style={styles.revenueValue}>{formatXAF(todayRevenue)}</Text>
              </View>
              <Ionicons name="trending-up" size={28} color={COLORS.success} />
            </View>
            <View style={styles.revenueFooter}>
              <Text style={styles.revenueSubtext}>+23% vs hier</Text>
              <Link href="/(boutique)/analytics" asChild>
                <Pressable>
                  <Text style={styles.seeMore}>Voir Analytics →</Text>
                </Pressable>
              </Link>
            </View>
          </View>

          <View style={styles.quickActions}>
            <Text style={styles.sectionTitle}>Actions rapides</Text>
            <View style={styles.actionsGrid}>
              {quickActions.map((action, index) => (
                <Link key={index} href={action.route as any} asChild>
                  <Pressable style={styles.actionButton}>
                    <View style={styles.actionIcon}>
                      <Ionicons name={action.icon as any} size={22} color={COLORS.primary} />
                    </View>
                    <Text style={styles.actionLabel}>{action.label}</Text>
                  </Pressable>
                </Link>
              ))}
            </View>
          </View>

          <View style={styles.ordersSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Commandes récentes</Text>
              <Link href="/(boutique)/orders" asChild>
                <Pressable>
                  <Text style={styles.seeAll}>Voir tout</Text>
                </Pressable>
              </Link>
            </View>

            {recentOrders.map((order) => (
              <Pressable key={order.id} style={styles.orderCard}>
                <View style={styles.orderInfo}>
                  <View style={styles.orderHeaderRow}>
                    <Text style={styles.orderId}>{order.id}</Text>
                    <Badge
                      label={order.status === 'pending' ? 'En attente' : order.status === 'confirmed' ? 'Confirmé' : 'En préparation'}
                      variant={order.status === 'pending' ? 'warning' : order.status === 'confirmed' ? 'info' : 'secondary'}
                      size="sm"
                    />
                  </View>
                  <Text style={styles.orderCustomer}>{order.customer}</Text>
                  <Text style={styles.orderItems}>{order.items} produits • {formatRelativeTime(order.time)}</Text>
                </View>
                <Text style={styles.orderTotal}>{formatXAF(order.total)}</Text>
              </Pressable>
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.gray50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: SPACING.lg, paddingTop: SPACING.md, paddingBottom: SPACING.md, backgroundColor: COLORS.white, ...SHADOW.sm },
  headerLeft: { gap: SPACING.xs },
  greeting: { fontSize: FONT_SIZE.md, color: COLORS.gray600 },
  shopName: { fontSize: FONT_SIZE.lg, fontWeight: '700', color: COLORS.gray900 },
  profileButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.gray100, justifyContent: 'center', alignItems: 'center' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: SPACING.lg, marginTop: SPACING.lg, gap: SPACING.sm },
  statCard: { width: '48%', backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md, ...SHADOW.sm },
  statIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.sm },
  statValue: { fontSize: FONT_SIZE.xl, fontWeight: '700', color: COLORS.gray900 },
  statLabel: { fontSize: FONT_SIZE.xs, color: COLORS.gray500, marginTop: 2 },
  revenueCard: { margin: SPACING.lg, padding: SPACING.md, backgroundColor: COLORS.primary, borderRadius: RADIUS.lg, ...SHADOW.md },
  revenueHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  revenueLabel: { fontSize: FONT_SIZE.sm, color: COLORS.white, opacity: 0.8 },
  revenueValue: { fontSize: FONT_SIZE.xxxl, fontWeight: '700', color: COLORS.white, marginTop: SPACING.xs },
  revenueFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: SPACING.md, paddingTop: SPACING.md, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.2)' },
  revenueSubtext: { fontSize: FONT_SIZE.sm, color: COLORS.white, opacity: 0.8 },
  seeMore: { fontSize: FONT_SIZE.sm, color: COLORS.white, fontWeight: '600' },
  quickActions: { paddingHorizontal: SPACING.lg, marginBottom: SPACING.lg },
  sectionTitle: { fontSize: FONT_SIZE.md, fontWeight: '600', color: COLORS.gray900, marginBottom: SPACING.md },
  actionsGrid: { flexDirection: 'row', gap: SPACING.sm },
  actionButton: { flex: 1, alignItems: 'center', padding: SPACING.md, backgroundColor: COLORS.white, borderRadius: RADIUS.lg, ...SHADOW.sm },
  actionIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: `${COLORS.primary}15`, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.sm },
  actionLabel: { fontSize: FONT_SIZE.xs, color: COLORS.gray700, textAlign: 'center' },
  ordersSection: { paddingHorizontal: SPACING.lg, marginBottom: SPACING.xxl },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md },
  seeAll: { fontSize: FONT_SIZE.sm, color: COLORS.primary },
  orderCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md, marginBottom: SPACING.sm, ...SHADOW.sm },
  orderInfo: { flex: 1 },
  orderHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginBottom: 4 },
  orderId: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: COLORS.gray900 },
  orderCustomer: { fontSize: FONT_SIZE.sm, color: COLORS.gray600 },
  orderItems: { fontSize: FONT_SIZE.xs, color: COLORS.gray400 },
  orderTotal: { fontSize: FONT_SIZE.md, fontWeight: '700', color: COLORS.primary },
});