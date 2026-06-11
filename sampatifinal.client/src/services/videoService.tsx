// import api from "../api/axios"; // Ensure this points to your axios instance
// import type { Department } from "./bannerService";

// export interface Video {
//   videoId: number;
//   videoTitle: string;
//   videoDescription: string;
//   videoUrl: string;
//   videoDate: string;
//   departments: Department[];
// }

// export const getAllVideos = async (): Promise<Video[]> => {
//   const response = await api.get<{ data: Video[] }>("/api/Admin/get-videos");
//   return response.data.data;
// };

// export const getVideoById = async (id: number): Promise<Video> => {
//   const response = await api.get<{ data: Video }>(`/api/Admin/get-video/${id}`);
//   return response.data.data;
// };

// // Since you are passing a URL (string) instead of a file, you can send JSON
// export const createVideo = async (videoData: any) => {
//   return await api.post("/api/Admin/create-video", videoData);
// };

// export const updateVideo = async (id: number, videoData: any) => {
//   return await api.put(`/api/Admin/update-video/${id}`, videoData);
// };

// export const deleteVideo = async (id: number) => {
//   return await api.delete(`/api/Admin/delete-video/${id}`);
// };


import api from "../api/axios";
import type { Department } from "./bannerService";

export interface Video {
  videoId: number;
  videoTitle: string;
  videoDescription: string;
  videoUrl: string;
  videoDate: string;
  departments: Department[];
}

type VideoPayload = Omit<Video, "videoId">;

interface ApiResponse<T> {
  data: T;
}

export const getAllVideos = async (): Promise<Video[]> => {
  const res = await api.get<ApiResponse<Video[]>>("/api/Admin/get-videos");
  return res.data.data;
};

export const getVideoById = async (id: number): Promise<Video> => {
  const res = await api.get<ApiResponse<Video>>(`/api/Admin/get-video/${id}`);
  return res.data.data;
};

export const createVideo = async (videoData: VideoPayload) => {
  return await api.post("/api/Admin/create-video", videoData);
};

export const updateVideo = async (id: number, videoData: VideoPayload) => {
  return await api.put(`/api/Admin/update-video/${id}`, videoData);
};

export const deleteVideo = async (id: number) => {
  return await api.delete(`/api/Admin/delete-video/${id}`);
};