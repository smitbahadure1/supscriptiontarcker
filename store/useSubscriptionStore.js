import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { calculateNextRenewal } from '../utils/calculations';

const useSubscriptionStore = create(
    persist(
        (set, get) => ({
            subscriptions: [],

            addSubscription: (sub) => set((state) => {
                const nextRenewal = calculateNextRenewal(sub.startDate, sub.billingCycle);
                const newSub = {
                    ...sub,
                    id: Date.now().toString(),
                    status: 'active',
                    nextRenewalDate: nextRenewal,
                    amount: parseFloat(sub.amount) || 0
                };
                return { subscriptions: [...state.subscriptions, newSub] };
            }),

            removeSubscription: (id) => set((state) => ({
                subscriptions: state.subscriptions.filter(s => s.id !== id)
            })),

            cancelSubscription: (id) => set((state) => ({
                subscriptions: state.subscriptions.map(s =>
                    s.id === id ? { ...s, status: 'cancelled' } : s
                )
            })),

            updateSubscription: (id, updates) => set((state) => ({
                subscriptions: state.subscriptions.map(s => {
                    if (s.id !== id) return s;
                    const updated = { ...s, ...updates };
                    // Recalculate renewal if critical fields changed
                    if (updates.startDate || updates.billingCycle) {
                        updated.nextRenewalDate = calculateNextRenewal(updated.startDate, updated.billingCycle);
                    }
                    return updated;
                })
            })),

            refreshRenewals: () => set((state) => ({
                subscriptions: state.subscriptions.map(s => {
                    if (s.status === 'cancelled') return s;
                    return {
                        ...s,
                        nextRenewalDate: calculateNextRenewal(s.startDate, s.billingCycle)
                    };
                })
            })),
        }),
        {
            name: 'subscription-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export default useSubscriptionStore;
