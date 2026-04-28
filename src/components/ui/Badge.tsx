import { memo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, SPACING, RADIUS, FONT_SIZE } from '../../constants/theme';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  style?: ViewStyle;
}

const Badge = memo(({ label, variant = 'primary', size = 'sm', style }: BadgeProps) => {
  const getVariantStyles = (): { bg: string; text: string } => {
    switch (variant) {
      case 'primary':
        return { bg: `${COLORS.primary}20`, text: COLORS.primary };
      case 'secondary':
        return { bg: `${COLORS.secondary}20`, text: COLORS.secondary };
      case 'success':
        return { bg: `${COLORS.success}20`, text: COLORS.success };
      case 'warning':
        return { bg: `${COLORS.warning}20`, text: COLORS.warning };
      case 'error':
        return { bg: `${COLORS.error}20`, text: COLORS.error };
      case 'info':
        return { bg: `${COLORS.info}20`, text: COLORS.info };
      default:
        return { bg: COLORS.gray100, text: COLORS.gray700 };
    }
  };

  const variantStyles = getVariantStyles();
  const isSmall = size === 'sm';

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: variantStyles.bg },
        isSmall && styles.small,
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: variantStyles.text },
          isSmall && styles.smallText,
        ]}
      >
        {label}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
  },
  small: {
    paddingHorizontal: SPACING.xs + 2,
    paddingVertical: 2,
  },
  text: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '600',
  },
  smallText: {
    fontSize: FONT_SIZE.xs - 2,
  },
});

export default Badge;