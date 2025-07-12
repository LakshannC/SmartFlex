import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors, dimensions, fontSizes, fontFamilies } from '../../../configuration/constants';
import * as Actions from "../../../navigation/NavActions";
import {useDispatch} from "react-redux";
import {resetWorkoutState} from "../../../redux/slices/workoutSlice";



const WorkoutCompleteScreen = () => {

    const dispatch = useDispatch();

    const handleFinish = () => {
        dispatch(resetWorkoutState());
        Actions.goBack();
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../../assets/images/icon_trophy.webp')}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.title}>Workout Complete!</Text>
            <Text style={styles.subtitle}>Great job, you crushed it! 💪</Text>

            {/*<View style={styles.statsContainer}>*/}
            {/*    <Text style={styles.statLabel}>Total Sets: <Text style={styles.statValue}>12</Text></Text>*/}
            {/*    <Text style={styles.statLabel}>Workout Time: <Text style={styles.statValue}>22 mins</Text></Text>*/}
            {/*</View>*/}

            <TouchableOpacity style={styles.button} onPress={handleFinish}>
                <Text style={styles.buttonText}>Finish</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:"100%",
        alignItems: 'center',
        justifyContent: 'center',
        padding: dimensions.paddingLevel3,
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: dimensions.heightLevel3,
    },
    title: {
        fontSize: fontSizes.fontXXXXLarge,
        fontFamily: fontFamilies.RobotoBold,
        color: colors.primary,
        marginBottom: dimensions.heightLevel1,
    },
    subtitle: {
        fontSize: fontSizes.fontMedium,
        fontFamily: fontFamilies.RobotoMedium,
        color: colors.optional,
        marginBottom: dimensions.heightLevel4,
    },
    statsContainer: {
        marginBottom: dimensions.heightLevel3,
        alignItems: 'center',
    },
    statLabel: {
        fontSize: fontSizes.fontLarge,
        color: colors.primary,
        marginBottom: 5,
    },
    statValue: {
        fontWeight: 'bold',
        color: colors.optional,
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 30,
        elevation: 3,
    },
    buttonText: {
        color: colors.white,
        fontSize: fontSizes.fontLarge,
        fontFamily: fontFamilies.RobotoBold,
    },
});

export default WorkoutCompleteScreen;
