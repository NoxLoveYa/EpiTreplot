import { StyleSheet } from 'react-native';
import { ThemedBackground } from '@/components/ThemedBackground';
import { ThemedText } from '@/components/ThemedText';

export default function HomeScreen() {
    return (
    <ThemedBackground>
        <ThemedText>Lol t sur le home gros malin</ThemedText>
    </ThemedBackground>
    );
}

const styles = StyleSheet.create({
});
