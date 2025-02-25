import {StyleSheet, TextInput} from 'react-native';
import React, {memo} from 'react';

const CustomTextInput = memo(
  ({placeholder, value, handleTextChange, isSecret}) => {
    return (
      <TextInput
        style={[styles.input]}
        placeholder={placeholder}
        value={value}
        secureTextEntry={isSecret}
        onChangeText={val => handleTextChange(val)}
      />
    );
  },
);

export default CustomTextInput;

const styles = StyleSheet.create({
  input: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    paddingLeft: 10,
  },
});
