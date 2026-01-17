import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { ChevronLeft, Search, Briefcase, Gamepad, Folder, Heart, MoreHorizontal, Smile } from 'lucide-react-native';

const AddSubscriptionScreen = ({ onBack, onSelect }) => {
    const [selectedCategory, setSelectedCategory] = useState('Productivity');

    const categories = [
        { id: '1', name: 'Entertainment', icon: <Smile size={16} color="black" /> },
        { id: '2', name: 'Productivity', icon: <Briefcase size={16} color="white" /> }, // Selected style
        { id: '3', name: 'Finance', icon: <Folder size={16} color="black" /> },
        { id: '4', name: 'Health', icon: <Heart size={16} color="black" /> },
        { id: '5', name: 'Gaming', icon: <Gamepad size={16} color="black" /> },
        { id: '6', name: 'More', icon: <MoreHorizontal size={16} color="black" /> },
    ];

    const services = [
        { id: '1', name: 'Dropbox', status: 'Available', color: '#0061FF', letter: 'D' },
        { id: '2', name: 'Adobe Creative Cloud', status: 'Available', color: '#FF0000', letter: 'A' },
        { id: '3', name: 'Notion', status: 'Available', color: '#000000', letter: 'N' },
        { id: '4', name: 'Evernote', status: 'Available', color: '#00A82D', letter: 'E' },
        { id: '5', name: 'Grammarly', status: 'Available', color: '#15C39A', letter: 'G' },
        { id: '6', name: 'Figma', status: 'Available', color: '#F24E1E', letter: 'F' },
    ];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={onBack}>
                    <ChevronLeft size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add Subscription</Text>
            </View>

            <View style={styles.contentContainer}>
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Search size={20} color="#AEAEB2" />
                    <TextInput
                        placeholder="Search for any platform"
                        style={styles.searchInput}
                        placeholderTextColor="#AEAEB2"
                    />
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {/* Categories */}
                    <Text style={styles.sectionLabel}>Categories</Text>
                    <View style={styles.categoriesGrid}>
                        {categories.map((cat) => {
                            const isSelected = cat.name === selectedCategory;
                            return (
                                <TouchableOpacity
                                    key={cat.id}
                                    style={[styles.categoryPill, isSelected && styles.selectedCategoryPill]}
                                    onPress={() => setSelectedCategory(cat.name)}
                                >
                                    {/* Clone icon with correct color if needed, simplified for now */}
                                    {/* We might need to render different icons based on selection but let's stick to the map */}
                                    {React.cloneElement(cat.icon, { color: isSelected ? 'white' : 'black' })}
                                    <Text style={[styles.categoryText, isSelected && styles.selectedCategoryText]}>
                                        {cat.name}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {/* Service Grid Label */}
                    <Text style={styles.sectionLabel}>{selectedCategory}</Text>

                    {/* Service Grid */}
                    <View style={styles.servicesGrid}>
                        {services.map((file) => (
                            <TouchableOpacity
                                key={file.id}
                                style={styles.serviceCard}
                                onPress={() => onSelect && onSelect(file)}
                            >
                                <View style={styles.logoContainer}>
                                    {/* Simplified Logo */}
                                    <Text style={{ color: file.color, fontSize: 24, fontWeight: 'bold' }}>{file.letter}</Text>
                                </View>
                                <View>
                                    <Text style={styles.serviceName}>{file.name}</Text>
                                    <Text style={styles.serviceStatus}>{file.status}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Bottom padding for scrolling past FAB if needed */}
                    <View style={{ height: 40 }} />
                </ScrollView>
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
        paddingTop: 60, // Status bar
        paddingHorizontal: 24,
        paddingBottom: 24,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        color: 'white',
        fontWeight: '600',
    },
    contentContainer: {
        flex: 1,
        backgroundColor: 'black',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingTop: 24,
        paddingHorizontal: 24,
    },
    searchContainer: {
        backgroundColor: '#1C1C1E',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 16,
        marginBottom: 24,
        gap: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: 'white',
    },
    scrollContent: {
        paddingBottom: 20,
    },
    sectionLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
        color: 'white',
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 24,
    },
    categoryPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1C1C1E',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 20,
        gap: 8,
        minWidth: '48%',
        marginBottom: 4,
    },
    selectedCategoryPill: {
        backgroundColor: '#0A84FF',
    },
    categoryText: {
        fontSize: 14,
        color: 'white',
        fontWeight: '500',
    },
    selectedCategoryText: {
        color: 'white',
    },
    servicesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12,
    },
    serviceCard: {
        width: '48%',
        backgroundColor: '#1C1C1E',
        borderRadius: 20,
        padding: 16,
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
    serviceName: {
        fontWeight: '600',
        fontSize: 14,
        marginBottom: 4,
        color: 'white',
    },
    serviceStatus: {
        fontSize: 12,
        color: '#0A84FF', // Blue text for 'Available'
    }
});

export default AddSubscriptionScreen;
