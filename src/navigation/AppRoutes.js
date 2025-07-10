import SplashScreen from "../views/stack/SplashScreen";
import WelcomeScreen from "../views/stack/WelcomeScreen";
import LoginScreen from "../views/stack/LoginScreen";
import RegisterScreen from "../views/stack/RegisterScreen";
import TabNavigation from "./tab/TabNavigation";
import HomeScreen from "../views/tabs/home/HomeScreen";
import PlanScreen from "../views/tabs/plan/PlanScreen";
import TipsScreen from "../views/tabs/tips/TipsScreen";
import AccountScreen from "../views/tabs/account/AccountScreen";
import GenderSelectionScreen from "../views/stack/GenderSelectionScreen";
import HeightSelectionScreen from "../views/stack/HeightSelectionScreen";
import WeightSelectionScreen from "../views/stack/WeightSelectionScreen";
import GoalSelectionScreen from "../views/stack/GoalSelectionScreen";
import PhysicalLevelSelectionScreen from "../views/stack/PhysicalLevelSelectionScreen";
import UserProfileScreen from "../views/tabs/account/UserProfileScreen";
import AgeSelectionScreen from "../views/stack/AgeSelectionScreen";
import WeightGoalSelectionScreen from "../views/stack/WeightGoalSelectionScreen";
import PlanConfirmationScreen from "../views/stack/PlanConfirmationScreen";

const HomeActiveIcon = require('../assets/images/tabs/icon_home_active.webp');
const HomeInactiveIcon = require('../assets/images/tabs/icon_home_inactive.webp');
const PlanActiveIcon = require('../assets/images/tabs/icon_plan_active.webp');
const PlanInactiveIcon = require('../assets/images/tabs/icon_plan_inactive.webp');
const TipsActiveIcon = require('../assets/images/tabs/icon_tips_active.webp');
const TipsInactiveIcon = require('../assets/images/tabs/icon_tips_inactive.webp');
const AccountActiveIcon = require('../assets/images/tabs/icon_account_active.webp');
const AccountInactiveIcon = require('../assets/images/tabs/icon_account_inactive.webp');


export const RouteNames ={
    SPLASH_SCREEN: 'SPLASH_SCREEN',
    WELCOME_SCREEN: 'WELCOME_SCREEN',
    LOGIN_SCREEN: 'LOGIN_SCREEN',
    REGISTER_SCREEN: 'REGISTER_SCREEN',

    GENDER_SELECTION_SCREEN: 'GENDER_SELECTION_SCREEN',
    AGE_SELECTION_SCREEN: 'AGE_SELECTION_SCREEN',
    HEIGHT_SELECTION_SCREEN: 'HEIGHT_SELECTION_SCREEN',
    WEIGHT_SELECTION_SCREEN: 'WEIGHT_SELECTION_SCREEN',
    WEIGHT_GOAL_SELECTION_SCREEN: 'WEIGHT_GOAL_SELECTION_SCREEN',
    PLAN_CONFIRMATION_SCREEN: 'PLAN_CONFIRMATION_SCREEN',
    GOAL_SELECTION_SCREEN: 'GOAL_SELECTION_SCREEN',
    PHYSICAL_LEVEL_SELECTION_SCREEN: 'PHYSICAL_LEVEL_SELECTION_SCREEN',

    TAB_SCREEN: 'TAB_SCREEN',

    HOME_TAB: 'HOME_TAB',
    HOME_SCREEN: 'HOME_SCREEN',

    PLAN_TAB: 'PLAN_TAB',
    PLAN_SCREEN: 'PLAN_SCREEN',

    TIPS_TAB: 'TIPS_TAB',
    TIPS_SCREEN: 'TIPS_SCREEN',

    ACCOUNT_TAB: 'ACCOUNT_TAB',
    ACCOUNT_SCREEN: 'ACCOUNT_SCREEN',
    USER_PROFILE_SCREEN: 'USER_PROFILE_SCREEN',

};

export const AppRoutes = [
    {
        key: RouteNames.SPLASH_SCREEN,
        component: SplashScreen,
    },
    {
        key: RouteNames.WELCOME_SCREEN,
        component: WelcomeScreen,
    },
    {
        key: RouteNames.LOGIN_SCREEN,
        component: LoginScreen,
    },
    {
        key: RouteNames.REGISTER_SCREEN,
        component: RegisterScreen,
    },
    {
        key: RouteNames.GENDER_SELECTION_SCREEN,
        component: GenderSelectionScreen,
    },
    {
        key: RouteNames.AGE_SELECTION_SCREEN,
        component: AgeSelectionScreen,
    },
    {
        key: RouteNames.HEIGHT_SELECTION_SCREEN,
        component:HeightSelectionScreen,
    },
    {
        key: RouteNames.WEIGHT_SELECTION_SCREEN,
        component:WeightSelectionScreen,
    },
    {
        key: RouteNames.WEIGHT_GOAL_SELECTION_SCREEN,
        component:WeightGoalSelectionScreen,
    },
    {
        key: RouteNames.PLAN_CONFIRMATION_SCREEN,
        component:PlanConfirmationScreen,
    },
    {
        key: RouteNames.GOAL_SELECTION_SCREEN,
        component: GoalSelectionScreen,
    },
    {
        key: RouteNames.PHYSICAL_LEVEL_SELECTION_SCREEN,
        component: PhysicalLevelSelectionScreen,
    },
    {
        key: RouteNames.TAB_SCREEN,
        component: TabNavigation,
        tabs: [
            {
                key: RouteNames.HOME_TAB,
                activeIcon: HomeActiveIcon,
                inactiveIcon: HomeInactiveIcon,
                name: 'Home',
                stack: [
                    {
                        key: RouteNames.HOME_SCREEN,
                        component: HomeScreen,
                    },
                ],
            },
            {
                key: RouteNames.PLAN_TAB,
                activeIcon: PlanActiveIcon,
                inactiveIcon: PlanInactiveIcon,
                name: 'Plan',
                stack: [
                    {
                        key: RouteNames.PLAN_SCREEN,
                        component: PlanScreen,
                    },
                ],
            },
            {
                key: RouteNames.TIPS_TAB,
                activeIcon: TipsActiveIcon,
                inactiveIcon: TipsInactiveIcon,
                name: 'Tips',
                stack: [
                    {
                        key: RouteNames.TIPS_SCREEN,
                        component: TipsScreen,
                    },
                ],
            },
            {
                key: RouteNames.ACCOUNT_TAB,
                activeIcon: AccountActiveIcon,
                inactiveIcon: AccountInactiveIcon,
                name: 'Account',
                stack: [
                    {
                        key: RouteNames.ACCOUNT_SCREEN,
                        component: AccountScreen,
                    },
                    {
                        key: RouteNames.USER_PROFILE_SCREEN,
                        component: UserProfileScreen,
                    },

                ],
            },
        ],
    },
]