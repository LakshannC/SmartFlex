import {StyleSheet, Text, View} from "react-native";

const SplashScreen = ({ navigation }) => {

    return(
       <View style={styles.container}>
          <Text style={styles.header}>
              Yoh... GYM APP
          </Text>
       </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default SplashScreen;