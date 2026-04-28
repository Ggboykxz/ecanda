import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, RADIUS, SHADOW } from '@/src/constants/theme';
import { formatXAF } from '@/src/utils/formatCurrency';

const weeklyData = [
  { day: 'Lun', amount: 8500 },
  { day: 'Mar', amount: 12500 },
  { day: 'Mer', amount: 6500 },
  { day: 'Jeu', amount: 15000 },
  { day: 'Ven', amount: 22000 },
  { day: 'Sam', amount: 18000 },
  { day: 'Dim', amount: 12500 },
];

const transactions = [
  { id: '1', type: 'sale', amount: 15000, orderId: 'ORD-002', date: new Date(Date.now() - 2 * 3600000) },
  { id: '2', type: 'sale', amount: 8500, orderId: 'ORD-001', date: new Date(Date.now() - 5 * 3600000) },
  { id: '3', type: 'withdrawal', amount: -50000, date: new Date(Date.now() - 24 * 3600000) },
  { id: '4', type: 'sale', amount: 22000, orderId: 'ORD-003', date: new Date(Date.now() - 48 * 3600000) },
];

export default function VendorEarningsScreen() {
  const totalWeek = weeklyData.reduce((sum, d) => sum + d.amount, 0);
  const avgDaily = Math.round(totalWeek / 7);
  const maxAmount = Math.max(...weeklyData.map(d => d.amount));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes gains</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Solde disponible</Text>
          <Text style={styles.balanceValue}>{formatXAF(125000)}</Text>
          <View style={styles.balanceActions}>
            <View style={styles.balanceButton}>
              <Ionicons name="add" size={20} color={COLORS.primary} />
              <Text style={styles.balanceButtonText}>Retirer</Text>
            </View>
            <View style={styles.balanceButton}>
              <Ionicons name="card" size={20} color={COLORS.primary} />
              <Text style={styles.balanceButtonText}>Historique</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Cette semaine</Text>
            <Text style={styles.statValue}>{formatXAF(totalWeek)}</Text>
            <Text style={styles.statChange}>+15% vs semaine dernière</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Moyenne/jour</Text>
            <Text style={styles.statValue}>{formatXAF(avgDaily)}</Text>
          </View>
        </View>

        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Revenus de la semaine</Text>
          <View style={styles.chart}>
            {weeklyData.map((day, index) => (
              <View key={index} style={styles.chartBar}>
                <View style={styles.barContainer}>
                  <View 
                    style={[
                      styles.bar, 
                      { height: `${(day.amount / maxAmount) * 100}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.barLabel}>{day.day}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.transactionsSection}>
          <Text style={styles.sectionTitle}>Dernières transactions</Text>
          {transactions.map((tx) => (
            <View key={tx.id} style={styles.transactionItem}>
              <View style={[
                styles.txIcon,
                { backgroundColor: tx.type === 'sale' ? `${COLORS.success}15` : `${COLORS.warning}15` }
              ]}>
                <Ionicons 
                  name={tx.type === 'sale' ? 'arrow-down' : 'arrow-up'} 
                  size={18} 
                  color={tx.type === 'sale' ? COLORS.success : COLORS.warning} 
                />
              </View>
              <View style={styles.txInfo}>
                <Text style={styles.txTitle}>
                  {tx.type === 'sale' ? `Vente - ${tx.orderId}` : 'Retrait'}
                </Text>
                <Text style={styles.txDate}>
                  {tx.date.toLocaleDateString('fr-GA')}
                </Text>
              </View>
              <Text style={[
                styles.txAmount,
                { color: tx.type === 'sale' ? COLORS.success : COLORS.warning }
              ]}>
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
  balanceCard: {
    margin: SPACING.lg,
    padding: SPACING.lg,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.xl,
    ...SHADOW.md,
  },
  balanceLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.white,
    opacity: 0.8,
  },
  balanceValue: {
    fontSize: FONT_SIZE.display,
    fontWeight: '700',
    color: COLORS.white,
    marginVertical: SPACING.sm,
  },
  balanceActions: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.md,
  },
  balanceButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    gap: SPACING.xs,
  },
  balanceButtonText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    color: COLORS.primary,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    ...SHADOW.sm,
  },
  statLabel: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray500,
    marginBottom: SPACING.xs,
  },
  statValue: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.gray900,
  },
  statChange: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.success,
    marginTop: SPACING.xs,
  },
  chartSection: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.gray900,
    marginBottom: SPACING.md,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    height: 160,
    ...SHADOW.sm,
  },
  chartBar: {
    flex: 1,
    alignItems: 'center',
  },
  barContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bar: {
    width: 24,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.sm,
    minHeight: 8,
  },
  barLabel: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray500,
    marginTop: SPACING.xs,
  },
  transactionsSection: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xxl,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOW.sm,
  },
  txIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  txTitle: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    color: COLORS.gray900,
  },
  txDate: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray500,
  },
  txAmount: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
  },
});