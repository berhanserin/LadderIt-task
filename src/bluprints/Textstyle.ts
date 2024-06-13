import { TextStyle } from 'react-native';

export const FONT = (num: number) => {
  return {
    fontWeight: num.toString(),
  } as TextStyle;
};
