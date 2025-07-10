import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { colors, dimensions, fontFamilies, fontSizes } from "../../configuration/constants";
import ButtonField from "../../components/ButtonField";
import { setPlanData } from "../../redux/slices/workoutPlanSlice";
import * as Actions from "../../navigation/NavActions";
import { RouteNames } from "../../navigation/AppRoutes";

const GOAL_RANGE = { min: 30, max: 200 };
const DEFAULT_GOAL = 75;
const goals = Array.from(
    { length: GOAL_RANGE.max - GOAL_RANGE.min + 1 },
    (_, i) => GOAL_RANGE.min + i
);

const ITEM_HEIGHT = 70;

const WeightGoalSelectionScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { current_weight, goal_weight } = useSelector(state => state.workoutReducer);
    const [selectedGoal, setSelectedGoal] = useState(goal_weight || (current_weight ? Math.min(current_weight + 5, GOAL_RANGE.max) : DEFAULT_GOAL));
    const scrollY = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef(null);

    useEffect(() => {
        const defaultGoal = goal_weight || (current_weight ? Math.min(current_weight + 5, GOAL_RANGE.max) : DEFAULT_GOAL);
        setSelectedGoal(defaultGoal);

        setTimeout(() => {
            const index = goals.indexOf(defaultGoal);
            if (index >= 0 && flatListRef.current) {
                flatListRef.current.scrollToIndex({
                    index,
                    animated: false,
                });
            }
        }, 100);
    }, [current_weight, goal_weight]);

    const handleScrollEnd = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const index = Math.round(offsetY / ITEM_HEIGHT);
        const goal = goals[Math.min(Math.max(index, 0), goals.length - 1)];
        setSelectedGoal(goal);
        dispatch(setPlanData({ goal_weight: goal }));
    };

    const renderItem = ({ item, index }) => {
        const inputRange = [
            (index - 2) * ITEM_HEIGHT,
            (index - 1) * ITEM_HEIGHT,
            index * ITEM_HEIGHT,
            (index + 1) * ITEM_HEIGHT,
            (index + 2) * ITEM_HEIGHT,
        ];

        const scale = scrollY.interpolate({
            inputRange,
            outputRange: [0.7, 0.85, 1, 0.85, 0.7],
            extrapolate: 'clamp',
        });

        const opacity = scrollY.interpolate({
            inputRange,
            outputRange: [0.3, 0.6, 1, 0.6, 0.3],
            extrapolate: 'clamp',
        });

        const isSelected = item === selectedGoal;
        const difference = current_weight ? item - current_weight : 0;

        return (
            <Animated.View style={[styles.goalItem, { transform: [{ scale }], opacity }]}>
                <TouchableOpacity
                    onPress={() => {
                        setSelectedGoal(item);
                        dispatch(setPlanData({ goal_weight: item }));
                        const index = goals.indexOf(item);
                        flatListRef.current?.scrollToIndex({ index, animated: true });
                    }}
                    style={[
                        styles.goalButton,
                        isSelected && styles.goalButtonSelected,
                        difference > 0 && styles.gainItem,
                        difference < 0 && styles.lossItem
                    ]}
                >
                    <Text style={[
                        styles.goalText,
                        isSelected && styles.goalTextSelected
                    ]}>
                        {item} kg
                    </Text>
                    {isSelected && current_weight && (
                        <Text style={[
                            styles.differenceText,
                            difference > 0 && styles.gainText,
                            difference < 0 && styles.lossText
                        ]}>
                            {difference > 0 ? `+${difference}` : difference} kg
                        </Text>
                    )}
                </TouchableOpacity>
            </Animated.View>
        );
    };

    const handleContinue = () => {
        dispatch(setPlanData({ goal_weight: selectedGoal }));
        Actions.navigate(RouteNames.PLAN_CONFIRMATION_SCREEN);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Your Goal Weight</Text>

            <View style={styles.pickerContainer}>
                <View style={styles.centerHighlight} />

                <Animated.FlatList
                    ref={flatListRef}
                    data={goals}
                    keyExtractor={(item) => item.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={ITEM_HEIGHT}
                    decelerationRate="fast"
                    onMomentumScrollEnd={handleScrollEnd}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: true }
                    )}
                    scrollEventThrottle={16}
                    contentContainerStyle={styles.listContent}
                    getItemLayout={(data, index) => ({
                        length: ITEM_HEIGHT,
                        offset: ITEM_HEIGHT * index,
                        index,
                    })}
                    initialScrollIndex={goals.indexOf(selectedGoal)}
                />
            </View>

            <View style={styles.selectedGoalContainer}>
                <Text style={styles.selectedGoalText}>{selectedGoal} kg</Text>
                {current_weight && (
                    <Text style={[
                        styles.summaryText,
                        selectedGoal > current_weight && styles.gainText,
                        selectedGoal < current_weight && styles.lossText
                    ]}>
                        {selectedGoal > current_weight ? 'Gain ' : 'Lose '}
                        {Math.abs(selectedGoal - current_weight)} kg
                    </Text>
                )}
            </View>

            <View style={styles.buttonRow}>
                <View style={styles.backButton}>
                    <ButtonField
                        buttonHeight={dimensions.heightLevel4}
                        label={'Back'}
                        labelColor={colors.white}
                        bgColor={colors.txtField}
                        onPress={() => navigation.goBack()}
                    />
                </View>

                <View style={styles.continueButton}>
                    <ButtonField
                        buttonHeight={dimensions.heightLevel4}
                        label={'Continue'}
                        labelColor={colors.white}
                        onPress={handleContinue}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: dimensions.paddingLevel8,
        backgroundColor: colors.background,
    },
    title: {
        fontFamily: fontFamilies.RobotoBold,
        fontSize: fontSizes.fontXXLarge,
        color: colors.white,
        textAlign: 'center',
        marginBottom: dimensions.heightLevel4,
    },
    pickerContainer: {
        flex: 1,
        position: 'relative',
    },
    centerHighlight: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: '50%',
        height: ITEM_HEIGHT,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        transform: [{ translateY: -ITEM_HEIGHT/2 }],
        zIndex: -1,
    },
    listContent: {
        paddingVertical: dimensions.fullHeight / 2 - ITEM_HEIGHT/2,
    },
    goalItem: {
        height: ITEM_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    goalButton: {
        width: 120,
        height: ITEM_HEIGHT - 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: colors.primary,
    },
    goalButtonSelected: {
        backgroundColor: colors.secondary,
        transform: [{ scale: 1.1 }],
    },
    gainItem: {
        borderTopWidth: 3,
        borderTopColor: colors.success,
    },
    lossItem: {
        borderTopWidth: 3,
        borderTopColor: colors.danger,
    },
    goalText: {
        color: colors.white,
        fontSize: fontSizes.fontXLarge,
        fontFamily: fontFamilies.RobotoRegular,
    },
    goalTextSelected: {
        fontFamily: fontFamilies.RobotoBold,
        fontSize: fontSizes.fontXXLarge,
    },
    selectedGoalContainer: {
        alignItems: 'center',
        marginVertical: dimensions.heightLevel3,
    },
    selectedGoalText: {
        color: colors.white,
        fontSize: fontSizes.fontXXLarge,
        fontFamily: fontFamilies.RobotoBold,
    },
    summaryText: {
        color: colors.white,
        fontSize: fontSizes.fontXLarge,
        fontFamily: fontFamilies.RobotoMedium,
        marginTop: dimensions.heightLevel1 / 2,
    },
    differenceText: {
        fontSize: fontSizes.fontSmall,
        fontFamily: fontFamilies.RobotoRegular,
        marginTop: 2,
    },
    gainText: {
        color: colors.success,
    },
    lossText: {
        color: colors.danger,
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

export default WeightGoalSelectionScreen;