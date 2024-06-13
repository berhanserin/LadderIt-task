import {
  TextInputProps as RNTextInputProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

export interface TextInputProps extends InputProps {
  name: string;
}

export interface InputProps extends RNTextInputProps {
  leftIcon?: React.ReactNode | null;
  rightIcon?: React.ReactNode | null;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  secureTextEntry?: boolean;

  borderShow?: boolean;
  borderWidth?: number;
  rightIconOnClick?: () => void;
  rightIconIn?: () => void;
  rightIconOut?: () => void;
}
