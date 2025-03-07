import { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

import { useNavigation } from 'expo-router';

import { ThemedBackground } from '@/components/ThemedBackground';
import { ThemedContainer } from '@/components/ThemedContainer';
import { ThemedText } from '@/components/ThemedText';

import { userValidate } from '@/utils/user';
import { workspaceSelect, workspaceCreate, workspaceDelete, workspaceUpdate } from '@/utils/workspace';
import { TextInput } from 'react-native-gesture-handler';
import { ThemedHeader } from '@/components/ThemedHeader';
import { ThemedView } from '@/components/ThemedView';

const styles = StyleSheet.create({
    container: {
        borderRadius: 0,
        width: '55%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '90%',
        // @ts-ignore
        overflow: 'auto'
    },
    labelContainer: {
        width: '100%',
        padding: 10,
        margin: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textInput: {
        width: '100%',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'grey'
    }
});

export default function HomeScreen() {

    const navigation = useNavigation();
    const [user, setUser] = useState(0);
    const [workspaces, setWorkspaces] = useState([]);
    const tintColor = useThemeColor({light: Colors.light.tint, dark: Colors.dark.tint}, 'tint');

    async function fetchWorkspaces() {
        const lists = await workspaceSelect(user);
        setWorkspaces(lists.data);
    }

    async function createWorkspace() {
        const workspace = await workspaceCreate("Test Workspace", "idk", user);
        await fetchWorkspaces();
    }

    async function deleteWorkspace(id: number) {
        await workspaceDelete(id);
        await fetchWorkspaces();
    }

    const copyLink = (id: number) => {
        const link = `http://localhost:8081/workspace/${id}`;
        navigator.clipboard.writeText(link);
        alert("Link copied!");
    };

    useEffect(() => {
        userValidate(localStorage.getItem('EpiTreplotToken')).then((e) => {
            if (e.data == null) {
                localStorage.removeItem('EpiTreplotToken');
                window.location.reload();
                return;
            }
            else {
                setUser(e.data.id);
            }
        });
    }, []);

    useEffect(() => {
        if (user == 0)
            return;
        fetchWorkspaces();
    }, [user]);
    
    useLayoutEffect(() => {
        const url = window.location.href;  // Get the current URL
        const matches = url.match(/workspace\/(\d+)/);

        if (matches) {
            const workspaceId = matches[1];  // Extract the workspace ID from the URL
            localStorage.setItem('EpiTreplotWorkspace', workspaceId);
            setTimeout(() => {
                navigation.navigate('Workspace');
            }, 100);
        }
      }, []); 

    return (
        <ThemedBackground>
            <ThemedHeader>
                <View/>
                <ThemedView style={{display: 'flex', flexDirection: 'row', backgroundColor: 'transparent'}}>
                    <MaterialCommunityIcons name='logout-variant' size={25} color={tintColor} onPress={() => {localStorage.removeItem('EpiTreplotToken'); window.location.reload()}} style={{right: 0, cursor: 'pointer'}}/>
                </ThemedView>
            </ThemedHeader>
            <ThemedContainer style={styles.container}>
                <ThemedContainer style={styles.labelContainer}>
                    <ThemedText type='title'>Workspaces</ThemedText>
                    <MaterialCommunityIcons name='plus-box' size={35} color={tintColor} onPress={createWorkspace} style={{cursor: 'pointer'}}></MaterialCommunityIcons>
                </ThemedContainer>
                <ThemedContainer border={true} style={{width: '100%', height: 1, padding: 0, margin: 0}}></ThemedContainer>
                {workspaces && workspaces.map((workspace, index) => {
                    return (
                        <ThemedContainer key={workspace.id} style={styles.labelContainer}>
                            <TextInput style={styles.textInput} defaultValue={workspace.name} onChangeText={(text) => { workspace.name = text }} onBlur={() => {workspaceUpdate(workspace.id, workspace.name)}}></TextInput>
                            <ThemedContainer style={{display: 'flex', flexDirection: 'row'}}>
                                <MaterialCommunityIcons name='arrow-right-bold-box' size={25} color={tintColor} onPress={() => {
                                        localStorage.setItem('EpiTreplotWorkspace', workspace.id.toString());
                                        navigation.navigate('Workspace');
                                    }} style={{cursor: 'pointer'}}/>
                                <MaterialCommunityIcons name='share-variant' size={25} color='white' style={{cursor: 'pointer'}} onPress={() => {copyLink(workspace.id);}}/>
                                <MaterialCommunityIcons name='trash-can' size={25} color={'red'} onPress={() => {deleteWorkspace(workspace.id)}} style={{cursor: 'pointer'}}/>
                            </ThemedContainer>
                        </ThemedContainer>
                    );
                })}
            </ThemedContainer>
        </ThemedBackground>
    )
}