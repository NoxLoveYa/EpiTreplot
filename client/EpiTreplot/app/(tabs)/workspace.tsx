import { useState, useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedBackground } from '@/components/ThemedBackground';
import { ThemedText } from '@/components/ThemedText';
import { ThemedContainer } from '@/components/ThemedContainer';
import { ThemedButtonProps } from '@/components/ThemedButon';
import { ThemedCardList, List } from '@/components/ThemedCardList';
import { ThemedCard, Card } from '@/components/ThemedCard';

import { mapToLists, listSelect, listInsert } from '@/utils/list';
import { cardInsert } from '@/utils/card';

function newCard(id: number, title = "", description = "", listId: number): Card {
    return {
        id: id,
        title: title,
        description: description,
        listId: listId
    }
}

function newList(id: number, title = "", description = "", cards: Array<Card> = [], workspaceId: number): List {
    return {
        id: id,
        title: title,
        description: description,
        cards: cards,
        workspaceId: workspaceId
    }
}

function AnotherListButton({ style, lightColor, darkColor, title = "", size = 28, ...otherProps }: ThemedButtonProps & { size?: number}) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor}, 'tint') + '35'
    const color = useThemeColor({ light: lightColor, dark: darkColor}, 'tint')

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
            color,
            //@ts-ignore
            ...style?.container
        },
        label: {
            fontWeight: 'bold',
            fontSize: size - 10,
            padding: 3,
            color
        }
    })

    return (
        // @ts-ignore
        <Pressable style={ [styles.container, style?.container] } {...otherProps}>
            <MaterialCommunityIcons size={size} name={'plus'} style={{color}}/>
            <ThemedText
                // @ts-ignore
                style={ [styles.label, style?.label] }
            >{title}</ThemedText>
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
        userSelect: 'none',
        // @ts-ignore
        overflow: 'auto'
    }
})

export default function HomeScreen() {
    const [cardsList, setCardsList] = useState<List[]>([]);

    async function fetchLists() {
        const lists = await listSelect(2);
        setCardsList(mapToLists(lists.lists));
    }

    useEffect(() => {
        fetchLists();
    }, []);

    async function addList() {
        const response = (await listInsert('New List', null, 2)).list[0];
        const formattedList: List = newList(response.id, response.title, response.description, [], response.workspaceId);
        setCardsList([...cardsList, formattedList]);
    }

    return (
        <ThemedBackground>
            <ThemedContainer style={styles.container} border={true}>
                {cardsList.map((list, index) => {
                    return (
                        <ThemedCardList key={index} title={list.title}>
                            {list.cards.map((card, index) => {
                                return (
                                    <ThemedCard key={index} card={card}/>
                                );
                            })}
                            <AnotherListButton
                                title={'Add another card'}
                                // @ts-ignore
                                style={{container: {padding: 0, backgroundColor: 'transparent'}, label: {padding: 0}}}
                                size={23}
                                onPress={async () => {
                                    const response = (await cardInsert('New Card', null, list.id)).card[0];
                                    const formattedCard: Card = newCard(response.id, response.title, response.description, response.listId);
                                    const updatedList = cardsList.map(item => {
                                        if (item.id === list.id) {
                                            return {
                                                ...item,
                                                cards: [...item.cards, formattedCard]
                                            }
                                        }
                                        return item;
                                    });
                                    setCardsList(updatedList);
                                }}
                            />
                        </ThemedCardList>
                    );
                })}
                <AnotherListButton title={'Add another list'} onPress={addList} />
            </ThemedContainer>
        </ThemedBackground>
    );
}