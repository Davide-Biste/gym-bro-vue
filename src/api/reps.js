import { api } from "boot/axios";

export const getReps = async (idExercise) => {
  try {
    const res = await api.get(`/reps/exercise/${idExercise}`);
    console.log({reps: res});
    return res;
  }
  catch(e){
    console.log({errorGetReps: e});
    return [];
  }
}

export const newReps = async (idExercise, rest, series, weight ) => {
  const { data: res } = await api.post(`/reps/exercise/${idExercise}`, {
      rest: rest,
      series: series,
      weight: weight,
});
  return res;
}
