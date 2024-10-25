import { useState, useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

import { ThemedBackground } from '@/components/ThemedBackground';
import { ThemedText } from '@/components/ThemedText';
import { ThemedContainer } from '@/components/ThemedContainer';
import { ThemedButtonProps } from '@/components/ThemedButon';
import { ThemedCardList, List } from '@/components/ThemedCardList';
import { ThemedCard, Card } from '@/components/ThemedCard';
import { ThemedPopup } from '@/components/ThemedPopup';
import { ThemedView } from '@/components/ThemedView';

import { mapToLists, listSelect, listInsert, listDuplicate } from '@/utils/list';
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

export default function WorkspaceScreen() {
    const [cardsList, setCardsList] = useState<List[]>([]);
    const [popupId, setPopupId] = useState<number>(-1);
    const [popupVisible, setPopupVisible] = useState<boolean>(false);
    const [popupPosition, setPopupPosition] = useState({x: 0, y: 0});

    const tintColor = useThemeColor({ light: Colors.light.tint, dark: Colors.dark.tint }, 'tint');

    async function fetchLists() {
        const lists = await listSelect(2);
        setCardsList(mapToLists(lists.lists));
    }

    // Remove context menu
    window.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    }, true);

    useEffect(() => {
        fetchLists();
    }, []);

    async function addList() {
        const response = (await listInsert('New List', null, 2)).list[0];
        const formattedList: List = newList(response.id, response.title, response.description, [], response.workspaceId);
        setCardsList([...cardsList, formattedList]);
    }

    async function cardRightClick(e: any, id: number) {
        if (e?.button != 2)
            return;
        setPopupId(id);
        setPopupVisible(!popupVisible);
        setPopupPosition({x: e.clientX, y: e.clientY});
    }

    function deleteList(id: number) {
        setCardsList(cardsList.filter(list => list.id != id));
    }

    async function duplicateList(id: number) {
        const list = cardsList.find(list => list.id === id);
        console.log(list);
        if (!list)
            return;
        await listDuplicate(list.id);
        fetchLists();
    }

    return (
        <ThemedBackground>
            <ThemedContainer style={styles.container} border={true}>
                <ThemedPopup
                    position={popupPosition}
                    opened={popupVisible}
                    onRequestClose={() => setPopupVisible(false)}
                    onPointerDown={() => setPopupVisible(false)}
                >
                    <ThemedView onPointerDown={
                    (e) => {
                        if (e.button != 0)
                            return;
                        duplicateList(popupId);
                    }} style={{display: 'flex', flexDirection: 'row', gap: 10, cursor: 'pointer', backgroundColor: 'transparent'}}>
                        <ThemedText>Duplicate</ThemedText>
                        <MaterialCommunityIcons size={20} name={'content-duplicate'} color={tintColor} style={{marginTop: 2}}/>
                    </ThemedView>
                </ThemedPopup>
                {cardsList.map((list, index) => {
                    return (
                        <ThemedCardList key={index} title={list.title} list={list} deleteList={deleteList} onPointerDown={(e) => {cardRightClick(e, list.id); }}>
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
                                    const formattedCard: Card = newCard(response.id, response.title, response.description, response.lists_id);
                                    console.log(formattedCard);
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