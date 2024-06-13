import { TouchableOpacityProps as RNButtonnputProps } from 'react-native';
import { TextPresets } from '../Text';

export type ButtonIcon = true | false;

export type ButtonType = 'primary' | 'outlined' | 'standard';

export interface ButtonsProps extends RNButtonnputProps {
  /**
   * Will the button contain icon
   * @default "false"
   */
  icon?: ButtonIcon;

  /**
   *
   * @default "primary"
   */
  type?: ButtonType;
}
