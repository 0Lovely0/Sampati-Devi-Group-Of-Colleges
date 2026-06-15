import api from "../api/axios";
import type { Department } from "../services/bannerService";

export interface Event {
  eventId: number;
  title: string;
  description: string;
  eventDate: string;
  imagePath: string;
  departments: Department[];
}

/* ================= GET ALL EVENTS ================= */
export const getAllEvents = async (): Promise<Event[]> => {
  try {
    const response = await api.get<{ success: boolean; data: Event[] }>(
      "/api/Admin/get-all-events"
    );

    if (response.data?.success) {
      return response.data.data ?? [];
    }

    return [];
  } catch (error) {
    console.error("getAllEvents error:", error);
    return [];
  }
};

/* ================= GET BY ID ================= */
export const getEventById = async (id: number): Promise<Event | null> => {
  try {
    const response = await api.get<{ success: boolean; data: Event }>(
      `/api/Admin/get-event/${id}`
    );

    if (response.data?.success) {
      return response.data.data;
    }

    return null;
  } catch (error) {
    console.error("getEventById error:", error);
    return null;
  }
};

/* ================= CREATE ================= */
export const createEvent = async (eventData: FormData) => {
  try {
    const response = await api.post(
      "/api/Admin/create-event",
      eventData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response.data;
  } catch (error) {
    console.error("createEvent error:", error);
    throw error;
  }
};

/* ================= UPDATE ================= */
export const updateEvent = async (id: number, eventData: FormData) => {
  try {
    const response = await api.put(
      `/api/Admin/update-event/${id}`,
      eventData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response.data;
  } catch (error) {
    console.error("updateEvent error:", error);
    throw error;
  }
};

/* ================= DELETE ================= */
export const deleteEvent = async (id: number) => {
  try {
    const response = await api.delete(
      `/api/Admin/delete-event/${id}`
    );

    return response.data;
  } catch (error) {
    console.error("deleteEvent error:", error);
    throw error;
  }
};