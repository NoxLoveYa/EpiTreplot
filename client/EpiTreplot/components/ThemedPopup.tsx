import { Modal, Text, ModalProps, View, DimensionValue, StyleSheet, ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type Vector2 = {
    x: DimensionValue,
    y: DimensionValue
}

export type ThemedPopupProps = ModalProps & ViewProps & {
    lightColor?: string;
    darkColor?: string;
    position: Vector2;
    opened?: boolean;
};

export function ThemedPopup({ style, lightColor, darkColor, position, opened = true, children, ...otherProps }: ThemedPopupProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'fieldBackground');

    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            position: 'absolute',
            top: position.y,
            left: position.x,
            padding: 10,
            borderRadius: 5,
            borderWidth: 1,
            backgroundColor
        }
    });

    return (
        <Modal visible={opened} transparent={true} {...otherProps}>
            <View style={[styles.container, style]}>
                {children}
            </View>
        </Modal>
    )
}
