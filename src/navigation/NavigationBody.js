import {createStackNavigator} from "@react-navigation/stack";
import {colors} from "../configuration/constants";
import {AppRoutes, RouteNames} from "./AppRoutes";

const Stack = createStackNavigator();

export const screenOptions = {
    headerShown: false,
    cardStyle: {backgroundColor: colors.appBackground},

}

const NavigationBody = () => {
    return (
        <Stack.Navigator screenOptions={screenOptions} initialRouteName={RouteNames.WELCOME_SCREEN}>
            {
                AppRoutes.map((route, index) => (
                    <Stack.Screen name={route.key} component={route.component} key={index}/>
                ))
            }
        </Stack.Navigator>
    )
}
export default NavigationBody;
