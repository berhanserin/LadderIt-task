import React from 'react';
import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInput,
  View,
  Pressable,
} from 'react-native';

import { InputProps } from './Props';
import Animated from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';

export const Input = React.memo(
  React.forwardRef((props: InputProps, ref?: React.Ref<RNTextInput | null>) => {
    const {
      placeholder,
      onChangeText,
      inputStyle,
      style,
      secureTextEntry,
      leftIcon,
      rightIcon,
      borderShow,
      borderWidth,
      rightIconOnClick,
      rightIconIn,
      rightIconOut,
    } = props;

    const styles = textInput({
      borderShow: borderShow,
    });

    return (
      <View style={[style, styles.textStyle]}>
        {leftIcon && (
          <Pressable
            onPress={rightIconOnClick}
            onPressIn={rightIconIn}
            onPressOut={rightIconOut}
            style={[
              {
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              },
            ]}>
            {leftIcon}
          </Pressable>
        )}
        <TextInput
          style={[{ color: 'black', height: 38, flex: 1 }, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={'#838383'}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
        />
        {rightIcon && (
          <Pressable
            onPress={rightIconOnClick}
            onPressIn={rightIconIn}
            onPressOut={rightIconOut}
            style={[
              {
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              },
            ]}>
            {rightIcon}
          </Pressable>
        )}
      </View>
    );
  })
);

const textInput = ({ borderShow, borderWidth, borderColor }: any) =>
  StyleSheet.create({
    textStyle: {
      borderColor: borderColor,
      borderWidth: borderShow ? borderWidth : 0,
      borderRadius: 15,

      paddingLeft: 15,
      width: 324,

      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
