import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, RADIUS, SHADOW } from '@/src/constants/theme';
import { formatXAF } from '@/src/utils/formatCurrency';

const weeklyData = [
  { day: 'Lun', orders: 12, revenue: 85000 },
  { day: 'Mar', orders: 18, revenue: 125000 },
  { day: 'Mer', orders: 15, revenue: 95000 },
  { day: 'Jeu', orders: 22, revenue: 150000 },
  { day: 'Ven', orders: 28, revenue: 195000 },
  { day: 'Sam', orders: 35, revenue: 245000 },
  { day: 'Dim', orders: 8, revenue: 55000 },
];

const topProducts = [
  { name: 'Poulet fermier', sales: 45, revenue: 382500 },
  { name: 'Sac en fibres', sales: 23, revenue: 345000 },
  { name: 'Beurre de karité', sales: 89, revenue: 311500 },
  { name: 'Table basse', sales: 5, revenue: 225000 },
];

const maxRevenue = Math.max(...weeklyData.map(d => d.revenue));

export default function BoutiqueAnalyticsScreen() {
  const totalOrders = weeklyData.reduce((sum, d) => sum + d.orders, 0);
  const totalRevenue = weeklyData.reduce((sum, d) => sum + d.revenue, 0);
  const avgOrderValue = Math.round(totalRevenue / totalOrders);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}><Text style={styles.title}>Analytics</Text></View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Ionicons name="receipt" size={24} color={COLORS.info} />
            <Text style={styles.summaryValue}>{totalOrders}</Text>
            <Text style={styles.summaryLabel}>Commandes</Text>
          </View>
          <View style={styles.summaryCard}>
            <Ionicons name="cash" size={24} color={COLORS.success} />
            <Text style={styles.summaryValue}>{formatXAF(totalRevenue)}</Text>
            <Text style={styles.summaryLabel}>Revenus</Text>
          </View>
          <View style={styles.summaryCard}>
            <Ionicons name="person" size={24} color={COLORS.warning} />
            <Text style={styles.summaryValue}>{formatXAF(avgOrderValue)}</Text>
            <Text style={styles.summaryLabel}>Panier moy.</Text>
          </View>
        </View>

        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Revenus cette semaine</Text>
          <View style={styles.chart}>
            {weeklyData.map((day, idx) => (
              <View key={idx} style={styles.chartBar}>
                <View style={styles.barContainer}>
                  <View style={[styles.bar, { height: `${(day.revenue / maxRevenue) * 100}%` }]} />
                </View>
                <Text style={styles.barLabel}>{day.day}</Text>
                <Text style={styles.barValue}>{day.orders}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.topSection}>
          <Text style={styles.sectionTitle}>Produits les plus vendus</Text>
          {topProducts.map((product, idx) => (
            <View key={idx} style={styles.topProduct}>
              <View style={styles.topRank}><Text style={styles.rankText}>{idx + 1}</Text></View>
              <View style={styles.topInfo}>
                <Text style={styles.topName}>{product.name}</Text>
                <Text style={styles.topSales}>{product.sales} ventes</Text>
              </View>
              <Text style={styles.topRevenue}>{formatXAF(product.revenue)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.insightsSection}>
          <Text style={styles.sectionTitle}>Insights</Text>
          <View style={styles.insightCard}>
            <View style={[styles.insightIcon, { backgroundColor: `${COLORS.success}15` }]}><Ionicons name="trending-up" size={20} color={COLORS.success} /></View>
            <View style={styles.insightContent}><Text style={styles.insightTitle}>+23% cette semaine</Text><Text style={styles.insightText}>Vos ventes ont augmenté de 23% par rapport à la semaine dernière.</Text></View>
          </View>
          <View style={styles.insightCard}>
            <View style={[styles.insightIcon, { backgroundColor: `${COLORS.info}15` }]}><Ionicons name="time" size={20} color={COLORS.info} /></View>
            <View style={styles.insightContent}><Text style={styles.insightTitle}>Heures пиков</Text><Text style={styles.insightText}>18h-21h est votre créneau le plus actif.</Text></View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.gray50 },
  header: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.md, paddingBottom: SPACING.md, backgroundColor: COLORS.white, ...SHADOW.sm },
  title: { fontSize: FONT_SIZE.xl, fontWeight: '700', color: COLORS.gray900 },
  summaryRow: { flexDirection: 'row', padding: SPACING.lg, gap: SPACING.md },
  summaryCard: { flex: 1, backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md, alignItems: 'center', ...SHADOW.sm },
  summaryValue: { fontSize: FONT_SIZE.lg, fontWeight: '700', color: COLORS.gray900, marginTop: SPACING.sm },
  summaryLabel: { fontSize: FONT_SIZE.xs, color: COLORS.gray500 },
  chartSection: { paddingHorizontal: SPACING.lg, marginBottom: SPACING.lg },
  sectionTitle: { fontSize: FONT_SIZE.md, fontWeight: '600', color: COLORS.gray900, marginBottom: SPACING.md },
  chart: { flexDirection: 'row', alignItems: 'flex-end', backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md, height: 180, ...SHADOW.sm },
  chartBar: { flex: 1, alignItems: 'center' },
  barContainer: { flex: 1, width: '100%', justifyContent: 'flex-end', alignItems: 'center' },
  bar: { width: 20, backgroundColor: COLORS.primary, borderRadius: RADIUS.sm, minHeight: 8 },
  barLabel: { fontSize: FONT_SIZE.xs, color: COLORS.gray500, marginTop: SPACING.xs },
  barValue: { fontSize: FONT_SIZE.xs, color: COLORS.gray400 },
  topSection: { paddingHorizontal: SPACING.lg, marginBottom: SPACING.lg },
  topProduct: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md, marginBottom: SPACING.sm, ...SHADOW.sm },
  topRank: { width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', marginRight: SPACING.md },
  rankText: { fontSize: FONT_SIZE.sm, fontWeight: '700', color: COLORS.white },
  topInfo: { flex: 1 },
  topName: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: COLORS.gray900 },
  topSales: { fontSize: FONT_SIZE.xs, color: COLORS.gray500 },
  topRevenue: { fontSize: FONT_SIZE.sm, fontWeight: '700', color: COLORS.success },
  insightsSection: { paddingHorizontal: SPACING.lg, marginBottom: SPACING.xxl },
  insightCard: { flexDirection: 'row', backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md, marginBottom: SPACING.sm, ...SHADOW.sm },
  insightIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginRight: SPACING.md },
  insightContent: { flex: 1 },
  insightTitle: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: COLORS.gray900 },
  insightText: { fontSize: FONT_SIZE.xs, color: COLORS.gray500, marginTop: 2 },
});