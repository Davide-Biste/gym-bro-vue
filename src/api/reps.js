import { api } from "boot/axios";

export const getReps = async (idExercise) => {
  try {
    const res = api.get(`/reps/exercise/${idExercise}`);
    return res;
  }
  catch(e){
    console.log({errorGetReps: e});
    return [];
  }
}

export const newReps = async (idExercise, rest, series, weight ) => {
  const obj = { rest, series, weight, }
  const { data: res } = api.post(`/reps/exercise/${idExercise}`, { obj });
  return res;
}

