import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { colors, dimensions, fontFamilies, fontSizes } from "../../configuration/constants";
import ButtonField from "../../components/ButtonField";
import { generatePlanRequest } from "../../service/networkRequests/planRequests";
import { showErrorToast, showSuccessToast } from "../../util/toastActions";
import HomeScreen from "../tabs/home/HomeScreen";
import * as Actions from "../../navigation/NavActions";
import {RouteNames} from "../../navigation/AppRoutes";

const PlanConfirmationScreen = ({ navigation }) => {
    const fullState = useSelector(state => state);
    console.log('Redux State:', fullState);

    const {
        age,
        gender,
        height,
        current_weight,
        goal_weight
    } = useSelector(state => state.workoutReducer);

    const difference = goal_weight - current_weight;
    const goalType = difference > 0 ? 'Gain' : difference < 0 ? 'Lose' : 'Maintain';

    const handleGeneratePlan = async () => {
        try {
            const planData = {
                age,
                gender,
                height,
                current_weight,
                goal_weight
            };

            const result = await generatePlanRequest(planData);

            if (result?.code === 200) {
                showSuccessToast('Workout plan generated successfully!');
                Actions.reset(RouteNames.TAB_SCREEN);
            } else {
                showErrorToast(result?.error?.message || 'Failed to generate plan');
            }
        } catch (error) {
            showErrorToast('An error occurred while generating your plan');
            console.error('Plan generation error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Confirm Your Details</Text>

            <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Age:</Text>
                    <Text style={styles.detailValue}>{age} years</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Gender:</Text>
                    <Text style={styles.detailValue}>{gender}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Height:</Text>
                    <Text style={styles.detailValue}>{height} cm</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Current Weight:</Text>
                    <Text style={styles.detailValue}>{current_weight} kg</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Goal Weight:</Text>
                    <Text style={styles.detailValue}>{goal_weight} kg</Text>
                </View>

                <View style={[styles.detailRow, styles.goalSummary]}>
                    <Text style={styles.detailLabel}>Your Goal:</Text>
                    <Text style={[
                        styles.detailValue,
                        goalType === 'Gain' && styles.gainText,
                        goalType === 'Lose' && styles.lossText
                    ]}>
                        {goalType} {Math.abs(difference)} kg
                    </Text>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <ButtonField
                    buttonHeight={dimensions.heightLevel4}
                    label={'Generate Plan'}
                    labelColor={colors.white}
                    bgColor={colors.primary}
                    onPress={handleGeneratePlan}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: dimensions.paddingLevel4,
        paddingTop: dimensions.paddingLevel8,
    },
    title: {
        fontFamily: fontFamilies.RobotoBold,
        fontSize: fontSizes.fontXXLarge,
        color: colors.white,
        textAlign: 'center',
        marginBottom: dimensions.heightLevel4,
    },
    detailsContainer: {
        backgroundColor: colors.txtField,
        borderRadius: 10,
        padding: dimensions.paddingLevel4,
        marginBottom: dimensions.heightLevel4,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: dimensions.heightLevel2,
        borderBottomWidth: 1,
        borderBottomColor: colors.white + '20',
    },
    goalSummary: {
        borderBottomWidth: 0,
        marginTop: dimensions.heightLevel2,
    },
    detailLabel: {
        fontFamily: fontFamilies.RobotoMedium,
        fontSize: fontSizes.fontLarge,
        color: colors.white,
    },
    detailValue: {
        fontFamily: fontFamilies.RobotoRegular,
        fontSize: fontSizes.fontLarge,
        color: colors.white,
    },
    gainText: {
        color: colors.success,
    },
    lossText: {
        color: colors.danger,
    },
    buttonContainer: {
        paddingHorizontal: dimensions.paddingLevel4,
    },
});

export default PlanConfirmationScreen;