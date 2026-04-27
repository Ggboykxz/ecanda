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
  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case 'primary':
        return { backgroundColor: `${COLORS.primary}20`, color: COLORS.primary };
      case 'secondary':
        return { backgroundColor: `${COLORS.secondary}20`, color: COLORS.secondary };
      case 'success':
        return { backgroundColor: `${COLORS.success}20`, color: COLORS.success };
      case 'warning':
        return { backgroundColor: `${COLORS.warning}20`, color: COLORS.warning };
      case 'error':
        return { backgroundColor: `${COLORS.error}20`, color: COLORS.error };
      case 'info':
        return { backgroundColor: `${COLORS.info}20`, color: COLORS.info };
      default:
        return {};
    }
  };

  const variantStyles = getVariantStyles();
  const isSmall = size === 'sm';

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: variantStyles.backgroundColor },
        isSmall && styles.small,
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: variantStyles.color },
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