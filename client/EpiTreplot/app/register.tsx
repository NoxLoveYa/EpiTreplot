import { Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';

import { ThemedBackground } from '@/components/ThemedBackground';
import { ThemedContainer } from '@/components/ThemedContainer';
import { ThemedText } from '@/components/ThemedText';
import { ThemedSeparator } from '@/components/themedSeparator';
import { ThemedField } from '@/components/ThemedField';
import { ThemedButton } from '@/components/ThemedButon';

import { useNavigation } from '@react-navigation/native';

import { userRegister } from '@/utils/user';

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
        backgroundColor: 'transparent'
    },
    RegisterContainer: {
        display: 'flex',
        // @ts-ignore
        width: width,
        gap: 15,
        padding: 0,
        margin: 0,
        backgroundColor: 'transparent'
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

export default function RegisterScreen() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigation = useNavigation();

    async function onRegisterPress() {
        const token = (await userRegister(username, email, password));
        
        if (token?.error) {
            setErrorMessage(token.error);
            return;
        }
        localStorage.setItem('EpiTreplotToken', token.token);
        window.location.reload();
    }

    function onSignUpPress() {
        // @ts-ignore
        navigation.navigate('login');
    }

    return (
        <ThemedBackground>
            <ThemedContainer style={styles.titleContainer}>
                <ThemedText type={"title"}>Think it. Make it. Maybe...</ThemedText>
                <ThemedText type={"subtitle"}>Create a new EpiTreplot account</ThemedText>
                <ThemedSeparator style={styles.separator}/>
            </ThemedContainer>
            
            <ThemedContainer style={styles.RegisterContainer}>
                <ThemedField key={"username"} field={"Username"} value={username} type={'username'} onChange={(value) => {setUsername(value); setErrorMessage("")}}/>
                <ThemedField key={"email"} field={"Email"} value={email} type={'email'} onChange={(value) => {setEmail(value); setErrorMessage("")}}/>
                <ThemedField key={"password"} field={"Password"} value={password} type={'password'} onChange={(value) => {setPassword(value); setErrorMessage("")}}/>
                {errorMessage.length > 0 && <ThemedText style={styles.error} onPress={()=>{setErrorMessage("")}}>{errorMessage}</ThemedText>}
                <ThemedButton title='Register' onPress={onRegisterPress}/>
                <ThemedText>Want to sign in? <Pressable onPress={onSignUpPress}><ThemedText type={'link'}>Login.</ThemedText></Pressable></ThemedText>
            </ThemedContainer>
        </ThemedBackground>
    );
}
