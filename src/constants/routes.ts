export const ROUTES = {
  AUTH: {
    WELCOME: '/(auth)/welcome',
    ROLE_SELECT: '/(auth)/role-select',
    LOGIN: {
      CLIENT: '/(auth)/login/client',
      VENDOR: '/(auth)/login/vendor',
      VENDOR_WA: '/(auth)/login/vendor-whatsapp',
      DELIVERY: '/(auth)/login/delivery',
      BOUTIQUE: '/(auth)/login/boutique',
    },
    REGISTER: {
      CLIENT: '/(auth)/register/client',
      VENDOR: '/(auth)/register/vendor',
      VENDOR_WA: '/(auth)/register/vendor-whatsapp',
      DELIVERY: '/(auth)/register/delivery',
      BOUTIQUE: '/(auth)/register/boutique',
    },
  },
  CLIENT: {
    HOME: '/(client)/home',
    EXPLORE: '/(client)/explore',
    CART: '/(client)/cart',
    ORDERS: '/(client)/orders',
    PROFILE: '/(client)/profile',
  },
  VENDOR: {
    DASHBOARD: '/(vendor)/dashboard',
    PRODUCTS: '/(vendor)/products',
    ORDERS: '/(vendor)/orders',
    EARNINGS: '/(vendor)/earnings',
  },
  VENDOR_WA: {
    DASHBOARD: '/(vendor-wa)/dashboard',
    CHANNELS: '/(vendor-wa)/channels',
    CATALOG: '/(vendor-wa)/catalog',
    ORDERS: '/(vendor-wa)/orders',
    EARNINGS: '/(vendor-wa)/earnings',
  },
  DELIVERY: {
    MAP: '/(delivery)/map',
    DELIVERIES: '/(delivery)/deliveries',
    EARNINGS: '/(delivery)/earnings',
  },
  BOUTIQUE: {
    DASHBOARD: '/(boutique)/dashboard',
    CATALOG: '/(boutique)/catalog',
    ORDERS: '/(boutique)/orders',
    ANALYTICS: '/(boutique)/analytics',
    SETTINGS: '/(boutique)/settings',
  },
} as const;