import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';

export default function ThemedImage({ imageUrl }: { imageUrl: string }) {
    const [imageUri, setImageUri] = useState(null);

    useEffect(() => {
        const loadBlobImage = async () => {
            try {
                const response = await fetch(imageUrl); // Fetch the blob
                const blob = await response.blob();
                const reader = new FileReader();

                reader.onloadend = () => {
                    setImageUri(reader.result); // Set the Base64 data URI
                };

                reader.readAsDataURL(blob); // Convert blob to Base64
            } catch (error) {
                console.error("Error loading blob:", error);
            }
        };

        loadBlobImage();
    }, [imageUrl]);

    return (
        <View>
        {imageUri ? (
            <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
        ) : (
            <Text>Loading...</Text>
        )}
        </View>
    );
}