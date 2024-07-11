import axiosInstance from './index';
import { POST_DATA } from '../constants/Endpoints';

export const postFormData = async (userId: string | undefined, formData: any) => {
  try {
    const response = await axiosInstance.post(POST_DATA, {
      userId: userId,
      ...formData,
    });
    return response.data; 
  } catch (error) {
    throw error; 
  }
};