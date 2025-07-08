import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppContent from './src/views/AppContent';
import {store} from './src/redux/store/store';

function App() {
    // const isDarkMode = useColorScheme() === 'dark';

    return (
        // <View style={styles.container}>
        //     <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        //     <Text style={styles.text}>Welcome to SmartFlex!</Text>
        // </View>
        <GestureHandlerRootView style={{flex: 1}}>
            <Provider store={store}>
                <SafeAreaProvider>
                    <AppContent />
                </SafeAreaProvider>
            </Provider>
        </GestureHandlerRootView>
    );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#fff',
//     },
//     text: {
//         fontSize: 20,
//         fontWeight: '600',
//     },
// });

export default App;
