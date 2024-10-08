import { StyleSheet } from 'react-native';
import { ThemedBackground } from '@/components/ThemedBackground';
import { ThemedText } from '@/components/ThemedText';
import { ThemedContainer } from '@/components/ThemedContainer';

export default function HomeScreen() {
    return (
        <ThemedBackground>
            <ThemedContainer>
                <ThemedText>Lol t sur le home gros malin</ThemedText>
            </ThemedContainer>
        </ThemedBackground>
    );
}

const styles = StyleSheet.create({
});
