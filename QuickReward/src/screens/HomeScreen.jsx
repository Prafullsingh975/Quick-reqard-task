import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {userProfile} from '../services/user';
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {resetAndNavigate} from '../utils/NavigationUtils';

const HomeScreen = () => {
  const [info, setInfo] = useState({});
  useEffect(() => {
    userProfile()
      .then(({data}) => {
        setInfo(data);
      })
      .catch(err => {
        console.error(err);
        Alert.alert('something went wrong');
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Hi, {`${info?.firstName} ${info?.lastName}`}
        </Text>
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsText}>{info?.rewardPoints || 0} pts</Text>
        </View>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.tile}>
          <Text style={styles.tileTitle}>Daily Bonus</Text>
          <Text style={styles.tileSubtext}>Claim your daily rewards!</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tile}>
          <Text style={styles.tileTitle}>Quiz Time</Text>
          <Text style={styles.tileSubtext}>
            Test your knowledge & earn points
          </Text>
        </TouchableOpacity>

        <CustomButton
          title={'Logout'}
          handlePress={async () => {
            await AsyncStorage.removeItem('userInfo');
            resetAndNavigate('Login');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  pointsContainer: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  pointsText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
    gap: 16,
  },
  tile: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  tileTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  tileSubtext: {
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen;
