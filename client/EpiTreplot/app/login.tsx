import { StyleSheet } from 'react-native';

import { ThemedBackground } from '@/components/ThemedBackground';
import { ThemedContainer } from '@/components/ThemedContainer';
import { ThemedText } from '@/components/ThemedText';
import { ThemedSeparator } from '@/components/themedSeparator';

const styles = StyleSheet.create({
    titleContainer: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 5,
        padding: 0,
        margin: 0
    },
    loginContainer: {
        display: 'flex',
        gap: 5,
        padding: 0,
        margin: 0
    }
});

export default function LoginScreen() {
    return (
        <ThemedBackground>
            <ThemedContainer style={styles.titleContainer}>
                <ThemedText type={"title"}>Think it. Make it. Maybe...</ThemedText>
                <ThemedText type={"subtitle"}>Log in to your EpiTreplot account</ThemedText>
                <ThemedSeparator style={{marginVertical: 15}}/>
            </ThemedContainer>
            
            <ThemedContainer style={styles.titleContainer}>
                <ThemedText>Username</ThemedText>
            </ThemedContainer>
        </ThemedBackground>
    );
}
