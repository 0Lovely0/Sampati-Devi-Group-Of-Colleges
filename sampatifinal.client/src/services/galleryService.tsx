// import api from "../api/axios"; // Ensure this points to your axios instance
// import type { Department } from "./bannerService";

// export interface Gallery {
//   imgId: number;
//   imgPic: string;
//   imgMaincat: string;
//   imgCat: string;
//   imgDes: string;
//   imgSession: string;
//   uploadedBy: string;
//   departments: Department[];
// }

// export const getAllGalleries = async (): Promise<Gallery[]> => {
//   const response = await api.get<{ data: Gallery[] }>("/api/Admin/get-galleries");
//   return response.data.data;
// };

// export const createGallery = async (galleryData: FormData) => {
//   return await api.post("/api/Admin/create-gallery", galleryData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
// };

// export const updateGallery = async (id: number, galleryData: FormData) => {
//   return await api.put(`/api/Admin/update-gallery/${id}`, galleryData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
// };

// export const deleteGallery = async (id: number) => {
//   return await api.delete(`/api/Admin/delete-gallery/${id}`);
// };


import api from "../api/axios";
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

/* ================= GET ALL ================= */
export const getAllGalleries = async (): Promise<Gallery[]> => {
  try {
    const response = await api.get<{
      success: boolean;
      data: Gallery[];
    }>("/api/Admin/get-galleries");

    if (response.data?.success) {
      return response.data.data ?? [];
    }

    return [];
  } catch (error) {
    console.error("getAllGalleries error:", error);
    return [];
  }
};

/* ================= CREATE ================= */
export const createGallery = async (galleryData: FormData) => {
  try {
    const response = await api.post(
      "/api/Admin/create-gallery",
      galleryData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response.data;
  } catch (error) {
    console.error("createGallery error:", error);
    throw error;
  }
};

/* ================= UPDATE ================= */
export const updateGallery = async (id: number, galleryData: FormData) => {
  try {
    const response = await api.put(
      `/api/Admin/update-gallery/${id}`,
      galleryData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response.data;
  } catch (error) {
    console.error("updateGallery error:", error);
    throw error;
  }
};

/* ================= DELETE ================= */
export const deleteGallery = async (id: number) => {
  try {
    const response = await api.delete(
      `/api/Admin/delete-gallery/${id}`
    );

    return response.data;
  } catch (error) {
    console.error("deleteGallery error:", error);
    throw error;
  }
};