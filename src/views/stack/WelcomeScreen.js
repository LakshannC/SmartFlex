import {Image, StyleSheet, Text, View} from "react-native";
import {colors, dimensions, fontFamilies, fontSizes} from "../../configuration/constants";

import logo from "../../assets/images/image_logo.webp";
import ButtonField from "../../components/ButtonField";
import {RouteNames} from "../../navigation/AppRoutes";
import * as Actions from "../../navigation/NavActions";


const WelcomeScreen= ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>

                <Image source={logo} resizeMode={'contain'} style={styles.logo}/>

                <Text style={styles.title}>
                    The World's Leading Fitness App.
                    <Text style={{color: colors.danger}}> Train, Track, Transform !</Text>
                </Text>

            </View>

            <View style={styles.bottomContainer}>
                <Text style={styles.description}>
                    All-In-One Fitness App. Build Strength, Burn Fat, Stay Motivated.
                </Text>

                <View style={styles.btnContainer}>
                    <ButtonField
                        buttonHeight={dimensions.heightLevel4}
                        label={'Next'}
                        labelColor={colors.white}
                        onPress={() => Actions.navigate(RouteNames.LOGIN_SCREEN)}
                    />
                </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        alignItems: 'center',
    },
    innerContainer:{
        flex: 2,
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    logo: {
        height: dimensions.fullHeight * 18 / 100,
        marginBottom: dimensions.heightLevel4
    },
    title: {
        color: colors.white,
        fontFamily: fontFamilies.RobotoBold,
        fontSize: fontSizes.fontXXXXLarge,
        textAlign: 'center',
        marginBottom: dimensions.heightLevel2,
        paddingHorizontal: dimensions.heightLevel2
    },
    bottomContainer: {
        flex: 1,
        width:'100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background,
        borderTopRightRadius: dimensions.heightLevel1,
        borderTopLeftRadius: dimensions.heightLevel1,
    },
    btnContainer:{
      width: '95%',
    },
    description: {
        color: colors.white,
        fontFamily: fontFamilies.RobotoRegular,
        fontSize: fontSizes.fontXLarge,
        textAlign: 'center',
        paddingHorizontal: dimensions.heightLevel1,
        marginBottom: dimensions.heightLevel3,
    },
})

export default WelcomeScreen;