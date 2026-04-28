import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, RADIUS, SHADOW } from '@/src/constants/theme';

const settingsSections = [
  {
    title: 'Boutique',
    items: [
      { icon: 'storefront-outline', label: 'Informations boutique', type: 'link' },
      { icon: 'image-outline', label: 'Photos & Bannière', type: 'link' },
      { icon: 'location-outline', label: 'Adresse', type: 'link' },
      { icon: 'time-outline', label: 'Horaires d\'ouverture', type: 'link' },
    ],
  },
  {
    title: 'Paiements',
    items: [
      { icon: 'card-outline', label: 'Moyens de paiement', type: 'link' },
      { icon: 'receipt-outline', label: 'Facturation', type: 'link' },
      { icon: 'wallet-outline', label: 'Compte bancaire', type: 'link' },
    ],
  },
  {
    title: 'Notifications',
    items: [
      { icon: 'notifications-outline', label: 'Notifications push', type: 'toggle', value: true },
      { icon: 'mail-outline', label: 'Notifications email', type: 'toggle', value: true },
      { icon: 'chatbubble-outline', label: 'Notifications SMS', type: 'toggle', value: false },
    ],
  },
  {
    title: 'Équipe',
    items: [
      { icon: 'people-outline', label: 'Gérer l\'équipe', type: 'link' },
      { icon: 'shield-checkmark-outline', label: 'Rôles & Permissions', type: 'link' },
    ],
  },
  {
    title: 'Sécurité',
    items: [
      { icon: 'lock-closed-outline', label: 'Mot de passe', type: 'link' },
      { icon: 'phone-portrait-outline', label: 'Authentification 2FA', type: 'toggle', value: true },
    ],
  },
];

export default function BoutiqueSettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}><Text style={styles.title}>Paramètres</Text></View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {settingsSections.map((section, sectionIdx) => (
          <View key={sectionIdx} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIdx) => (
                <Pressable key={itemIdx} style={[styles.settingItem, itemIdx === section.items.length - 1 && styles.settingItemLast]}>
                  <View style={styles.settingIcon}>
                    <Ionicons name={item.icon as any} size={20} color={COLORS.primary} />
                  </View>
                  <Text style={styles.settingLabel}>{item.label}</Text>
                  {item.type === 'link' && <Ionicons name="chevron-forward" size={20} color={COLORS.gray400} />}
                  {item.type === 'toggle' && <Switch value={item.value} trackColor={{ false: COLORS.gray200, true: COLORS.success }} thumbColor={COLORS.white} />}
                </Pressable>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.dangerSection}>
          <Text style={styles.sectionTitle}>Zone dangereuse</Text>
          <View style={styles.dangerContent}>
            <Pressable style={styles.dangerItem}>
              <Ionicons name="download-outline" size={20} color={COLORS.gray700} />
              <Text style={styles.dangerLabel}>Exporter mes données</Text>
              <Ionicons name="chevron-forward" size={20} color={COLORS.gray400} />
            </Pressable>
            <Pressable style={styles.dangerItem}>
              <Ionicons name="pause-circle-outline" size={20} color={COLORS.warning} />
              <Text style={[styles.dangerLabel, { color: COLORS.warning }]}>Mettre en pause</Text>
              <Ionicons name="chevron-forward" size={20} color={COLORS.gray400} />
            </Pressable>
            <Pressable style={[styles.dangerItem, styles.dangerItemLast]}>
              <Ionicons name="trash-outline" size={20} color={COLORS.error} />
              <Text style={[styles.dangerLabel, { color: COLORS.error }]}>Supprimer la boutique</Text>
              <Ionicons name="chevron-forward" size={20} color={COLORS.gray400} />
            </Pressable>
          </View>
        </View>

        <Text style={styles.version}>Version 1.0.0 • ECANDA</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.gray50 },
  header: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.md, paddingBottom: SPACING.md, backgroundColor: COLORS.white, ...SHADOW.sm },
  title: { fontSize: FONT_SIZE.xl, fontWeight: '700', color: COLORS.gray900 },
  content: { padding: SPACING.lg },
  section: { marginBottom: SPACING.lg },
  sectionTitle: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: COLORS.gray500, marginBottom: SPACING.sm, marginLeft: SPACING.xs },
  sectionContent: { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, ...SHADOW.sm },
  settingItem: { flexDirection: 'row', alignItems: 'center', padding: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.gray100 },
  settingItemLast: { borderBottomWidth: 0 },
  settingIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: `${COLORS.primary}15`, justifyContent: 'center', alignItems: 'center', marginRight: SPACING.md },
  settingLabel: { flex: 1, fontSize: FONT_SIZE.md, color: COLORS.gray900 },
  dangerSection: { marginBottom: SPACING.lg },
  dangerContent: { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, ...SHADOW.sm },
  dangerItem: { flexDirection: 'row', alignItems: 'center', padding: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.gray100 },
  dangerItemLast: { borderBottomWidth: 0 },
  dangerLabel: { flex: 1, fontSize: FONT_SIZE.md, color: COLORS.gray700, marginLeft: SPACING.md },
  version: { textAlign: 'center', fontSize: FONT_SIZE.xs, color: COLORS.gray400, marginBottom: SPACING.xxl },
});