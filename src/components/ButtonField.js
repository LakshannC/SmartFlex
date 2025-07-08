import {memo} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  colors,
  dimensions,
  fontFamilies,
  fontSizes,
} from '../configuration/constants';

const ButtonField = ({
  label,
  onPress,
  disabled,
  iconStart,
  iconEnd,
  bgColor,
  rounded,
  buttonHeight,
  labelColor,
  showShadow = true,
  size = 'large',
  iconSize,
}) => {
  const backgroundColor = disabled
    ? colors.lightGray
    : bgColor ?? colors.primary;

  const textColor = disabled ? colors.gray : labelColor ?? colors.black;
  const fontFamily = fontFamilies.RobotoBold;
  const fontSize =
    size === 'small'
      ? fontSizes.fontSmall
      : size === 'medium'
      ? fontSizes.fontMedium
      : fontSizes.fontLarge;
  const borderRadius = rounded ? 10 : 0;
  const height = buttonHeight ?? 'fit-content';
  const padding = size === 'small' ? 0 : size === 'medium' ? 3 : 10;
  const iconDimension =
    iconSize ?? (size === 'small' ? 5 : size === 'medium' ? 6 : 7);

  const iconStyle = {
    width: (dimensions.fullWidth * iconDimension) / 100,
    height: (dimensions.fullWidth * iconDimension) / 100,
  };

  const bodyContent = (
    <View style={[styles.buttonContainer, {padding}]}>
      {iconStart && (
        <Image style={iconStyle} source={iconStart} resizeMode={'contain'} />
      )}
      <Text style={[styles.label, {fontFamily, fontSize, color: textColor}]}>
        {label}
      </Text>
      {iconEnd && (
        <Image style={iconStyle} source={iconEnd} resizeMode={'contain'} />
      )}
    </View>
  );

  return disabled ? (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          borderRadius,
          height,
        },

      ]}>
      {bodyContent}
    </View>
  ) : (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor,
          borderRadius,
          height,
        },
        showShadow === true ? styles.shadows : {},
      ]}
      onPress={onPress}>
      {bodyContent}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: (dimensions.fullWidth * 7) / 100,
    height: (dimensions.fullWidth * 7) / 100,
  },
  label: {
    marginHorizontal: dimensions.heightLevel1,
  },
  shadows: {
    padding: 3,
    elevation: 5,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default memo(ButtonField);
