import { useNavigation } from 'expo-router';

import { ThemedBackground } from '@/components/ThemedBackground';
import { ThemedContainer } from '@/components/ThemedContainer';
import { ThemedText } from '@/components/ThemedText';

export default function ProfileScreen() {

    const navigation = useNavigation();


    return (
        <ThemedBackground>
            <ThemedContainer>
                <ThemedText>Profile</ThemedText>
            </ThemedContainer>
        </ThemedBackground>
    )
}