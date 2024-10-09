import { View, StyleSheet, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedPopupProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
    position: { x: number, y: number };
};

export function ThemedPopup({ style, lightColor, darkColor, position, ...otherProps }: ThemedPopupProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            top: position.y,
            left: position.x,
            backgroundColor,
            padding: 10,
            borderRadius: 5,
            zIndex: 1
        }
    });

    return <View style={[styles.container, style]} {...otherProps} />;
}
