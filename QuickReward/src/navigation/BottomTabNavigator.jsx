import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import {View, Text} from 'react-native';

const Tab = createBottomTabNavigator();

const WalletScreen = () => (
  <View>
    <Text>Wallet</Text>
  </View>
);
const ReferFriendScreen = () => (
  <View>
    <Text>Refer Friend</Text>
  </View>
);
const LeaderboardScreen = () => (
  <View>
    <Text>Leadership Board</Text>
  </View>
);

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Refer Friend" component={ReferFriendScreen} />
      <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
