import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { colors, dimensions, fontFamilies, fontSizes } from "../../configuration/constants";
import * as Actions from "../../navigation/NavActions";
import { RouteNames } from "../../navigation/AppRoutes";
import ButtonField from "../../components/ButtonField";
import { getUserDetailsRequest } from '../../service/networkRequests/userRequests';
import {setPlanData} from "../../redux/slices/workoutPlanSlice";

const HEIGHT_RANGE = { min: 120, max: 230 };
const DEFAULT_HEIGHT = 170;
const heights = Array.from({ length: HEIGHT_RANGE.max - HEIGHT_RANGE.min + 1 }, (_, i) => HEIGHT_RANGE.min + i);

const HeightSelectionScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { height } = useSelector(state => state.workoutReducer);
    const [selectedHeight, setSelectedHeight] = useState(height || DEFAULT_HEIGHT);
    const scrollY = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef(null);

    useEffect(() => {
        const fetchUserHeight = async () => {
            try {
                const userDetails = await getUserDetailsRequest();
                if (userDetails?.data?.data?.height) {
                    const userHeight = userDetails.data.data.height;
                    setSelectedHeight(userHeight);
                    dispatch(setPlanData({ height: userHeight }));

                    setTimeout(() => {
                        const index = heights.indexOf(userHeight);
                        flatListRef.current?.scrollToIndex({
                            index,
                            animated: false,
                        });
                    }, 100);
                }
            } catch (error) {
                console.error('Error fetching user height:', error);
            }
        };

        fetchUserHeight();
    }, []);

    const handleScrollEnd = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const index = Math.round(offsetY / 70);
        const newHeight = heights[Math.min(Math.max(index, 0), heights.length - 1)];
        setSelectedHeight(newHeight);
        dispatch(setPlanData({ height: newHeight }));
    };

    const renderItem = ({ item, index }) => {
        const inputRange = [
            (index - 2) * 70,
            (index - 1) * 70,
            index * 70,
            (index + 1) * 70,
            (index + 2) * 70,
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

        const isSelected = item === selectedHeight;

        return (
            <Animated.View style={[styles.heightItem, { transform: [{ scale }], opacity }]}>
                <TouchableOpacity
                    onPress={() => {
                        setSelectedHeight(item);
                        dispatch(setPlanData({ height: item }));
                        const index = heights.indexOf(item);
                        flatListRef.current?.scrollToIndex({ index, animated: true });
                    }}
                    style={[
                        styles.heightButton,
                        isSelected && styles.heightButtonSelected
                    ]}
                >
                    <Text style={[
                        styles.heightText,
                        isSelected && styles.heightTextSelected
                    ]}>
                        {item} cm
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    const handleContinue = () => {
        Actions.navigate(RouteNames.WEIGHT_SELECTION_SCREEN);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>What's your height?</Text>

            <View style={styles.pickerContainer}>
                <View style={styles.centerHighlight} />

                <Animated.FlatList
                    ref={flatListRef}
                    data={heights}
                    keyExtractor={(item) => item.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={70}
                    decelerationRate="fast"
                    onMomentumScrollEnd={handleScrollEnd}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: true }
                    )}
                    scrollEventThrottle={16}
                    contentContainerStyle={styles.listContent}
                    getItemLayout={(data, index) => ({
                        length: 70,
                        offset: 70 * index,
                        index,
                    })}
                    initialScrollIndex={heights.indexOf(selectedHeight)}
                />
            </View>

            <View style={styles.selectedHeightContainer}>
                <Text style={styles.selectedHeightText}>{selectedHeight} cm</Text>
                <Text style={styles.heightInFeet}>
                    {Math.floor(selectedHeight / 30.48)} ft {Math.round((selectedHeight % 30.48) / 2.54)} in
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
        height: 70,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        transform: [{ translateY: -35 }],
        zIndex: -1,
    },
    listContent: {
        paddingVertical: dimensions.fullHeight / 2 - 35,
    },
    heightItem: {
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heightButton: {
        width: 120,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: colors.primary,
    },
    heightButtonSelected: {
        backgroundColor: colors.secondary,
        transform: [{ scale: 1.1 }],
    },
    heightText: {
        color: colors.white,
        fontSize: fontSizes.fontXLarge,
        fontFamily: fontFamilies.RobotoRegular,
    },
    heightTextSelected: {
        fontFamily: fontFamilies.RobotoBold,
        fontSize: fontSizes.fontXXLarge,
    },
    selectedHeightContainer: {
        alignItems: 'center',
        marginVertical: dimensions.heightLevel3,
    },
    selectedHeightText: {
        color: colors.white,
        fontSize: fontSizes.fontXXLarge,
        fontFamily: fontFamilies.RobotoBold,
    },
    heightInFeet: {
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

export default HeightSelectionScreen;