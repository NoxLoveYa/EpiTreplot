import { StyleSheet, View, type ViewProps } from 'react-native';
import { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useThemeColor } from '@/hooks/useThemeColor';

import { Card } from './ThemedCard';

import { listUpdate, listDelete } from '@/utils/list';
import { ThemedView } from './ThemedView';

import { Socket } from 'socket.io-client';

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
    list: List;
    workspaceId: number;
    deleteList: (id: number) => void;
    editList: (id: number, label: string) => void;
};

export function ThemedCardList({ style, lightColor, darkColor, title, list, workspaceId, deleteList, editList, ...otherProps }: ThemedCardListProps) {
    const [label, setLabel] = useState<string>(title);

    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
    const iconColor = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');

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
        },
        titleContainer: {
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
            justifyContent: 'space-between'
        }
    });

    function onTitleEdit(title: string) {
        setLabel(title);
    }

    async function onSave() {
        if (title == label)
            return;
        await listUpdate(list.id, label, list.description);
        editList(list.id, label);
    }

    async function onDelete() {
        await listDelete(list.id);
        deleteList(list.id);
    }

    return (
        <View style={ [styles.container, style] } { ...otherProps }>
            <ThemedView style={styles.titleContainer}>
                <TextInput style={styles.title} value={label} onChangeText={onTitleEdit} onBlur={onSave} autoCorrect={false}></TextInput>
                <MaterialCommunityIcons name='trash-can-outline' color={iconColor} size={24} style={{cursor: 'pointer'}} onPress={onDelete}/>
            </ThemedView>
            
            {otherProps.children}
        </View>
    );
}
