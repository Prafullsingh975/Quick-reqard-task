import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import {resetAndNavigate} from '../utils/NavigationUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  useEffect(() => {
    const timerId = setTimeout(() => {
      AsyncStorage.getItem('userInfo').then(token => {
        if (token) {
          resetAndNavigate('BottomTab');
        } else resetAndNavigate('Login');
      });
    }, 1200);
    return () => clearTimeout(timerId);
  }, []);

  return (
    <SafeAreaView style={[styles.container]}>
      <Text style={[styles.logoText]}>Splash Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 25,
    fontWeight: '600',
  },
});

export default SplashScreen;
