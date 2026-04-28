import { View, Text, StyleSheet, SafeAreaView, FlatList, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, RADIUS, SHADOW } from '@/src/constants/theme';
import { formatXAF } from '@/src/utils/formatCurrency';

const MOCK_PRODUCTS = [
  { id: '1', title: 'Sac en fibres naturelles', price: 15000, stock: 15, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400', shareCount: 45 },
  { id: '2', title: 'Beurre de karité', price: 3500, stock: 100, image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400', shareCount: 78 },
  { id: '3', title: 'T-shirt Coton', price: 8000, stock: 50, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', shareCount: 32 },
];

export default function VendorWACatalogScreen() {
  const renderProduct = ({ item }: { item: typeof MOCK_PRODUCTS[0] }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} contentFit="cover" />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.productPrice}>{formatXAF(item.price)}</Text>
        <View style={styles.productStats}>
          <View style={styles.statItem}>
            <Ionicons name="cube-outline" size={14} color={COLORS.gray500} />
            <Text style={styles.statText}>{item.stock}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="share-social-outline" size={14} color={COLORS.success} />
            <Text style={styles.statText}>{item.shareCount} partages</Text>
          </View>
        </View>
      </View>
      <View style={styles.productActions}>
        <Pressable style={styles.actionIcon}>
          <Ionicons name="share-social" size={18} color={COLORS.success} />
        </Pressable>
        <Pressable style={styles.actionIcon}>
          <Ionicons name="ellipsis-vertical" size={18} color={COLORS.gray500} />
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Catalogue WA</Text>
        <Pressable style={styles.addButton}>
          <Ionicons name="add" size={20} color={COLORS.white} />
        </Pressable>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{MOCK_PRODUCTS.length}</Text>
          <Text style={styles.statLabel}>Produits</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>155</Text>
          <Text style={styles.statLabel}>Partages</Text>
        </View>
      </View>

      <FlatList
        data={MOCK_PRODUCTS}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.gray50 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: SPACING.lg, paddingTop: SPACING.md, paddingBottom: SPACING.md,
    backgroundColor: COLORS.white, ...SHADOW.sm,
  },
  title: { fontSize: FONT_SIZE.xl, fontWeight: '700', color: COLORS.gray900 },
  addButton: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.success,
    justifyContent: 'center', alignItems: 'center',
  },
  statsRow: { flexDirection: 'row', padding: SPACING.lg, gap: SPACING.md },
  statCard: {
    flex: 1, backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md,
    alignItems: 'center', ...SHADOW.sm,
  },
  statValue: { fontSize: FONT_SIZE.xl, fontWeight: '700', color: COLORS.gray900 },
  statLabel: { fontSize: FONT_SIZE.xs, color: COLORS.gray500 },
  productList: { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xxl },
  productCard: {
    flexDirection: 'row', backgroundColor: COLORS.white, borderRadius: RADIUS.lg,
    marginBottom: SPACING.md, overflow: 'hidden', ...SHADOW.sm,
  },
  productImage: { width: 80, height: 80, backgroundColor: COLORS.gray100 },
  productInfo: { flex: 1, padding: SPACING.sm, justifyContent: 'space-between' },
  productTitle: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: COLORS.gray900 },
  productPrice: { fontSize: FONT_SIZE.md, fontWeight: '700', color: COLORS.primary },
  productStats: { flexDirection: 'row', gap: SPACING.md },
  statItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statText: { fontSize: FONT_SIZE.xs, color: COLORS.gray500 },
  productActions: { justifyContent: 'center', padding: SPACING.sm, gap: SPACING.xs },
  actionIcon: { padding: SPACING.xs },
});