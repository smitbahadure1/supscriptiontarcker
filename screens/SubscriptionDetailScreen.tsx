import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Switch } from 'react-native';
import { ChevronLeft, Calendar, RotateCw, DollarSign, CreditCard, Bell, Grid, ChevronDown } from 'lucide-react-native';

import { format } from 'date-fns';

const SubscriptionDetailScreen = ({ subscription, isEdit, onBack, onSave, onDelete }) => {
    // Default to Dropbox if no subscription passed
    const sub = subscription || { name: 'Dropbox', color: '#0061FF', letter: 'D' };

    const [isPaid, setIsPaid] = useState(sub.isPaid !== undefined ? sub.isPaid : true);
    const [amount, setAmount] = useState(sub.amount ? sub.amount.toString() : '10');
    const [startDate, setStartDate] = useState(sub.startDate || new Date().toISOString());
    const [billingCycle, setBillingCycle] = useState(sub.billingCycle || 'Monthly');
    const [reminderEnabled, setReminderEnabled] = useState(sub.reminderEnabled !== undefined ? sub.reminderEnabled : true);

    const handleSave = () => {
        onSave({
            name: sub.name,
            color: sub.color,
            letter: sub.letter,
            amount: amount,
            startDate: startDate,
            billingCycle: billingCycle,
            isPaid: isPaid,
            renewalDay: 22
        });
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={onBack}>
                    <ChevronLeft size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{isEdit ? 'Edit Subscription' : 'Add Subscription'}</Text>
            </View>

            {/* Main Card */}
            <View style={styles.cardContainer}>
                <View style={styles.selectedAppCard}>
                    <View style={[styles.logoContainer, { borderColor: '#3A3A3C', borderWidth: 1 }]}>
                        <Text style={{ color: sub.color, fontSize: 24, fontWeight: 'bold' }}>{sub.letter || sub.name[0]}</Text>
                    </View>
                    <View>
                        <Text style={styles.appName}>{sub.name}</Text>
                        <Text style={styles.appDetail}>Renews on {format(new Date(startDate), 'd MMM')}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.contentContainer}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    {/* Toggle */}
                    <View style={styles.toggleContainer}>
                        <TouchableOpacity
                            style={[styles.toggleBtn, isPaid && styles.activeToggleBtn]}
                            onPress={() => setIsPaid(true)}
                        >
                            <Text style={[styles.toggleText, isPaid && styles.activeToggleText]}>Paid</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.toggleBtn, !isPaid && styles.activeToggleBtn]}
                            onPress={() => setIsPaid(false)}
                        >
                            <Text style={[styles.toggleText, !isPaid && styles.activeToggleText]}>Free Trial</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Payment Details */}
                    <Text style={styles.sectionLabel}>Payment Details</Text>
                    <View style={styles.formSection}>
                        <View style={styles.inputRow}>
                            <View style={styles.iconLabel}>
                                <View style={styles.smallIconDto}><DollarSign size={14} color="#8E8E93" /></View>
                                <Text style={styles.labelText}>Amount</Text>
                            </View>
                            <View style={styles.inputRight}>
                                <TextInput
                                    placeholder="Enter amount"
                                    style={styles.textInput}
                                    placeholderTextColor="#636366"
                                    value={amount}
                                    onChangeText={setAmount}
                                    keyboardType="numeric"
                                />
                                <View style={styles.dropdownBadge}>
                                    <Text style={styles.dropdownText}>USD</Text>
                                    <ChevronDown size={12} color="#8E8E93" />
                                </View>
                            </View>
                        </View>

                        <View style={styles.separator} />

                        <View style={styles.inputRow}>
                            <View style={styles.iconLabel}>
                                <View style={styles.smallIconDto}><Calendar size={14} color="#8E8E93" /></View>
                                <Text style={styles.labelText}>Start date</Text>
                            </View>
                            <View style={styles.valueBadge}>
                                <Text style={styles.valueText}>{format(new Date(startDate), 'd MMM yyyy')}</Text>
                            </View>
                        </View>

                        <View style={styles.separator} />

                        <View style={styles.inputRow}>
                            <View style={styles.iconLabel}>
                                <View style={styles.smallIconDto}><RotateCw size={14} color="#8E8E93" /></View>
                                <Text style={styles.labelText}>Billing cycle</Text>
                            </View>
                            <TouchableOpacity onPress={() => setBillingCycle(billingCycle === 'Monthly' ? 'Yearly' : 'Monthly')}>
                                <View style={styles.dropdownSimple}>
                                    <Text style={styles.valueText}>{billingCycle}</Text>
                                    <ChevronDown size={14} color="#8E8E93" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Plan Information */}
                    <Text style={styles.sectionLabel}>Plan Information</Text>
                    <View style={styles.formSection}>
                        <View style={styles.inputRow}>
                            <View style={styles.iconLabel}>
                                <View style={styles.smallIconDto}><Grid size={14} color="#8E8E93" /></View>
                                <Text style={styles.labelText}>Category</Text>
                            </View>
                            <View style={styles.dropdownSimple}>
                                <Text style={styles.valueText}>{sub.category || 'Productivity'}</Text>
                                <ChevronDown size={14} color="#8E8E93" />
                            </View>
                        </View>

                        <View style={styles.separator} />

                        <View style={styles.inputRow}>
                            <View style={styles.iconLabel}>
                                <View style={styles.smallIconDto}><CreditCard size={14} color="#8E8E93" /></View>
                                <Text style={styles.labelText}>Payment method</Text>
                            </View>
                            <View style={styles.dropdownSimple}>
                                <Text style={styles.valueText}>Credit Card</Text>
                                <ChevronDown size={14} color="#8E8E93" />
                            </View>
                        </View>
                    </View>

                    {/* Notification Settings */}
                    <Text style={styles.sectionLabel}>Notification Settings</Text>
                    <View style={styles.formSection}>
                        <View style={styles.inputRow}>
                            <View style={styles.iconLabel}>
                                <View style={styles.smallIconDto}><Bell size={14} color="#8E8E93" /></View>
                                <Text style={styles.labelText}>Renewal Reminder</Text>
                            </View>
                            <Switch
                                value={reminderEnabled}
                                onValueChange={setReminderEnabled}
                                trackColor={{ false: "#3A3A3C", true: "#0A84FF" }}
                                thumbColor={reminderEnabled ? "#fff" : "#f4f3f4"}
                            />
                        </View>
                    </View>

                    {isEdit && (
                        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                            <Text style={styles.deleteButtonText}>Remove Subscription</Text>
                        </TouchableOpacity>
                    )}

                    <View style={{ height: 100 }} />

                </ScrollView>
            </View>

            {/* Save Button Footer */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save Subscription</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    header: {
        paddingTop: 60,
        paddingHorizontal: 24,
        paddingBottom: 80, // Space for card overlap
        backgroundColor: '#1C1C1E',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        position: 'relative',
        zIndex: 1,
    },
    backButton: {
        position: 'absolute',
        left: 24,
        top: 60,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },
    cardContainer: {
        alignItems: 'center',
        marginTop: -50, // Overlap
        zIndex: 10,
        paddingHorizontal: 24,
    },
    selectedAppCard: {
        backgroundColor: '#1C1C1E',
        borderRadius: 32,
        padding: 24,
        alignItems: 'center',
        width: '100%',
        gap: 16,
        // Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#3A3A3C',
    },
    logoContainer: {
        width: 72,
        height: 72,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.05)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    appName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 4,
    },
    appDetail: {
        fontSize: 14,
        color: '#8E8E93',
        textAlign: 'center',
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#000000',
        paddingTop: 24,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 100,
    },
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: '#1C1C1E',
        borderRadius: 16,
        padding: 4,
        marginBottom: 24,
    },
    toggleBtn: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 12,
    },
    activeToggleBtn: {
        backgroundColor: '#3A3A3C',
    },
    toggleText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#8E8E93',
    },
    activeToggleText: {
        color: 'white',
    },
    sectionLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        marginBottom: 8,
        marginLeft: 4,
    },
    formSection: {
        backgroundColor: '#1C1C1E',
        borderRadius: 16,
        marginBottom: 24,
        paddingHorizontal: 16,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        height: 56,
    },
    separator: {
        height: 1,
        backgroundColor: '#2C2C2E',
    },
    iconLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    smallIconDto: {
        width: 24,
        alignItems: 'center',
    },
    labelText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
    },
    inputRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    textInput: {
        textAlign: 'right',
        fontSize: 16,
        color: 'white',
        padding: 0,
        minWidth: 100,
    },
    dropdownBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3A3A3C',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        gap: 4,
    },
    dropdownText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#8E8E93',
    },
    valueBadge: {
        backgroundColor: '#3A3A3C',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
    },
    valueText: {
        fontSize: 14,
        fontWeight: '600',
        color: 'white',
    },
    dropdownSimple: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 24,
        backgroundColor: 'rgba(28,28,30,0.9)', // Glassy footer
    },
    saveButton: {
        backgroundColor: 'white', // High contrast save
        borderRadius: 28,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButtonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '600',
    },
    deleteButton: {
        alignItems: 'center',
        paddingVertical: 16,
    },
    deleteButtonText: {
        color: '#FF453A',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default SubscriptionDetailScreen;
