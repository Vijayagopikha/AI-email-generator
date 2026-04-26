import axios from "axios";

export const generateEmailAPI = async (data) => {
  const res = await axios.post("http://localhost:5000/generate", data);
  return res.data.email;
};