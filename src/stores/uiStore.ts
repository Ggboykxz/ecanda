import { create } from 'zustand';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

interface UIState {
  isLoading: boolean;
  loadingMessage?: string;
  toasts: Toast[];
  showLoading: (message?: string) => void;
  hideLoading: () => void;
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

let toastId = 0;

export const useUIStore = create<UIState>((set, get) => ({
  isLoading: false,
  loadingMessage: undefined,
  toasts: [],

  showLoading: (message) => set({ isLoading: true, loadingMessage: message }),
  hideLoading: () => set({ isLoading: false, loadingMessage: undefined }),

  addToast: (toast) => {
    const id = `toast-${++toastId}`;
    set({ toasts: [...get().toasts, { ...toast, id }] });
    setTimeout(() => get().removeToast(id), 4000);
  },

  removeToast: (id) => {
    set({ toasts: get().toasts.filter((t) => t.id !== id) });
  },

  clearToasts: () => set({ toasts: [] }),
}));