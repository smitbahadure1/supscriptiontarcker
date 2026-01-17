import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { User, Bell } from 'lucide-react-native';

const Header = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.iconButton}>
                <User size={20} color="black" />
            </TouchableOpacity>

            <Text style={styles.title}>Summary</Text>

            <TouchableOpacity style={styles.iconButton}>
                <Bell size={20} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1C1C1E', // Dark Grey Header
        paddingTop: 60,
        paddingBottom: 48,
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        zIndex: 10,
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
    },
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.1)', // Glassy
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Header;
