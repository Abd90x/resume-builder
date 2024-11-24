import { data } from "autoprefixer";
import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
const API_BASE_URL = import.meta.env.VITE_STRAPI_BASE_URL;

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

const CreateNewResume = (data) => axiosClient.post("/user-resumes", data);

const GetUserResumes = (userEmail) =>
  axiosClient.get(`/user-resumes?filters[userEmail][$eq]=${userEmail}`);

const GetResumeById = (id) => axiosClient.get(`/user-resumes/${id}?populate=*`);

const UpdateResumeDetail = (data, id) =>
  axiosClient.put(`/user-resumes/${id}`, data);

const DeleteResume = (id) => axiosClient.delete(`/user-resumes/${id}`);

export default {
  CreateNewResume,
  GetUserResumes,
  UpdateResumeDetail,
  GetResumeById,
  DeleteResume,
};
