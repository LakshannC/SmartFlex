import {memo, useEffect, useState} from "react";
import {Image, StyleSheet, Text, TextInput, View} from "react-native";
import {colors, dimensions, fontFamilies, fontSizes} from "../configuration/constants";

const searchIcon = require('../assets/images/icon_search.webp');

const TextField = ({
                       value,
                       onChangeText,
                       label,
                       placeholder,
                       isSearch,
                       height,
                       isPassword,
                       isNumeric,
                       errorText,
                       enabled = true,
                       editable = true,
                       bgColor,
                       showShadow = false,
                       icon,
                       iconPosition = 'start',
                       layout = 'rounded',
                       enableMultiline = false,
                       onFocus,
                       onBlur,
                       removeTopMargin,
                       textAlign,
                       ref,
                       autoFocus
                   }) => {

    const labelTxtColor = colors.white;
    const backgroundColor = enabled === false ? colors.lightGray : (bgColor ?? colors.txtField);
    const paddingVertical = isSearch ? 0 : dimensions.heightLevel1 / 3;
    const borderColor = errorText ? colors.danger : colors.white;
    const errorTextPaddingHr = layout === 'classic' ? 0 : 20;
    const inputPadding = isSearch ? 4 : 'auto';

    const [isTextEditable, setIsTextEditable] = useState(editable);

    useEffect(() => {
        setIsTextEditable(editable);
        if (!enabled || !editable)
            setIsTextEditable(false);

    }, [enabled, editable])

    return (
        <View style={{width: '100%'}}>
            {
                layout === 'rounded' ?
                    <View style={[roundedStyles.inputContainer, {
                        backgroundColor,
                        paddingVertical,
                        borderColor,
                        height: height,
                    }, showShadow ? roundedStyles.shadows : {},
                        removeTopMargin ? {} : {marginTop: dimensions.heightLevel1 / 3,},
                    ]}>

                        {
                            isSearch && !icon &&
                            <Image source={searchIcon} style={roundedStyles.icon}/>
                        }

                        {
                            icon && iconPosition === 'start' &&
                            <Image source={icon} style={roundedStyles.icon}/>

                        }

                        <TextInput
                            ref={ref}
                            value={value}
                            onChangeText={onChangeText}
                            style={[roundedStyles.input, {
                                color: labelTxtColor,
                                paddingVertical: inputPadding,
                                textAlign
                            }]}
                            secureTextEntry={isPassword}
                            placeholder={placeholder}
                            placeholderTextColor={colors.white}
                            keyboardType={isNumeric ? 'numeric' : null}
                            editable={isTextEditable}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            autoFocus={autoFocus}
                            // multiline={enableMultiline}
                        />

                        {
                            icon && iconPosition === 'end' &&
                            <Image source={icon} style={roundedStyles.icon}/>

                        }

                    </View>
                    :
                    layout === 'classic' ?
                        <View style={{width: '100%'}}>
                            {
                                label &&
                                <Text style={classicStyles.label}>{label}</Text>
                            }
                            <View
                                style={[classicStyles.inputContainer, {
                                    backgroundColor,
                                    paddingVertical,
                                    height: height,
                                    borderColor,
                                }, showShadow ? roundedStyles.shadows : {},
                                    removeTopMargin ? {} : {marginTop: dimensions.heightLevel1 / 2,},
                                ]}
                            >

                                {
                                    isSearch && !icon &&
                                    <Image source={searchIcon} style={roundedStyles.icon}/>
                                }

                                {
                                    icon && iconPosition === 'start' &&
                                    <Image source={icon} style={roundedStyles.icon}/>

                                }

                                <TextInput
                                    ref={ref}
                                    value={value}
                                    onChangeText={onChangeText}
                                    style={[roundedStyles.input, {
                                        color: labelTxtColor,
                                        height: enableMultiline ? 'fit-content' : dimensions.fullHeight * 5 / 100,
                                        textAlign
                                    }]}
                                    secureTextEntry={isPassword}
                                    placeholder={placeholder}
                                    placeholderTextColor={colors.white}
                                    keyboardType={isNumeric ? 'numeric' : null}
                                    editable={isTextEditable}
                                    multiline={enableMultiline}
                                    onFocus={onFocus}
                                    onBlur={onBlur}
                                    autoFocus={autoFocus}
                                    // focusable={focusable}
                                />

                                {
                                    icon && iconPosition === 'end' &&
                                    <Image source={icon} style={roundedStyles.icon}/>

                                }

                            </View>
                        </View>
                        :
                        <></>

            }

            {
                errorText &&
                <Text
                    style={[roundedStyles.errorText, {paddingHorizontal: errorTextPaddingHr}]}>{errorText}</Text>
            }

        </View>
    )
}

const roundedStyles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        // height: dimensions.heightLevel3,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: dimensions.heightLevel2,
        borderRadius: 10,
        // borderWidth: 1
    },
    input: {
        flex: 1,
        // height: dimensions.fullHeight * 5 / 100,
        color: colors.black,
        fontFamily: fontFamilies.RobotoRegular,
        fontSize: fontSizes.fontMediumPlus,
        marginHorizontal: dimensions.heightLevel1 / 4,
        // backgroundColor: 'red',
    },
    icon: {
        width: dimensions.fullWidth * 6 / 100,
        height: dimensions.fullWidth * 6 / 100,
    },
    shadows: {
        elevation: 5,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    errorText: {
        color: colors.danger,
        fontFamily: fontFamilies.RobotoRegular,
        fontSize: fontSizes.fontMediumPlus,
        // paddingHorizontal: 20,
        marginTop: dimensions.heightLevel1 / 3
    }
})

const classicStyles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: dimensions.heightLevel2 / 2,
        borderRadius: 0,
        borderWidth: 1
    },
    label: {
        width: '100%',
        color: colors.black,
        fontFamily: fontFamilies.RobotoRegular,
        fontSize: fontSizes.fontMidMedium,
    },
})

export default memo(TextField);
