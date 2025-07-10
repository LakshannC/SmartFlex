// import {memo, useEffect, useRef, useState} from "react";
// import {colors, dimensions, fontFamilies, fontSizes} from "../configuration/constants";
// import {Image, StyleSheet, Text, View} from "react-native";
// import {Dropdown} from "react-native-element-dropdown";
//
// const dropdownIcon = require("../assets/images/icon_arrow_down.webp");
// const DropdownField = ({
//                            mode,
//                            data = [],
//                            label,
//                            value,
//                            onChange,
//                            placeholder,
//                            placeholderColor,
//                            themeColor,
//                            isSearch,
//                            enabled = true,
//                            required,
//                            errorText,
//                            renderItem,
//                            renderLeftIcon,
//                            disable,
//                            containerMarginTop = dimensions.heightLevel1 / 4,
//                        }) => {
//     const labelTextColor = colors.black;
//     const backgroundColor = enabled === false ? colors.lightGray :  colors.txtField;
//     const borderWidth = 1.5;
//     const borderColor = errorText ? colors.red : (themeColor ?? "#2F485880");
//     const ref = useRef();
//
//     const [isFocused, setIsFocused] = useState(false);
//
//     useEffect(()=>{
//         console.log("PLACEHOLDER :::::",placeholder);
//     },[placeholder])
//
//     return (
//         <View style={{width: "100%"}}>
//             {
//                 label &&
//                 <Text style={[styles.label, {color: labelTextColor}]}>
//                     {label}
//                     {
//                         required &&
//                         <Text style={styles.requiredMark}>{" *"}</Text>
//                     }
//                 </Text>
//             }
//
//             <View style={[styles.inputContainer, {
//                 backgroundColor,
//                 borderWidth,
//                 borderColor,
//                 marginTop: containerMarginTop
//             }]}>
//                 <Dropdown
//                     ref={ref}
//                     mode={mode}
//                     disable={disable}
//                     style={styles.input}
//                     placeholderStyle={{...styles.textStyle, color: placeholderColor ?? (themeColor ?? colors.white)}}
//                     selectedTextStyle={styles.textStyle}
//                     inputSearchStyle={styles.textStyle}
//                     itemTextStyle={styles.textStyle}
//                     placeholder={placeholder ?? "Select Item"}
//                     searchPlaceholder={"Search..."}
//                     data={data}
//                     value={value}
//                     labelField="label"
//                     valueField="value"
//                     onChange={onChange}
//                     search={isSearch}
//                     renderItem={renderItem}
//                     renderRightIcon={() => (
//                         <Image
//                             source={dropdownIcon}
//                             resizeMode={"contain"}
//                             style={{
//                                 ...styles.dropdownIcon,
//                                 transform: [{rotate: isFocused ? '180deg' : '0deg'}]
//                             }}
//                         />
//                     )}
//                     renderLeftIcon={renderLeftIcon}
//                     onFocus={() => setIsFocused(true)}
//                     onBlur={() => setIsFocused(false)}
//                     containerStyle={{
//                         maxHeight:dimensions.fullHeight*0.7
//                     }}
//                 />
//             </View>
//
//             {
//                 errorText &&
//                 <Text style={styles.error}>{errorText}</Text>
//             }
//
//         </View>
//     );
//
// };
//
// const styles = StyleSheet.create({
//     label: {
//         fontFamily: fontFamilies.RobotoRegular,
//         fontSize: fontSizes.fontXMedium,
//     },
//     requiredMark: {
//         color: colors.danger
//     },
//     inputContainer: {
//         flexDirection: "row",
//         width: "100%",
//         alignItems: "center",
//         borderRadius: 6,
//         // paddingEnd: dimensions.heightLevel1 / 2,
//     },
//     input: {
//         flex: 1,
//         fontFamily: fontFamilies.RobotoRegular,
//         fontSize: fontSizes.fontXMedium,
//         height: dimensions.fullHeight * 6.5 / 100,
//         color: colors.white,
//         paddingHorizontal: dimensions.heightLevel2,
//         borderRadius: 6,
//     },
//     placeholderStyle: {
//         color: colors.white,
//     },
//     selectedTextStyle: {
//         color: colors.white,
//     },
//     inputSearchStyle: {
//         color: colors.white,
//     },
//     textStyle: {
//         color: colors.white,
//         fontFamily: fontFamilies.RobotoRegular,
//         fontSize: fontSizes.fontMediumPlus,
//     },
//     error: {
//         fontFamily: fontFamilies.RobotoRegular,
//         fontSize: fontSizes.fontMediumPlus,
//         color: colors.danger,
//         marginTop: dimensions.fullHeight * 1 / 100,
//     },
//     dropdownIcon: {
//         width: dimensions.fullWidth * 5 / 100,
//         height: dimensions.fullWidth * 5 / 100,
//         marginEnd: dimensions.fullWidth * 3 / 100
//     }
// });
//
// export default memo(DropdownField);
import React, { memo, useState, useRef } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { colors, dimensions, fontFamilies, fontSizes } from "../configuration/constants";

const dropdownIcon = require("../assets/images/icon_arrow_down.webp");

const DropdownField = ({
                           data = [],
                           value,
                           onChange,
                           placeholder = "Select item",
                           label,
                           placeholderColor = colors.white,
                           themeColor,
                           errorText,
                           required = false,
                           isSearch = false,
                           containerMarginTop = dimensions.heightLevel1 / 4,
                           disable = false,
                       }) => {
    const [isFocused, setIsFocused] = useState(false);
    const ref = useRef();

    const borderColor = errorText
        ? colors.danger
        : isFocused
            ? colors.primary
            : themeColor ?? "#2F485880";

    const backgroundColor = disable ? colors.lightGray : colors.txtField;

    return (
        <View style={{ width: "100%" }}>
            {label && (
                <Text style={[styles.label]}>
                    {label}
                    {required && <Text style={styles.requiredMark}> *</Text>}
                </Text>
            )}

            <View
                style={[
                    styles.inputContainer,
                    {
                        backgroundColor,
                        borderColor,
                        marginTop: containerMarginTop,
                    },
                ]}
            >
                <Dropdown
                    ref={ref}
                    disable={disable}
                    data={data}
                    value={value}
                    style={styles.dropdown}
                    labelField="label"
                    valueField="value"
                    placeholder={placeholder}
                    placeholderStyle={[styles.text, { color: placeholderColor }]}
                    selectedTextStyle={styles.text}
                    itemTextStyle={styles.text}
                    inputSearchStyle={styles.text}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    search={isSearch}
                    onChange={(item) => onChange(item)}
                    containerStyle={{
                        maxHeight: dimensions.fullHeight * 0.6,
                        borderRadius: 6,
                        backgroundColor: colors.txtField,
                    }}
                    renderItem={(item, selected) => {
                        const isSelected = value === item.value;
                        return (
                            <View
                                style={{
                                    paddingHorizontal: dimensions.heightLevel2,
                                    paddingVertical: dimensions.heightLevel1/2,
                                    backgroundColor: isSelected ? colors.lightGray : colors.txtField,
                                }}
                            >
                                <Text style={{ color: colors.white }}>{item.label}</Text>
                            </View>
                        );
                    }}
                />
            </View>

            {errorText && <Text style={styles.errorText}>{errorText}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        fontFamily: fontFamilies.RobotoRegular,
        fontSize: fontSizes.fontXMedium,
        color: colors.white,
    },
    requiredMark: {
        color: colors.danger,
    },
    inputContainer: {
        borderWidth: 1.5,
        borderRadius: 6,
        flexDirection: "row",
        alignItems: "center",
    },
    dropdown: {
        flex: 1,
        height: dimensions.fullHeight * 6.5 / 100,
        paddingHorizontal: dimensions.heightLevel2,
        borderRadius: 6,
    },
    icon: {
        width: dimensions.fullWidth * 5 / 100,
        height: dimensions.fullWidth * 5 / 100,
        marginEnd: dimensions.fullWidth * 3 / 100,
    },
    text: {
        color: colors.white,
        fontSize: fontSizes.fontMediumPlus,
        fontFamily: fontFamilies.RobotoRegular,
    },
    selectedText:{
        color: colors.black,
        fontSize: fontSizes.fontMediumPlus,
        fontFamily: fontFamilies.RobotoRegular,
    },
    errorText: {
        marginTop: 4,
        color: colors.danger,
        fontSize: fontSizes.fontMediumPlus,
        fontFamily: fontFamilies.RobotoRegular,
    },
});

export default memo(DropdownField);
