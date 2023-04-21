import { api } from "boot/axios";
import { useRepsStore } from "stores/reps";

export const getReps = async (idExercise) => {
  try {
    const { data: res } = await api.get(`/reps/exercise/${idExercise}`);
    const reps = useRepsStore();
    await reps.initReps();
    await reps.firstSetReps(res);
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
  const reps = useRepsStore();
  await reps.pushReps(res);
  return res;
}

export const deleteReps = async (props)=>{
  const { data: res } = await api.delete(`/reps/${props.row._id}`);
  const reps = useRepsStore();
  await reps.deleteReps(props);
  return res;
}
