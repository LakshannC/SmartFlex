import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { colors, dimensions, fontFamilies, fontSizes } from "../../configuration/constants";
import ButtonField from "../../components/ButtonField";
import { setPlanData } from "../../redux/slices/workoutPlanSlice";
import * as Actions from "../../navigation/NavActions";
import { RouteNames } from "../../navigation/AppRoutes";

const WEIGHT_RANGE = { min: 30, max: 200 };
const DEFAULT_WEIGHT = 70;
const weights = Array.from(
    { length: WEIGHT_RANGE.max - WEIGHT_RANGE.min + 1 },
    (_, i) => WEIGHT_RANGE.min + i
);

const ITEM_HEIGHT = 70;

const WeightSelectionScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { current_weight } = useSelector(state => state.workoutReducer);
    const [selectedWeight, setSelectedWeight] = useState(current_weight || DEFAULT_WEIGHT);
    const scrollY = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef(null);

    useEffect(() => {
        const index = weights.indexOf(current_weight || DEFAULT_WEIGHT);
        if (index >= 0 && flatListRef.current) {
            setTimeout(() => {
                flatListRef.current.scrollToIndex({
                    index,
                    animated: false,
                });
            }, 100);
        }
    }, [current_weight]);

    const handleScrollEnd = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const index = Math.round(offsetY / ITEM_HEIGHT);
        const newWeight = weights[Math.min(Math.max(index, 0), weights.length - 1)];
        setSelectedWeight(newWeight);
        dispatch(setPlanData({ current_weight: newWeight }));
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

        const isSelected = item === selectedWeight;

        return (
            <Animated.View style={[styles.weightItem, { transform: [{ scale }], opacity }]}>
                <TouchableOpacity
                    onPress={() => {
                        setSelectedWeight(item);
                        dispatch(setPlanData({ current_weight: item }));
                        const index = weights.indexOf(item);
                        flatListRef.current?.scrollToIndex({ index, animated: true });
                    }}
                    style={[
                        styles.weightButton,
                        isSelected && styles.weightButtonSelected
                    ]}
                >
                    <Text style={[
                        styles.weightText,
                        isSelected && styles.weightTextSelected
                    ]}>
                        {item} kg
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    const handleContinue = () => {
        dispatch(setPlanData({ current_weight: selectedWeight }));
        Actions.navigate(RouteNames.WEIGHT_GOAL_SELECTION_SCREEN);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Your Weight</Text>

            <View style={styles.pickerContainer}>
                <View style={styles.centerHighlight} />

                <Animated.FlatList
                    ref={flatListRef}
                    data={weights}
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
                    initialScrollIndex={weights.indexOf(selectedWeight)}
                />
            </View>

            <View style={styles.selectedWeightContainer}>
                <Text style={styles.selectedWeightText}>{selectedWeight} kg</Text>
                <Text style={styles.weightInLbs}>
                    {Math.round(selectedWeight * 2.20462)} lbs
                </Text>
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
    weightItem: {
        height: ITEM_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    weightButton: {
        width: 120,
        height: ITEM_HEIGHT - 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: colors.primary,
    },
    weightButtonSelected: {
        backgroundColor: colors.secondary,
        transform: [{ scale: 1.1 }],
    },
    weightText: {
        color: colors.white,
        fontSize: fontSizes.fontXLarge,
        fontFamily: fontFamilies.RobotoRegular,
    },
    weightTextSelected: {
        fontFamily: fontFamilies.RobotoBold,
        fontSize: fontSizes.fontXXLarge,
    },
    selectedWeightContainer: {
        alignItems: 'center',
        marginVertical: dimensions.heightLevel3,
    },
    selectedWeightText: {
        color: colors.white,
        fontSize: fontSizes.fontXXLarge,
        fontFamily: fontFamilies.RobotoBold,
    },
    weightInLbs: {
        color: colors.white,
        fontSize: fontSizes.fontLarge,
        fontFamily: fontFamilies.RobotoRegular,
        marginTop: dimensions.heightLevel1 / 2,
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

export default WeightSelectionScreen;