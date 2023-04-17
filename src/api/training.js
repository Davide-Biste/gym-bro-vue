import {api} from 'boot/axios';
export const getAllTrainingNames = async () => {
  try {
    const { data } = await api.get('/training/name');
    return data;
  } catch (error) {
    console.log({errorGetAllTrainingNames: error});
  }
}

export const postNewTraining = async (title) => {
  try {
    const { data } = await api.post('/training', {title});
    return data;
  } catch (error) {
    console.log({errorPostNewTraining: error});
  }
}

export const getTrainingById = async (id) => {
  const {data} = await api.get("/training/id/" + id);
  return data;
}
