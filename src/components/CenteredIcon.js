import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // You can switch icon library if needed

const CenteredIcon = ({ iconName, label, size = 48 }) => {
    return (
        <View style={styles.container}>
            <Icon name={iconName} size={size} color="#9F5CFF" />
            <Text style={styles.label}>{label}</Text>
        </View>
    );
};

export default CenteredIcon;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 16,
    },
    label: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        marginTop: 8,
    },
});

