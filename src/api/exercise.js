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

export const postNewExercise = async (trainingId, idList) => {
  const {data} = await api.post(`/exercise/training/${trainingId}/list/${idList}`);
  return data;
}
