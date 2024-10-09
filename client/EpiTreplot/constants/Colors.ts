/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';

export const Colors = {
  light: {
    text: '#11181C',
    title: '#939393',
    subtitle: '#adadad',
    link: '#adadad',
    background: '#fff',
    containerBackground: '#1A1D1E',
    fieldBackground: '#2c2c2c',
    fieldBorderColour: '#3c3c3c',
    tint: tintColorLight,
    tintDark: '#cc5200',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#adadad',
    title: '#ebebeb',
    subtitle: '#939393',
    link: '#ff6600',
    background: '#191919',
    containerBackground: '#202020',
    fieldBackground: '#1f1f1f',
    fieldBorderColour: '#4d4d4d',
    tint: '#ff6600',
    tintDark: '#cc5200',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#ff6600',
  },
};
