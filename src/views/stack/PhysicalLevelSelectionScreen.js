import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import ButtonField from "../../components/ButtonField";
import {colors, dimensions, fontFamilies, fontSizes} from "../../configuration/constants";
import * as Actions from "../../navigation/NavActions";
import {RouteNames} from "../../navigation/AppRoutes";

const goals = [
    { id: '1', title: 'Beginner' },
    { id: '2', title: 'Advance' },
    { id: '3', title: 'Expert' },
];

const PhisicalLevelSelectionScreen = ({ navigation }) => {
    const [selectedLevels, setSelectedLevels] = useState([]);

    const toggleGoal = (goalId) => {
        setSelectedLevels(prev =>
            prev.includes(goalId)
                ? prev.filter(id => id !== goalId)
                : [...prev, goalId]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>What is your Goal?</Text>

            <ScrollView
                contentContainerStyle={styles.goalsContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.goalBox}>
                    {goals.map(goal => (

                        <TouchableOpacity
                            key={goal.id}
                            style={[
                                styles.goalCard,
                                selectedLevels.includes(goal.id) && styles.selectedGoalCard
                            ]}
                            onPress={() => toggleGoal(goal.id)}
                            activeOpacity={0.7}
                        >
                            <Text style={[
                                styles.goalText,
                                selectedLevels.includes(goal.id) && styles.selectedGoalText
                            ]}>
                                {goal.title}
                            </Text>
                        </TouchableOpacity>

                    ))}
                </View>
            </ScrollView>

            <View style={styles.buttonRow}>
                <View style={styles.backButton}>
                    <ButtonField
                        buttonHeight={dimensions.heightLevel4}
                        label={'Back'}
                        labelColor={colors.white}
                        bgColor={colors.txtField}
                        onPress={() => Actions.reset(RouteNames.GOAL_SELECTION_SCREEN)}
                    />
                </View>

                <View style={styles.continueButton}>
                    <ButtonField
                        buttonHeight={dimensions.heightLevel4}
                        label={'Continue'}
                        labelColor={colors.white}
                        onPress={() => Actions.reset(RouteNames.TAB_SCREEN)}
                        disabled={selectedLevels.length === 0}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        flex:1,
        marginVertical:dimensions.heightLevel5,
        fontFamily: fontFamilies.RobotoBold,
        fontSize: fontSizes.fontXXLarge,
        color: colors.white,
        textAlign: 'center',
    },
    goalsContainer: {
        flexGrow: 1,
        paddingBottom: dimensions.heightLevel1,
    },
    goalBox:{
        paddingHorizontal:dimensions.heightLevel1,
    },
    goalCard: {
        backgroundColor: colors.txtField,
        borderRadius: 12,
        paddingVertical: dimensions.heightLevel1,
        paddingHorizontal: dimensions.heightLevel1,
        marginBottom: dimensions.heightLevel1,
    },
    selectedGoalCard: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    goalText: {
        color: colors.white,
        fontSize: fontSizes.fontXLarge,
        textAlign: 'center',
        fontFamily: fontFamilies.RobotoBold,
    },
    selectedGoalText: {
        color: colors.white,
        fontWeight: '600',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: dimensions.heightLevel1,
        gap: dimensions.heightLevel1,
    },
    backButton: {
        flex: 1,
    },
    continueButton: {
        flex: 1,
    },
});

export default PhisicalLevelSelectionScreen;