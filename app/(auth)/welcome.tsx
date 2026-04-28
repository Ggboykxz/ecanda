import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, RADIUS } from '@/src/constants/theme';
import Button from '@/src/components/ui/Button';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={[COLORS.secondary, COLORS.secondaryLight, COLORS.primary]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Ionicons name="storefront" size={48} color={COLORS.primary} />
              </View>
              <Text style={styles.appName}>ECANDA</Text>
              <Text style={styles.tagline}>Le commerce gabonais dans votre poche</Text>
            </View>

            <View style={styles.features}>
              <View style={styles.featureItem}>
                <Ionicons name="cart" size={24} color={COLORS.white} />
                <Text style={styles.featureText}>Achats facile</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="flash" size={24} color={COLORS.white} />
                <Text style={styles.featureText}>Vente rapide</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="bicycle" size={24} color={COLORS.white} />
                <Text style={styles.featureText}>Livraison</Text>
              </View>
            </View>

            <View style={styles.actions}>
              <Link href="/(auth)/role-select" asChild>
                <Button
                  title="Commencer"
                  variant="primary"
                  size="lg"
                  fullWidth
                  onPress={() => {}}
                />
              </Link>
              <Link href="/(auth)/login/client" asChild>
                <Button
                  title="J'ai déjà un compte"
                  variant="ghost"
                  size="md"
                  fullWidth
                  onPress={() => {}}
                  textStyle={{ color: COLORS.white }}
                />
              </Link>
            </View>

            <Text style={styles.footerText}>
              En continuant, vous acceptez nos conditions d'utilisation
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: SPACING.xxl,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: RADIUS.xl,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  appName: {
    fontSize: FONT_SIZE.display,
    fontWeight: '700',
    color: COLORS.white,
    letterSpacing: 2,
  },
  tagline: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray300,
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: SPACING.xl,
  },
  featureItem: {
    alignItems: 'center',
    gap: SPACING.sm,
  },
  featureText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.sm,
  },
  actions: {
    gap: SPACING.md,
  },
  footerText: {
    color: COLORS.gray400,
    fontSize: FONT_SIZE.xs,
    textAlign: 'center',
    marginTop: SPACING.lg,
  },
});