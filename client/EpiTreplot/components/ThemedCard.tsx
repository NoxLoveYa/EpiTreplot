import { StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from './ThemedText';
import { ThemedView, ThemedViewProps } from './ThemedView';

export type ThemedCardProps = ThemedViewProps & {
    title: string;
};

export function ThemedCard({ style, lightColor, darkColor, title,...otherProps }: ThemedCardProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'fieldBackground');
    const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'fieldBorderColour');

    const styles = StyleSheet.create({
        container: {
            width: 150,
            borderColor,
            borderWidth: 1,
            backgroundColor
        }
    });

    return (
        <ThemedView style={styles.container}>
            <ThemedText>{title}</ThemedText>
        </ThemedView>
    );
}
