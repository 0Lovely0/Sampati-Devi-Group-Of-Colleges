import api from "../api/axios";

export interface AdoptStudent {
  studentId: number;
  studentName: string;
  course: string;
  description: string;
  photoUrl: string;
}

export interface StudentFormData {
  studentName: string;
  course: string;
  description: string;
  photo: File | null;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const createStudent = async (
  data: StudentFormData
) => {
  const formData = new FormData();

  formData.append("StudentName", data.studentName);
  formData.append("Course", data.course);
  formData.append("Description", data.description);

  if (data.photo) {
    formData.append("Photo", data.photo);
  }

  const response = await api.post(
    "/api/Admin/create-student",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const getAllStudents = async (): Promise<AdoptStudent[]> => {
  const response = await api.get<ApiResponse<AdoptStudent[]>>(
    "/api/Admin/students"
  );

  return response.data.data || [];
};

export const getStudentById = async (
  id: number
): Promise<AdoptStudent | null> => {
  const response = await api.get<ApiResponse<AdoptStudent>>(
    `/api/Admin/student/${id}`
  );

  return response.data.data || null;
};

export const updateStudent = async (
  id: number,
  data: StudentFormData
) => {
  const formData = new FormData();

  formData.append("StudentName", data.studentName);
  formData.append("Course", data.course);
  formData.append("Description", data.description);

  if (data.photo) {
    formData.append("Photo", data.photo);
  }

  const response = await api.put(
    `/api/Admin/student/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteStudent = async (id: number) => {
  const response = await api.delete(
    `/api/Admin/student/${id}`
  );

  return response.data;
};
