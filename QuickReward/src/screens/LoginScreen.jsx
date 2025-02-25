import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Formik, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {resetAndNavigate} from '../utils/NavigationUtils';
import {loginUser} from '../services/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

const validationSchema = Yup.object().shape({
  mobileNumber: Yup.string()
    .matches(/^[0-9]{10}$/, 'Please enter valid mobile number')
    .required('Mobile number is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginScreen = () => {
  const handleLogin = async (values, {setSubmitting}) => {
    try {
      const {data} = await loginUser({
        mobile: values.mobileNumber,
        password: values.password,
      });
      await AsyncStorage.setItem('userInfo', data?.token);

      resetAndNavigate('BottomTab');
    } catch (error) {
      console.log(error);

      Alert.alert('Error', 'Please check your credentials and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Welcome Back!</Text>

        <Formik
          initialValues={{
            mobileNumber: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}>
          {({handleSubmit, isSubmitting}) => (
            <View style={styles.form}>
              <Field
                component={CustomInput}
                name="mobileNumber"
                placeholder="Mobile Number"
                keyboardType="phone-pad"
                maxLength={10}
              />

              <Field
                component={CustomInput}
                name="password"
                placeholder="Password"
                secureTextEntry
              />

              <CustomButton
                title={isSubmitting ? 'Logging in...' : 'Login'}
                handlePress={handleSubmit}
                disabled={isSubmitting}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Text style={styles.loginText}>Don't have an account? </Text>
                <TouchableOpacity>
                  <Text
                    style={styles.loginBtn}
                    onPress={() => resetAndNavigate('SignupScreen')}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  signupButton: {
    backgroundColor: 'transparent',
    marginTop: 20,
  },
  signupButtonText: {
    color: '#007AFF',
  },
  loginText: {
    fontSize: 15,
    fontWeight: 500,
  },
  loginBtn: {
    fontSize: 15,
    fontWeight: 500,
    color: '#007AFF',
  },
});

export default LoginScreen;
