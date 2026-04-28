import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { COLORS, SPACING, FONT_SIZE, RADIUS, SHADOW } from '@/src/constants/theme';
import { formatXAF } from '@/src/utils/formatCurrency';
import Button from '@/src/components/ui/Button';

const MOCK_PRODUCTS = [
  { id: '1', title: 'Poulet fermier - 2kg', price: 8500, stock: 50, isAvailable: true, image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400', category: 'Alimentation' },
  { id: '2', title: 'Sac en fibres naturelles', price: 15000, stock: 15, isAvailable: true, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400', category: 'Mode' },
  { id: '3', title: 'Beurre de karité naturel', price: 3500, stock: 100, isAvailable: true, image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400', category: 'Beauté' },
  { id: '4', title: 'Table basse artisanale', price: 45000, stock: 5, isAvailable: false, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400', category: 'Maison' },
];

export default function VendorProductsScreen() {
  const activeProducts = MOCK_PRODUCTS.filter(p => p.isAvailable).length;
  const outOfStock = MOCK_PRODUCTS.filter(p => !p.isAvailable).length;

  const renderProduct = ({ item }: { item: typeof MOCK_PRODUCTS[0] }) => (
    <Pressable style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="cover" />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
        <View style={styles.productFooter}>
          <Text style={styles.productPrice}>{formatXAF(item.price)}</Text>
          <View style={[styles.stockBadge, !item.isAvailable && styles.stockBadgeUnavailable]}>
            <Text style={[styles.stockText, !item.isAvailable && styles.stockTextUnavailable]}>
              {item.isAvailable ? `${item.stock} en stock` : 'Indisponible'}
            </Text>
          </View>
        </View>
      </View>
      <Pressable style={styles.productActions}>
        <Ionicons name="ellipsis-vertical" size={20} color={COLORS.gray500} />
      </Pressable>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes produits</Text>
        <Link href="/(vendor)/products/add" asChild>
          <Pressable style={styles.addButton}>
            <Ionicons name="add" size={20} color={COLORS.white} />
          </Pressable>
        </Link>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{MOCK_PRODUCTS.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: COLORS.success }]}>{activeProducts}</Text>
          <Text style={styles.statLabel}>Actifs</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: COLORS.error }]}>{outOfStock}</Text>
          <Text style={styles.statLabel}>Inactifs</Text>
        </View>
      </View>

      <FlatList
        data={MOCK_PRODUCTS}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="cube-outline" size={64} color={COLORS.gray300} />
            <Text style={styles.emptyText}>Aucun produit</Text>
            <Text style={styles.emptySubtext}>Ajoutez votre premier produit</Text>
          </View>
        }
      />

      <View style={styles.fab}>
        <Link href="/(vendor)/products/add" asChild>
          <Pressable style={styles.fabButton}>
            <Ionicons name="add" size={24} color={COLORS.white} />
          </Pressable>
        </Link>
      </View>
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
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.white,
    ...SHADOW.sm,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: COLORS.gray900,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    margin: SPACING.lg,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    ...SHADOW.sm,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: COLORS.gray900,
  },
  statLabel: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray500,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.gray200,
  },
  productList: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 100,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    overflow: 'hidden',
    ...SHADOW.sm,
  },
  productImage: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.gray100,
  },
  productInfo: {
    flex: 1,
    padding: SPACING.sm,
    justifyContent: 'space-between',
  },
  productTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.gray900,
  },
  productCategory: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray500,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.primary,
  },
  stockBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    backgroundColor: `${COLORS.success}15`,
    borderRadius: RADIUS.full,
  },
  stockBadgeUnavailable: {
    backgroundColor: `${COLORS.error}15`,
  },
  stockText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.success,
  },
  stockTextUnavailable: {
    color: COLORS.error,
  },
  productActions: {
    padding: SPACING.sm,
    justifyContent: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: SPACING.xxl,
  },
  emptyText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: COLORS.gray700,
    marginTop: SPACING.md,
  },
  emptySubtext: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
  },
  fab: {
    position: 'absolute',
    bottom: SPACING.xl,
    right: SPACING.lg,
  },
  fabButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOW.lg,
  },
});