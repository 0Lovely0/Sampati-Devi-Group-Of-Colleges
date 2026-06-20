import api from "../api/axios";

export interface ApplyNow {
  id: number;
  formType: string;
  name: string;
  fatherName: string;
  mobileNumber: string;
  email: string;
  course: string | null;
  educationLevel: string | null;
  preferredMode: string | null;
}

export interface ApplyNowPayload {
  formType: string;
  name: string;
  fatherName: string;
  mobileNumber: string;
  email: string;
  course?: string;
  educationLevel?: string;
  preferredMode?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}


// Get By Form Type
export const getApplyNowByFormType = async (
  formType: string
): Promise<ApplyNow[]> => {
  const response = await api.get(
    `/api/Admin/apply-now/${formType}`
  );

  return response.data.data;
};

// Create
export const createApplyNow = async (
  data: ApplyNowPayload
) => {
  const response = await api.post(
    "/api/Admin/apply-now",
    data
  );

  return response.data;
};

// Delete
export const deleteApplyNow = async (
  id: number
) => {
  const response = await api.delete(
    `/api/Admin/apply-now/${id}`
  );

  return response.data;
};