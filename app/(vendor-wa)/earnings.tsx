import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, RADIUS, SHADOW } from '../../../src/constants/theme';
import { formatXAF } from '../../../src/utils/formatCurrency';

const transactions = [
  { id: '1', type: 'sale', source: 'Groupe Famille', amount: 15500, date: new Date(Date.now() - 2 * 3600000) },
  { id: '2', type: 'sale', source: 'Clients Réguliers', amount: 7500, date: new Date(Date.now() - 5 * 3600000) },
  { id: '3', type: 'sale', source: 'Nouvelle Collection', amount: 24000, date: new Date(Date.now() - 24 * 3600000) },
  { id: '4', type: 'withdrawal', amount: -50000, date: new Date(Date.now() - 48 * 3600000) },
];

export default function VendorWAEarningsScreen() {
  const totalRevenue = transactions.filter(t => t.type === 'sale').reduce((sum, t) => sum + t.amount, 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gains WhatsApp</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.balanceCard}>
          <View style={styles.whatsappBadge}>
            <Ionicons name="logo-whatsapp" size={24} color={COLORS.white} />
          </View>
          <Text style={styles.balanceLabel}>Revenus totaux WhatsApp</Text>
          <Text style={styles.balanceValue}>{formatXAF(125000)}</Text>
          <Text style={styles.balanceSubtext}>Cette semaine: {formatXAF(totalRevenue)}</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="people" size={24} color={COLORS.success} />
            <Text style={styles.statValue}>567</Text>
            <Text style={styles.statLabel}>Contacts</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="share-social" size={24} color={COLORS.info} />
            <Text style={styles.statValue}>155</Text>
            <Text style={styles.statLabel}>Partages</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="receipt" size={24} color={COLORS.warning} />
            <Text style={styles.statValue}>38</Text>
            <Text style={styles.statLabel}>Commandes</Text>
          </View>
        </View>

        <View style={styles.transactionsSection}>
          <Text style={styles.sectionTitle}>Historique</Text>
          {transactions.map((tx) => (
            <View key={tx.id} style={styles.transactionItem}>
              <View style={[styles.txIcon, { backgroundColor: tx.type === 'sale' ? `${COLORS.success}15` : `${COLORS.warning}15` }]}>
                <Ionicons name={tx.type === 'sale' ? 'arrow-down' : 'arrow-up'} size={18} color={tx.type === 'sale' ? COLORS.success : COLORS.warning} />
              </View>
              <View style={styles.txInfo}>
                <Text style={styles.txTitle}>{tx.type === 'sale' ? tx.source : 'Retrait'}</Text>
                <Text style={styles.txDate}>{tx.date.toLocaleDateString('fr-GA')}</Text>
              </View>
              <Text style={[styles.txAmount, { color: tx.type === 'sale' ? COLORS.success : COLORS.warning }]}>
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
  balanceCard: { margin: SPACING.lg, padding: SPACING.lg, backgroundColor: COLORS.success, borderRadius: RADIUS.xl, alignItems: 'center', ...SHADOW.md },
  whatsappBadge: { width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.md },
  balanceLabel: { fontSize: FONT_SIZE.sm, color: COLORS.white, opacity: 0.8 },
  balanceValue: { fontSize: FONT_SIZE.display, fontWeight: '700', color: COLORS.white, marginVertical: SPACING.sm },
  balanceSubtext: { fontSize: FONT_SIZE.sm, color: COLORS.white, opacity: 0.7 },
  statsRow: { flexDirection: 'row', paddingHorizontal: SPACING.lg, gap: SPACING.md, marginBottom: SPACING.lg },
  statCard: { flex: 1, backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md, alignItems: 'center', ...SHADOW.sm },
  statValue: { fontSize: FONT_SIZE.lg, fontWeight: '700', color: COLORS.gray900, marginTop: SPACING.sm },
  statLabel: { fontSize: FONT_SIZE.xs, color: COLORS.gray500 },
  transactionsSection: { paddingHorizontal: SPACING.lg, marginBottom: SPACING.xxl },
  sectionTitle: { fontSize: FONT_SIZE.md, fontWeight: '600', color: COLORS.gray900, marginBottom: SPACING.md },
  transactionItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md, marginBottom: SPACING.sm, ...SHADOW.sm },
  txIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  txInfo: { flex: 1, marginLeft: SPACING.md },
  txTitle: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: COLORS.gray900 },
  txDate: { fontSize: FONT_SIZE.xs, color: COLORS.gray500 },
  txAmount: { fontSize: FONT_SIZE.md, fontWeight: '700' },
});