import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Animated,
    Image,
} from 'react-native';
import { colors, dimensions, fontFamilies, fontSizes } from '../../configuration/constants';
import ButtonField from '../../components/ButtonField';
import * as Actions from '../../navigation/NavActions';
import { RouteNames } from '../../navigation/AppRoutes';

const ITEM_WIDTH = 60;
const WEIGHT_RANGE = { min: 30, max: 200 };
const DEFAULT_WEIGHT = 70;

const weights = Array.from(
    { length: WEIGHT_RANGE.max - WEIGHT_RANGE.min + 1 },
    (_, i) => WEIGHT_RANGE.min + i
);

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const WeightSelectionScreen = ({ navigation }) => {
    const [selectedWeight, setSelectedWeight] = useState(DEFAULT_WEIGHT);
    const flatListRef = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current;

    const scrollToDefaultWeight = () => {
        const index = weights.indexOf(DEFAULT_WEIGHT);
        if (index >= 0) {
            flatListRef.current?.scrollToOffset({
                offset: index * ITEM_WIDTH - (dimensions.fullWidth / 2 - ITEM_WIDTH / 2),
                animated: false,
            });
        }
    };

    const handleMomentumScrollEnd = (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / ITEM_WIDTH);
        const newWeight = weights[Math.min(Math.max(index, 0), weights.length - 1)];
        setSelectedWeight(newWeight);
    };

    const renderItem = ({ item, index }) => {
        const inputRange = [
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
            (index + 1) * ITEM_WIDTH,
        ];

        const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1.2, 0.9],
            extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp',
        });

        const isSelected = item === selectedWeight;

        return (
            <Animated.View
                style={{
                    width: ITEM_WIDTH,
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
            <Text style={styles.title}>What is your Weight?</Text>

            <View style={styles.pickerContainer}>
                <View style={styles.pickerWrapper}>
                    <AnimatedFlatList
                        ref={flatListRef}
                        data={weights}
                        horizontal
                        keyExtractor={(item) => item.toString()}
                        showsHorizontalScrollIndicator={false}
                        bounces={false}
                        snapToInterval={ITEM_WIDTH}
                        decelerationRate="fast"
                        onMomentumScrollEnd={handleMomentumScrollEnd}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: true }
                        )}
                        scrollEventThrottle={16}
                        contentContainerStyle={styles.listContent}
                        renderItem={renderItem}
                        getItemLayout={(_, index) => ({
                            length: ITEM_WIDTH,
                            offset: ITEM_WIDTH * index,
                            index,
                        })}
                        onLayout={scrollToDefaultWeight}
                    />
                    <View style={styles.triangleContainer}>
                        <Image
                            source={require('../../assets/images/icon_triangle.webp')}
                            style={styles.triangleIcon}
                            resizeMode="contain"
                        />
                    </View>
                </View>
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
                        onPress={() => Actions.reset(RouteNames.GOAL_SELECTION_SCREEN)}
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
        marginTop:dimensions.heightLevel8,
        fontFamily: fontFamilies.RobotoBold,
        fontSize: fontSizes.fontXXLarge,
        color: colors.white,
        textAlign: 'center',
    },
    pickerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pickerWrapper: {
        width: '100%',
        height: dimensions.heightLevel6,
        position: 'relative',
        justifyContent: 'center',
    },
    listContent: {
        alignItems: 'center',
        paddingHorizontal: dimensions.fullWidth / 2 - ITEM_WIDTH / 2,
    },
    triangleContainer: {
        position: 'absolute',
        top: '60%',
        left: dimensions.fullWidth / 2 - 25,
        width: 50,
        height: 32,
        zIndex: 10,
    },
    triangleIcon: {
        width: 50,
        height: 32,
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
