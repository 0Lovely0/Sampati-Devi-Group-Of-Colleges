import api from "../api/axios";

// ================= BASE =================
const API_BASE = "/api/Admin";

// ================= TYPES =================

export interface Department {
  departmentId: number;
  departmentName: string;
  status: boolean;
}

export interface News {
  news_id: number;
  departments: Department[];
  news_subject: string;
  news_description: string;
  news_images: string;
  news_status: boolean;
  news_date: string;
  news_type: string;
  news_cat: string;
}

export interface NewsApiResponse {
  success: boolean;
  data: News[];
}

// ================= GET ALL NEWS =================
export const getAllNews = async (): Promise<News[]> => {
  try {
    const res = await api.get<NewsApiResponse>(`${API_BASE}/all-news`);
    return res.data.data;
  } catch (error) {
    console.error("getAllNews failed:", error);
    return [];
  }
};

// ================= GET NEWS BY ID =================
export const getNewsById = async (id: number): Promise<News | null> => {
  try {
    const res = await api.get<{ success: boolean; data: News }>(
      `${API_BASE}/news/${id}`
    );
    return res.data.data;
  } catch (error) {
    console.error("getNewsById failed:", error);
    return null;
  }
};

// ================= GET BY DEPARTMENT =================
export const getNewsByDepartment = async (
  departmentId: number
): Promise<News[]> => {
  try {
    const res = await api.get<NewsApiResponse>(
      `${API_BASE}/news-by-department/${departmentId}`
    );
    return res.data.data;
  } catch (error) {
    console.error("getNewsByDepartment failed:", error);
    return [];
  }
};

// ================= CREATE NEWS =================
export const createNews = async (formData: FormData) => {
  try {
    // IMPORTANT: field names MUST match backend exactly
    const data = new FormData();

    data.append("news_subject", formData.get("news_subject") as string);
    data.append("news_description", formData.get("news_description") as string);
    data.append("news_type", formData.get("news_type") as string);
    data.append("news_cat", formData.get("news_cat") as string);

    const image = formData.get("Image");
    if (image) {
      data.append("Image", image);
    }

    const departments = formData.getAll("DepartmentIds");
    departments.forEach((id) => {
      data.append("DepartmentIds", id.toString());
    });

    const res = await api.post(`${API_BASE}/add-news`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  } catch (error) {
    console.error("createNews failed:", error);
    throw error;
  }
};

// ================= UPDATE NEWS =================
export const updateNews = async (id: number, formData: FormData) => {
  try {
    const data = new FormData();

    data.append("news_subject", formData.get("news_subject") as string);
    data.append("news_description", formData.get("news_description") as string);
    data.append("news_type", formData.get("news_type") as string);
    data.append("news_cat", formData.get("news_cat") as string);

    const image = formData.get("Image");
    if (image) {
      data.append("Image", image);
    }

    const departments = formData.getAll("DepartmentIds");
    departments.forEach((id) => {
      data.append("DepartmentIds", id.toString());
    });

    const res = await api.put(`${API_BASE}/update-news/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  } catch (error) {
    console.error("updateNews failed:", error);
    throw error;
  }
};

// ================= DELETE NEWS =================
export const deleteNews = async (id: number) => {
  try {
    const res = await api.delete(`${API_BASE}/delete-news/${id}`);
    return res.data;
  } catch (error) {
    console.error("deleteNews failed:", error);
    throw error;
  }
};