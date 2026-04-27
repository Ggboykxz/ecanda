import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Link } from 'expo-router';
import { COLORS, SPACING, FONT_SIZE, RADIUS, SHADOW } from '../../../src/constants/theme';
import { formatXAF, formatRelativeTime } from '../../../src/utils/formatCurrency';

const stats = [
  { label: 'Ventes aujourd\'hui', value: '8 500', icon: 'trending-up', color: COLORS.success },
  { label: 'Commandes WA', value: '5', icon: 'logo-whatsapp', color: COLORS.accent },
  { label: 'Canaux actifs', value: '3', icon: 'chatbubbles', color: COLORS.info },
  { label: 'Partages', value: '42', icon: 'share-social', color: COLORS.warning },
];

const channelStats = [
  { name: 'Groupe Famille', members: 156, orders: 12, revenue: 85000 },
  { name: 'Clients Réguliers', members: 89, orders: 8, revenue: 62000 },
  { name: 'Nouvelle Collection', members: 234, orders: 15, revenue: 125000 },
];

const recentOrders = [
  { id: 'ORD-001', source: 'Groupe Famille', customer: 'Marie K.', total: 15500, time: new Date(Date.now() - 15 * 60000) },
  { id: 'ORD-002', source: 'Clients Réguliers', customer: 'Jean M.', total: 8500, time: new Date(Date.now() - 45 * 60000) },
];

export default function VendorWADashboardScreen() {
  const todayEarnings = 8500;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>Bonjour 👋</Text>
          <Text style={styles.shopName}>WhatsApp Business</Text>
        </View>
        <Pressable style={styles.whatsappButton}>
          <Ionicons name="logo-whatsapp" size={24} color={COLORS.success} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.duration(300)}>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: `${stat.color}15` }]}>
                  <Ionicons name={stat.icon as any} size={18} color={stat.color} />
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
              <View style={styles.whatsappIconContainer}>
                <Ionicons name="logo-whatsapp" size={28} color={COLORS.white} />
              </View>
            </View>
            <Text style={styles.earningsSubtext}>Commandes issues de WhatsApp</Text>
          </View>

          <View style={styles.channelsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Performances par canal</Text>
              <Link href="/(vendor-wa)/channels" asChild>
                <Pressable>
                  <Text style={styles.seeAll}>Gérer →</Text>
                </Pressable>
              </Link>
            </View>
            {channelStats.map((channel, index) => (
              <View key={index} style={styles.channelCard}>
                <View style={styles.channelHeader}>
                  <View style={styles.channelIcon}>
                    <Ionicons name="logo-whatsapp" size={20} color={COLORS.success} />
                  </View>
                  <View style={styles.channelInfo}>
                    <Text style={styles.channelName}>{channel.name}</Text>
                    <Text style={styles.channelMembers}>{channel.members} membres</Text>
                  </View>
                </View>
                <View style={styles.channelStats}>
                  <View style={styles.channelStat}>
                    <Text style={styles.channelStatValue}>{channel.orders}</Text>
                    <Text style={styles.channelStatLabel}>Commandes</Text>
                  </View>
                  <View style={styles.channelStat}>
                    <Text style={styles.channelStatValue}>{formatXAF(channel.revenue)}</Text>
                    <Text style={styles.channelStatLabel}>Revenus</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.recentOrders}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Commandes récentes (WA)</Text>
              <Link href="/(vendor-wa)/orders" asChild>
                <Pressable>
                  <Text style={styles.seeAll}>Voir tout</Text>
                </Pressable>
              </Link>
            </View>
            {recentOrders.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderInfo}>
                  <View style={styles.orderSource}>
                    <Ionicons name="logo-whatsapp" size={14} color={COLORS.success} />
                    <Text style={styles.orderSourceText}>{order.source}</Text>
                  </View>
                  <Text style={styles.orderId}>{order.id}</Text>
                  <Text style={styles.orderCustomer}>{order.customer}</Text>
                  <Text style={styles.orderTime}>{formatRelativeTime(order.time)}</Text>
                </View>
                <Text style={styles.orderTotal}>{formatXAF(order.total)}</Text>
              </View>
            ))}
          </View>

          <View style={styles.shareSection}>
            <Text style={styles.sectionTitle}>Partager mon catalogue</Text>
            <View style={styles.shareCard}>
              <View style={styles.shareInfo}>
                <Ionicons name="link" size={24} color={COLORS.primary} />
                <Text style={styles.shareLink}>ecanda.gg/boutique/mon-shop</Text>
              </View>
              <Pressable style={styles.shareButton}>
                <Ionicons name="logo-whatsapp" size={20} color={COLORS.white} />
                <Text style={styles.shareButtonText}>Partager sur WhatsApp</Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.gray50 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: SPACING.lg, paddingTop: SPACING.md, paddingBottom: SPACING.md,
    backgroundColor: COLORS.white, ...SHADOW.sm,
  },
  headerLeft: { gap: SPACING.xs },
  greeting: { fontSize: FONT_SIZE.md, color: COLORS.gray600 },
  shopName: { fontSize: FONT_SIZE.lg, fontWeight: '700', color: COLORS.gray900 },
  whatsappButton: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: `${COLORS.success}15`,
    justifyContent: 'center', alignItems: 'center',
  },
  statsGrid: {
    flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: SPACING.lg,
    marginTop: SPACING.lg, gap: SPACING.sm,
  },
  statCard: {
    width: '48%', backgroundColor: COLORS.white, borderRadius: RADIUS.lg,
    padding: SPACING.md, ...SHADOW.sm,
  },
  statIcon: {
    width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  statValue: { fontSize: FONT_SIZE.lg, fontWeight: '700', color: COLORS.gray900 },
  statLabel: { fontSize: FONT_SIZE.xs, color: COLORS.gray500, marginTop: 2 },
  earningsCard: {
    margin: SPACING.lg, padding: SPACING.md, backgroundColor: COLORS.success,
    borderRadius: RADIUS.lg, ...SHADOW.md,
  },
  earningsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  earningsLabel: { fontSize: FONT_SIZE.sm, color: COLORS.white, opacity: 0.8 },
  earningsValue: { fontSize: FONT_SIZE.xxxl, fontWeight: '700', color: COLORS.white, marginTop: SPACING.xs },
  whatsappIconContainer: {
    width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center', alignItems: 'center',
  },
  earningsSubtext: { fontSize: FONT_SIZE.xs, color: COLORS.white, opacity: 0.7, marginTop: SPACING.sm },
  channelsSection: { paddingHorizontal: SPACING.lg, marginBottom: SPACING.lg },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: { fontSize: FONT_SIZE.md, fontWeight: '600', color: COLORS.gray900 },
  seeAll: { fontSize: FONT_SIZE.sm, color: COLORS.primary },
  channelCard: {
    backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md,
    marginBottom: SPACING.sm, ...SHADOW.sm,
  },
  channelHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.sm },
  channelIcon: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: `${COLORS.success}15`,
    justifyContent: 'center', alignItems: 'center', marginRight: SPACING.sm,
  },
  channelInfo: { flex: 1 },
  channelName: { fontSize: FONT_SIZE.md, fontWeight: '600', color: COLORS.gray900 },
  channelMembers: { fontSize: FONT_SIZE.xs, color: COLORS.gray500 },
  channelStats: { flexDirection: 'row', gap: SPACING.lg },
  channelStat: {},
  channelStatValue: { fontSize: FONT_SIZE.md, fontWeight: '700', color: COLORS.gray900 },
  channelStatLabel: { fontSize: FONT_SIZE.xs, color: COLORS.gray500 },
  recentOrders: { paddingHorizontal: SPACING.lg, marginBottom: SPACING.lg },
  orderCard: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md,
    marginBottom: SPACING.sm, ...SHADOW.sm,
  },
  orderInfo: { gap: 2 },
  orderSource: { flexDirection: 'row', alignItems: 'center', gap: SPACING.xs },
  orderSourceText: { fontSize: FONT_SIZE.xs, color: COLORS.success },
  orderId: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: COLORS.gray900 },
  orderCustomer: { fontSize: FONT_SIZE.sm, color: COLORS.gray600 },
  orderTime: { fontSize: FONT_SIZE.xs, color: COLORS.gray400 },
  orderTotal: { fontSize: FONT_SIZE.md, fontWeight: '700', color: COLORS.primary },
  shareSection: { paddingHorizontal: SPACING.lg, marginBottom: SPACING.xxl },
  shareCard: {
    backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md,
    ...SHADOW.sm,
  },
  shareInfo: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginBottom: SPACING.md },
  shareLink: { fontSize: FONT_SIZE.sm, color: COLORS.gray700 },
  shareButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: COLORS.success, borderRadius: RADIUS.md, paddingVertical: SPACING.sm,
    gap: SPACING.sm,
  },
  shareButtonText: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: COLORS.white },
});