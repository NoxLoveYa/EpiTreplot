import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

import { ThemedBackground } from '@/components/ThemedBackground';
import { ThemedContainer } from '@/components/ThemedContainer';
import { ThemedText } from '@/components/ThemedText';

import { userValidate } from '@/utils/user';
import { workspaceSelect, workspaceCreate, workspaceDelete } from '@/utils/workspace';

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
});

export default function HomeScreen() {

    const [user, setUser] = useState(1);
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

    useEffect(() => {
        userValidate(localStorage.getItem('EpiTreplotToken')).then((e) => {
            if (e.data == null) {
                localStorage.removeItem('EpiTreplotToken');
                window.location.reload();
                return;
            }
            else {
                setUser(e.data.id);
                fetchWorkspaces();
            }
        });
    }, []);

    return (
        <ThemedBackground>
            <ThemedContainer style={styles.container}>
                <ThemedContainer style={styles.labelContainer}>
                    <ThemedText type='title'>Workspaces</ThemedText>
                    <MaterialCommunityIcons name='plus-box' size={35} color={tintColor} onPress={createWorkspace} style={{cursor: 'pointer'}}></MaterialCommunityIcons>
                </ThemedContainer>
                <ThemedContainer border={true} style={{width: '100%', height: 1, padding: 0, margin: 0}}></ThemedContainer>
                {workspaces.map((workspace, index) => {
                    return (
                        <ThemedContainer key={workspace.id} style={styles.labelContainer}>
                            <ThemedText type='subtitle'>{workspace.title}</ThemedText>
                            <MaterialCommunityIcons name='trash-can' size={25} color={'red'} onPress={() => {deleteWorkspace(workspace.id)}} style={{cursor: 'pointer'}}/>
                        </ThemedContainer>
                    );
                })}
            </ThemedContainer>
        </ThemedBackground>
    )
}