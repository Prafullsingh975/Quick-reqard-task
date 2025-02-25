import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const CustomInput = ({
  field,
  form,
  placeholder,
  secureTextEntry,
  keyboardType = 'default',
  ...props
}) => {
  const errorMessage = form.touched[field.name] && form.errors[field.name];

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, errorMessage && styles.errorInput]}
        placeholder={placeholder}
        onChangeText={form.handleChange(field.name)}
        onBlur={form.handleBlur(field.name)}
        value={field.value}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        {...props}
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  errorInput: {
    borderColor: '#ff0000',
  },
  errorText: {
    color: '#ff0000',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default CustomInput; 