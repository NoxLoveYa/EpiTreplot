import { StyleSheet, View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedHeaderProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
};

export function ThemedHeader({ style, lightColor, darkColor, ...otherProps }: ThemedHeaderProps) {

    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'containerBackground');
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            position: 'absolute',
            top: 0,
            width: '100%',
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 5,
            color,
            backgroundColor
        },
    });

    return (
        <View style={ [styles.container, style] } { ...otherProps }

        />
    );
}
