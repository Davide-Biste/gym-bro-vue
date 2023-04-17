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
