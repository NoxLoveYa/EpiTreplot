import { View, StyleSheet, type ViewProps, DimensionValue } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type Vector2 = {
    x: DimensionValue,
    y: DimensionValue
}

export type ThemedPopupProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
    position: Vector2;
    opened?: boolean;
};

export function ThemedPopup({ style, lightColor, darkColor, position, opened = true, ...otherProps }: ThemedPopupProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'fieldBackground');
    const display = opened ? 'flex' : 'none'

    const styles = StyleSheet.create({
        container: {
            display,
            position: 'absolute',
            top: position.y,
            left: position.x,
            padding: 10,
            borderRadius: 5,
            backgroundColor,
            zIndex: 10
        }
    });

    return <View style={[styles.container, style]} {...otherProps} />;
}
