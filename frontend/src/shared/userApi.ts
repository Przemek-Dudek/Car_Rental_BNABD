import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const changePassword = async (
  passwordData: {
    currentPassword: string;
    newPassword: string;
    confirmationPassword: string;
  },
  accessToken: string
) => {
  const response = await axios.patch(`${BASE_URL}/v1/users`, passwordData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const getAllUsers = async (accessToken: string) => {
  const response = await axios.get(`${BASE_URL}/v1/users`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const deleteUser = async (id: number, accessToken: string) => {
  const response = await axios.delete(`${BASE_URL}/v1/users/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};