import { memo } from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { COLORS, SPACING, RADIUS, FONT_SIZE, SHADOW } from '../../constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button = memo(({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
}: ButtonProps) => {
  const isDisabled = disabled || isLoading;

  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case 'primary':
        return { backgroundColor: COLORS.primary };
      case 'secondary':
        return { backgroundColor: COLORS.secondary };
      case 'outline':
        return {
          backgroundColor: COLORS.transparent,
          borderWidth: 2,
          borderColor: COLORS.primary,
        };
      case 'ghost':
        return { backgroundColor: COLORS.transparent };
      default:
        return {};
    }
  };

  const getTextColor = (): string => {
    switch (variant) {
      case 'primary':
      case 'secondary':
        return COLORS.white;
      case 'outline':
      case 'ghost':
        return COLORS.primary;
      default:
        return COLORS.white;
    }
  };

  const getSizeStyles = (): { container: ViewStyle; text: TextStyle } => {
    switch (size) {
      case 'sm':
        return {
          container: { paddingVertical: SPACING.sm, paddingHorizontal: SPACING.md },
          text: { fontSize: FONT_SIZE.sm },
        };
      case 'lg':
        return {
          container: { paddingVertical: SPACING.lg, paddingHorizontal: SPACING.xl },
          text: { fontSize: FONT_SIZE.lg },
        };
      default:
        return {
          container: { paddingVertical: SPACING.md, paddingHorizontal: SPACING.lg },
          text: { fontSize: FONT_SIZE.md },
        };
    }
  };

  const sizeStyles = getSizeStyles();
  const textColor = getTextColor();

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.container,
        getVariantStyles(),
        sizeStyles.container,
        fullWidth && styles.fullWidth,
        variant === 'primary' && !isDisabled && SHADOW.md,
        isDisabled && styles.disabled,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: isDisabled }}
    >
      {isLoading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <>
          {leftIcon}
          <Text
            style={[
              styles.text,
              sizeStyles.text,
              { color: textColor },
              leftIcon && { marginLeft: SPACING.sm },
              rightIcon && { marginRight: SPACING.sm },
              textStyle,
            ]}
          >
            {title}
          </Text>
          {rightIcon}
        </>
      )}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.md,
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Button;