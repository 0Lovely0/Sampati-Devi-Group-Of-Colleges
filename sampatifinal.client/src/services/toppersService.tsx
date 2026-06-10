import api from "../api/axios";
import type { Department } from "./bannerService";

export interface Topper {
  topperId: number;
  name: string;
  achievement: string;
  imagePath: string;
  rank: number;
  // --- ADD THESE NEW FIELDS ---
  degree: string;
  address: string;
  fatherName: string;
  motherName: string;
  collegeName: string;
  phoneNumber: string;
  schoolDetails: string;
  // ----------------------------
  departments: Department[];
}

export const getAllToppers = async (): Promise<Topper[]> => {
  const response = await api.get<{ data: Topper[] }>("/api/Admin/get-all-toppers");
  return response.data.data;
};

export const getTopperById = async (id: number): Promise<Topper> => {
  const response = await api.get<{ data: Topper }>(`/api/Admin/get-topper-by-id/${id}`);
  return response.data.data;
};

export const createTopper = async (data: FormData) => {
  return await api.post("/api/Admin/create-topper", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateTopper = async (data: FormData) => {
  return await api.put("/api/Admin/update-topper", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteTopper = async (id: number) => {
  return await api.delete(`/api/Admin/delete-topper/${id}`);
};