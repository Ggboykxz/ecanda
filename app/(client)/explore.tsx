import { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, Pressable, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { COLORS, SPACING, FONT_SIZE, RADIUS, SHADOW } from '../../src/constants/theme';
import ProductCard from '../../src/components/shared/ProductCard';
import Badge from '../../src/components/ui/Badge';
import { CATEGORIES } from '../../src/types/product.types';

const MOCK_PRODUCTS = [
  {
    id: '1', vendorId: 'v1', vendorType: 'boutique' as const,
    title: 'Poulet fermier - 2kg', description: 'Poulet fermier élevé en plein air',
    images: ['https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400'],
    price: 8500, comparePrice: 10000, category: 'alimentation', tags: ['poulet', 'fermier'],
    stock: 50, isAvailable: true, city: 'Libreville', deliveryZones: ['Libreville'],
    rating: 4.5, reviewsCount: 28, createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: '2', vendorId: 'v2', vendorType: 'vendor' as const,
    title: 'Sac en fibres naturelles', description: 'Sac artisanal Gabon',
    images: ['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400'],
    price: 15000, category: 'mode', tags: ['sac', 'artisanat'],
    stock: 15, isAvailable: true, city: 'Libreville', deliveryZones: ['Libreville'],
    rating: 4.8, reviewsCount: 12, createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: '3', vendorId: 'v3', vendorType: 'boutique' as const,
    title: 'Smartphone dernière génération', description: 'Smartphone haut de gamme',
    images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400'],
    price: 125000, comparePrice: 150000, category: 'electronique', tags: ['smartphone', 'tech'],
    stock: 8, isAvailable: true, city: 'Libreville', deliveryZones: ['Libreville', 'Port-Gentil'],
    rating: 4.2, reviewsCount: 45, createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: '4', vendorId: 'v4', vendorType: 'vendor' as const,
    title: 'Beurre de karité naturel', description: '100% naturel du Congo',
    images: ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400'],
    price: 3500, category: 'beauté', tags: ['karité', 'naturel'],
    stock: 100, isAvailable: true, city: 'Libreville', deliveryZones: ['Libreville'],
    rating: 4.9, reviewsCount: 67, createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: '5', vendorId: 'v5', vendorType: 'boutique' as const,
    title: 'Table basse en bois', description: 'Artisanat local',
    images: ['https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400'],
    price: 45000, category: 'maison', tags: ['mobilier', 'bois'],
    stock: 5, isAvailable: true, city: 'Libreville', deliveryZones: ['Libreville'],
    rating: 4.6, reviewsCount: 18, createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: '6', vendorId: 'v6', vendorType: 'vendor' as const,
    title: 'T-shirt en coton', description: 'Made in Gabon',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'],
    price: 8000, category: 'mode', tags: ['vêtement', 'coton'],
    stock: 50, isAvailable: true, city: 'Libreville', deliveryZones: ['Libreville'],
    rating: 4.4, reviewsCount: 32, createdAt: new Date(), updatedAt: new Date(),
  },
];

const recentSearches = ['poulet', 'karité', 'sac', 'smartphone', 'beauté'];

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleProductPress = (product: any) => {
    console.log('Product:', product.id);
  };

  const handleAddToCart = (product: any) => {
    console.log('Add to cart:', product.id);
  };

  const filteredProducts = selectedCategory
    ? MOCK_PRODUCTS.filter(p => p.category === selectedCategory)
    : MOCK_PRODUCTS;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explorer</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={COLORS.gray400} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher produits, boutiques..."
          placeholderTextColor={COLORS.gray400}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Pressable style={styles.voiceButton}>
          <Ionicons name="mic" size={20} color={COLORS.gray600} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.recentSearches}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recherches récentes</Text>
            <Pressable>
              <Text style={styles.clearText}>Effacer</Text>
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.searchesList}>
            {recentSearches.map((search, index) => (
              <Pressable key={index} style={styles.searchChip}>
                <Ionicons name="time-outline" size={14} color={COLORS.gray500} />
                <Text style={styles.searchChipText}>{search}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.categoriesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Catégories</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesList}>
            <Pressable
              onPress={() => setSelectedCategory(null)}
              style={[styles.categoryChip, !selectedCategory && styles.categoryChipActive]}
            >
              <Text style={[styles.categoryText, !selectedCategory && styles.categoryTextActive]}>Tout</Text>
            </Pressable>
            {CATEGORIES.map((cat) => (
              <Pressable
                key={cat.id}
                onPress={() => setSelectedCategory(cat.id)}
                style={[styles.categoryChip, selectedCategory === cat.id && styles.categoryChipActive]}
              >
                <Ionicons
                  name={cat.icon as any}
                  size={16}
                  color={selectedCategory === cat.id ? COLORS.white : COLORS.gray600}
                />
                <Text style={[styles.categoryText, selectedCategory === cat.id && styles.categoryTextActive]}>
                  {cat.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.resultsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory ? CATEGORIES.find(c => c.id === selectedCategory)?.name : 'Tous les produits'}
            </Text>
            <Text style={styles.resultCount}>{filteredProducts.length} résultats</Text>
          </View>

          <View style={styles.filterRow}>
            <Pressable style={styles.filterButton}>
              <Ionicons name="filter" size={16} color={COLORS.gray700} />
              <Text style={styles.filterText}>Filtres</Text>
            </Pressable>
            <Pressable style={styles.filterButton}>
              <Ionicons name="swap-vertical" size={16} color={COLORS.gray700} />
              <Text style={styles.filterText}>Trier</Text>
            </Pressable>
            <Pressable style={styles.filterButton}>
              <Ionicons name="pricetag" size={16} color={COLORS.gray700} />
              <Text style={styles.filterText}>Promos</Text>
            </Pressable>
          </View>

          <View style={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onPress={handleProductPress}
                onAddToCart={handleAddToCart}
              />
            ))}
          </View>
        </View>
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
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: COLORS.gray900,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
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
  voiceButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.sm,
    ...SHADOW.sm,
  },
  recentSearches: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.gray900,
  },
  clearText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
  },
  searchesList: {
    gap: SPACING.sm,
  },
  searchChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.full,
    gap: SPACING.xs,
    ...SHADOW.sm,
  },
  searchChipText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray700,
  },
  categoriesSection: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  categoriesList: {
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
  resultsSection: {
    paddingHorizontal: SPACING.lg,
  },
  resultCount: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
  },
  filterRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    gap: SPACING.xs,
    ...SHADOW.sm,
  },
  filterText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray700,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});