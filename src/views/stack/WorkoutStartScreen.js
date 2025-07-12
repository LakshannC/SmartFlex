import {View, StyleSheet, Text, TouchableOpacity, Image, FlatList} from "react-native";
import {colors, dimensions, fontFamilies, fontSizes} from "../../configuration/constants";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {showErrorToast} from "../../util/toastActions";
import {
    endRest,
    nextSet,
    resetWorkoutState, skipCurrentExercise,
    startWorkout,
    updateWorkoutState,
    updateWorkoutType
} from "../../redux/slices/workoutSlice";

import {workout_states} from "../../configuration/workoutData";
import NavigationBar from "../../components/NavigationBar";
import * as Actions from "../../navigation/NavActions";
import homeIcon from "../../assets/images/icon_homeworkout.webp";
import dumbellIcon from "../../assets/images/icon_homeworkout.webp";
import WorkoutCompleteScreen from "./workoutViews/WorkoutCompleteScreen";

const sampleWorkout = {
    type: 'Home',
    duration: '40-50 minutes',
    icon: require('../../assets/images/icon_homeworkout.webp'),
    exercises: [
        {id: '1', name: 'Pushups', sets: '4x', isActive: true},
        {id: '2', name: 'Squats', sets: '4x'},
        {id: '3', name: 'Lunges', sets: '4x'},
        {id: '4', name: 'Pullups', sets: '4x'},
        {id: '5', name: 'Situps', sets: '4x'},
        {id: '6', name: 'Plank', sets: '4x'},
        {id: '7', name: 'Burpees', sets: '4x'},
        {id: '8', name: 'Jumping Jacks', sets: '4x'},
        {id: '9', name: 'Leg Raises', sets: '4x'},
        {id: '10', name: 'Dips', sets: '4x'},
        {id: '11', name: 'Wall Sit', sets: '4x'},
        {id: '12', name: 'Superman', sets: '4x'},
        {id: '13', name: 'Crunches', sets: '4x'},
        {id: '14', name: 'Bicycle Crunches', sets: '4x'},
    ],
};

const WorkoutStartScreen = () => {
    const dispatch = useDispatch();

    const currentWorkout = useSelector(state => state.workoutProcessReducer.currentWorkout);
    const workoutType = useSelector(state => state.workoutProcessReducer.workoutType);
    const exercisesList = useSelector(state => state.workoutProcessReducer.exercisesList);
    const activeExerciseId = useSelector(state => state.workoutProcessReducer.currentExerciseIndex);
    const workoutState = useSelector(state => state.workoutProcessReducer.workoutState);
    const [selectedOption, setSelectedOption] = useState(null);
    const currentExercise = exercisesList[activeExerciseId];
    const currentSet = useSelector(state => state.workoutProcessReducer.currentSet);
    const [countdown, setCountdown] = useState(null);

    const selectWorkoutType = useCallback(() => {
        console.log("SELECTED OPTION:", selectedOption);
        if (selectedOption === "home") {
            console.log("HOME");
            dispatch(startWorkout(
                currentWorkout?.homeVersion?.exercises
            ));
            console.log("Exercise Set", currentWorkout);
        } else if (selectedOption === "gym") {
            dispatch(startWorkout(
                currentWorkout?.equipmentVersion?.exercises
            ));
        } else {
            dispatch(resetWorkoutState());
            Actions.goBack();
        }
        dispatch(updateWorkoutType(selectedOption));
    }, [selectedOption, currentWorkout, dispatch]);

    useEffect(() => {
        console.log(currentWorkout);
        console.log("Exercise set", exercisesList);
        console.log("Workout State", workoutState);
    }, [currentWorkout, workoutState, exercisesList]);

    useEffect(() => {
        if (!currentExercise) return;

        if (workoutState === workout_states.IN_PROGRESS) {
            if (currentExercise.duration) {
                setCountdown(currentExercise.duration);
            } else {
                setCountdown(null);
            }
        } else if (workoutState === workout_states.REST) {
            if (currentExercise.rest) {
                setCountdown(currentExercise.rest);
            }
        }
    }, [workoutState, currentSet, activeExerciseId, currentExercise]);

    useEffect(() => {
        let timer;

        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
        }

        if (countdown === 0 && workoutState === workout_states.REST) {
            dispatch(endRest());
        }

        if (countdown === 0) {
            clearInterval(timer);
            dispatch(nextSet());
        }

        return () => clearInterval(timer);
    }, [countdown, workoutState, dispatch]);

    return (
        <View style={styles.container}>
            <NavigationBar
                title={'Workouts'} hideBackButton={!(workoutState === workout_states.TYPE_SELECTION ||  workoutState === workout_states.START) }/>
            {
                workoutState === workout_states.TYPE_SELECTION ?
                    (<>
                        <Text style={styles.title}>Select Workout Type</Text>
                        <View style={styles.selectionContainer}>
                            <TouchableOpacity
                                style={[styles.optionWrapper, selectedOption === 'home' ? styles.selected : styles.unselected]}
                                onPress={() => setSelectedOption('home')}
                            >
                                <Image
                                    source={require('../../assets/images/icon_homeworkout.webp')}
                                    style={styles.icon}
                                    resizeMode="contain"
                                />
                                <Text style={[
                                    styles.optionLabel,
                                    selectedOption === 'home' ? styles.selectedText : styles.unselectedText
                                ]}>
                                    Home Workout
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[
                                styles.optionWrapper,
                                selectedOption === 'gym' ? styles.selected : styles.unselected
                            ]}
                                              onPress={() => setSelectedOption('gym')}>
                                <Image
                                    source={require('../../assets/images/icon_dumbell.webp')}
                                    style={styles.icon}
                                    resizeMode="contain"
                                />
                                <Text style={[
                                    styles.optionLabel,
                                    selectedOption === 'gym' ? styles.selectedText : styles.unselectedText
                                ]}>
                                    Gym Workout
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.continueButton}
                                onPress={() => {
                                    if (selectedOption) {
                                        selectWorkoutType(selectedOption);
                                    } else {
                                        showErrorToast("Select a preferred workout type");
                                    }
                                }}
                            >
                                <Text style={styles.continueButtonLabel}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </>)
                    :
                    workoutState === workout_states.START ?
                        (<>
                            <View style={styles.header}>
                                <Text style={styles.headerText}>Recommended Workout</Text>
                            </View>
                            <View style={styles.infoContainer}>
                                <Image source={workoutType ? homeIcon : dumbellIcon} style={styles.icon}
                                       resizeMode="contain"/>
                                <View>
                                    <Text style={styles.workoutType}>{workoutType}</Text>
                                    <Text style={styles.duration}>{currentWorkout?.duration}</Text>
                                </View>
                            </View>
                            <View style={styles.exerciseList}>
                                <FlatList
                                    data={exercisesList}
                                    keyExtractor={(item) => item.id}
                                    style={styles.scrollContainer}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({item, index}) => (
                                        <View
                                            style={[
                                                styles.exerciseItem,
                                                index === activeExerciseId ? styles.activeExerciseItem : styles.inactiveExerciseItem,
                                            ]}
                                        >
                                            <Text style={styles.exerciseText}>{item.name}</Text>
                                            <Text style={styles.exerciseText}>{item.sets}X</Text>
                                        </View>
                                    )}
                                />
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.continueButton}
                                    onPress={() => {
                                        dispatch(updateWorkoutState(workout_states.IN_PROGRESS));
                                    }}
                                >
                                    <Text style={styles.continueButtonLabel}>Start</Text>
                                </TouchableOpacity>
                            </View>
                        </>)
                        : workoutState === workout_states.IN_PROGRESS ?
                            (<>
                                <View style={styles.header}>
                                    <Text style={styles.headerText}>{currentExercise?.name ?? 'Exercise Name'}</Text>
                                </View>
                                <View style={styles.infoContainer}>
                                    <Image source={sampleWorkout.icon} style={styles.icon} resizeMode="contain"/>
                                    <View>
                                        {
                                            currentExercise?.duration ?
                                                <Text style={styles.workoutType}>⏱️ {countdown}s</Text>
                                                :
                                                currentExercise?.reps ?
                                                    <Text style={styles.workoutType}>{currentExercise?.reps} Reps</Text>
                                                    :
                                                    <Text style={styles.workoutType}>10 Reps</Text>
                                        }
                                        <Text style={styles.duration}>{currentSet} Set of {currentExercise?.sets}</Text>
                                    </View>
                                </View>
                                <View style={styles.exerciseList}>
                                    <View
                                        style={[
                                            styles.exerciseItem,
                                            styles.activeExerciseItem
                                        ]}
                                    >
                                        <Text style={styles.exerciseText}>Instructions</Text>
                                    </View>
                                    <View
                                        style={[
                                            styles.exerciseItem,
                                            styles.inactiveExerciseItem,
                                            {height: dimensions.heightLevel10}
                                        ]}
                                    >
                                        <Text style={styles.exerciseText}>{currentExercise?.instruction}</Text>
                                    </View>
                                </View>
                                <View style={[styles.exerciseList, {
                                    marginTop: dimensions.heightLevel2,
                                    height: dimensions.heightLevel10 * 1.5,
                                    backgroundColor: colors.gray
                                }]}>
                                    <FlatList
                                        data={exercisesList}
                                        keyExtractor={(item) => item.id}
                                        style={styles.scrollContainer}
                                        showsVerticalScrollIndicator={false}
                                        renderItem={({item, index}) => (
                                            <View
                                                style={[
                                                    styles.exerciseItem,
                                                    index === activeExerciseId ? styles.activeExerciseItem : styles.inactiveExerciseItem,
                                                ]}
                                            >
                                                <Text style={styles.exerciseText}>{item.name}</Text>
                                                <Text style={styles.exerciseText}>{item.sets}</Text>
                                            </View>
                                        )}
                                    />
                                </View>
                                <View style={[styles.buttonContainer, {flexDirection: 'row'}]}>
                                    <View style={{flex: 1, paddingHorizontal: dimensions.paddingLevel1}}>
                                        <TouchableOpacity
                                            style={styles.continueButton}
                                            onPress={() => {
                                                dispatch(nextSet());
                                            }}
                                        >
                                            <Text style={styles.continueButtonLabel}>Done</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flex: 1, paddingHorizontal: dimensions.paddingLevel1}}>
                                        <TouchableOpacity
                                            style={styles.skipButton}
                                            onPress={() => {
                                                dispatch(skipCurrentExercise());
                                            }}
                                        >
                                            <Text style={styles.continueButtonLabel}>Skip</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </>)
                            :
                            workoutState === workout_states.REST ?
                                <>
                                    <View style={styles.header}>
                                        <Text style={styles.headerText}>Rest</Text>
                                    </View>
                                    <View style={[styles.exerciseList,{marginTop:dimensions.heightLevel10}]}>
                                        <View
                                            style={[
                                                styles.exerciseItem,
                                                styles.inactiveExerciseItem,
                                                {height: dimensions.heightLevel10,alignItems:'center',justifyContent:'center'}
                                            ]}
                                        >
                                            <View style={{alignItems:'center'}}>
                                                <Text style={styles.duration}>Rest timer</Text>
                                                <Text style={styles.workoutType}>⏱️ {countdown} s</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={[styles.buttonContainer, {flexDirection: 'row'}]}>
                                        <View style={{flex: 1, paddingHorizontal: dimensions.paddingLevel1}}>
                                            <TouchableOpacity
                                                style={styles.continueButton}
                                                onPress={() => {
                                                    if (selectedOption) {
                                                        console.log("SELECTED OPTION:", selectedOption);
                                                        dispatch(updateWorkoutType(selectedOption));
                                                        dispatch(updateWorkoutState(workout_states.IN_PROGRESS));
                                                    } else {
                                                        showErrorToast("Select a preferred workout type");
                                                    }
                                                }}
                                            >
                                                <Text style={styles.continueButtonLabel}>Done</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{flex: 1, paddingHorizontal: dimensions.paddingLevel1}}>
                                            <TouchableOpacity
                                                style={styles.skipButton}
                                                onPress={() => {
                                                    dispatch(endRest());
                                                }}
                                            >
                                                <Text style={styles.continueButtonLabel}>Skip</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </>
                                :
                                <WorkoutCompleteScreen/>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: dimensions.paddingLevel2,
    },
    selectionContainer: {
        flexDirection: "row",
        justifyContent: 'space-evenly',
        width: '100%',
        paddingHorizontal: dimensions.paddingLevel2,
    },
    title: {
        fontFamily: fontFamilies.RobotoBold,
        fontStyle: 'bold',
        fontSize: fontSizes.fontXXXXXLarge,
        color: colors.white,
        marginVertical: dimensions.heightLevel4,
    },
    optionWrapper: {
        flex: 1,
        marginHorizontal: dimensions.paddingLevel1,
        height: dimensions.heightLevel7 * 2.5,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    selected: {
        backgroundColor: colors.primary,
    },
    unselected: {
        backgroundColor: colors.txtField,
    },
    slide2: {
        flex: 1,
        backgroundColor: colors.primary,
        height: dimensions.heightLevel7 * 2,
        borderRadius: 50,
    },
    icon: {
        width: 75,
        height: 75,
        marginBottom: 10,
        color: colors.white
    },
    optionLabel: {
        color: '#FFFFFF',
        fontFamily: fontFamilies.RobotoMedium,
        fontSize: fontSizes.fontXLarge,
    },
    selectedText: {
        color: colors.white,
    },
    unselectedText: {
        color: colors.white,
    },
    buttonContainer: {
        flex: 1,
        position: 'absolute',
        bottom: dimensions.heightLevel2,
        left: dimensions.paddingLevel2,
        right: dimensions.paddingLevel2,
    },
    continueButton: {
        flex: 1,
        backgroundColor: colors.primary,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    doneButton:
        {
            flex: 1,
            backgroundColor: colors.primary,
            padding: 16,
            borderRadius: 12,
            alignItems: 'center',
        },
    skipButton: {
        flex: 1,
        backgroundColor: colors.txtField,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    continueButtonLabel: {
        color: colors.white,
        fontSize: fontSizes.fontLarge,
        fontFamily: fontFamilies.RobotoBold,
    },
    header: {
        width: '100%',
        padding: 15,
        backgroundColor: colors.primaryGradient,
        alignItems: 'center',
        borderRadius: 12,
        marginBottom: dimensions.heightLevel2,
    },
    headerText: {
        fontFamily: fontFamilies.RobotoBold,
        fontSize: fontSizes.fontXXLarge,
        color: colors.white,
    },
    infoContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: dimensions.heightLevel2,
    },
    workoutType: {
        fontSize: fontSizes.fontXLarge,
        fontFamily: fontFamilies.RobotoBold,
        color: colors.white,
    },
    duration: {
        fontSize: fontSizes.fontMedium,
        color: colors.gray,
        marginTop: 4,
    },
    exerciseList: {
        width: '100%',
        maxHeight: dimensions.heightLevel10 * 2.8,
        backgroundColor: colors.secondary,
        borderRadius: 14,
    },
    exerciseItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 20,
        marginVertical: 0,
        borderRadius: 12,
    },
    activeExerciseItem: {
        backgroundColor: colors.primary,
    },
    inactiveExerciseItem: {
        opacity: 0.6,
    },
    exerciseText: {
        color: colors.white,
        fontSize: fontSizes.fontLarge,
        fontFamily: fontFamilies.RobotoMedium,
    },
    startButton: {
        position: 'absolute',
        bottom: dimensions.heightLevel3,
        backgroundColor: colors.primary,
        paddingVertical: 14,
        paddingHorizontal: 60,
        borderRadius: 14,
    },
    startButtonText: {
        color: colors.white,
        fontSize: fontSizes.fontXLarge,
        fontFamily: fontFamilies.RobotoBold,
    },
    scrollContainer: {
        width: '100%',
    },
});

export default WorkoutStartScreen;