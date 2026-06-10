import api from "../api/axios";

/* ================= TYPES ================= */

export type Department = {
  departmentId: number;
  departmentName: string;
  status: boolean;
};

export type Notification = {
  notification_id: number;
  notification_sub: string;
  notification_des: string;
  notification_date: string;
  notification_status: boolean;
  notification_cat: string;
  notification_file: string | null;
  departments: Department[];
};

/* ================= GET ALL ================= */

export const getAllNotifications = async (): Promise<Notification[]> => {
  try {
    const res = await api.get("/api/Admin/get_allnotification");

    if (res.data?.success) return res.data.data;

    return [];
  } catch (error) {
    console.error("getAllNotifications error:", error);
    return [];
  }
};

/* ================= GET BY ID ================= */

export const getNotificationById = async (
  id: number
): Promise<Notification | null> => {
  try {
    const res = await api.get(`/api/Admin/get_notification/${id}`);

    if (res.data?.success) return res.data.data;

    return null;
  } catch (error) {
    console.error("getNotificationById error:", error);
    return null;
  }
};

/* ================= CREATE ================= */

export const createNotification = async (data: FormData) => {
  try {
    const res = await api.post(
      "/api/Admin/add-notification",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("createNotification error:", error);
    throw error;
  }
};

/* ================= UPDATE ================= */

export const updateNotification = async (
  id: number,
  data: FormData
) => {
  try {
    const res = await api.put(
      `/api/Admin/update_notification/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("updateNotification error:", error);
    throw error;
  }
};

/* ================= DELETE ================= */

export const deleteNotification = async (id: number) => {
  try {
    const res = await api.delete(
      `/api/Admin/delete_notification/${id}`
    );

    return res.data;
  } catch (error) {
    console.error("deleteNotification error:", error);
    throw error;
  }
};