import { StyleSheet, View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from './ThemedText';

import { Card } from './ThemedCard';

export type List = {
    id: number;
    title: string;
    description?: string;
    cards: Card[];
    workspaceId: number;
}

export type ThemedCardListProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
    title: string;
};

export function ThemedCardList({ style, lightColor, darkColor, title, ...otherProps }: ThemedCardListProps) {

    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            width: 300,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            padding: 10,
            gap: 15,
            color,
            backgroundColor
        },
    });

    return (
        <View style={ [styles.container, style] } { ...otherProps }>
            <ThemedText type='subtitle'>{title}</ThemedText>
            {otherProps.children}
        </View>
    );
}
