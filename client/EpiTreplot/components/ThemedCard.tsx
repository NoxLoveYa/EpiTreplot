import { Pressable, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from './ThemedText';
import { ThemedView, ThemedViewProps } from './ThemedView';
export type ThemedCardProps = ThemedViewProps & {
    card: Card;
};

export type Card = {
    id: number;
    title: string;
    description?: string;
    listId: number;
}

export function ThemedCard({ style, lightColor, darkColor, card,...otherProps }: ThemedCardProps) {
    const [penHovered, setPenHovered] = useState<boolean>(false);
    const [editToggled, setEditToggled] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(card.title);

    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'fieldBackground');
    const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'fieldBorderColour');
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
    const iconColor = useThemeColor({ light: lightColor, dark: darkColor }, 'tint') + 'AA';
    const iconBackgroundColor = penHovered ? iconColor : 'transparent';


    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'row',
            alignSelf: 'stretch',
            justifyContent: 'space-between', // Adjust spacing between text and edit section
            alignItems: 'center',
            borderColor,
            borderWidth: 1,
            borderRadius: 5,
            padding: 5,
            backgroundColor
        },
        text: {
            //@ts-ignore
            outlineStyle: 'none',
            flex: 1,
            color
        },
        edit:{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 3,
            borderRadius: 5,
            backgroundColor: iconBackgroundColor
        }
    });

    function onTitleEdit(title: string) {
        setTitle(title);
    }

    function onSave() {
        if (title == card.title)
            return;
        // TODO: Call API with title
    }

    return (
        <ThemedView style={styles.container}>
            <TextInput style={styles.text} value={title} onChangeText={onTitleEdit} onBlur={onSave}>
            </TextInput>
            <ThemedView style={styles.edit}>
                <Pressable 
                    onHoverIn={() => {
                        setPenHovered(true);
                    }}
                    onHoverOut={() => {
                        setPenHovered(false);
                    }}
                    onPress={() => {
                        setEditToggled(!editToggled)
                    }}
                >
                    <MaterialCommunityIcons name={'pen'} color={penHovered ? backgroundColor : iconColor} size={20}/>
                </Pressable>
            </ThemedView>
        </ThemedView>
    );
}
