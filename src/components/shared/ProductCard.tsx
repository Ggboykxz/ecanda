import { memo } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { COLORS, SPACING, RADIUS, FONT_SIZE, SHADOW } from '../../constants/theme';
import { formatXAF } from '../../utils/formatCurrency';
import type { Product } from '../../types/product.types';
import Badge from './Badge';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  variant?: 'default' | 'horizontal';
}

const ProductCard = memo(({ product, onPress, onAddToCart, variant = 'default' }: ProductCardProps) => {
  const hasDiscount = product.comparePrice && product.comparePrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100)
    : 0;

  if (variant === 'horizontal') {
    return (
      <Pressable onPress={() => onPress(product)} style={styles.horizontalContainer}>
        <Image
          source={{ uri: product.images[0] || 'https://via.placeholder.com/150' }}
          style={styles.horizontalImage}
          contentFit="cover"
        />
        <View style={styles.horizontalContent}>
          <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatXAF(product.price)}</Text>
            {hasDiscount && (
              <Text style={styles.comparePrice}>{formatXAF(product.comparePrice!)}</Text>
            )}
          </View>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color={COLORS.warning} />
            <Text style={styles.rating}>{product.rating.toFixed(1)}</Text>
            <Text style={styles.reviews}>({product.reviewsCount})</Text>
          </View>
          {onAddToCart && (
            <Pressable
              onPress={() => onAddToCart(product)}
              style={styles.addButton}
              accessibilityRole="button"
              accessibilityLabel="Ajouter au panier"
            >
              <Ionicons name="add" size={20} color={COLORS.white} />
            </Pressable>
          )}
        </View>
      </Pressable>
    );
  }

  return (
    <Animated.View entering={FadeInDown.duration(300)} style={styles.container}>
      <Pressable onPress={() => onPress(product)} style={styles.pressable}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.images[0] || 'https://via.placeholder.com/150' }}
            style={styles.image}
            contentFit="cover"
          />
          {hasDiscount && (
            <Badge label={`-${discountPercent}%`} variant="error" style={styles.discountBadge} />
          )}
          {!product.isAvailable && (
            <View style={styles.unavailableOverlay}>
              <Text style={styles.unavailableText}>Indisponible</Text>
            </View>
          )}
        </View>
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatXAF(product.price)}</Text>
            {hasDiscount && (
              <Text style={styles.comparePrice}>{formatXAF(product.comparePrice!)}</Text>
            )}
          </View>
          <View style={styles.footer}>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={12} color={COLORS.warning} />
              <Text style={styles.rating}>{product.rating.toFixed(1)}</Text>
              <Text style={styles.reviews}>({product.reviewsCount})</Text>
            </View>
            {onAddToCart && product.isAvailable && (
              <Pressable
                onPress={() => onAddToCart(product)}
                style={styles.cartButton}
                accessibilityRole="button"
                accessibilityLabel="Ajouter au panier"
              >
                <Ionicons name="cart-outline" size={18} color={COLORS.primary} />
              </Pressable>
            )}
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    ...SHADOW.sm,
  },
  pressable: {
    width: '100%',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.lg,
    backgroundColor: COLORS.gray100,
  },
  discountBadge: {
    position: 'absolute',
    top: SPACING.sm,
    left: SPACING.sm,
  },
  unavailableOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderTopLeftRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unavailableText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: FONT_SIZE.sm,
  },
  content: {
    padding: SPACING.sm,
  },
  title: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    color: COLORS.gray900,
    marginBottom: SPACING.xs,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  price: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.primary,
  },
  comparePrice: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray500,
    textDecorationLine: 'line-through',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  rating: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '600',
    color: COLORS.gray700,
  },
  reviews: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray500,
  },
  cartButton: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.full,
    backgroundColor: `${COLORS.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    width: 28,
    height: 28,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    ...SHADOW.sm,
    overflow: 'hidden',
  },
  horizontalImage: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.gray100,
  },
  horizontalContent: {
    flex: 1,
    padding: SPACING.sm,
    justifyContent: 'center',
  },
});

export default ProductCard;