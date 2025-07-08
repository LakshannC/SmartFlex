import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Image,
} from 'react-native';
import {colors, dimensions, fontFamilies, fontSizes} from "../../configuration/constants";
import * as Actions from "../../navigation/NavActions";
import {RouteNames} from "../../navigation/AppRoutes";
import ButtonField from "../../components/ButtonField";

const GenderSelectionScreen = ({ navigation }) => {
    const [selectedGender, setSelectedGender] = useState(null);
    const [animation] = useState(new Animated.Value(1));

    const genders = [
        { id: 'male', label: 'Male', icon: require('../../assets/images/male.png') },
        { id: 'female', label: 'Female', icon: require('../../assets/images/female.png') },
    ];

    const handleGenderSelect = (genderId) => {
        setSelectedGender(genderId);

        Animated.sequence([
            Animated.timing(animation, {
                toValue: 1.1,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(animation, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start();
    };

    return (
        <View style={styles.container}>

            <View>
                <Text style={styles.genderTxt}>Select Your Gender</Text>
            </View>

            <View style={styles.content}>
                {genders.map((gender) => {
                    const isSelected = selectedGender === gender.id;
                    const animatedStyle = {
                        transform: [{ scale: isSelected ? animation : 1 }],
                    };

                    return (
                        <Animated.View key={gender.id} style={[styles.genderOption, animatedStyle]}>
                            <TouchableOpacity
                                onPress={() => handleGenderSelect(gender.id)}
                                activeOpacity={0.8}
                                style={[
                                    styles.genderCircle,
                                    isSelected && styles.genderCircleSelected,
                                ]}
                            >
                                <Image
                                    source={gender.icon}
                                    style={styles.icon}
                                    resizeMode="contain"
                                />
                                <Text
                                    style={[
                                        styles.genderText,
                                        isSelected && styles.genderTextSelected,
                                    ]}
                                >
                                    {gender.label}
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>
                    );
                })}
            </View>

            <View style={styles.footer}>
                <ButtonField
                    buttonHeight={dimensions.heightLevel4}
                    label={'Next'}
                    labelColor={colors.white}
                    onPress={() => Actions.reset(RouteNames.HEIGHT_SELECTION_SCREEN)}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    genderOption: {
        marginVertical: 20,
    },
    genderTxt:{
        textAlign: "center",
        fontFamily: fontFamilies.RobotoBold,
        fontSize: fontSizes.fontXXXLarge,
        color: colors.white,
        marginTop: dimensions.heightLevel4,
    },
    genderCircle: {
        width: dimensions.fullWidth * 0.50,
        height: dimensions.fullHeight * 0.25,
        borderRadius: 100,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        // padding: dimensions.heightLevel4,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    genderCircleSelected: {
        backgroundColor: colors.secondary,
        borderColor:colors.white,
        borderWidth: 6,
        borderStyle: 'solid',
    },
    icon: {
        width: 40,
        height: 40,
        tintColor: colors.white,
        marginBottom: dimensions.heightLevel1/2,
    },
    genderText: {
        color: colors.white,
        fontSize: fontSizes.fontXXLarge,
        fontFamily: fontFamilies.RobotoLight,
    },
    genderTextSelected: {
        color: colors.white,
        fontSize: fontSizes.fontXXLarge,
        fontFamily: fontFamilies.RobotoBold,
    },
    footer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding:dimensions.heightLevel1,
    },
});

export default GenderSelectionScreen;


