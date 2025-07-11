import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const {width, height} = Dimensions.get('window');

export const colors = {
    primary: '#541EF4',
    secondary: '#311191',
    optional:'#9F5CFF',
    appBackground: '#1E1E1E',
    background: '#100f0f',
    txtField: '#373737',
    white: '#FFFFFF',
    black: '#333',
    gray: '#5B5B5B',
    darkGray: '#33333366',
    lightGray: '#CCCCCC',
    whiteGray: '#ECEBEB',
    transparent: 'rgba(0, 0, 0, 0)',
    danger: '#E71C35',
    primaryOpc50: '#e71c3550',
    primaryLight: '#ffc3ca',
    success: '#00a900',
};

export const fontFamilies = {
    RobotoBlack: 'Roboto-Black',
    RobotoBlackItalic: 'Roboto-BlackItalic',
    RobotoBold: 'Roboto-Bold',
    RobotoBoldItalic: 'Roboto-BoldItalic',
    RobotoItalic: 'Roboto-Italic',
    RobotoLight: 'Roboto-Light',
    RobotoLightItalic: 'Roboto-Light-Italic',
    RobotoMedium: 'Roboto-Medium',
    RobotoMediumItalic: 'Roboto-MediumItalic',
    RobotoRegular: 'Roboto-Regular',
    RobotoThin: 'Roboto-Thin',
    RobotoThinItalic: 'Roboto-Thin-Italic',
};

export const fontSizes = {
    fontXXSmall: RFValue(8),
    fontXSmall: RFValue(9),
    fontSmall: RFValue(10),
    fontSmallPlus: RFValue(11),
    fontMedium: RFValue(12),
    fontXMedium: RFValue(13),
    fontMidMedium: RFValue(13.5),
    fontMediumPlus: RFValue(14),
    fontLarge: RFValue(14.5),
    fontXLarge: RFValue(15),
    fontXXLarge: RFValue(16),
    fontXXXLarge: RFValue(16.5),
    fontXXXXLarge: RFValue(18),
    fontXXXXXLarge: RFValue(20),
    fontBigger: RFValue(23),
};

export const dimensions = {
    fullWidth: width,
    fullHeight: height,

    widthLevel1: (width * 95) / 100,
    widthLevel2: (width * 90) / 100,
    widthLevel3: (width * 85) / 100,
    widthLevel4: (width * 80) / 100,
    widthLevel5: (width * 75) / 100,
    widthLevel6: (width * 70) / 100,
    widthLevel7: (width * 65) / 100,
    widthLevel8: (width * 60) / 100,
    widthLevel9: (width * 55) / 100,
    widthLevel10: (width * 50) / 100,
    widthLevel11: (width * 45) / 100,
    widthLevel12: (width * 40) / 100,

    heightLevel1: (height * 2) / 100,
    heightLevel2: (height * 3) / 100,
    heightLevel3: (height * 5) / 100,
    heightLevel4: (height * 7) / 100,
    heightLevel5: (height * 8) / 100,
    heightLevel6: (height * 10) / 100,
    heightLevel7: (height * 12) / 100,
    heightLevel8: (height * 15) / 100,
    heightLevel9: (height * 17) / 100,
    heightLevel10: (height * 20) / 100,

    paddingLevel1: (width * 2) / 100,
    paddingLevel2: (width * 3) / 100,
    paddingLevel3: (width * 5) / 100,
    paddingLevel4: (width * 7) / 100,
    paddingLevel5: (width * 8) / 100,
    paddingLevel6: (width * 10) / 100,
    paddingLevel7: (width * 12) / 100,
    paddingLevel8: (width * 15) / 100,
    paddingLevel9: (width * 17) / 100,
    paddingLevel10: (width * 20) / 100,
};

export const AppStyles = {
    shadows: {
        elevation: 5,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
};

export const regexes = {
    password_validation: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    mobile_number_validation: /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{3,4}$/,
    email_validation: /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,}$/,
};

export const AppData = {
    APP_NAME: 'SmartFlex',
    VERSION: '1.0',
};