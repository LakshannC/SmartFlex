import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import { colors, dimensions, fontFamilies, fontSizes } from "../../../configuration/constants";
import NavigationBar from "../../../components/NavigationBar";
import React from "react";

const tipsData = [
    {
        id: '1',
        title: 'Proper Hydration',
        description: 'Drink at least 3 liters of water daily to maximize performance and recovery.',
        category: 'Nutrition',
        image: require('../../../assets/images/icon_homeworkout.webp')
    },
    {
        id: '2',
        title: 'Consistent Sleep Schedule',
        description: 'Aim for 7-9 hours of quality sleep at the same time every night.',
        category: 'Recovery',
        image: require('../../../assets/images/icon_dumbell.webp')
    },
    {
        id: '3',
        title: 'Progressive Overload',
        description: 'Gradually increase weight or reps to continuously challenge your muscles.',
        category: 'Training',
        image: require('../../../assets/images/icon_homeworkout.webp')
    },
    {
        id: '4',
        title: 'Mind-Muscle Connection',
        description: 'Focus on the muscle you\'re working to improve activation and results.',
        category: 'Technique',
        image: require('../../../assets/images/icon_dumbell.webp')
    },
    {
        id: '5',
        title: 'Post-Workout Nutrition',
        description: 'Consume protein and carbs within 30 minutes after training.',
        category: 'Nutrition',
        image: require('../../../assets/images/icon_homeworkout.webp')
    },
];

const TipsScreen = ({ navigation }) => {
    const renderTipItem = ({ item }) => (
        <TouchableOpacity
            style={styles.tipCard}
        >
            <View style={styles.tipContent}>
                <Image source={item.image} style={styles.tipImage} resizeMode="contain" />
                <View style={styles.tipTextContainer}>
                    <Text style={styles.tipCategory}>{item.category}</Text>
                    <Text style={styles.tipTitle}>{item.title}</Text>
                    <Text style={styles.tipDescription}>{item.description}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <NavigationBar
                title={'Fitness Tips'}
                hideBackButton
            />
            <View style={styles.header}>
                <Text style={styles.headerSubtitle}>Expert advice to maximize your results</Text>
            </View>

            <FlatList
                data={tipsData}
                renderItem={renderTipItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: dimensions.paddingLevel2,
    },
    header: {
        paddingVertical: dimensions.heightLevel1,
        marginBottom: dimensions.heightLevel1,
    },

    headerSubtitle: {
        fontFamily: fontFamilies.RobotoBold,
        fontSize: fontSizes.fontLarge,
        color: colors.white,
        textAlign: 'center'
    },
    listContainer: {
        paddingBottom: dimensions.heightLevel10,
    },
    tipCard: {
        backgroundColor: colors.txtField,
        borderRadius: 12,
        padding: dimensions.paddingLevel2,
        marginBottom: dimensions.heightLevel2,
        elevation: 3,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    tipContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tipImage: {
        width: 60,
        height: 60,
        marginRight: dimensions.paddingLevel2,
    },
    tipTextContainer: {
        flex: 1,
    },
    tipCategory: {
        fontFamily: fontFamilies.RobotoBold,
        fontSize: fontSizes.fontMedium,
        color: colors.danger,
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    tipTitle: {
        fontFamily: fontFamilies.RobotoBold,
        fontSize: fontSizes.fontLarge,
        color: colors.white,
        marginBottom: dimensions.heightLevel1,
    },
    tipDescription: {
        fontFamily: fontFamilies.RobotoRegular,
        fontSize: fontSizes.fontMedium,
        color: colors.white,
        lineHeight: 20,
    },
});

export default TipsScreen;