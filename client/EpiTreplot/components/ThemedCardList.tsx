import { StyleSheet, View, type ViewProps } from 'react-native';
import { useState } from 'react';

import { useThemeColor } from '@/hooks/useThemeColor';

import { Card } from './ThemedCard';
import { TextInput } from 'react-native-gesture-handler';

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
    const [label, setLabel] = useState<string>(title);

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
            borderRadius: 10,
            color,
            backgroundColor
        },
        title: {
            fontWeight: 'bold',
            fontSize: 20,
            color,
            //@ts-ignore
            outlineStyle: 'none'
        }
    });

    function onTitleEdit(title: string) {
        setLabel(title);
    }

    function onSave() {
        if (title == label)
            return;
    }

    return (
        <View style={ [styles.container, style] } { ...otherProps }>
            <TextInput style={styles.title} value={label} onChangeText={onTitleEdit} onBlur={onSave} autoCorrect={false}></TextInput>
            {otherProps.children}
        </View>
    );
}
