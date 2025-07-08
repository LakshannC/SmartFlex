import {memo} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors, dimensions, fontFamilies, fontSizes} from "../configuration/constants";
import * as Actions from "../navigation/NavActions";

const arrow = require('../assets/images/icon_left_arrow_2.webp');
const NavigationBar = ({title, hideBackButton, actionIcon, onAction}) => {
    return (
        <View style={styles.container}>
            {
                hideBackButton ?
                    <View style={styles.spaceBox}></View>
                    :
                    <TouchableOpacity onPress={() => Actions.goBack()}>
                        <Image source={arrow} style={styles.backIcon} resizeMode={'contain'}/>
                    </TouchableOpacity>
            }

            <Text style={styles.title}>{title ?? ''}</Text>
            {
                actionIcon ?
                    <TouchableOpacity onPress={onAction}>
                        <Image source={actionIcon} style={styles.actionIcon} resizeMode={'contain'}/>
                    </TouchableOpacity>
                    :
                    <View style={styles.spaceBox}></View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: dimensions.heightLevel1 / 3
    },
    backIcon: {
        width: dimensions.fullWidth * 6 / 100,
        height: dimensions.fullWidth * 6 / 100,
    },
    actionIcon: {
        width: dimensions.fullWidth * 6 / 100,
        height: dimensions.fullWidth * 6 / 100,
    },
    title: {
        flex: 1,
        fontFamily: fontFamilies.RobotoRegular,
        fontSize: fontSizes.fontXXLarge,
        color: colors.black,
        textAlign: 'center',
        paddingHorizontal: 8,
    },
    spaceBox: {
        width: dimensions.fullWidth * 6 / 100,
        height: dimensions.fullWidth * 6 / 100,
    }
})

export default memo(NavigationBar);
