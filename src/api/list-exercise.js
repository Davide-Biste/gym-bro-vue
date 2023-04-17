import { api } from "boot/axios";

export const getAllListExercise = async () => {
  try {
    const { data } = await api.get("/list-exercise");
    return data;
  }catch (e) {
    console.log({errorGetAllListExercise: e});
  }
}
