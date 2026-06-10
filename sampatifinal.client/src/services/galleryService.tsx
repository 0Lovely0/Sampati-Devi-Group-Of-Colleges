import api from "../api/axios"; // Ensure this points to your axios instance
import type { Department } from "./bannerService";

export interface Gallery {
  imgId: number;
  imgPic: string;
  imgMaincat: string;
  imgCat: string;
  imgDes: string;
  imgSession: string;
  uploadedBy: string;
  departments: Department[];
}

export const getAllGalleries = async (): Promise<Gallery[]> => {
  const response = await api.get<{ data: Gallery[] }>("/api/Admin/get-galleries");
  return response.data.data;
};

export const createGallery = async (galleryData: FormData) => {
  return await api.post("/api/Admin/create-gallery", galleryData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateGallery = async (id: number, galleryData: FormData) => {
  return await api.put(`/api/Admin/update-gallery/${id}`, galleryData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteGallery = async (id: number) => {
  return await api.delete(`/api/Admin/delete-gallery/${id}`);
};