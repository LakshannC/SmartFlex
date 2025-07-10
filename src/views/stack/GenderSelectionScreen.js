import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { colors, dimensions, fontFamilies, fontSizes } from "../../configuration/constants";
import * as Actions from "../../navigation/NavActions";
import { RouteNames } from "../../navigation/AppRoutes";
import ButtonField from "../../components/ButtonField";
import { getUserDetailsRequest } from '../../service/networkRequests/userRequests';
import {setPlanData} from "../../redux/slices/workoutPlanSlice";
import {showErrorToast} from "../../util/toastActions";

const GenderSelectionScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const { gender } = useSelector(state => state.workoutReducer);
    const [selectedGender, setSelectedGender] = useState(gender || null);
    const [animation] = useState(new Animated.Value(1));

    const genders = [
        { id: 'male', label: 'Male', value: 'Male', icon: require('../../assets/images/male.png') },
        { id: 'female', label: 'Female', value: 'Female', icon: require('../../assets/images/female.png') },
    ];

    useEffect(() => {

        fetchUserGender();
    }, []);

    const fetchUserGender = async () => {
        try {
            const userDetails = await getUserDetailsRequest();
            if (userDetails?.data?.data?.gender) {
                const userGender = userDetails.data.data.gender.toLowerCase();
                setSelectedGender(userGender);
                dispatch(setPlanData({ gender: userDetails.data.data.gender }));
            }
        } catch (error) {
            console.error('Error fetching user gender:', error);
        }
    };


    const handleGenderSelect = (genderId) => {
        setSelectedGender(genderId);

        const selected = genders.find(g => g.id === genderId);
        dispatch(setPlanData({ gender: selected.value }));

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

    const handleContinue = () => {
        if (!selectedGender) {
            showErrorToast("Please select gender");
            return;
        }
        Actions.navigate(RouteNames.AGE_SELECTION_SCREEN);
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

            <View style={styles.buttonRow}>
                <View style={styles.backButton}>
                    <ButtonField
                        buttonHeight={dimensions.heightLevel4}
                        label={'Cancel'}
                        labelColor={colors.white}
                        bgColor={colors.txtField}
                        onPress={() => Actions.reset(RouteNames.TAB_SCREEN)}
                    />
                </View>

                <View style={styles.continueButton}>
                    <ButtonField
                        buttonHeight={dimensions.heightLevel4}
                        label={'Continue'}
                        labelColor={colors.white}
                        onPress={handleContinue}
                        disabled={!selectedGender}
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

export default GenderSelectionScreen;


