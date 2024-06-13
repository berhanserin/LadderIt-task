module.exports = {
  plugins: [
    ['react-native-reanimated/plugin'],
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json','.svg'],
        alias: {
          '@': './src',
        },
      },
    ],
  ],
  presets: ['module:@react-native/babel-preset'],
};
