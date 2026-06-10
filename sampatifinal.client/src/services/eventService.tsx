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

// All endpoints now use the authorized 'api' instance
export const getAllEvents = async (): Promise<Event[]> => {
  const response = await api.get<{ data: Event[] }>("/api/Admin/get-all-events");
  return response.data.data;
};

export const getEventById = async (id: number): Promise<Event> => {
  const response = await api.get<{ data: Event }>(`/api/Admin/get-event/${id}`);
  return response.data.data;
};

export const createEvent = async (eventData: FormData) => {
  return await api.post("/api/Admin/create-event", eventData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateEvent = async (id: number, eventData: FormData) => {
  return await api.put(`/api/Admin/update-event/${id}`, eventData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteEvent = async (id: number) => {
  return await api.delete(`/api/Admin/delete-event/${id}`);
};