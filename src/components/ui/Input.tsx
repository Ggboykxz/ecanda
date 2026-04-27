import { memo, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Pressable,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, FONT_SIZE } from '../../constants/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
}

const Input = memo(({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = props.secureTextEntry !== undefined;
  const effectiveRightIcon = isPassword
    ? (showPassword ? 'eye-off-outline' : 'eye-outline')
    : rightIcon;

  const handleRightIconPress = isPassword
    ? () => setShowPassword(!showPassword)
    : onRightIconPress;

  const getBorderColor = () => {
    if (error) return COLORS.error;
    if (isFocused) return COLORS.primary;
    return COLORS.gray300;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          { borderColor: getBorderColor() },
          isFocused && styles.focused,
        ]}
      >
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            color={COLORS.gray500}
            style={styles.leftIcon}
          />
        )}
        <TextInput
          {...props}
          secureTextEntry={isPassword && !showPassword}
          style={[
            styles.input,
            leftIcon && { paddingLeft: 0 },
            (rightIcon || isPassword) && { paddingRight: 0 },
          ]}
          placeholderTextColor={COLORS.gray400}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
        />
        {effectiveRightIcon && (
          <Pressable
            onPress={handleRightIconPress}
            style={styles.rightIcon}
            accessibilityRole="button"
          >
            <Ionicons
              name={effectiveRightIcon}
              size={20}
              color={COLORS.gray500}
            />
          </Pressable>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '500',
    color: COLORS.gray700,
    marginBottom: SPACING.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
  },
  focused: {
    borderWidth: 2,
  },
  leftIcon: {
    marginRight: SPACING.sm,
  },
  rightIcon: {
    marginLeft: SPACING.sm,
    padding: SPACING.xs,
  },
  input: {
    flex: 1,
    paddingVertical: SPACING.md,
    fontSize: FONT_SIZE.md,
    color: COLORS.gray900,
  },
  error: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.error,
    marginTop: SPACING.xs,
  },
});

export default Input;