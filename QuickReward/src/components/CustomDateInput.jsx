import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DatePicker from 'react-native-date-picker';

const CustomDateInput = ({placeholder, value, handleDateChange}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    handleDateChange(date.toISOString().split('T')[0]);
  }, []);

  return (
    <>
      <View style={[styles.container]}>
        <TextInput
          style={[styles.input]}
          placeholder={placeholder}
          value={value.split('-').reverse().join('-')}
          readOnly
        />
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Text style={[styles.text]}>📅</Text>
        </TouchableOpacity>
      </View>
      <DatePicker
        modal
        mode="date"
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          handleDateChange(date.toISOString().split('T')[0]);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default CustomDateInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#000',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    flex: 1,
  },
  text: {
    fontSize: 22,
  },
});
