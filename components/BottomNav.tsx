import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Home, Calendar, Settings, Plus } from 'lucide-react-native';

const BottomNav = ({ activeTab, onTabPress, onFabPress }) => {
    return (
        <View style={styles.container}>
            {/* Navigation Capsule */}
            <View style={styles.capsule}>

                <TouchableOpacity
                    style={activeTab === 'home' ? styles.activeButton : styles.iconButton}
                    onPress={() => onTabPress('home')}
                >
                    <Home size={activeTab === 'home' ? 18 : 22} color={activeTab === 'home' ? 'white' : '#AEAEB2'} />
                    {activeTab === 'home' && <Text style={styles.activeText}>Home</Text>}
                </TouchableOpacity>

                <TouchableOpacity
                    style={activeTab === 'calendar' ? styles.activeButton : styles.iconButton}
                    onPress={() => onTabPress('calendar')}
                >
                    <Calendar size={activeTab === 'calendar' ? 18 : 22} color={activeTab === 'calendar' ? 'white' : '#AEAEB2'} />
                    {activeTab === 'calendar' && <Text style={styles.activeText}>Calendar</Text>}
                </TouchableOpacity>

                <TouchableOpacity
                    style={activeTab === 'settings' ? styles.activeButton : styles.iconButton}
                    onPress={() => onTabPress('settings')}
                >
                    <Settings size={activeTab === 'settings' ? 18 : 22} color={activeTab === 'settings' ? 'white' : '#AEAEB2'} />
                    {activeTab === 'settings' && <Text style={styles.activeText}>Settings</Text>}
                </TouchableOpacity>
            </View>

            {/* FAB */}
            <TouchableOpacity style={styles.fab} onPress={onFabPress}>
                <Plus size={28} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 32,
        left: 0,
        width: '100%',
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100, // Ensure it's on top
    },
    capsule: {
        backgroundColor: 'rgba(28, 28, 30, 0.85)', // Dark Glass
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        padding: 6,
        borderRadius: 32,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    activeButton: {
        backgroundColor: '#3A3A3C', // Slightly lighter grey for active
        borderRadius: 24,
        paddingVertical: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    activeText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    iconButton: {
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fab: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: 'white', // White FAB on Dark mode
        alignItems: 'center',
        justifyContent: 'center',
        // Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
    },
});

export default BottomNav;
