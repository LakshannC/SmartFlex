import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {AppRoutes, RouteNames} from "../AppRoutes";
import {screenOptions} from "../NavigationBody";
import CustomTabBar from "./CustomTabBar";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TabNavigation = () => {
    const tabs = AppRoutes.find(route => route.key === RouteNames.TAB_SCREEN).tabs;
    return (
        <Tab.Navigator
            screenOptions={screenOptions}
            tabBar={props => <CustomTabBar {...props}/>}
        >
            {
                AppRoutes.find(route => route.key === RouteNames.TAB_SCREEN)?.tabs?.map((tab, tabIndex) => (
                    <Tab.Screen
                        key={tabIndex}
                        name={tab.key}
                    >
                        {
                            props =>
                                <Stack.Navigator
                                    {...props}
                                    screenOptions={screenOptions}
                                >
                                    {
                                        tab?.stack?.map((stack, stackIndex) => (
                                            <Stack.Screen
                                                key={tabIndex + '_' + stackIndex}
                                                name={stack.key}
                                                component={stack.component}
                                            />
                                        ))
                                    }
                                </Stack.Navigator>
                        }
                    </Tab.Screen>
                ))
            }
        </Tab.Navigator>
    )
}
export default TabNavigation;
