import { StyleSheet, View, type ViewProps } from 'react-native';
import { useState } from 'react';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useNavigation } from 'expo-router';

export type ThemedGoBackProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
    onHoverStyle?: ViewProps;
    route: string;
    onClick?: Function;
};

export function ThemedGoBack({ style, lightColor, darkColor, onHoverStyle, route, onClick, ...otherProps }: ThemedGoBackProps) {

    const navigation = useNavigation();

    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

    const [hovered, setHovered] = useState(false);

    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            backgroundColor
        },
    });

    return (
        <View style={ [styles.container, hovered? onHoverStyle : style] } onPointerEnter={()=>{setHovered(true)}} onPointerLeave={()=>{setHovered(false)}} onPointerDown={(e)=>{if (onClick) {onClick()};navigation.navigate(route)}} { ...otherProps }

        />
    );
}
