import {Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";

import {colors, dimensions, fontFamilies, fontSizes, regexes} from "../../configuration/constants";
import ButtonField from "../../components/ButtonField";
import * as Actions from "../../navigation/NavActions";
import {RouteNames} from "../../navigation/AppRoutes";
import TextField from "../../components/TextField";
import logo from "../../assets/images/image_logo.webp";
import {BASE_URL} from "../../service/networkConfig/basicConfig";
import DropdownField from "../../components/DropdownField";
import {showErrorToast, showSuccessToast} from "../../util/toastActions";
import {userRegisterRequest} from "../../service/networkRequests/authRequests";



const RegisterScreen = ({navigation}) => {
    const genderData = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
    ];
    const userData = {

        firstName:"",
        lastName:"",
        gender:"",
        email:"",
        password:"",
        confirm:""

    }

    const [registerData,setRegisterData] = useState(userData);

    const handleChange = (field,value)=>{
        setRegisterData(prevState => ({
            ...prevState,
            [field]:value,
        }));
    };

    const validateRegisterForm = ()=>{
        const {firstName,lastName,email,gender,password,confirm} = registerData;

        if(!firstName || !lastName || !email || !password || !confirm || !gender){
            console.log("DATA SET",registerData);
            return {valid:false, error:"All fields are required."};
        }

        if(!regexes.email_validation.test(email)){
            return {valid:false, error:"Valid email is required."};
        }

        if(!regexes.password_validation.test(password)){
            return {valid:false, error:"Valid password is required."};
        }

        if(password!==confirm){
            return {valid:false, error:"Passwords do not match."};
        }

        return {
            valid: true
        };

    };


    const handleSubmit = async ()=>{

        const validity  = validateRegisterForm();
        console.log("result",validity);
        if(!validity.valid){
            showErrorToast("Validation error",validity.error);
            return;
        }



        const result = await userRegisterRequest(registerData);
        if(result?.code === 200){
            Actions.reset(RouteNames.LOGIN_SCREEN);
            showSuccessToast("Registration Success");
        }else{
            showErrorToast("Registration Failder",result?.error);
        }

        console.log("Register user",registerData);
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
                            onChangeText={(text)=>handleChange('firstName',text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextField
                            placeholder="Enter your last name"
                            height={dimensions.heightLevel4}
                            onChangeText={(text)=>handleChange('lastName',text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextField
                            placeholder="Enter your email"
                            height={dimensions.heightLevel4}
                            onChangeText={(text)=>handleChange('email',text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <DropdownField
                            data={genderData}
                            value={registerData.gender}
                            onChange={(item) => handleChange("gender", item.value)}
                            placeholder="Select your gender"
                            required
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextField
                            placeholder="Enter password"
                            isPassword
                            height={dimensions.heightLevel4}
                            onChangeText={(text)=>handleChange('password',text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextField
                            placeholder="Confirm password"
                            isPassword
                            height={dimensions.heightLevel4}
                            onChangeText={(text)=>handleChange('confirm',text)}
                        />
                    </View>
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
                        onPress={handleSubmit}
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
