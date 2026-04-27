import { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE } from '../../src/constants/theme';
import Input from '../../src/components/ui/Input';
import Button from '../../src/components/ui/Button';

export default function RegisterClientScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    console.log('Register:', { name, phone, email, password });
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
            <Text style={styles.title}>Créer un compte</Text>
            <Text style={styles.subtitle}>Rejoignez ECANDA et faites vos achats localement</Text>

            <View style={styles.form}>
              <Input
                label="Nom complet"
                placeholder="Votre nom"
                value={name}
                onChangeText={setName}
                leftIcon="person-outline"
                autoCapitalize="words"
              />

              <Input
                label="Numéro de téléphone"
                placeholder="+241 77 XX XX XX"
                value={phone}
                onChangeText={setPhone}
                leftIcon="call-outline"
                keyboardType="phone-pad"
              />

              <Input
                label="Email (optionnel)"
                placeholder="email@exemple.com"
                value={email}
                onChangeText={setEmail}
                leftIcon="mail-outline"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Input
                label="Mot de passe"
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                leftIcon="lock-closed-outline"
                secureTextEntry
              />

              <Input
                label="Confirmer le mot de passe"
                placeholder="••••••••"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                leftIcon="lock-closed-outline"
                secureTextEntry
              />

              <Button
                title="S'inscrire"
                onPress={handleRegister}
                variant="primary"
                size="lg"
                fullWidth
                style={styles.button}
              />
            </View>

            <View style={styles.loginSection}>
              <Text style={styles.loginText}>Déjà un compte ?</Text>
              <Link href="/(auth)/login/client" asChild>
                <Pressable>
                  <Text style={styles.loginLink}>Se connecter</Text>
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
    gap: SPACING.xs,
  },
  button: {
    marginTop: SPACING.md,
  },
  loginSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.xs,
    marginTop: SPACING.xl,
    paddingBottom: SPACING.xxl,
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