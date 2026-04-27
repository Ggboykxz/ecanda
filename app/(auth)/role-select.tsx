import { View, Text, StyleSheet, SafeAreaView, Pressable, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, RADIUS, SHADOW } from '../../src/constants/theme';
import { ROLES, ROLE_LABELS, ROLE_ICONS } from '../../src/constants/roles';

const roles = [
  { role: ROLES.CLIENT, description: 'Achète des produits locaux', color: COLORS.primary },
  { role: ROLES.VENDOR, description: 'Vends rapidement tes produits', color: COLORS.accent },
  { role: ROLES.VENDOR_WA, description: 'Gère tes canaux WhatsApp', color: COLORS.success },
  { role: ROLES.DELIVERY, description: 'Livre les commandes', color: COLORS.warning },
  { role: ROLES.BOUTIQUE, description: 'Gère ta boutique en ligne', color: COLORS.info },
];

export default function RoleSelectScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => {}} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.gray900} />
        </Pressable>
        <Text style={styles.title}>Qui êtes-vous ?</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>
          Choisissez votre rôle pour personnaliser votre expérience ECANDA
        </Text>

        <View style={styles.rolesGrid}>
          {roles.map((item) => (
            <Link key={item.role} href={`/(auth)/register/${item.role === ROLES.VENDOR_WA ? 'vendor-whatsapp' : item.role}`} asChild>
              <Pressable style={styles.roleCard}>
                <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
                  <Ionicons
                    name={ROLE_ICONS[item.role as keyof typeof ROLE_ICONS] as keyof typeof Ionicons.glyphMap}
                    size={32}
                    color={item.color}
                  />
                </View>
                <Text style={styles.roleName}>{ROLE_LABELS[item.role as keyof typeof ROLE_LABELS]}</Text>
                <Text style={styles.roleDescription}>{item.description}</Text>
                <Ionicons name="chevron-forward" size={20} color={COLORS.gray400} />
              </Pressable>
            </Link>
          ))}
        </View>

        <View style={styles.loginSection}>
          <Text style={styles.loginText}>Déjà inscrit ?</Text>
          <Link href="/(auth)/login/client" asChild>
            <Pressable>
              <Text style={styles.loginLink}>Se connecter</Text>
            </Pressable>
          </Link>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.white,
    ...SHADOW.sm,
  },
  backButton: {
    padding: SPACING.xs,
  },
  title: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: COLORS.gray900,
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray600,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  rolesGrid: {
    gap: SPACING.md,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    ...SHADOW.sm,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  roleName: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.gray900,
    flex: 1,
  },
  roleDescription: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
    flex: 1,
    marginRight: SPACING.sm,
  },
  loginSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.xs,
    marginTop: SPACING.xl,
    paddingVertical: SPACING.lg,
  },
  loginText: {
    color: COLORS.gray600,
    fontSize: FONT_SIZE.md,
  },
  loginLink: {
    color: COLORS.primary,
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
  },
});