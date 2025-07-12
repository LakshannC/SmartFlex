import React, { useState, useEffect, memo } from "react";
import { View, Image, StyleSheet, Animated } from "react-native";
import {dimensions} from "../../configuration/constants";

const Carousel = ({ images, interval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const fadeAnim = new Animated.Value(1);

    useEffect(() => {
        const timer = setInterval(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }).start(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
                fadeAnim.setValue(1);
            });
        }, interval);

        return () => clearInterval(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View
                style={{
                    ...styles.imageContainer,
                    opacity: fadeAnim,
                }}
            >
                <Image
                    source={images[currentIndex]}
                    style={styles.image}
                    resizeMode="cover"
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: dimensions.fullHeight * 0.30,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        overflow: 'hidden',
    },
    imageContainer: {
        width: '100%',
        height: '100%',
    },
    image: {
        width: "100%",
        height: "100%",
    },
});

export default memo(Carousel);
