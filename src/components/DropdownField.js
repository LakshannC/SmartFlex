import {memo, useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {colors, dimensions, fontFamilies, fontSizes} from "../configuration/constants";
import {Dropdown} from "react-native-element-dropdown";

const DropdownField = ({
                           label,
                           value,
                           data = [],
                           onChange,
                           bgColor,
                           errorText,
                           isSearch,
                           placeholder,
                           disableModalView
                       }) => {

    const labelTxtColor = colors.white;
    const backgroundColor = bgColor ?? colors.txtField;
    // const paddingVertical = isSearch ? 0 : dimensions.heightLevel1 / 2;
    const paddingVertical = dimensions.heightLevel1 / 2;
    const borderColor = errorText ? colors.danger : colors.txtField;
    const errorTextPaddingHr = 0;

    const [selectedValue, setSelectedValue] = useState();
    const [fieldData, setFieldData] = useState([]);

    useEffect(() => {
        setSelectedValue(value);
    }, [value])

    useEffect(() => {
        if (data && data.length > 0) {
            const list = [];
            data.map((item) => {
                if (typeof item !== 'object') {
                    list.push({
                        value: item,
                        label: String(item)
                    });
                } else {
                    list.push(item);
                }
            });
            setFieldData(list);
        } else {
            setFieldData([]);
        }
    }, [data])

    return (
        <View style={{width: '100%'}}>
            {
                label &&
                <Text style={styles.label}>{label}</Text>
            }
            <View style={[styles.fieldContainer, {backgroundColor, paddingVertical, borderColor}]}>
                <Dropdown
                    mode={disableModalView ? 'default' : 'modal'}
                    style={styles.dropdown}
                    placeholderStyle={[styles.textStyle, {color: colors.white}]}
                    selectedTextStyle={styles.textStyle}
                    inputSearchStyle={styles.textStyle}
                    itemTextStyle={styles.textStyle}
                    data={fieldData}
                    labelField='label'
                    valueField='value'
                    value={selectedValue}
                    onChange={onChange}
                    search={isSearch}
                    placeholder={placeholder}
                    searchPlaceholder={'Search...'}
                    maxHeight={dimensions.fullHeight * 60 / 100}
                    containerStyle={{
                        backgroundColor: colors.txtField,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: colors.txtField
                    }}
                    activeColor={colors.black}
                />
            </View>

            {
                errorText &&
                <Text
                    style={[styles.errorText, {paddingHorizontal: errorTextPaddingHr}]}>{errorText}</Text>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        width: '100%',
        color: colors.white,
        fontFamily: fontFamilies.RobotoRegular,
        fontSize: fontSizes.fontMidMedium,
    },
    fieldContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: dimensions.heightLevel1 / 2,
        paddingHorizontal: dimensions.heightLevel2 / 2,
        borderRadius: 10,
        borderWidth: 1
    },
    dropdown: {
        flex: 1,
        height: dimensions.fullHeight * 5 / 100,
        color: colors.white,
        fontFamily: fontFamilies.RobotoRegular,
        fontSize: fontSizes.fontMediumPlus,
        marginHorizontal: dimensions.heightLevel1 / 4,
    },
    errorText: {
        color: colors.danger,
        fontFamily: fontFamilies.RobotoRegular,
        fontSize: fontSizes.fontMediumPlus,
        marginTop: dimensions.heightLevel1 / 3
    },
    textStyle: {
        color: colors.white,
        fontFamily: fontFamilies.RobotoRegular,
        fontSize: fontSizes.fontMediumPlus,
    },
    selected:{
        color: colors.black,
        fontFamily: fontFamilies.RobotoRegular,
        fontSize: fontSizes.fontMediumPlus,
    }
})

export default memo(DropdownField);
