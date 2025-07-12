import {memo} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors, dimensions, fontFamilies, fontSizes} from "../../configuration/constants";

export const CATEGORY_VIEW_LAYOUT = {
    ROUNDED: 'rounded',
    SQUARE: 'square'
}
const MiniCard = ({id, name, icon, onSelect, layout = CATEGORY_VIEW_LAYOUT.ROUNDED}) => {

    const borderRadius = layout === CATEGORY_VIEW_LAYOUT.ROUNDED ? 100 : 15;
    const containerPadding = layout === CATEGORY_VIEW_LAYOUT.ROUNDED ? 15 : 5;
    const iconMargin = layout === CATEGORY_VIEW_LAYOUT.ROUNDED ? 3 : 5;

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.iconContainer, {borderRadius, padding: containerPadding}]}
                onPress={onSelect}
            >
                {
                    icon &&
                    <Image source={icon} resizeMode={'contain'} style={[styles.icon, {margin: iconMargin}]}/>
                }
                {
                    name && layout === CATEGORY_VIEW_LAYOUT.SQUARE &&
                    <Text style={styles.name2}>{name}</Text>
                }
            </TouchableOpacity>
            {
                name && layout === CATEGORY_VIEW_LAYOUT.ROUNDED &&
                <Text style={styles.name}>{name}</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: dimensions.heightLevel1,
    },
    iconContainer: {
        flex: 1,
        width: dimensions.fullWidth * 20 / 100,
        height: dimensions.fullWidth * 20 / 100,
        backgroundColor: colors.txtField,
        alignItems: 'center',
    },
    icon: {
        flex: 1,
        width: '100%',
    },
    name: {
        marginTop: 5,
        fontFamily: fontFamilies.RobotoMedium,
        fontSize: fontSizes.fontSmallPlus,
        color: colors.white,
        textAlign: 'center'
    },
    name2: {
        width: '100%',
        fontFamily: fontFamilies.RobotoBold,
        fontSize: fontSizes.fontSmall,
        color: colors.white,
        textAlign: 'center'
    }
})

export default memo(MiniCard);
