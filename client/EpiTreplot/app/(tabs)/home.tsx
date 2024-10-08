import { Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedBackground } from '@/components/ThemedBackground';
import { ThemedText } from '@/components/ThemedText';
import { ThemedContainer } from '@/components/ThemedContainer';
import { ThemedButtonProps } from '@/components/ThemedButon';
import { ThemedCardList, List, Card } from '@/components/ThemedCardList';
import { ThemedCard } from '@/components/ThemedCard';

function newCard(listId: number, title = "", description = ""): Card {
    return {
        title: title,
        description: description,
        listId: listId
    }
}

function newList(workspaceId: number, title = "", description = "", cards: Array<Card> = []): List {
    return {
        title: title,
        description: description,
        cards: cards,
        workspaceId: workspaceId
    }
}

function AnotherListButton({ style, lightColor, darkColor, title = "", ...otherProps }: ThemedButtonProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor}, 'tint') + '35'
    const color = useThemeColor({ light: lightColor, dark: darkColor}, 'tint')

    const size = 28

    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: 250,
            borderRadius: 5,
            gap: 5,
            padding: 5,
            userSelect: 'none',
            backgroundColor,
            color
        },
        label: {
            fontWeight: 'bold',
            fontSize: size - 10,
            padding: 3,
            color
        }
    })

    return (
        <Pressable style={styles.container} {...otherProps}>
            <MaterialCommunityIcons size={size} name={'plus-box'} style={{color}}/>
            <ThemedText style={styles.label}>{title}</ThemedText>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        height: '100%',
        borderRadius: 5,
        borderStyle: 'dashed',
        // @ts-ignore
        overflow: 'auto'
    }
})

export default function HomeScreen() {
    const [cardsList, setCardsList] = useState<Array<List>>([newList(0, 'Backlog', '', [newCard(0, 'Card 1', 'Description 1')])]);

    function addList() {
        setCardsList([...cardsList, newList(cardsList.length, 'New List', '', [newCard(cardsList.length, 'New Card', 'Description')])]);
    }

    return (
        <ThemedBackground>
            <ThemedContainer style={styles.container} border={true}>
                {cardsList.map((list, index) => {
                    return (
                        <ThemedCardList key={index} title={list.title}>
                            {list.cards.map((card, index) => {
                                return (
                                    <ThemedCard key={index} title={card.title}/>
                                );
                            })}
                        </ThemedCardList>
                    );
                })}
                <AnotherListButton title={'Add another list'} onPress={addList} />
            </ThemedContainer>
        </ThemedBackground>
    );
}