import api from "../api/axios";

/* ---------------- TYPES ---------------- */

export interface Department {
  departmentId: number;
  departmentName: string;
  status: boolean;
}

export interface Topper {
  topperId: number;
  name: string;
  yearSemester: string;
  collegeRank: string;
  universityRank: string;
  batch: string;
  percentile: string;
  imagePath: string;
  departments: Department[];
}

export interface GetAllToppersResponse {
  success: boolean;
  count: number;
  data: Topper[];
}

/* ---------------- GET ALL ---------------- */

export const getAllToppers = async (): Promise<Topper[]> => {
  const res = await api.get<GetAllToppersResponse>(
    "/api/Admin/get-all-toppers"
  );
  return res.data.data;
};

/* ---------------- GET BY ID ---------------- */

export const getTopperById = async (id: number): Promise<Topper> => {
  const res = await api.get<{ success: boolean; data: Topper }>(
    `/api/Admin/get-topper-by-id/${id}`
  );
  return res.data.data;
};

/* ---------------- DELETE ---------------- */

export const deleteTopper = async (id: number): Promise<boolean> => {
  const res = await api.delete<{ success: boolean }>(
    `/api/Admin/delete-topper/${id}`
  );
  return res.data.success;
};

/* ---------------- CREATE (FORMDATA) ---------------- */

export const createTopper = async (formData: FormData): Promise<boolean> => {
  const res = await api.post<{ success: boolean }>(
    "/api/Admin/create-topper",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data.success;
};

/* ---------------- UPDATE (FORMDATA - IMPORTANT) ---------------- */

export const updateTopper = async (formData: FormData): Promise<boolean> => {
  const res = await api.put<{ success: boolean }>(
    "/api/Admin/update-topper",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data.success;
};