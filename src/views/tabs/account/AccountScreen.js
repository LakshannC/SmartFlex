import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {AppData, colors, dimensions, fontFamilies, fontSizes} from "../../../configuration/constants";
import ButtonField from "../../../components/ButtonField";
import React, {useEffect, useState} from "react";
import * as Actions from "../../../navigation/NavActions";
import {RouteNames} from "../../../navigation/AppRoutes";
import {expireUserSession} from "../../../service/networkRequests/authRequests";
import {getUserDetailsRequest} from "../../../service/networkRequests/userRequests";
import {getAppTokens} from "../../../util/asyncStorageActions";
import NavigationBar from "../../../components/NavigationBar";

const nextIcon = require('../../../assets/images/icon_right_arrow.webp');
const logo = require('../../../assets/images/image_logo.webp');
const AccountScreen = ({navigation}) => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();


    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        return navigation.addListener('focus', async () => {
            const {accessToken} = await getAppTokens();
            if (accessToken) {
                await fetchUserDetails();
                setIsLogin(true);
            }

        });
    }, [navigation]);

    const fetchUserDetails = async () => {
        const result = await getUserDetailsRequest();
        if (result) {
            const fullName = result?.data?.data?.firstName + " " + result?.data?.data?.lastName;
            setName(fullName);
            setEmail(result?.data?.data?.email ?? '');
        }
    };


    const onSignOut = async () => {
        await expireUserSession(false, false);
        Actions.reset(RouteNames.WELCOME_SCREEN);
    }

    return (

        <View style={styles.container}>
            <NavigationBar
                title={'My Account'}
                hideBackButton
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {
                    isLogin &&
                    <>
                        <View style={styles.dpText}>
                            <Text style={styles.dpName}>{name}</Text>
                            <Text style={styles.dpEmail}>{email}</Text>
                        </View>

                        <View style={styles.personalContainer}>
                            <TouchableOpacity
                                onPress={() => Actions.navigate(RouteNames.USER_PROFILE_SCREEN)}
                                activeOpacity={0.6}
                                style={styles.box}>
                                <Text style={styles.myProfileText}>My Profile</Text>
                                <Image source={nextIcon} resizeMode={'contain'} style={styles.next}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                style={styles.box}>
                                <Text style={styles.myProfileText}>Change Password</Text>
                                <Image source={nextIcon} resizeMode={'contain'} style={styles.next}/>
                            </TouchableOpacity>
                        </View>



                    </>
                }

                {
                    !isLogin &&
                    <>
                        <View style={{height: dimensions.heightLevel2}}></View>

                        <View style={styles.companyContainer}>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                style={styles.box}
                                onPress={() => Actions.reset(RouteNames.LOGIN_SCREEN)}
                            >
                                <Text style={styles.myProfileText}>Login</Text>
                                <Image source={nextIcon} resizeMode={'contain'} style={styles.next}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                style={styles.box}
                                onPress={() => Actions.reset(RouteNames.REGISTER_SCREEN)}
                            >
                                <Text style={styles.myProfileText}>Register</Text>
                                <Image source={nextIcon} resizeMode={'contain'} style={styles.next}/>
                            </TouchableOpacity>
                        </View>
                    </>
                }

                {
                    isLogin &&
                    <View style={styles.accSignOutBtn}>
                        <ButtonField
                            buttonHeight={dimensions.heightLevel4}
                            label={'Sign Out'}
                            labelColor={colors.white}
                            onPress={() => onSignOut()}
                        />
                    </View>
                }

            </ScrollView>
            <View style={styles.accFooterContainer}>
                <Image source={logo} style={styles.footerLogo} resizeMode={'contain'}/>
                <Text style={styles.accFooterText}>Version {AppData.VERSION}</Text>
                <Text style={styles.accFooterText}>2025 SmartFlex</Text>
                <Text style={styles.accFooterText}>All rights reserved</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
    },

    dpText: {
        alignItems: 'center',
        marginTop:dimensions.heightLevel3,
    },
    dpName: {
        fontSize: fontSizes.fontMedium,
        color: colors.white,
        paddingHorizontal: dimensions.heightLevel1,
        fontFamily: fontFamilies.RobotoBold,
    },
    dpEmail: {
        fontSize: fontSizes.fontMedium,
        color: colors.white,
        fontFamily: fontFamilies.RobotoRegular,
    },
    personalContainer: {
        marginTop: dimensions.heightLevel2,
    },
    box: {
        marginTop: 2,
        backgroundColor: colors.txtField,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        paddingHorizontal: dimensions.heightLevel1 / 2,
        height: dimensions.heightLevel3,
    },
    myProfileText: {
        fontFamily: fontFamilies.RobotoMedium,
        fontSize: fontSizes.fontMedium,
        color: colors.white,

    },

    companyContainer: {
        marginTop: dimensions.heightLevel1,
    },
    accSignOutBtn: {
        marginTop: dimensions.heightLevel3,
        paddingHorizontal: dimensions.heightLevel1,
    },
    accFooterContainer: {
        marginTop: dimensions.heightLevel2,
        marginBottom: dimensions.heightLevel3,
        alignItems: "center",
    },
    footerLogo: {
        height: dimensions.fullHeight * 10 / 100,
        marginBottom: 2,
    },
    accFooterText: {
        color: colors.white,
        fontSize: fontSizes.fontSmall,

    },
    next: {
        width: dimensions.fullWidth * 5.5 / 100,
        height: dimensions.fullWidth * 5.5 / 100,
    }

});

export default AccountScreen;
