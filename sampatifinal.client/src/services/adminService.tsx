import api from "../api/axios";

export interface Admin {
  adminId: number;
  adminName: string;
  adminMobile: string;
  adminUsername: string;
  adminDate: string;
  adminStatus: boolean;
  adminRole: string;
}

export interface CreateAdminDto {
  adminName: string;
  adminMobile: string;
  adminUsername: string;
  adminPassword: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const getAdmins = async (): Promise<Admin[]> => {
  const response = await api.get<ApiResponse<Admin[]>>(
    "/api/Auth/get-admins"
  );

  return response.data.data;
};

export const getAdminById = async (
  id: number
): Promise<Admin> => {
  const response = await api.get<ApiResponse<Admin>>(
    `/api/Auth/get-admin/${id}`
  );

  return response.data.data;
};

export const createAdmin = async (
  data: CreateAdminDto
) => {
  const response = await api.post(
    "/api/Auth/create-admin",
    data
  );

  return response.data;
};

export const updateAdmin = async (
  id: number,
  data: CreateAdminDto
) => {
  const response = await api.put(
    `/api/Auth/update-admin/${id}`,
    data
  );

  return response.data;
};

export const deleteAdmin = async (
  id: number
) => {
  const response = await api.delete(
    `/api/Auth/delete-admin/${id}`
  );

  return response.data;
};