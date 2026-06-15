import api from "../api/axios";

/* ---------------- TYPES ---------------- */

export interface Department {
  departmentId: number;
  departmentName: string;
  status: boolean;
}

export interface Placement {
  placementId: number;
  studentName: string;
  batch: string;
  placementName: string;
  location: string;
  imagePath: string;
  departments: Department[];
}

export interface GetAllPlacementsResponse {
  success: boolean;
  count: number;
  data: Placement[];
}

export interface SinglePlacementResponse {
  success: boolean;
  data: Placement;
}

/* ---------------- GET ALL ---------------- */

export const getAllPlacements = async (): Promise<Placement[]> => {
  const res = await api.get<GetAllPlacementsResponse>(
    "/api/Admin/get-all-placements"
  );
  return res.data.data;
};

/* ---------------- GET BY ID ---------------- */

export const getPlacementById = async (
  id: number
): Promise<Placement> => {
  const res = await api.get<SinglePlacementResponse>(
    `/api/Admin/get-placement-by-id/${id}`
  );
  return res.data.data;
};

/* ---------------- CREATE ---------------- */

export const createPlacement = async (
  formData: FormData
): Promise<boolean> => {
  const res = await api.post<{ success: boolean }>(
    "/api/Admin/create-placement",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data.success;
};

/* ---------------- UPDATE ---------------- */

export const updatePlacement = async (
  formData: FormData
): Promise<boolean> => {
  const res = await api.put<{ success: boolean }>(
    "/api/Admin/update-placement",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data.success;
};

/* ---------------- DELETE ---------------- */

export const deletePlacement = async (
  id: number
): Promise<boolean> => {
  const res = await api.delete<{ success: boolean }>(
    `/api/Admin/delete-placement/${id}`
  );
  return res.data.success;
};