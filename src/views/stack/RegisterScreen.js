import {Keyboard, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect,useCallback, useState} from "react";
import {colors, dimensions, fontFamilies, fontSizes, regexes} from "../../configuration/constants";
import ButtonField from "../../components/ButtonField";
import * as Actions from "../../navigation/NavActions";
import {RouteNames} from "../../navigation/AppRoutes";
import TextField from "../../components/TextField";
import logo from "../../assets/images/image_logo.webp";
import DropdownField from "../../components/DropdownField";
import {showErrorToast} from "../../util/toastActions";
import {userRegisterRequest} from "../../service/networkRequests/authRequests";


const RegisterScreen = ({navigation}) => {
    const genderData = [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Other", value: "Other" },
    ];

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [emailErrorText, setEmailErrorText] = useState("");
    const [passwordErrorText, setPasswordErrorText] = useState("");

    useEffect(() => {
        return navigation.addListener('focus', () => {

        });
    }, [navigation])

    const onRegister = async () =>{
        Keyboard.dismiss();
        if (!validateInputFields()){
            const data = {
                  firstName,
                lastName,
                email,
                password,
                gender
            }

            const result = await userRegisterRequest(data);
            if (result?.code === 200){
                Actions.reset(RouteNames.LOGIN_SCREEN);
            }
        } else{
            showErrorToast('Missing required field(s)');
        }
    }

    const validateEmail = (email) => {
        if(email && regexes.email_validation.test(email)) {
            setEmailErrorText(null);
        } else {
            setEmailErrorText('Invalid email address')
        }
    }

    const validatePassword = (password) => {
        if(password && regexes.password_validation.test(password)) {
            setPasswordErrorText(null);
        } else {
            setPasswordErrorText('At least 8 characters, with uppercase and lowercase letters.')
        }
    }

    const validateInputFields = () =>{
         return(!firstName || !lastName || !email || !gender || !password || emailErrorText || passwordErrorText);
    }

    return (
        <View style={styles.container}>
            <View style={{flex: 1}}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{flex: 1}}
                >
                    <View style={styles.logoContainer}>
                        <Image source={logo} style={styles.logo} resizeMode={'contain'}/>
                    </View>

                    <View>
                        <Text style={styles.signInText}>Create Your Account</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextField
                            placeholder="Enter your first name"
                            height={dimensions.heightLevel4}
                            value={firstName}
                            onChangeText={useCallback(text => setFirstName(text), [firstName])}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextField
                            placeholder="Enter your last name"
                            height={dimensions.heightLevel4}
                            value={lastName}
                            onChangeText={useCallback(text => setLastName(text), [lastName])}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextField
                            placeholder="Enter your email"
                            height={dimensions.heightLevel4}
                            value={email}
                            onChangeText={useCallback(text => {setEmail(text); validateEmail(text);}, [email],)}
                            errorText={emailErrorText}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <DropdownField
                            data={genderData}
                            value={gender}
                            onChange={(item) => setGender(item.value)}
                            placeholder="Select your gender"
                            required
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextField
                            placeholder="Enter password"
                            isPassword
                            height={dimensions.heightLevel4}
                            value={password}
                            onChangeText={useCallback(text => {setPassword(text); validatePassword(text);}, [password],)}
                            errorText={passwordErrorText}
                        />
                    </View>
                    {/*<View style={styles.inputContainer}>*/}
                    {/*    <TextField*/}
                    {/*        placeholder="Confirm password"*/}
                    {/*        isPassword*/}
                    {/*        height={dimensions.heightLevel4}*/}
                    {/*        onChangeText={(text)=>handleChange('confirm',text)}*/}
                    {/*    />*/}
                    {/*</View>*/}
                    <View style={{height: dimensions.heightLevel1}}></View>
                </ScrollView>
            </View>
            <View style={{padding: dimensions.heightLevel1}}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: dimensions.heightLevel1 / 2
                }}>
                    <Text style={styles.footerText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => Actions.reset(RouteNames.LOGIN_SCREEN)}>
                        <Text style={styles.footerBtn}>Sign In</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <ButtonField
                        buttonHeight={dimensions.heightLevel4}
                        label={'Register'}
                        labelColor={colors.white}
                        disabled={validateInputFields()}
                        onPress={useCallback(onRegister, [
                            firstName,
                            lastName,
                            email,
                            gender,
                            password
                        ])}
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
    logoContainer: {
        marginTop: dimensions.heightLevel2,
        alignItems: "center",
    },

    logo: {
        height: dimensions.fullHeight * 18 / 100,
        marginBottom: dimensions.heightLevel3
    },
    signInText: {
        textAlign: "center",
        fontFamily: fontFamilies.RobotoBold,
        fontSize: fontSizes.fontXXXLarge,
        color: colors.white,
        marginBottom: dimensions.heightLevel2,
    },

    inputContainer: {
        paddingHorizontal: dimensions.heightLevel1,
        marginTop: dimensions.heightLevel1,
    },

    footerBtn: {
        color: colors.primary,
        fontFamily: fontFamilies.RobotoBold,
        fontSize: fontSizes.fontMidMedium,
    },
    footerText: {
        fontSize: fontSizes.fontMidMedium,
        color: colors.white,
    },

});

export default RegisterScreen;
