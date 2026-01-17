import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, FileText } from 'lucide-react-native';

import { getMonthlyCost } from '../utils/calculations';
import { parseISO, isSameMonth } from 'date-fns';

const SummaryCards = ({ subscriptions = [] }) => {

    // Calculate totals
    const now = new Date();

    const activeSubs = subscriptions.filter(s => s.status === 'active');

    const monthlyAvg = activeSubs.reduce((sum, sub) => {
        return sum + getMonthlyCost(sub.amount, sub.billingCycle);
    }, 0);

    const dueThisMonth = activeSubs.reduce((sum, sub) => {
        // Check if next renewal is this month
        // We use nextRenewalDate from store
        if (sub.nextRenewalDate && isSameMonth(parseISO(sub.nextRenewalDate), now)) {
            return sum + parseFloat(sub.amount || 0);
        }
        return sum;
    }, 0);

    return (
        <View style={styles.container}>
            <Card
                active={true}
                icon={<Calendar size={20} color="#fff" />}
                label="Due this month"
                amount={`$${dueThisMonth.toFixed(2)}`}
            />
            <Card
                icon={<FileText size={20} color="#0A84FF" />}
                label="Monthly avg"
                amount={`$${monthlyAvg.toFixed(2)}`}
            />
        </View>
    );
};

const Card = ({ icon, label, amount, active = false }) => {
    return (
        <View style={[styles.card, active && styles.activeCard]}>
            <View style={[styles.iconContainer, active && styles.activeIconContainer]}>
                {icon}
            </View>
            <View>
                <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
                <Text style={[styles.amount, active && styles.activeAmount]}>{amount}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        marginTop: -30,
        marginBottom: 8,
        gap: 12,
        zIndex: 20,
    },
    card: {
        flex: 1,
        backgroundColor: '#1C1C1E', // Dark card
        padding: 20,
        borderRadius: 24,
        gap: 16,
        // Soft Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    activeCard: {
        backgroundColor: '#0A84FF', // Neon Blue
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeIconContainer: {
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    label: {
        fontSize: 13,
        color: '#8E8E93',
        fontWeight: '600',
        marginBottom: 4,
    },
    activeLabel: {
        color: 'rgba(255,255,255,0.8)',
    },
    amount: {
        fontSize: 24,
        fontWeight: '700',
        color: 'white',
    },
    activeAmount: {
        color: 'white',
    },
});

export default SummaryCards;
