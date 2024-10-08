import { StyleSheet, View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedBackgroundProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
};

export function ThemedSeparator({ style, lightColor, darkColor, ...otherProps }: ThemedBackgroundProps) {

    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');

    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            alignSelf: 'stretch',
            height: 1,
            backgroundColor
        },
    });

    return (
        <View style={ [styles.container, style] } { ...otherProps }

        />
    );
}
