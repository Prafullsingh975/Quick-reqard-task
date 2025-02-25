import customAxios from './customAxios';

export const signUpUser = async payload => {
  const {data} = await customAxios.post('/user/sign-up', payload);

  return data;
};

export const loginUser = async payload => {
  const {data} = await customAxios.post('/user/sign-in', payload);

  return data;
};

export const userProfile = async () => {
  const {data} = await customAxios.get('/user/profile');

  return data;
};
