import { useState, useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import { useNavigation } from 'expo-router';

import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';

import { ThemedBackground } from '@/components/ThemedBackground';
import { ThemedHeader } from '@/components/ThemedHeader';
import { ThemedText } from '@/components/ThemedText';
import { ThemedContainer } from '@/components/ThemedContainer';
import { ThemedButton, ThemedButtonProps } from '@/components/ThemedButon';
import { ThemedCardList, List } from '@/components/ThemedCardList';
import { ThemedCard, Card } from '@/components/ThemedCard';
import { ThemedPopup } from '@/components/ThemedPopup';
import { ThemedView } from '@/components/ThemedView';

import { listSelect, listInsert, listDuplicate } from '@/utils/list';
import { cardInsert, cardDelete } from '@/utils/card';
import { ThemedGoBack } from '@/components/ThemedGoBack';
import ThemedImage from '@/components/ThemedImage';

import { io, Socket } from 'socket.io-client';

function newCard(id: number, title = ""): Card {
    return {
        id: id,
        title: title,
    }
}

function newList(id: number, title = "", cards: Array<Card> = [], workspaceId: number): List {
    return {
        id: id,
        title: title,
        workspaceId: workspaceId,
        cards: cards,
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

function getWorkspaceId() {
    return parseInt(localStorage.getItem('EpiTreplotWorkspace'));
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        position: 'absolute',
        top: 55,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: 'calc(100% - 10px)',
        height: 'calc(100% - 60px)',
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
    const [popupInfos, setPopupInfos] = useState<boolean>(false);
    const [popupPosition, setPopupPosition] = useState({x: 0, y: 0});
    const [popupDescription, setPopupDescription] = useState<string>('');
    const [socket, setSocket] = useState<any>(null);

    const tintColor = useThemeColor({ light: Colors.light.tint, dark: Colors.dark.tint }, 'tint');
    const workspaceId = getWorkspaceId();

    const navigation = useNavigation();

    async function fetchLists() {
        const lists = await listSelect(getWorkspaceId());
        if (!lists.lists)
            return;
        setCardsList(lists.lists);
    }

    // Remove context menu
    window.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    }, true);

    // Correct one to fix later
    useFocusEffect(
        useCallback(() => {
            fetchLists();
        }, []) // Dependencies can include variables if needed
    );

    useEffect(() => {
        const socket = io('http://localhost:5000', { transports: ['websocket'] });
        socket.emit('join-room', workspaceId);
        socket.on('add-list', (id: number) => {
            setTimeout(() => {
                fetchLists();
            }, 175);
        });
        socket.on('delete-list', (id: number) => {
            setTimeout(() => {
                fetchLists();
            }, 175);
        });
        setSocket(socket);
    }
    , [workspaceId]);

    async function addList() {
        const response = (await listInsert('New List', getWorkspaceId())).list;
        const formattedList: List = newList(response.id, response.title, [], response.workspaces_id);
        setCardsList([...cardsList, formattedList]);
        socket.emit('add-list', workspaceId, response.id);
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
        socket.emit('delete-list', workspaceId, id);
    }

    async function duplicateList(id: number) {
        const list = cardsList.find(list => list.id === id);
        if (!list)
            return;
        await listDuplicate(list.id);
        fetchLists();
    }

    async function deleteCard(id: number) {
        // @ts-ignore
        const response = await cardDelete(id);
        if (response.error)
            return;
        setCardsList(cardsList.map(item => {
            return {
                ...item,
                cards: item.cards.filter(card => card.id != id)
            }
        }));
    }

    return (
        <ThemedBackground>
            <ThemedHeader>
                <ThemedGoBack route={'Home'} onClick={() => {setCardsList([])}}>
                    <MaterialCommunityIcons size={30} name={'arrow-left'} color={'white'} style={{padding: 3.5, borderRadius: 5}}/>
                </ThemedGoBack>
            </ThemedHeader>
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
                <ThemedPopup
                    position={{x: 100, y: 100}}
                    opened={popupInfos}
                    onRequestClose={() => setPopupInfos(false)}
                    onPointerDown={() => setPopupInfos(false)}
                >
                    <ThemedView>
                        <ThemedText>{popupDescription}</ThemedText>
                    </ThemedView>
                </ThemedPopup>
                {cardsList.map((list, index) => {
                    return (
                        <ThemedCardList key={index} title={list.title} list={list} deleteList={deleteList} workspaceId={getWorkspaceId()} onPointerDown={(e) => {cardRightClick(e, list.id); }}>
                            {list.cards.map((card, index) => {
                                return (
                                    <ThemedCard key={index} card={card} deleteCard={deleteCard}/>
                                );
                            })}
                            <AnotherListButton
                                title={'Add another card'}
                                // @ts-ignore
                                style={{container: {padding: 0, backgroundColor: 'transparent'}, label: {padding: 0}}}
                                size={23}
                                onPress={async () => {
                                    const response = (await cardInsert('New Card', null, list.id)).card;
                                    const formattedCard: Card = newCard(response.id, response.title);
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