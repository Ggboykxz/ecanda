import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, RADIUS, SHADOW } from '@/src/constants/theme';

const menuItems = [
  { icon: 'person-outline', label: 'Informations personnelles', route: '/profile/edit' },
  { icon: 'location-outline', label: 'Adresses', route: '/profile/addresses' },
  { icon: 'heart-outline', label: 'Favoris', route: '/profile/favorites' },
  { icon: 'card-outline', label: 'Moyens de paiement', route: '/profile/payment' },
  { icon: 'notifications-outline', label: 'Notifications', route: '/profile/notifications' },
  { icon: 'shield-checkmark-outline', label: 'Sécurité', route: '/profile/security' },
  { icon: 'help-circle-outline', label: 'Aide & Support', route: '/profile/help' },
  { icon: 'information-circle-outline', label: 'À propos', route: '/profile/about' },
];

const stats = [
  { value: '12', label: 'Commandes' },
  { value: '5', label: 'Favoris' },
  { value: '3', label: 'Adresses' },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profil</Text>
        <Pressable style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color={COLORS.gray900} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>Jean Dupont</Text>
            <Text style={styles.userPhone}>+241 77 12 34 56</Text>
            <Text style={styles.userEmail}>jean.dupont@email.com</Text>
          </View>
          <Pressable style={styles.editButton}>
            <Ionicons name="pencil" size={18} color={COLORS.primary} />
          </Pressable>
        </View>

        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <Pressable key={index} style={styles.menuItem}>
              <View style={styles.menuIcon}>
                <Ionicons name={item.icon as any} size={22} color={COLORS.primary} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={20} color={COLORS.gray400} />
            </Pressable>
          ))}
        </View>

        <View style={styles.logoutSection}>
          <Pressable style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={22} color={COLORS.error} />
            <Text style={styles.logoutText}>Se déconnecter</Text>
          </Pressable>
        </View>

        <Text style={styles.version}>Version 1.0.0</Text>
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
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: COLORS.gray900,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: SPACING.lg,
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    ...SHADOW.sm,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.gray200,
  },
  profileInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  userName: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.gray900,
  },
  userPhone: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray600,
    marginTop: 2,
  },
  userEmail: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray500,
    marginTop: 2,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${COLORS.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    ...SHADOW.sm,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: COLORS.gray100,
  },
  statValue: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray500,
    marginTop: 2,
  },
  menuSection: {
    marginHorizontal: SPACING.lg,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    ...SHADOW.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${COLORS.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  menuLabel: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    color: COLORS.gray900,
  },
  logoutSection: {
    margin: SPACING.lg,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    ...SHADOW.sm,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
  },
  logoutText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.error,
    fontWeight: '600',
    marginLeft: SPACING.sm,
  },
  version: {
    textAlign: 'center',
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray400,
    marginBottom: SPACING.xxl,
  },
});