import { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, TextInput, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { COLORS, SPACING, FONT_SIZE, RADIUS, SHADOW } from '../../src/constants/theme';
import Button from '../../src/components/ui/Button';
import ProductCard from '../../src/components/shared/ProductCard';
import { formatXAF } from '../../src/utils/formatCurrency';

const categories = [
  { id: 'all', name: 'Tout', icon: 'apps' },
  { id: 'alimentation', name: 'Alimentation', icon: 'nutrition' },
  { id: 'mode', name: 'Mode', icon: 'shirt' },
  { id: 'electronique', name: 'Électronique', icon: 'phone-portrait' },
  { id: 'beauté', name: 'Beauté', icon: 'sparkles' },
  { id: 'maison', name: 'Maison', icon: 'home' },
];

const MOCK_PRODUCTS = [
  {
    id: '1',
    vendorId: 'v1',
    vendorType: 'boutique' as const,
    title: 'Poulet fermier - 2kg',
    description: 'Poulet fermier élevé en plein air',
    images: ['https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400'],
    price: 8500,
    comparePrice: 10000,
    category: 'alimentation',
    tags: ['poulet', 'fermier'],
    stock: 50,
    isAvailable: true,
    city: 'Libreville',
    deliveryZones: ['Libreville'],
    rating: 4.5,
    reviewsCount: 28,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    vendorId: 'v2',
    vendorType: 'vendor' as const,
    title: 'Sac en fibres naturelles',
    description: 'Sac artisanal Gabon',
    images: ['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400'],
    price: 15000,
    category: 'mode',
    tags: ['sac', 'artisanat'],
    stock: 15,
    isAvailable: true,
    city: 'Libreville',
    deliveryZones: ['Libreville'],
    rating: 4.8,
    reviewsCount: 12,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    vendorId: 'v3',
    vendorType: 'boutique' as const,
    title: '智能手机 - Smartphone',
    description: 'Smartphone dernière génération',
    images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400'],
    price: 125000,
    comparePrice: 150000,
    category: 'electronique',
    tags: ['smartphone', 'tech'],
    stock: 8,
    isAvailable: true,
    city: 'Libreville',
    deliveryZones: ['Libreville', 'Port-Gentil'],
    rating: 4.2,
    reviewsCount: 45,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    vendorId: 'v4',
    vendorType: 'vendor' as const,
    title: 'Beurre de karité naturel',
    description: '100% naturel du Congo',
    images: ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400'],
    price: 3500,
    category: 'beauté',
    tags: ['karité', 'naturel'],
    stock: 100,
    isAvailable: true,
    city: 'Libreville',
    deliveryZones: ['Libreville'],
    rating: 4.9,
    reviewsCount: 67,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function ClientHomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const handleProductPress = (product: any) => {
    console.log('Product:', product.id);
  };

  const handleAddToCart = (product: any) => {
    console.log('Add to cart:', product.id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />
        }
      >
        <Animated.View entering={FadeInDown.duration(300)}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.greeting}>Bonjour 👋</Text>
              <Text style={styles.location}>
                <Ionicons name="location" size={14} color={COLORS.gray600} />
                {' '}Libreville
              </Text>
            </View>
            <Pressable style={styles.notificationButton}>
              <Ionicons name="notifications-outline" size={24} color={COLORS.gray900} />
              <View style={styles.notificationBadge} />
            </Pressable>
          </View>

          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={COLORS.gray400} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher un produit..."
              placeholderTextColor={COLORS.gray400}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Pressable style={styles.filterButton}>
              <Ionicons name="options" size={20} color={COLORS.white} />
            </Pressable>
          </View>

          <View style={styles.categoriesContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesList}>
              {categories.map((category) => (
                <Pressable
                  key={category.id}
                  onPress={() => setSelectedCategory(category.id)}
                  style={[
                    styles.categoryChip,
                    selectedCategory === category.id && styles.categoryChipActive,
                  ]}
                >
                  <Ionicons
                    name={category.icon as any}
                    size={16}
                    color={selectedCategory === category.id ? COLORS.white : COLORS.gray600}
                  />
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === category.id && styles.categoryTextActive,
                    ]}
                  >
                    {category.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          <View style={styles.promoBanner}>
            <View style={styles.promoContent}>
              <Text style={styles.promoTitle}>🎉 Promo du jour</Text>
              <Text style={styles.promoSubtitle}>-20% sur les produits locaux</Text>
              <Button title="Voir" variant="primary" size="sm" onPress={() => {}} />
            </View>
            <Ionicons name="gift" size={60} color={COLORS.primary} style={styles.promoIcon} />
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tendances</Text>
            <Pressable>
              <Text style={styles.seeAll}>Voir tout</Text>
            </Pressable>
          </View>

          <View style={styles.productsGrid}>
            {MOCK_PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onPress={handleProductPress}
                onAddToCart={handleAddToCart}
              />
            ))}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nouveautés</Text>
            <Pressable>
              <Text style={styles.seeAll}>Voir tout</Text>
            </Pressable>
          </View>

          <View style={styles.productsGrid}>
            {MOCK_PRODUCTS.slice(0, 2).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onPress={handleProductPress}
                onAddToCart={handleAddToCart}
              />
            ))}
          </View>
        </Animated.View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
  },
  headerLeft: {
    gap: SPACING.xs,
  },
  greeting: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: COLORS.gray900,
  },
  location: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray600,
  },
  notificationButton: {
    position: 'relative',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOW.sm,
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.error,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.md,
  },
  searchIcon: {
    position: 'absolute',
    left: SPACING.md,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    height: 48,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    paddingLeft: 44,
    paddingRight: SPACING.md,
    fontSize: FONT_SIZE.md,
    color: COLORS.gray900,
    ...SHADOW.sm,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.sm,
    ...SHADOW.md,
  },
  categoriesContainer: {
    marginTop: SPACING.md,
  },
  categoriesList: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.full,
    gap: SPACING.xs,
    ...SHADOW.sm,
  },
  categoryChipActive: {
    backgroundColor: COLORS.primary,
  },
  categoryText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray600,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: COLORS.white,
  },
  promoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    padding: SPACING.md,
    backgroundColor: COLORS.secondary,
    borderRadius: RADIUS.lg,
    ...SHADOW.md,
  },
  promoContent: {
    flex: 1,
    gap: SPACING.xs,
  },
  promoTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.white,
  },
  promoSubtitle: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray300,
    marginBottom: SPACING.xs,
  },
  promoIcon: {
    opacity: 0.8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.xl,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.gray900,
  },
  seeAll: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
    fontWeight: '500',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.lg,
    justifyContent: 'space-between',
  },
});