import { api } from "boot/axios";

export const getExerciseByTrainingId = async (id) => {
  try{
    const {data} = await api.get("/exercise/training/" + id);
    return data;
  }
  catch (e){
    console.log({errorGetExerciseByTrainingId: e});
  }
}

export const postNewExercise = async (trainingId, name) => {
  try{
    const {data} = await api.post(`/exercise/training/${trainingId}`,{
      name: name
    });
    return data;
  }
  catch(e){
    console.log({errorPostNewExercise: e});
  }
}
