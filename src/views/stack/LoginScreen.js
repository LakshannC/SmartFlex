import {Image, Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import logo from "../../assets/images/image_logo.webp";
import TextField from "../../components/TextField";
import {colors, dimensions, fontFamilies, fontSizes, regexes} from "../../configuration/constants";
import * as Actions from "../../navigation/NavActions";
import {RouteNames} from "../../navigation/AppRoutes";
import ButtonField from "../../components/ButtonField";
import {useEffect,useCallback, useState} from "react";
import {userLoginRequest} from "../../service/networkRequests/authRequests";
const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailErrorText, setEmailErrorText] = useState("");

    useEffect(() => {
        return navigation.addListener('focus', ()=> {

        });
    }, [navigation])

    const onLogin = async () => {
        Keyboard.dismiss();
        if(!validateInputFields()){
            const data = {
                email,
                password
            }
            const result = await userLoginRequest(data);
            if(result?.code === 200){
               Actions.reset(RouteNames.TAB_SCREEN);
            }
        }
    }

    const validateEmail = (email) =>{
        if(email && regexes.email_validation.test(email)){
            setEmailErrorText(null);
        } else{
            setEmailErrorText('Invalid email address');
        }
    }

    const validateInputFields = () => {
        return(!email || !password || emailErrorText);
    }

    return (
        <View style={styles.container}>
            <View style={{flex:1}}>
                <ScrollView showsVerticalScrollIndicator={false}
                            style={{flex: 1}}>
                    <View style={styles.logoContainer}>
                        <Image source={logo} style={styles.logo} resizeMode={"contain"} />
                    </View>

                    <View>
                        <Text style={styles.signInTxt}>Welcome Back!</Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <TextField
                            height={dimensions.heightLevel4}
                            placeholder={'Email'}
                            value={email}
                            onChangeText={useCallback((text) => {
                                setEmail(text);
                                validateEmail(text);
                            }, [email])}
                            errorText={emailErrorText}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextField
                        height={dimensions.heightLevel4}
                        placeholder={'Password'}
                        isPassword
                        onChangeText={useCallback((text) => {
                            setPassword(text)
                        }, [password])}
                        />
                    </View>

                    {/*<View style={{height:dimensions.heightLevel1}}></View>*/}
                    <TouchableOpacity
                        onPress={() => Actions.navigate(RouteNames.REGISTER_SCREEN)}
                        style={styles.fpContainer}>
                        <Text style={styles.forgotPassword}>Forgot Password ?</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            <View style={{padding:dimensions.heightLevel1}}>
                <View style={styles.bottomContainer}>
                    <Text style={styles.footerTxt}>Don’t have an account? </Text>
                    <TouchableOpacity onPress={() => Actions.reset(RouteNames.REGISTER_SCREEN)}>
                        <Text style={styles.footerBtn}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <ButtonField
                    buttonHeight={dimensions.heightLevel4}
                    label={'Sign In'}
                    labelColor={colors.white}
                    disabled={validateInputFields()}
                    onPress={useCallback(onLogin, [email, password])}
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
        marginTop:dimensions.heightLevel2,
        alignItems: "center",
    },
    logo: {
        height: dimensions.fullHeight * 18/100,
        marginBottom:dimensions.heightLevel3,
    },
    signInTxt: {
        textAlign: "center",
        fontFamily: fontFamilies.RobotoBold,
        fontSize: fontSizes.fontXXXLarge,
        color: colors.white,
        marginVertical: dimensions.heightLevel2,
    },
    inputContainer:{
        marginTop:dimensions.heightLevel1,
        paddingHorizontal:dimensions.heightLevel1,
    },
    bottomContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom:dimensions.heightLevel1/2,
    },
    footerBtn: {
        color: colors.primary,
        fontFamily: fontFamilies.RobotoBold,
        fontSize: fontSizes.fontMidMedium,
    },
    footerTxt: {
        fontSize: fontSizes.fontMidMedium,
        color: colors.white,
    },
    fpContainer: {
        marginTop: dimensions.heightLevel1 / 4,
        // paddingVertical: dimensions.heightLevel1 / 3,
        paddingRight: dimensions.heightLevel1,
        alignSelf: 'flex-end'
    },

    forgotPassword: {
        color: colors.primary,
        fontSize: fontSizes.fontXMedium,
        fontFamily: fontFamilies.RobotoRegular

    },

})

export default LoginScreen;