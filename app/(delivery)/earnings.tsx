import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, RADIUS, SHADOW } from '@/src/constants/theme';
import { formatXAF } from '@/src/utils/formatCurrency';

const weeklyData = [
  { day: 'Lun', amount: 5500 },
  { day: 'Mar', amount: 8000 },
  { day: 'Mer', amount: 4500 },
  { day: 'Jeu', amount: 9500 },
  { day: 'Ven', amount: 12000 },
  { day: 'Sam', amount: 8500 },
  { day: 'Dim', amount: 0 },
];

const transactions = [
  { id: '1', type: 'delivery', amount: 2500, orderId: 'DEL-001', date: new Date(Date.now() - 30 * 60000) },
  { id: '2', type: 'delivery', amount: 3500, orderId: 'DEL-002', date: new Date(Date.now() - 2 * 3600000) },
  { id: '3', type: 'delivery', amount: 2000, orderId: 'DEL-003', date: new Date(Date.now() - 5 * 3600000) },
  { id: '4', type: 'withdrawal', amount: -25000, date: new Date(Date.now() - 24 * 3600000) },
];

export default function DeliveryEarningsScreen() {
  const totalWeek = weeklyData.reduce((sum, d) => sum + d.amount, 0);
  const maxAmount = Math.max(...weeklyData.map(d => d.amount), 1);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes gains</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Solde disponible</Text>
          <Text style={styles.balanceValue}>{formatXAF(85000)}</Text>
          <View style={styles.balanceActions}>
            <Pressable style={styles.actionButton}>
              <Ionicons name="add" size={18} color={COLORS.white} />
              <Text style={styles.actionButtonText}>Retirer</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Cette semaine</Text>
            <Text style={styles.statValue}>{formatXAF(totalWeek)}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Livraisons</Text>
            <Text style={styles.statValue}>5</Text>
          </View>
        </View>

        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Revenus de la semaine</Text>
          <View style={styles.chart}>
            {weeklyData.map((day, index) => (
              <View key={index} style={styles.chartBar}>
                <View style={styles.barContainer}>
                  <View style={[styles.bar, { height: day.amount > 0 ? `${(day.amount / maxAmount) * 100}%` : '0%' }]} />
                </View>
                <Text style={styles.barLabel}>{day.day}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.transactionsSection}>
          <Text style={styles.sectionTitle}>Historique</Text>
          {transactions.map((tx) => (
            <View key={tx.id} style={styles.transactionItem}>
              <View style={[styles.txIcon, { backgroundColor: tx.type === 'delivery' ? `${COLORS.success}15` : `${COLORS.warning}15` }]}>
                <Ionicons name={tx.type === 'delivery' ? 'bicycle' : 'arrow-up'} size={18} color={tx.type === 'delivery' ? COLORS.success : COLORS.warning} />
              </View>
              <View style={styles.txInfo}>
                <Text style={styles.txTitle}>{tx.type === 'delivery' ? `Livraison ${tx.orderId}` : 'Retrait'}</Text>
                <Text style={styles.txDate}>{tx.date.toLocaleDateString('fr-GA')}</Text>
              </View>
              <Text style={[styles.txAmount, { color: tx.type === 'delivery' ? COLORS.success : COLORS.warning }]}>
                {tx.amount > 0 ? '+' : ''}{formatXAF(tx.amount)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.gray50 },
  header: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.md, paddingBottom: SPACING.md, backgroundColor: COLORS.white, ...SHADOW.sm },
  title: { fontSize: FONT_SIZE.xl, fontWeight: '700', color: COLORS.gray900 },
  balanceCard: { margin: SPACING.lg, padding: SPACING.lg, backgroundColor: COLORS.primary, borderRadius: RADIUS.xl, ...SHADOW.md },
  balanceLabel: { fontSize: FONT_SIZE.sm, color: COLORS.white, opacity: 0.8 },
  balanceValue: { fontSize: FONT_SIZE.display, fontWeight: '700', color: COLORS.white, marginVertical: SPACING.sm },
  balanceActions: { marginTop: SPACING.sm },
  actionButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, borderRadius: RADIUS.md, alignSelf: 'flex-start', gap: SPACING.xs },
  actionButtonText: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: COLORS.white },
  statsRow: { flexDirection: 'row', paddingHorizontal: SPACING.lg, gap: SPACING.md, marginBottom: SPACING.lg },
  statCard: { flex: 1, backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md, ...SHADOW.sm },
  statLabel: { fontSize: FONT_SIZE.xs, color: COLORS.gray500 },
  statValue: { fontSize: FONT_SIZE.lg, fontWeight: '700', color: COLORS.gray900 },
  chartSection: { paddingHorizontal: SPACING.lg, marginBottom: SPACING.lg },
  sectionTitle: { fontSize: FONT_SIZE.md, fontWeight: '600', color: COLORS.gray900, marginBottom: SPACING.md },
  chart: { flexDirection: 'row', alignItems: 'flex-end', backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md, height: 140, ...SHADOW.sm },
  chartBar: { flex: 1, alignItems: 'center' },
  barContainer: { flex: 1, width: '100%', justifyContent: 'flex-end', alignItems: 'center' },
  bar: { width: 24, backgroundColor: COLORS.primary, borderRadius: RADIUS.sm, minHeight: 8 },
  barLabel: { fontSize: FONT_SIZE.xs, color: COLORS.gray500, marginTop: SPACING.xs },
  transactionsSection: { paddingHorizontal: SPACING.lg, marginBottom: SPACING.xxl },
  transactionItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md, marginBottom: SPACING.sm, ...SHADOW.sm },
  txIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  txInfo: { flex: 1, marginLeft: SPACING.md },
  txTitle: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: COLORS.gray900 },
  txDate: { fontSize: FONT_SIZE.xs, color: COLORS.gray500 },
  txAmount: { fontSize: FONT_SIZE.md, fontWeight: '700' },
});
