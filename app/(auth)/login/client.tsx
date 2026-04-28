import { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE } from '@/src/constants/theme';
import Input from '@/src/components/ui/Input';
import Button from '@/src/components/ui/Button';

export default function LoginScreen() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log('Login:', phone, password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Link href="/(auth)/role-select" asChild>
              <Pressable style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color={COLORS.gray900} />
              </Pressable>
            </Link>
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>Connexion</Text>
            <Text style={styles.subtitle}>Connectez-vous pour continuer vos achats</Text>

            <View style={styles.form}>
              <Input
                label="Numéro de téléphone"
                placeholder="+241 77 XX XX XX"
                value={phone}
                onChangeText={setPhone}
                leftIcon="call-outline"
                keyboardType="phone-pad"
              />

              <Input
                label="Mot de passe"
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                leftIcon="lock-closed-outline"
                rightIcon={showPassword ? 'eye-off-outline' : 'eye-outline'}
                onRightIconPress={() => setShowPassword(!showPassword)}
                secureTextEntry={!showPassword}
              />

              <Pressable style={styles.forgotPassword}>
                  <Text style={styles.forgotText}>Mot de passe oublié ?</Text>
                </Pressable>

              <Button
                title="Se connecter"
                onPress={handleLogin}
                variant="primary"
                size="lg"
                fullWidth
                style={styles.button}
              />
            </View>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ou</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialLogin}>
              <Button
                title="Continuer avec Google"
                onPress={() => {}}
                variant="outline"
                size="md"
                fullWidth
                leftIcon="logo-google"
                style={styles.socialButton}
              />
            </View>

            <View style={styles.registerSection}>
              <Text style={styles.registerText}>Pas encore de compte ?</Text>
              <Link href="/(auth)/register/client" asChild>
                <Pressable>
                  <Text style={styles.registerLink}>S'inscrire</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray50,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: '700',
    color: COLORS.gray900,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray600,
    marginBottom: SPACING.xl,
  },
  form: {
    gap: SPACING.sm,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: SPACING.md,
  },
  forgotText: {
    color: COLORS.primary,
    fontSize: FONT_SIZE.sm,
  },
  button: {
    marginTop: SPACING.md,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.gray200,
  },
  dividerText: {
    color: COLORS.gray500,
    fontSize: FONT_SIZE.sm,
    marginHorizontal: SPACING.md,
  },
  socialLogin: {
    gap: SPACING.sm,
  },
  socialButton: {
    marginBottom: SPACING.md,
  },
  registerSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.xs,
    marginTop: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  registerText: {
    color: COLORS.gray600,
    fontSize: FONT_SIZE.md,
  },
  registerLink: {
    color: COLORS.primary,
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
  },
});