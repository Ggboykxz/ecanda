import { memo, ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, Pressable } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { COLORS, SPACING, RADIUS, SHADOW } from '../../constants/theme';

interface CardProps {
  children: ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  elevation?: 'none' | 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const Card = memo(({ children, onPress, style, elevation = 'sm', animated = false }: CardProps) => {
  const getElevation = () => {
    switch (elevation) {
      case 'sm':
        return SHADOW.sm;
      case 'md':
        return SHADOW.md;
      case 'lg':
        return SHADOW.lg;
      default:
        return {};
    }
  };

  const cardStyle = [styles.card, getElevation(), style];

  if (animated) {
    return (
      <Animated.View entering={FadeInDown.duration(300)} style={cardStyle}>
        {onPress ? (
          <Pressable onPress={onPress} style={styles.pressable}>
            {children}
          </Pressable>
        ) : (
          children
        )}
      </Animated.View>
    );
  }

  return (
    <View style={cardStyle}>
      {onPress ? (
        <Pressable onPress={onPress} style={styles.pressable}>
          {children}
        </Pressable>
      ) : (
        children
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
  },
  pressable: {
    width: '100%',
  },
});

export default Card;