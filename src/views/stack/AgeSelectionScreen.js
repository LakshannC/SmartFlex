import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { colors, dimensions, fontFamilies, fontSizes } from "../../configuration/constants";
import * as Actions from "../../navigation/NavActions";
import { RouteNames } from "../../navigation/AppRoutes";
import ButtonField from "../../components/ButtonField";
import { getUserDetailsRequest } from '../../service/networkRequests/userRequests';
import {setPlanData} from "../../redux/slices/workoutPlanSlice";

const AGE_RANGE = { min: 13, max: 100 };
const DEFAULT_AGE = 25;
const ages = Array.from({ length: AGE_RANGE.max - AGE_RANGE.min + 1 }, (_, i) => AGE_RANGE.min + i);

const AgeSelectionScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { age } = useSelector(state => state.workoutReducer);
    const [selectedAge, setSelectedAge] = useState(age || DEFAULT_AGE);
    const scrollY = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef(null);

    useEffect(() => {

        fetchUserAge();
    }, []);

    const fetchUserAge = async () => {
        try {
            const userDetails = await getUserDetailsRequest();
            if (userDetails?.data?.data?.age) {
                const userAge = userDetails.data.data.age;
                setSelectedAge(userAge);
                dispatch(setPlanData({ age: userAge }));

                setTimeout(() => {
                    const index = ages.indexOf(userAge);
                    flatListRef.current?.scrollToIndex({
                        index,
                        animated: false,
                    });
                }, 100);
            }
        } catch (error) {
            console.error('Error fetching user age:', error);
        }
    };

    const handleScrollEnd = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const index = Math.round(offsetY / 70);
        const newAge = ages[Math.min(Math.max(index, 0), ages.length - 1)];
        setSelectedAge(newAge);
        dispatch(setPlanData({ age: newAge }));
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

        const isSelected = item === selectedAge;

        return (
            <Animated.View style={[styles.ageItem, { transform: [{ scale }], opacity }]}>
                <TouchableOpacity
                    onPress={() => {
                        setSelectedAge(item);
                        dispatch(setPlanData({ age: item }));
                        const index = ages.indexOf(item);
                        flatListRef.current?.scrollToIndex({ index, animated: true });
                    }}
                    style={[
                        styles.ageButton,
                        isSelected && styles.ageButtonSelected
                    ]}
                >
                    <Text style={[
                        styles.ageText,
                        isSelected && styles.ageTextSelected
                    ]}>
                        {item}
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    const handleContinue = () => {
        Actions.navigate(RouteNames.HEIGHT_SELECTION_SCREEN);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>How old are you?</Text>

            <View style={styles.pickerContainer}>
                <View style={styles.centerHighlight} />

                <Animated.FlatList
                    ref={flatListRef}
                    data={ages}
                    keyExtractor={(item) => item.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={70}
                    decelerationRate="fast"
                    onMomentumScrollEnd={handleScrollEnd}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } }}],
                        { useNativeDriver: true }
                    )}
                        scrollEventThrottle={16}
                        contentContainerStyle={styles.listContent}
                        getItemLayout={(data, index) => ({
                        length: 70,
                        offset: 70 * index,
                        index,
                    })}
                        initialScrollIndex={ages.indexOf(selectedAge)}
                        />
                        </View>

                        <View style={styles.selectedAgeContainer}>
                    <Text style={styles.selectedAgeText}>{selectedAge} years</Text>
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
    ageItem: {
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ageButton: {
        width: 80,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: colors.primary,
    },
    ageButtonSelected: {
        backgroundColor: colors.secondary,
        transform: [{ scale: 1.1 }],
    },
    ageText: {
        color: colors.white,
        fontSize: fontSizes.fontXLarge,
        fontFamily: fontFamilies.RobotoRegular,
    },
    ageTextSelected: {
        fontFamily: fontFamilies.RobotoBold,
        fontSize: fontSizes.fontXXLarge,
    },
    selectedAgeContainer: {
        alignItems: 'center',
        marginVertical: dimensions.heightLevel3,
    },
    selectedAgeText: {
        color: colors.white,
        fontSize: fontSizes.fontXLarge,
        fontFamily: fontFamilies.RobotoBold,
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

export default AgeSelectionScreen;