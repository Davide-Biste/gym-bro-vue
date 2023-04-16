import {api} from 'boot/axios';
export const getAllTrainingNames = async () => {
  try {
    const { data } = await api.get('/training/name');
    return data;
  } catch (error) {
    console.log({errorGetAllTrainingNames: error});
  }
}
