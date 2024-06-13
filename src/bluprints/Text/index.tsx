import React from 'react';

import {
  // eslint-disable-next-line no-restricted-imports
  Text as RNText,
  StyleProp,
  TextProps as TextProperties,
  TextStyle,
} from 'react-native';

import { FONT } from '../Textstyle';
import { scaledSize } from '@/utils/dimensions';
import { useTheme } from '@react-navigation/native';

const BASE_TEXT: TextStyle = {
  fontSize: scaledSize(7),
};

export const presets = {
  default: BASE_TEXT,
  font400: {
    ...BASE_TEXT,
    ...FONT(400),
  } as TextStyle,
  font500: {
    ...BASE_TEXT,
    ...FONT(500),
  } as TextStyle,
  font700: {
    ...BASE_TEXT,
    ...FONT(700),
  } as TextStyle,
  h1: {
    ...BASE_TEXT,
    ...FONT(700),
    fontSize: scaledSize(24),
  } as TextStyle,
  h2: {
    fontSize: scaledSize(10),
  } as TextStyle,
};

export type TextPresets = keyof typeof presets;

export interface TextProps extends TextProperties {
  style?: StyleProp<TextStyle>;
  type?: TextPresets;
  color?: string;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export const Text = ({ children, ...props }: TextProps) => {
  const {
    color,
    type = 'default',
    style: styleOverride,
    textAlign = 'auto',
    ...rest
  } = props;

  const { colors } = useTheme();

  return (
    <RNText
      {...rest}
      style={[
        presets[type] as TextProps,
        { textAlign: textAlign, color: colors.text },
        styleOverride,
      ]}>
      {children}
    </RNText>
  );
};
