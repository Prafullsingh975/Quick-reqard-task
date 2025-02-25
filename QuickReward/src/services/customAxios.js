import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'http://192.168.171.139:7001';

const customAxios = axios.create({
  baseURL: `${baseURL}/api/v1/quick-reward`,
});

customAxios.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('userInfo');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default customAxios;
