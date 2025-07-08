import {ActivityIndicator, StyleSheet, View, Animated, Easing, Image} from "react-native";
import {colors} from "../configuration/constants";

const Loader = ({isLoading}) => {
    const spinValue = new Animated.Value(0);

    Animated.loop(
        Animated.timing(
            spinValue,
            {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true
            }
        )
    ).start();

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    const pulse = spinValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 1.2, 1]
    });

    if (!isLoading) return null;

    return (
        <View style={styles.container}>
            <View style={styles.loaderContainer}>
                <Animated.View style={[styles.dumbbellContainer, {transform: [{rotate: spin}]}]}>
                    <View style={styles.dumbbellBar} />
                    <View style={styles.dumbbellWeightLeft} />
                    <View style={styles.dumbbellWeightRight} />
                </Animated.View>

                <Animated.Text style={[styles.loadingText, {transform: [{scale: pulse}]}]}>
                    Lifting Your Data...
                </Animated.Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        zIndex: 1000
    },
    loaderContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    dumbbellContainer: {
        width: 120,
        height: 40,
        position: 'relative',
        marginBottom: 30
    },
    dumbbellBar: {
        position: 'absolute',
        left: 30,
        top: 15,
        width: 60,
        height: 10,
        backgroundColor: colors.primary,
        borderRadius: 5
    },
    dumbbellWeightLeft: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 30,
        height: 40,
        backgroundColor: colors.secondary,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: colors.primary
    },
    dumbbellWeightRight: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: 30,
        height: 40,
        backgroundColor: colors.secondary,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: colors.primary
    },
    loadingText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.gray,
        marginTop: 20
    }
});

export default Loader;