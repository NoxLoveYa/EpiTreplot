import { StyleSheet } from 'react-native';
import { useState } from 'react';

import { ThemedBackground } from '@/components/ThemedBackground';
import { ThemedContainer } from '@/components/ThemedContainer';
import { ThemedText } from '@/components/ThemedText';
import { ThemedSeparator } from '@/components/themedSeparator';
import { ThemedField } from '@/components/ThemedField';
import { ThemedButton } from '@/components/ThemedButon';

import { userLogin } from '@/utils/user';
import { useNavigation } from '@react-navigation/native';

const width = '17em'

const styles = StyleSheet.create({
    titleContainer: {
        display: 'flex',
        alignItems: 'flex-start',
        // @ts-ignore
        minWidth: width,
        gap: 5,
        padding: 0,
        margin: 0,
    },
    loginContainer: {
        display: 'flex',
        // @ts-ignore
        width: width,
        gap: 15,
        padding: 0,
        margin: 0
    },
    separator: {
        marginTop: 25,
        marginBottom: 30
    },
    error: {
        // @ts-ignore
        textWrap: 'nowrap',
        fontWeight: 'bold',
        color: '#ff1900'
    },
});

export default function LoginScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    async function onPress() {
        const response = await userLogin(username, password);

        if (response?.error) {
            setErrorMessage(response.error);
            return;
        }
        localStorage.setItem('EpiTreplotToken', response.token);
        window.location.reload();
    }

    return (
        <ThemedBackground>
            <ThemedContainer style={styles.titleContainer}>
                <ThemedText type={"title"}>Think it. Make it. Maybe...</ThemedText>
                <ThemedText type={"subtitle"}>Log in to your EpiTreplot account</ThemedText>
                <ThemedSeparator style={styles.separator}/>
            </ThemedContainer>
            
            <ThemedContainer style={styles.loginContainer}>
                <ThemedField key={"username"} field={"Username"} value={username} type={'username'} onChange={(value) => {setUsername(value); setErrorMessage("")}}/>
                <ThemedField key={"password"} field={"Password"} value={password} type={'password'} onChange={(value) => {setPassword(value); setErrorMessage("")}}/>
                {errorMessage.length > 0 && <ThemedText style={styles.error} onPress={()=>{setErrorMessage("")}}>{errorMessage}</ThemedText>}
                <ThemedButton title='Login' onPress={onPress}/>
            </ThemedContainer>
        </ThemedBackground>
    );
}
