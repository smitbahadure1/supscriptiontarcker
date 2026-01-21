import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Switch } from 'react-native';
import { ChevronRight, User, Bell, DollarSign, Lock, HelpCircle, LogOut, ChevronLeft } from 'lucide-react-native';

const SettingsScreen = ({ onBack }) => {
    const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
    const [faceIdEnabled, setFaceIdEnabled] = React.useState(true);

    // Configuration for settings menu sections
    const sections = [
        {
            title: 'General',
            items: [
                { icon: <User size={20} color="white" />, label: 'Profile', type: 'link' },
                { icon: <DollarSign size={20} color="white" />, label: 'Currency', value: 'USD ($)', type: 'value' },
            ]
        },
        {
            title: 'Security',
            items: [
                { icon: <Lock size={20} color="white" />, label: 'Face ID', type: 'switch', value: faceIdEnabled, onToggle: setFaceIdEnabled },
                { icon: <Bell size={20} color="white" />, label: 'Notifications', type: 'switch', value: notificationsEnabled, onToggle: setNotificationsEnabled },
            ]
        },
        {
            title: 'Support',
            items: [
                { icon: <HelpCircle size={20} color="white" />, label: 'Help & Support', type: 'link' },
                { icon: <LogOut size={20} color="#FF453A" />, label: 'Log Out', type: 'link', color: '#FF453A' },
            ]
        }
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {/* Optional Back button if navigated from somewhere else, though usually Settings is a main tab */}
                {/* If main tab, we show title only */}
                <Text style={styles.headerTitle}>Settings</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <View style={styles.avatar}>
                        <Image
                            source={{ uri: 'https://ui-avatars.com/api/?name=John+Doe&background=0A84FF&color=fff' }}
                            style={{ width: 60, height: 60, borderRadius: 30 }}
                        />
                    </View>
                    <View>
                        <Text style={styles.profileName}>John Doe</Text>
                        <Text style={styles.profileEmail}>john.doe@example.com</Text>
                    </View>
                    <TouchableOpacity style={styles.editBtn}>
                        <Text style={styles.editBtnText}>Edit</Text>
                    </TouchableOpacity>
                </View>

                {sections.map((section, index) => (
                    <View key={index} style={styles.section}>
                        <Text style={styles.sectionHeader}>{section.title}</Text>
                        <View style={styles.sectionContent}>
                            {section.items.map((item, itemIndex) => (
                                <View key={itemIndex}>
                                    <TouchableOpacity style={styles.row}>
                                        <View style={styles.rowLeft}>
                                            <View style={styles.iconContainer}>
                                                {item.icon}
                                            </View>
                                            <Text style={[styles.rowLabel, item.color && { color: item.color }]}>{item.label}</Text>
                                        </View>

                                        <View style={styles.rowRight}>
                                            {item.type === 'link' && <ChevronRight size={20} color="#8E8E93" />}
                                            {item.type === 'value' && (
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={styles.valueText}>{item.value}</Text>
                                                    <ChevronRight size={20} color="#8E8E93" />
                                                </View>
                                            )}
                                            {item.type === 'switch' && (
                                                <Switch
                                                    value={item.value}
                                                    onValueChange={item.onToggle}
                                                    trackColor={{ false: "#3A3A3C", true: "#0A84FF" }}
                                                    thumbColor={item.value ? "#fff" : "#f4f3f4"}
                                                />
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                    {itemIndex < section.items.length - 1 && <View style={styles.separator} />}
                                </View>
                            ))}
                        </View>
                    </View>
                ))}

                <View style={{ height: 100 }} />
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
        backgroundColor: '#1C1C1E',
        paddingTop: 60,
        paddingBottom: 48,
        paddingHorizontal: 24,
        alignItems: 'center',
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },
    scrollContent: {
        paddingHorizontal: 24,
        marginTop: -30,
    },
    profileCard: {
        backgroundColor: '#1C1C1E',
        borderRadius: 20,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        gap: 16,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#3A3A3C',
    },
    profileName: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },
    profileEmail: {
        fontSize: 14,
        color: '#8E8E93',
    },
    editBtn: {
        marginLeft: 'auto',
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    editBtnText: {
        color: '#0A84FF',
        fontWeight: '600',
        fontSize: 12,
    },
    section: {
        marginBottom: 24,
    },
    sectionHeader: {
        fontSize: 14,
        color: '#8E8E93',
        fontWeight: '500',
        marginBottom: 8,
        marginLeft: 8,
    },
    sectionContent: {
        backgroundColor: '#1C1C1E',
        borderRadius: 16,
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        height: 56,
    },
    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconContainer: {
        width: 32,
        alignItems: 'center',
    },
    rowLabel: {
        fontSize: 16,
        color: 'white',
    },
    rowRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    valueText: {
        fontSize: 16,
        color: '#8E8E93',
        marginRight: 8,
    },
    separator: {
        height: 1,
        backgroundColor: '#2C2C2E',
        marginLeft: 60, // Align with text
    }
});

export default SettingsScreen;
