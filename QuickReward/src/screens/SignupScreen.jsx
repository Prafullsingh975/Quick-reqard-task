import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {screenWidth} from '../utils/constants';
import CustomTextInput from '../components/CustomTextInput';
import {Formik} from 'formik';
import CustomButton from '../components/CustomButton';
import CustomDateInput from '../components/CustomDateInput';
import {signUpUser} from '../services/user';
import {resetAndNavigate} from '../utils/NavigationUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={[styles.container]}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="handled">
          <Text style={styles.textHeading}>Signup</Text>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              mobile: '',
              pinCode: '',
              password: '',
              dob: '',
              referralCode: '',
            }}
            onSubmit={async (values, {resetForm}) => {
              try {
                const data = await signUpUser(values);
                await AsyncStorage.setItem('userInfo', data?.data?.token);
                Alert.alert(data.message);
                resetForm();
                resetAndNavigate('BottomTab');
              } catch (error) {
                console.log(error);
                Alert.alert('Error', 'Something went wrong during signup');
              }
            }}>
            {({handleChange, handleSubmit, values}) => (
              <View>
                <CustomTextInput
                  placeholder="First Name"
                  value={values.firstName}
                  handleTextChange={handleChange('firstName')}
                />
                <CustomTextInput
                  placeholder="Last Name"
                  value={values.lastName}
                  handleTextChange={handleChange('lastName')}
                />
                <CustomTextInput
                  placeholder="Email"
                  value={values.email}
                  handleTextChange={handleChange('email')}
                />
                <CustomTextInput
                  placeholder="Mobile"
                  value={values.mobile}
                  keyboardType="phone-pad"
                  handleTextChange={handleChange('mobile')}
                />
                <CustomDateInput
                  placeholder={'DOB'}
                  value={values.dob}
                  handleDateChange={handleChange('dob')}
                />
                <CustomTextInput
                  placeholder="Pin Code"
                  value={values.pinCode}
                  handleTextChange={handleChange('pinCode')}
                />
                <CustomTextInput
                  placeholder="Password"
                  value={values.password}
                  isSecret={true}
                  handleTextChange={handleChange('password')}
                />
                <CustomTextInput
                  placeholder="Referral Code (Optional)"
                  value={values.referralCode}
                  handleTextChange={handleChange('referralCode')}
                />
                <CustomButton handlePress={handleSubmit} title="Sign Up" />

                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <Text style={styles.loginText}>
                    Already have an account?{' '}
                  </Text>
                  <TouchableOpacity>
                    <Text
                      style={styles.loginBtn}
                      onPress={() => resetAndNavigate('Login')}>
                      Login
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 10,
  },
  textHeading: {
    fontSize: screenWidth * 0.1,
    textAlign: 'center',
    fontWeight: '800',
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
