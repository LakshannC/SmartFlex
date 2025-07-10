import {ActivityIndicator, Image, StyleSheet, View} from "react-native";
import {colors, dimensions} from "../../configuration/constants";
import {useEffect} from "react";
import * as Actions from "../../navigation/NavActions";
import {RouteNames} from "../../navigation/AppRoutes";
import {setupGlobalStorageData} from "../../util/globalStorageActions";
import {getAppTokens} from "../../util/asyncStorageActions";
import {expireUserSession} from "../../service/networkRequests/authRequests";
import {getUserDetailsRequest} from "../../service/networkRequests/userRequests";

const logo = require('../../assets/images/image_logo.webp');
const SplashScreen = ({navigation}) => {

    useEffect(() => {
        return navigation.addListener('focus', () => {
            initAppData();
        });
    }, [navigation])

    const initAppData = async () => {
        await setupGlobalStorageData();
        const {accessToken, refreshToken} = await getAppTokens();
        setTimeout(async () => {
            if (accessToken && refreshToken) {
                console.log(accessToken);
                const result = await getUserDetailsRequest();
                if (result) {
                    Actions.reset(RouteNames.TAB_SCREEN);

                } else {
                    await expireUserSession(true, false);
                    Actions.reset(RouteNames.WELCOME_SCREEN);
                }

            } else {
                await expireUserSession(true, false);
                Actions.reset(RouteNames.WELCOME_SCREEN);
            }
        }, 2000);
    }

    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} resizeMode={'contain'}/>
            {/*<ActivityIndicator size={'large'} color={colors.primary}/>*/}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        height: dimensions.fullHeight * 18 / 100,
        marginBottom: dimensions.heightLevel3
    }
})

export default SplashScreen;
