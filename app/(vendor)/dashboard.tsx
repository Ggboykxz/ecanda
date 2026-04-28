import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Link } from 'expo-router';
import { COLORS, SPACING, FONT_SIZE, RADIUS, SHADOW } from '@/src/constants/theme';
import { formatXAF, formatRelativeTime } from '@/src/utils/formatCurrency';

const stats = [
  { label: 'Ventes aujourd\'hui', value: '12 500', icon: 'trending-up', color: COLORS.success },
  { label: 'Commandes', value: '8', icon: 'receipt', color: COLORS.info },
  { label: 'Produits', value: '24', icon: 'cube', color: COLORS.warning },
  { label: 'Note', value: '4.8', icon: 'star', color: COLORS.accentAlt },
];

const recentOrders = [
  { id: 'ORD-001', customer: 'Marie K.', total: 15500, status: 'pending', time: new Date(Date.now() - 15 * 60000) },
  { id: 'ORD-002', customer: 'Jean M.', total: 8500, status: 'confirmed', time: new Date(Date.now() - 45 * 60000) },
  { id: 'ORD-003', customer: 'Paul B.', total: 22000, status: 'preparing', time: new Date(Date.now() - 2 * 3600000) },
];

const quickActions = [
  { label: 'Ajouter produit', icon: 'add-circle', route: '/(vendor)/products/add' },
  { label: 'Voir commandes', icon: 'receipt', route: '/(vendor)/orders' },
  { label: 'Mes gains', icon: 'wallet', route: '/(vendor)/earnings' },
  { label: 'Mon catalogue', icon: 'list', route: '/(vendor)/products' },
];

export default function VendorDashboardScreen() {
  const todayEarnings = 12500;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>Bonjour 👋</Text>
          <Text style={styles.shopName}>Mon Super Shop</Text>
        </View>
        <Pressable style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color={COLORS.gray900} />
          <View style={styles.badge} />
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

          <View style={styles.earningsCard}>
            <View style={styles.earningsHeader}>
              <View>
                <Text style={styles.earningsLabel}>Gains d'aujourd'hui</Text>
                <Text style={styles.earningsValue}>{formatXAF(todayEarnings)}</Text>
              </View>
              <Ionicons name="trending-up" size={24} color={COLORS.success} />
            </View>
            <View style={styles.earningsFooter}>
              <Text style={styles.earningsSubtext}>+15% vs hier</Text>
              <Link href="/(vendor)/earnings" asChild>
                <Pressable>
                  <Text style={styles.seeMore}>Voir détails →</Text>
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
                      <Ionicons name={action.icon as any} size={24} color={COLORS.primary} />
                    </View>
                    <Text style={styles.actionLabel}>{action.label}</Text>
                  </Pressable>
                </Link>
              ))}
            </View>
          </View>

          <View style={styles.recentOrders}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Commandes récentes</Text>
              <Link href="/(vendor)/orders" asChild>
                <Pressable>
                  <Text style={styles.seeAll}>Voir tout</Text>
                </Pressable>
              </Link>
            </View>

            {recentOrders.map((order) => (
              <Pressable key={order.id} style={styles.orderCard}>
                <View style={styles.orderInfo}>
                  <Text style={styles.orderId}>{order.id}</Text>
                  <Text style={styles.orderCustomer}>{order.customer}</Text>
                  <Text style={styles.orderTime}>{formatRelativeTime(order.time)}</Text>
                </View>
                <View style={styles.orderRight}>
                  <Text style={styles.orderTotal}>{formatXAF(order.total)}</Text>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: order.status === 'pending' ? `${COLORS.warning}20` : `${COLORS.success}20` }
                  ]}>
                    <Text style={[
                      styles.statusText,
                      { color: order.status === 'pending' ? COLORS.warning : COLORS.success }
                    ]}>
                      {order.status === 'pending' ? 'En attente' : order.status === 'confirmed' ? 'Confirmé' : 'En préparation'}
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </Animated.View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.white,
    ...SHADOW.sm,
  },
  headerLeft: {
    gap: SPACING.xs,
  },
  greeting: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray600,
  },
  shopName: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.gray900,
  },
  notificationButton: {
    position: 'relative',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.error,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    gap: SPACING.sm,
  },
  statCard: {
    width: '48%',
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
    marginBottom: SPACING.sm,
  },
  statValue: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: COLORS.gray900,
  },
  statLabel: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray500,
    marginTop: 2,
  },
  earningsCard: {
    margin: SPACING.lg,
    padding: SPACING.md,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    ...SHADOW.md,
  },
  earningsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  earningsLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.white,
    opacity: 0.8,
  },
  earningsValue: {
    fontSize: FONT_SIZE.xxxl,
    fontWeight: '700',
    color: COLORS.white,
  },
  earningsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  earningsSubtext: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.white,
    opacity: 0.8,
  },
  seeMore: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.white,
    fontWeight: '600',
  },
  quickActions: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.gray900,
    marginBottom: SPACING.md,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    ...SHADOW.sm,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${COLORS.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  actionLabel: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray700,
    textAlign: 'center',
  },
  recentOrders: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  seeAll: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
  },
  orderCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOW.sm,
  },
  orderInfo: {
    gap: 2,
  },
  orderId: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    color: COLORS.gray900,
  },
  orderCustomer: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray600,
  },
  orderTime: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray400,
  },
  orderRight: {
    alignItems: 'flex-end',
    gap: SPACING.xs,
  },
  orderTotal: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.primary,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
  },
  statusText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '500',
  },
});