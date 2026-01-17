import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SubscriptionItem = ({ name, detail, price, type, frequency, brandColor = '#000', onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={[styles.logoContainer, { borderColor: brandColor }]}>
                <Text style={[styles.logoText, { color: brandColor }]}>{name[0]}</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.detail}>{detail}</Text>
            </View>

            <View style={styles.priceContainer}>
                <Text style={styles.price}>${price}</Text>
                {type === 'active' ? (
                    <Text style={styles.activeFrequency}>{frequency}</Text>
                ) : (
                    <Text style={styles.cancelledText}>🚫 Cancelled</Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1C1C1E',
        padding: 16,
        borderRadius: 20,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    logoContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        fontSize: 24,
        fontWeight: '700',
    },
    content: {
        flex: 1,
    },
    name: {
        fontWeight: '600',
        fontSize: 16,
        marginBottom: 4,
        color: 'white',
    },
    detail: {
        color: '#8E8E93',
        fontSize: 12,
    },
    priceContainer: {
        alignItems: 'flex-end',
    },
    price: {
        fontWeight: '700',
        fontSize: 16,
        marginBottom: 4,
        color: 'white',
    },
    activeFrequency: {
        fontSize: 12,
        color: '#0A84FF',
    },
    cancelledText: {
        fontSize: 12,
        color: '#636366',
    },
});

export default SubscriptionItem;
