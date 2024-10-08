import { StyleSheet, Text, TextInput, Pressable, type ViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useState, useRef } from 'react';
import { transform } from '@babel/core';

export type ThemedFieldProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  field: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
};

export function ThemedField({ style, lightColor, darkColor, field, value, onChange, type = "default", ...otherProps }: ThemedFieldProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const tintColor = useThemeColor({ light: lightColor, dark: darkColor }, 'tintDark');
  const fieldBackgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'fieldBackground');
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'fieldBorderColour');

  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handleFocus = () => {
    setIsFocused(true);
    inputRef.current?.focus();
  };

  const handleBlur = () => {
    if (value === '') setIsFocused(false);
  };

  const labelStyle = {
    top: isFocused || value ? '18%' : '50%',
    left: 10,
    color: tintColor,
    position: 'absolute',
    translate: '0 -50%',
    transition: 'top 0.1s, left 0.1s',
    fontSize: isFocused || value ? 10 : 16,
    fontWeight: 'bold',
    zIndex: 1,
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignSelf: 'stretch',
      position: 'relative',
      borderRadius: 10,
      borderColor: borderColor,
      borderWidth: 1,
      borderStyle: 'solid'
    },
    input: {
      padding: 10,
      color,
      borderRadius: 10,
      backgroundColor: fieldBackgroundColor,
      outlineStyle: 'none'
    },
  });

  let autoComplete = 'off'
  let secureTextEntry = false
  let keyboardType = 'default'

  switch (type) {
    case 'email': {
      autoComplete = 'email'
      keyboardType = 'email-address'
      break
    }
    case 'username': {
      autoComplete: 'username'
      break;
    }
    case 'password': {
      autoComplete = 'current-password'
      secureTextEntry = true
      break
    }
  }

  return (
    <Pressable onPress={handleFocus} style={[styles.container, style]} {...otherProps}>
      <Text style={labelStyle}>{field}</Text>
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={value}
        onChangeText={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        placeholderTextColor={tintColor}
        autoComplete={autoComplete}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        selectionColor={styles.input.color}
      />
    </Pressable>
  );
}
