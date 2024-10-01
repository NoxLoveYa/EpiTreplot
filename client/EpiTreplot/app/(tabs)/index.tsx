import { StyleSheet } from 'react-native';
import { ThemedBackground } from '@/components/ThemedBackground';
import { ThemedText } from '@/components/ThemedText';
import { useEffect } from 'react';
import { useRouter, useRootNavigationState } from 'expo-router'; // Import useRootNavigationState to check if layout is mounted

export default function IndexScreen() {
  const router = useRouter();
  const navigationState = useRootNavigationState(); // This hook helps to know when the root layout is ready

  useEffect(() => {
    const checkTokenAndNavigate = async () => {
      const token = null;

      // Wait until the root navigation state is mounted before navigating
      if (navigationState?.key && !token) {
        router.replace('/home'); // Navigate to 'home' after root layout is mounted
      }
    };

    checkTokenAndNavigate();
  }, [navigationState]); // This ensures that the effect runs again when the navigation state changes (i.e., when the layout is mounted)

  return (
    <ThemedBackground>
      <ThemedText>Index</ThemedText>
    </ThemedBackground>
  );
}

const styles = StyleSheet.create({});
