import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { COLORS, SPACING, FONT_SIZE, RADIUS, SHADOW } from '@/src/constants/theme';
import { formatXAF } from '@/src/utils/formatCurrency';
import Button from '@/src/components/ui/Button';
import Badge from '@/src/components/ui/Badge';

const availableDeliveries = [
  { id: 'DEL-001', vendor: 'Ferme du Nord', pickup: 'Libreville Centre', delivery: 'Akanda', distance: '3.2 km', earnings: 2500, items: 2 },
  { id: 'DEL-002', vendor: 'Artisanat Gabon', pickup: 'Owendo', delivery: 'Ntoum', distance: '5.1 km', earnings: 3500, items: 1 },
  { id: 'DEL-003', vendor: 'Tech Libreville', pickup: 'Bonendong', delivery: 'PK8', distance: '2.8 km', earnings: 2000, items: 1 },
];

export default function DeliveryMapScreen() {
  const isOnline = true;
  const todayEarnings = 8500;
  const deliveredCount = 5;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>Livreur 👋</Text>
          <Text style={styles.statusText}>{isOnline ? 'En ligne' : 'Hors ligne'}</Text>
        </View>
        <Pressable style={[styles.statusButton, isOnline && styles.statusButtonOnline]}>
          <View style={[styles.statusDot, isOnline && styles.statusDotOnline]} />
          <Text style={[styles.statusButtonText, isOnline && styles.statusButtonTextOnline]}>
            {isOnline ? 'En ligne' : 'Se connecter'}
          </Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.duration(300)}>
          <View style={styles.mapPlaceholder}>
            <View style={styles.mapContent}>
              <Ionicons name="map" size={64} color={COLORS.gray300} />
              <Text style={styles.mapText}>Carte en direct</Text>
              <Text style={styles.mapSubtext}>Localisation en temps réel</Text>
            </View>
            <View style={styles.currentLocation}>
              <Ionicons name="navigate" size={20} color={COLORS.primary} />
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Aujourd'hui</Text>
              <Text style={styles.statValue}>{formatXAF(todayEarnings)}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Livrés</Text>
              <Text style={styles.statValue}>{deliveredCount}</Text>
            </View>
          </View>

          <View style={styles.deliveriesSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Livraisons disponibles</Text>
              <Badge label={`${availableDeliveries.length}`} variant="primary" />
            </View>

            {availableDeliveries.map((delivery) => (
              <View key={delivery.id} style={styles.deliveryCard}>
                <View style={styles.deliveryHeader}>
                  <View>
                    <Text style={styles.deliveryVendor}>{delivery.vendor}</Text>
                    <Text style={styles.deliveryId}>{delivery.id}</Text>
                  </View>
                  <View style={styles.earningsBadge}>
                    <Text style={styles.earningsText}>{formatXAF(delivery.earnings)}</Text>
                  </View>
                </View>

                <View style={styles.routeInfo}>
                  <View style={styles.routePoint}>
                    <View style={[styles.routeDot, { backgroundColor: COLORS.warning }]} />
                    <View style={styles.routeDetails}>
                      <Text style={styles.routeLabel}>Retrait</Text>
                      <Text style={styles.routeAddress}>{delivery.pickup}</Text>
                    </View>
                  </View>
                  <View style={styles.routeLine} />
                  <View style={styles.routePoint}>
                    <View style={[styles.routeDot, { backgroundColor: COLORS.success }]} />
                    <View style={styles.routeDetails}>
                      <Text style={styles.routeLabel}>Livraison</Text>
                      <Text style={styles.routeAddress}>{delivery.delivery}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.deliveryFooter}>
                  <View style={styles.deliveryInfo}>
                    <Ionicons name="navigate-outline" size={14} color={COLORS.gray500} />
                    <Text style={styles.deliveryInfoText}>{delivery.distance}</Text>
                  </View>
                  <View style={styles.deliveryInfo}>
                    <Ionicons name="cube-outline" size={14} color={COLORS.gray500} />
                    <Text style={styles.deliveryInfoText}>{delivery.items} produit(s)</Text>
                  </View>
                  <Button title="Accepter" variant="primary" size="sm" onPress={() => {}} style={styles.acceptButton} />
                </View>
              </View>
            ))}
          </View>
        </Animated.View>
      </ScrollView>
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
  headerLeft: { gap: SPACING.xs },
  greeting: { fontSize: FONT_SIZE.md, color: COLORS.gray600 },
  statusText: { fontSize: FONT_SIZE.sm, color: COLORS.gray500 },
  statusButton: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm, backgroundColor: COLORS.gray100, borderRadius: RADIUS.full, gap: SPACING.xs,
  },
  statusButtonOnline: { backgroundColor: `${COLORS.success}15` },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.gray400 },
  statusDotOnline: { backgroundColor: COLORS.success },
  statusButtonText: { fontSize: FONT_SIZE.sm, color: COLORS.gray600 },
  statusButtonTextOnline: { color: COLORS.success, fontWeight: '600' },
  mapPlaceholder: {
    margin: SPACING.lg, height: 200, backgroundColor: COLORS.gray200, borderRadius: RADIUS.lg,
    position: 'relative', justifyContent: 'center', alignItems: 'center',
  },
  mapContent: { alignItems: 'center' },
  mapText: { fontSize: FONT_SIZE.md, fontWeight: '600', color: COLORS.gray600, marginTop: SPACING.sm },
  mapSubtext: { fontSize: FONT_SIZE.sm, color: COLORS.gray500 },
  currentLocation: {
    position: 'absolute', bottom: SPACING.md, right: SPACING.md,
    width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.white,
    justifyContent: 'center', alignItems: 'center', ...SHADOW.md,
  },
  statsRow: { flexDirection: 'row', paddingHorizontal: SPACING.lg, gap: SPACING.md, marginBottom: SPACING.lg },
  statCard: {
    flex: 1, backgroundColor: COLORS.white, borderRadius: RADIUS.lg,
    padding: SPACING.md, ...SHADOW.sm,
  },
  statLabel: { fontSize: FONT_SIZE.xs, color: COLORS.gray500 },
  statValue: { fontSize: FONT_SIZE.xl, fontWeight: '700', color: COLORS.gray900, marginTop: SPACING.xs },
  deliveriesSection: { paddingHorizontal: SPACING.lg, marginBottom: SPACING.xxl },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md },
  sectionTitle: { fontSize: FONT_SIZE.md, fontWeight: '600', color: COLORS.gray900 },
  deliveryCard: {
    backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md,
    marginBottom: SPACING.md, ...SHADOW.sm,
  },
  deliveryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: SPACING.md },
  deliveryVendor: { fontSize: FONT_SIZE.md, fontWeight: '600', color: COLORS.gray900 },
  deliveryId: { fontSize: FONT_SIZE.xs, color: COLORS.gray500 },
  earningsBadge: { backgroundColor: `${COLORS.success}15`, paddingHorizontal: SPACING.sm, paddingVertical: 4, borderRadius: RADIUS.full },
  earningsText: { fontSize: FONT_SIZE.sm, fontWeight: '700', color: COLORS.success },
  routeInfo: { marginBottom: SPACING.md },
  routePoint: { flexDirection: 'row', alignItems: 'flex-start', gap: SPACING.sm },
  routeDot: { width: 10, height: 10, borderRadius: 5, marginTop: 4 },
  routeDetails: { flex: 1 },
  routeLabel: { fontSize: FONT_SIZE.xs, color: COLORS.gray500 },
  routeAddress: { fontSize: FONT_SIZE.sm, color: COLORS.gray900 },
  routeLine: { width: 2, height: 20, backgroundColor: COLORS.gray200, marginLeft: 4, marginVertical: SPACING.xs },
  deliveryFooter: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, paddingTop: SPACING.sm, borderTopWidth: 1, borderTopColor: COLORS.gray100 },
  deliveryInfo: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  deliveryInfoText: { fontSize: FONT_SIZE.xs, color: COLORS.gray500 },
  acceptButton: { flex: 1, marginLeft: 'auto' },
});