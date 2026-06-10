import api from "../api/axios"; // Ensure this points to your correct axios instance

// --- Types ---
export interface Department {
  departmentId: number;
  departmentName: string;
  status: boolean;
}

export interface Banner {
  bnnrId: number;
  departments: Department[];
  bnnrCat: string;
  bnnrImage: string;
  bnnrDes: string;
  bnnrDate: string;
  bnnrStatus: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// --- Service Methods ---

export const getAllBanners = async (): Promise<Banner[]> => {
  const response = await api.get<ApiResponse<Banner[]>>("/api/Admin/all-banners");
  return response.data.data;
};

export const getBannerById = async (id: number): Promise<Banner> => {
  const response = await api.get<ApiResponse<Banner>>(`/api/Admin/banner/${id}`);
  return response.data.data;
};


export const getDepartments = async (): Promise<Department[]> => {
  const response = await api.get<Department[]>("/api/Admin/get_all_departments");
  return response.data;
};

export const createBanner = async (formData: FormData) => {
  const response = await api.post("/api/Admin/add-banner", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateBanner = async (id: number, formData: FormData) => {
  const response = await api.put(`/api/Admin/update-banner/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteBanner = async (id: number) => {
  const response = await api.delete(`/api/Admin/delete-banner/${id}`);
  return response.data;
};