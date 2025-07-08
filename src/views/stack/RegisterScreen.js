import {Image,  ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";

import {colors, dimensions, fontFamilies, fontSizes} from "../../configuration/constants";
import ButtonField from "../../components/ButtonField";
import * as Actions from "../../navigation/NavActions";
import {RouteNames} from "../../navigation/AppRoutes";
import TextField from "../../components/TextField";
import logo from "../../assets/images/image_logo.webp";

const RegisterScreen = ({navigation}) => {

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
                            placeholder="Enter your full name"
                            height={dimensions.heightLevel4}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextField
                            placeholder="Enter your email"
                            height={dimensions.heightLevel4}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextField
                            placeholder="Enter password"
                            isPassword
                            height={dimensions.heightLevel4}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextField
                            placeholder="Confirm password"
                            isPassword
                            height={dimensions.heightLevel4}
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
                        onPress={()=> Actions.navigate(RouteNames.LOGIN_SCREEN)}
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
