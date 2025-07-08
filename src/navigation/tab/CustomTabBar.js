import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
    colors,
    dimensions,
    fontFamilies,
    fontSizes,
} from '../../configuration/constants';
import {AppRoutes, RouteNames} from '../AppRoutes';
import * as Actions from '../../navigation/NavActions';

const newPlan = require('../../assets/images/icon_add.webp');

const CustomTabBar = ({navigation}) => {
    const onNavigate = (screen, isFocused) => {
        if (!isFocused) navigation.navigate(screen);
    };

    const TabContainer = ({children}) => (
        <View style={styles.tabContainer}>{children}</View>
    );
    const LEFT_UI = [];
    const RIGHT_UI = [];
    return (
        <View style={{width: '100%', alignItems: 'center', ...styles.shadows}}>
            <View style={styles.container}>
                {AppRoutes.find(
                    tabRoute => tabRoute.key === RouteNames.TAB_SCREEN,
                )?.tabs?.map((tab, index) => {
                    const isFocused = navigation.getState().index === index;
                    let UI = [];
                    {
                        index <= 1
                            ? LEFT_UI.push(
                                <TouchableOpacity
                                    key={index}
                                    style={{alignItems: 'center'}}
                                    onPress={() => onNavigate(tab.key, isFocused)}>
                                    <Image
                                        style={styles.tabIcon}
                                        source={isFocused ? tab.activeIcon : tab.inactiveIcon}
                                        resizeMode={'contain'}
                                    />
                                    <Text
                                        style={[
                                            styles.tabText,
                                            {color: isFocused ? colors.primary : colors.white},
                                        ]}>
                                        {tab.name}
                                    </Text>
                                </TouchableOpacity>,
                            )
                            : RIGHT_UI.push(
                                <TouchableOpacity
                                    key={index}
                                    style={{alignItems: 'center'}}
                                    onPress={() => onNavigate(tab.key, isFocused)}>
                                    <Image
                                        style={styles.tabIcon}
                                        source={isFocused ? tab.activeIcon : tab.inactiveIcon}
                                        resizeMode={'contain'}
                                    />
                                    <Text
                                        style={[
                                            styles.tabText,
                                            {color: isFocused ? colors.primary : colors.white},
                                        ]}>
                                        {tab.name}
                                    </Text>
                                </TouchableOpacity>,
                            );
                    }

                    {
                        index === 1 &&
                        UI.push(<TabContainer key={'LEFT_CONT'}>{LEFT_UI}</TabContainer>);
                    }
                    {
                        index === 1 &&
                        UI.push(
                            <TouchableOpacity
                                key={'add_ico'}
                                style={{alignItems: 'center'}}
                                onPress={() => Actions.navigate(RouteNames.LOGIN_SCREEN)}>
                                <Image
                                    source={newPlan}
                                    style={styles.addIcon}
                                    resizeMode={'contain'}
                                />
                            </TouchableOpacity>,
                        );
                    }
                    {
                        index === 3 &&
                        UI.push(
                            <TabContainer key={'RIGHT_CONT'}>{RIGHT_UI}</TabContainer>,
                        );
                    }
                    return UI;
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: colors.appBackground,
        paddingBottom: 5,
        paddingTop: dimensions.heightLevel3/3,
        paddingHorizontal: (dimensions.fullWidth * 2) / 100,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderColor: colors.lightGray,
        // justifyContent:'center'
    },
    tabIcon: {
        width: 30,
        height: 30,
    },
    tabText: {
        fontFamily: fontFamilies.RobotoMedium,
        fontSize: fontSizes.fontSmall,
        marginTop: 6,
    },
    addIconContainer: {
        position: 'relative',
        width: 55,
        height: 55,
    },
    addIcon: {
        width: (dimensions.fullWidth * 13) / 100,
        height: (dimensions.fullWidth * 13) / 100,
        marginHorizontal: (dimensions.fullWidth * 1) / 100,
    },
    tabContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',

    },
    shadows: {
        shadowColor: '#000000',
        shadowOpacity: 0.6,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default CustomTabBar;
