import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, RADIUS, SHADOW } from '@/src/constants/theme';

const channels = [
  { id: '1', name: 'Groupe Famille', type: 'group', members: 156, isActive: true, orders: 12 },
  { id: '2', name: 'Clients Réguliers', type: 'group', members: 89, isActive: true, orders: 8 },
  { id: '3', name: 'Nouvelle Collection', type: 'group', members: 234, isActive: true, orders: 15 },
  { id: '4', name: 'Boutique Mode', type: 'channel', members: 456, isActive: true, orders: 23 },
  { id: '5', name: 'Promotions', type: 'channel', members: 178, isActive: false, orders: 0 },
];

export default function VendorWAChannelsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Canaux WhatsApp</Text>
        <Pressable style={styles.addButton}>
          <Ionicons name="add" size={20} color={COLORS.white} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={20} color={COLORS.info} />
          <Text style={styles.infoText}>
            Connectez vos groupes et chaînes WhatsApp pour suivre vos ventes ECANDA.
          </Text>
        </View>

        <View style={styles.channelList}>
          {channels.map((channel) => (
            <View key={channel.id} style={styles.channelCard}>
              <View style={styles.channelHeader}>
                <View style={[styles.channelIcon, { backgroundColor: channel.isActive ? `${COLORS.success}15` : `${COLORS.gray300}15` }]}>
                  <Ionicons
                    name={channel.type === 'group' ? 'people' : 'megaphone'}
                    size={22}
                    color={channel.isActive ? COLORS.success : COLORS.gray400}
                  />
                </View>
                <View style={styles.channelInfo}>
                  <Text style={[styles.channelName, !channel.isActive && styles.channelInactive]}>
                    {channel.name}
                  </Text>
                  <Text style={styles.channelMembers}>{channel.members} membres</Text>
                </View>
                <View style={[styles.statusBadge, channel.isActive ? styles.statusActive : styles.statusInactive]}>
                  <Text style={[styles.statusText, channel.isActive ? styles.statusTextActive : styles.statusTextInactive]}>
                    {channel.isActive ? 'Actif' : 'Inactif'}
                  </Text>
                </View>
              </View>

              <View style={styles.channelStats}>
                <View style={styles.statItem}>
                  <Ionicons name="receipt-outline" size={16} color={COLORS.gray500} />
                  <Text style={styles.statText}>{channel.orders} commandes</Text>
                </View>
                <View style={styles.channelActions}>
                  <Pressable style={styles.actionButton}>
                    <Ionicons name="share-social-outline" size={18} color={COLORS.primary} />
                  </Pressable>
                  <Pressable style={styles.actionButton}>
                    <Ionicons name="settings-outline" size={18} color={COLORS.gray600} />
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </View>
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
  title: { fontSize: FONT_SIZE.xl, fontWeight: '700', color: COLORS.gray900 },
  addButton: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.success,
    justifyContent: 'center', alignItems: 'center',
  },
  content: { padding: SPACING.lg },
  infoCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: `${COLORS.info}15`,
    borderRadius: RADIUS.lg, padding: SPACING.md, marginBottom: SPACING.lg, gap: SPACING.sm,
  },
  infoText: { flex: 1, fontSize: FONT_SIZE.sm, color: COLORS.gray700 },
  channelList: { gap: SPACING.md },
  channelCard: {
    backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md,
    ...SHADOW.sm,
  },
  channelHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.md },
  channelIcon: {
    width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center',
    marginRight: SPACING.md,
  },
  channelInfo: { flex: 1 },
  channelName: { fontSize: FONT_SIZE.md, fontWeight: '600', color: COLORS.gray900 },
  channelInactive: { color: COLORS.gray500 },
  channelMembers: { fontSize: FONT_SIZE.sm, color: COLORS.gray500 },
  statusBadge: { paddingHorizontal: SPACING.sm, paddingVertical: 4, borderRadius: RADIUS.full },
  statusActive: { backgroundColor: `${COLORS.success}15` },
  statusInactive: { backgroundColor: `${COLORS.gray300}15` },
  statusText: { fontSize: FONT_SIZE.xs, fontWeight: '500' },
  statusTextActive: { color: COLORS.success },
  statusTextInactive: { color: COLORS.gray500 },
  channelStats: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statItem: { flexDirection: 'row', alignItems: 'center', gap: SPACING.xs },
  statText: { fontSize: FONT_SIZE.sm, color: COLORS.gray600 },
  channelActions: { flexDirection: 'row', gap: SPACING.sm },
  actionButton: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.gray100,
    justifyContent: 'center', alignItems: 'center',
  },
});