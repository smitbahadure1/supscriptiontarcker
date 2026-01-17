import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { ChevronDown, Calendar as CalendarIcon, List, Plus } from 'lucide-react-native';
import SubscriptionItem from '../components/SubscriptionItem';

import { getMonthlyCost, doesSubscriptionRenewOn } from '../utils/calculations';
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameDay,
    isSameMonth,
    getDate,
    parseISO,
    addMonths,
    subMonths,
    getDay
} from 'date-fns';

const CalendarScreen = ({ subscriptions = [], onSubscriptionPress }) => {
    // Current viewed month state
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Filter active subs
    const activeSubs = subscriptions.filter(s => s.status === 'active');

    // Monthly Total Calculation
    const monthlyTotal = activeSubs.reduce((sum, sub) => {
        return sum + getMonthlyCost(sub.amount, sub.billingCycle);
    }, 0);

    // Calendar Generation Logic
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Pad empty days at start (0 = Sun, 1 = Mon...)
    // Layout expects Sun start
    const startDay = getDay(monthStart); // 0-6
    const paddedDays = Array(startDay).fill(null).concat(daysInMonth);

    // Get subs for a specific day
    const getSubsForDay = (date) => {
        if (!date) return [];
        return activeSubs.filter(sub => {
            // Use the new smarter recurrence check
            return doesSubscriptionRenewOn(sub, date);
        });
    };

    const renderDay = (day, index) => {
        if (day === null) {
            return <View key={`empty-${index}`} style={styles.dayCell} />;
        }

        const isSelected = isSameDay(day, selectedDate);
        const daySubs = getSubsForDay(day);
        const hasSub = daySubs.length > 0;
        const firstSub = daySubs[0];

        return (
            <TouchableOpacity
                key={day.toString()}
                style={[styles.dayCell, isSelected && styles.selectedDayCell]}
                onPress={() => setSelectedDate(day)}
            >
                <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>{getDate(day)}</Text>
                {hasSub && (
                    <View style={{ marginTop: 4 }}>
                        <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: isSelected ? 'white' : (firstSub.color || '#000') }} />
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    // Filter list for selected date
    const selectedDateSubs = getSubsForDay(selectedDate);

    // Handlers for month nav
    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    return (
        <View style={styles.container}>
            {/* Header ... */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <TouchableOpacity style={styles.monthSelector} onPress={nextMonth}>
                        <Text style={styles.monthText}>{format(currentMonth, 'MMMM, yyyy')}</Text>
                        <ChevronDown size={20} color="black" />
                    </TouchableOpacity>

                    <View style={styles.viewToggle}>
                        <TouchableOpacity style={[styles.toggleBtn, styles.activeToggle]}>
                            <CalendarIcon size={16} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.toggleBtn}>
                            <List size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={styles.monthlyLabel}>Monthly total</Text>
                <Text style={styles.monthlyAmount}>${monthlyTotal.toFixed(2)}</Text>
            </View>

            {/* Calendar Card */}
            <View style={styles.calendarContainer}>
                {/* Week Row - Aligned with Grid */}
                <View style={styles.weekRow}>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <View key={day} style={styles.weekDayCell}>
                            <Text style={[styles.weekDayText, day === 'Sat' && { color: '#0A84FF' }]}>{day}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.daysGrid}>
                    {paddedDays.map((day, index) => renderDay(day, index))}
                </View>
            </View>

            {/* ... List ... */}
            <ScrollView style={styles.listContainer}>
                {selectedDateSubs.length > 0 ? (
                    selectedDateSubs.map(sub => (
                        <SubscriptionItem
                            key={sub.id}
                            name={sub.name}
                            detail={`Renews on ${format(selectedDate, 'd MMM')}`} // Use selected date for detail since it's recurrence
                            price={sub.amount}
                            type="active"
                            frequency={sub.billingCycle}
                            brandColor={sub.color}
                            onPress={() => onSubscriptionPress && onSubscriptionPress(sub)}
                        />
                    ))
                ) : (
                    <Text style={{ textAlign: 'center', color: '#6C6C70', marginTop: 20 }}>
                        No subscriptions due on {format(selectedDate, 'd MMM')}
                    </Text>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    header: {
        paddingTop: 60,
        paddingHorizontal: 24,
        paddingBottom: 48,
        backgroundColor: '#1C1C1E', // Dark Grey Header
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        zIndex: 5,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        marginTop: 12,
    },
    monthSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        gap: 8,
    },
    monthText: {
        fontSize: 14,
        fontWeight: '600',
        color: 'white',
    },
    viewToggle: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 20,
        padding: 4,
    },
    toggleBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeToggle: {
        backgroundColor: 'white',
    },
    monthlyLabel: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 4,
    },
    monthlyAmount: {
        color: 'white',
        fontSize: 32,
        fontWeight: '700',
    },
    calendarContainer: {
        backgroundColor: 'black',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 16,
        paddingBottom: 0,
        marginTop: -30,
        zIndex: 1,
    },
    weekRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    weekDayCell: {
        width: '14.28%',
        alignItems: 'center',
    },
    weekDayText: {
        color: '#8E8E93',
        fontSize: 13,
        textAlign: 'center',
    },
    daysGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        backgroundColor: '#1C1C1E',
        borderRadius: 24,
        padding: 8,
        paddingTop: 16,
    },
    dayCell: {
        width: '14.28%',
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 2,
        borderRadius: 12,
    },
    selectedDayCell: {
        backgroundColor: '#0A84FF', // Neon Blue
    },
    dayText: {
        fontSize: 14,
        color: 'white',
        fontWeight: '500',
    },
    selectedDayText: {
        color: 'white',
        fontWeight: '700',
    },
    listContainer: {
        flex: 1,
        backgroundColor: 'black',
        paddingHorizontal: 24,
        paddingTop: 16,
    }
});

export default CalendarScreen;
