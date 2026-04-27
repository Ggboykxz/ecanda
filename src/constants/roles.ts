export const ROLES = {
  CLIENT: 'client',
  VENDOR: 'vendor',
  VENDOR_WA: 'vendor_wa',
  DELIVERY: 'delivery',
  BOUTIQUE: 'boutique',
} as const;

export type UserRole = typeof ROLES[keyof typeof ROLES];

export const ROLE_LABELS: Record<UserRole, string> = {
  [ROLES.CLIENT]: 'Acheteur',
  [ROLES.VENDOR]: 'Vendeur Rapide',
  [ROLES.VENDOR_WA]: 'Vendeur WhatsApp',
  [ROLES.DELIVERY]: 'Livreur',
  [ROLES.BOUTIQUE]: 'Boutique',
};

export const ROLE_ICONS: Record<UserRole, string> = {
  [ROLES.CLIENT]: 'cart-outline',
  [ROLES.VENDOR]: 'flash-outline',
  [ROLES.VENDOR_WA]: 'logo-whatsapp',
  [ROLES.DELIVERY]: 'bicycle-outline',
  [ROLES.BOUTIQUE]: 'storefront-outline',
};