import { View, Text, StyleSheet, SafeAreaView, FlatList, Pressable, Image, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, RADIUS, SHADOW } from '@/src/constants/theme';
import { formatXAF } from '@/src/utils/formatCurrency';
import Button from '@/src/components/ui/Button';

const MOCK_PRODUCTS = [
  { id: '1', title: 'Poulet fermier - 2kg', price: 8500, stock: 50, isAvailable: true, image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400', category: 'Alimentation', views: 234, sales: 45 },
  { id: '2', title: 'Sac en fibres naturelles', price: 15000, stock: 15, isAvailable: true, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400', category: 'Mode', views: 189, sales: 23 },
  { id: '3', title: 'Beurre de karité naturel', price: 3500, stock: 100, isAvailable: true, image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400', category: 'Beauté', views: 456, sales: 89 },
  { id: '4', title: 'Table basse artisanale', price: 45000, stock: 0, isAvailable: false, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400', category: 'Maison', views: 67, sales: 5 },
];

export default function BoutiqueCatalogScreen() {
  const activeProducts = MOCK_PRODUCTS.filter(p => p.isAvailable).length;
  const totalStock = MOCK_PRODUCTS.reduce((sum, p) => sum + p.stock, 0);

  const renderProduct = ({ item }: { item: typeof MOCK_PRODUCTS[0] }) => (
    <Pressable style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} contentFit="cover" />
      <View style={styles.productInfo}>
        <View style={styles.productHeader}>
          <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
          <Switch value={item.isAvailable} trackColor={{ false: COLORS.gray200, true: COLORS.success }} thumbColor={COLORS.white} />
        </View>
        <Text style={styles.productCategory}>{item.category}</Text>
        <View style={styles.productStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{formatXAF(item.price)}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="cube-outline" size={12} color={COLORS.gray500} />
            <Text style={styles.statText}>{item.stock}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="eye-outline" size={12} color={COLORS.gray500} />
            <Text style={styles.statText}>{item.views}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="cart-outline" size={12} color={COLORS.success} />
            <Text style={[styles.statText, { color: COLORS.success }]}>{item.sales}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Catalogue</Text>
        <Pressable style={styles.addButton}>
          <Ionicons name="add" size={20} color={COLORS.white} />
        </Pressable>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}><Text style={styles.statValue}>{MOCK_PRODUCTS.length}</Text><Text style={styles.statLabel}>Total</Text></View>
        <View style={styles.statCard}><Text style={[styles.statValue, { color: COLORS.success }]}>{activeProducts}</Text><Text style={styles.statLabel}>Actifs</Text></View>
        <View style={styles.statCard}><Text style={styles.statValue}>{totalStock}</Text><Text style={styles.statLabel}>Stock</Text></View>
      </View>

      <FlatList data={MOCK_PRODUCTS} renderItem={renderProduct} keyExtractor={(item) => item.id} contentContainerStyle={styles.productList} showsVerticalScrollIndicator={false} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.gray50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: SPACING.lg, paddingTop: SPACING.md, paddingBottom: SPACING.md, backgroundColor: COLORS.white, ...SHADOW.sm },
  title: { fontSize: FONT_SIZE.xl, fontWeight: '700', color: COLORS.gray900 },
  addButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  statsRow: { flexDirection: 'row', padding: SPACING.lg, gap: SPACING.md },
  statCard: { flex: 1, backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md, alignItems: 'center', ...SHADOW.sm },
  statValue: { fontSize: FONT_SIZE.xl, fontWeight: '700', color: COLORS.gray900 },
  statLabel: { fontSize: FONT_SIZE.xs, color: COLORS.gray500 },
  productList: { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xxl },
  productCard: { flexDirection: 'row', backgroundColor: COLORS.white, borderRadius: RADIUS.lg, marginBottom: SPACING.md, overflow: 'hidden', ...SHADOW.sm },
  productImage: { width: 90, height: 90, backgroundColor: COLORS.gray100 },
  productInfo: { flex: 1, padding: SPACING.sm, justifyContent: 'space-between' },
  productHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  productTitle: { flex: 1, fontSize: FONT_SIZE.md, fontWeight: '600', color: COLORS.gray900, marginRight: SPACING.sm },
  productCategory: { fontSize: FONT_SIZE.xs, color: COLORS.gray500 },
  productStats: { flexDirection: 'row', gap: SPACING.md },
  statItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statText: { fontSize: FONT_SIZE.xs, color: COLORS.gray500 },
});