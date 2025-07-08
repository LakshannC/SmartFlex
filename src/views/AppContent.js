import {StatusBar, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {colors} from '../configuration/constants';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '../navigation/NavActions';
import NavigationBody from '../navigation/NavigationBody';
import Loader from '../components/Loader';


const AppContent = () => {
    const removeTopSafeArea = useSelector(
        state => state.safeAreaReducer.removeTopSafeArea,
    );
    const safeAreaColor = useSelector(state => state.safeAreaReducer.color);
    const isNetworkRequestProcessing = useSelector(
        state => state.commonReducer.isNetworkRequestProcessing,
    );

    const insets = useSafeAreaInsets();
    const {top, bottom} = insets;

    const BodyContent = (
        <>
            <StatusBar
                barStyle={'dark-content'}
                translucent={removeTopSafeArea}
                backgroundColor={removeTopSafeArea ? colors.transparent : safeAreaColor}
            />
            <NavigationContainer ref={navigationRef}>
                <NavigationBody />
            </NavigationContainer>
        </>
    );

    return (
        <View style={{flex: 1}}>
            {!removeTopSafeArea && (
                <View
                    style={{
                        width: '100%',
                        height: top,
                        backgroundColor: safeAreaColor,
                    }}></View>
            )}
            {BodyContent}
            <View
                style={{
                    width: '100%',
                    height: bottom,
                    backgroundColor: safeAreaColor,
                }}></View>
            <Loader isLoading={isNetworkRequestProcessing} />
        </View>
    );
};

export default AppContent;
