import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Animated,
} from 'react-native';
import {colors, dimensions, fontFamilies, fontSizes} from "../../configuration/constants";
import * as Actions from "../../navigation/NavActions";
import {RouteNames} from "../../navigation/AppRoutes";
import ButtonField from "../../components/ButtonField";


const ITEM_HEIGHT = 50;
const HEIGHT_RANGE = { min: 120, max: 230 };
const DEFAULT_HEIGHT = 173;

const heights = Array.from(
    { length: HEIGHT_RANGE.max - HEIGHT_RANGE.min + 1 },
    (_, i) => HEIGHT_RANGE.min + i
);

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const HeightSelectionScreen = ({ navigation }) => {
    const [selectedHeight, setSelectedHeight] = useState(DEFAULT_HEIGHT);
    const flatListRef = useRef(null);
    const scrollY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const index = heights.indexOf(DEFAULT_HEIGHT);
        setTimeout(() => {
            flatListRef.current?.scrollToOffset({
                offset: index * ITEM_HEIGHT,
                animated: false,
            });
        }, 50);
    }, []);

    const handleMomentumScrollEnd = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const index = Math.round(offsetY / ITEM_HEIGHT);
        const newHeight = heights[Math.min(Math.max(index, 0), heights.length - 1)];
        setSelectedHeight(newHeight);
    };

    const renderItem = ({ item, index }) => {
        const inputRange = [
            (index - 1) * ITEM_HEIGHT,
            index * ITEM_HEIGHT,
            (index + 1) * ITEM_HEIGHT,
        ];

        const scale = scrollY.interpolate({
            inputRange,
            outputRange: [0.8, 1.2, 0.8],
            extrapolate: 'clamp',
        });

        const opacity = scrollY.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp',
        });

        const isSelected = item === selectedHeight;

        return (
            <Animated.View
                style={{
                    height: ITEM_HEIGHT,
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: [{ scale }],
                    opacity,
                }}
            >
                <Text
                    style={{
                        color: isSelected ? '#ffffff' : '#888',
                        fontSize: isSelected ? 26 : 20,
                        fontWeight: isSelected ? 'bold' : 'normal',
                    }}
                >
                    {item}
                </Text>
            </Animated.View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>What is your Height?</Text>

            <View style={styles.pickerWrapper}>
                <View style={[styles.highlightLine, { top: dimensions.fullHeight / 2 - ITEM_HEIGHT / 2 }]} />
                <View style={[styles.highlightLine, { top: dimensions.fullHeight / 2 + ITEM_HEIGHT / 2 }]} />

                <AnimatedFlatList
                    ref={flatListRef}
                    data={heights}
                    keyExtractor={(item) => item.toString()}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    snapToInterval={ITEM_HEIGHT}
                    decelerationRate="fast"
                    onMomentumScrollEnd={handleMomentumScrollEnd}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: true }
                    )}
                    scrollEventThrottle={16}
                    contentContainerStyle={{
                        paddingTop: dimensions.fullHeight / 2 - ITEM_HEIGHT / 2,
                        paddingBottom: dimensions.fullHeight / 2 - ITEM_HEIGHT / 2,
                    }}
                    renderItem={renderItem}
                    getItemLayout={(_, index) => ({
                        length: ITEM_HEIGHT,
                        offset: ITEM_HEIGHT * index,
                        index,
                    })}
                />
            </View>

            <View style={styles.buttonRow}>
                <View style={styles.backButton}>
                    <ButtonField
                        buttonHeight={dimensions.heightLevel4}
                        label={'Back'}
                        labelColor={colors.white}
                        bgColor={colors.txtField}
                        onPress={() => Actions.reset(RouteNames.HEIGHT_SELECTION_SCREEN)}
                    />
                </View>

                <View style={styles.continueButton}>
                    <ButtonField
                        buttonHeight={dimensions.heightLevel4}
                        label={'Continue'}
                        labelColor={colors.white}
                        onPress={() => Actions.reset(RouteNames.WEIGHT_SELECTION_SCREEN)}
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
    },
    title: {
        fontFamily:fontFamilies.RobotoBold,
        fontSize: fontSizes.fontXXLarge,
        color: colors.white,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: dimensions.heightLevel3,
    },
    pickerWrapper: {
        flex: 1,
        position: 'relative',
    },
    highlightLine: {
        position: 'absolute',
        left: dimensions.heightLevel5,
        right: dimensions.heightLevel5,
        height: 4,
        backgroundColor: colors.primary,
        zIndex: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding:dimensions.heightLevel1,
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
