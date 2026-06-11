import api from "../api/axios";

export interface FacilityMaster {
  facilityMasterId: number;
  facilityName: string;
  isActive: boolean;
}

export interface Facility {
  facilityId: number;
  facilityMasterId: number;
  imageUrl: string;
  descriptionHeading: string;
  description: string;
  createdOn: string;
  facilityMaster: FacilityMaster;
}

// 1. Get All
export const getAllFacilities = async (): Promise<Facility[]> => {
  const response = await api.get("/api/Admin/GetAllFacilities");
  return response.data;
};

// 2. Get By ID
export const getFacilityById = async (id: number): Promise<Facility> => {
  const response = await api.get(`/api/Admin/getfacilitybyid/${id}`);
  return response.data;
};

// 3. Create
export const createFacility = async (data: FormData): Promise<void> => {
  await api.post("/api/Admin/create-facility", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// 4. Update
export const updateFacility = async (id: number, data: FormData): Promise<void> => {
  await api.put(`/api/Admin/update-facility/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// 5. Delete
export const deleteFacility = async (id: number): Promise<void> => {
  await api.delete(`/api/Admin/delete-facility/${id}`);
};

// import api from "../api/axios";

// export interface FacilityMaster {
//   facilityMasterId: number;
//   facilityName: string;
//   isActive: boolean;
// }

// export interface Facility {
//   facilityId: number;
//   facilityMasterId: number;
//   imageUrl: string;
//   descriptionHeading: string;
//   description: string;
//   createdOn: string;
//   facilityMaster: FacilityMaster;
// }

// interface ApiResponse<T> {
//   data: T;
// }

// // 1. Get All
// export const getAllFacilities = async (): Promise<Facility[]> => {
//   const response = await api.get<ApiResponse<Facility[]>>(
//     "/api/Admin/GetAllFacilities"
//   );
//   return response.data.data;
// };

// // 2. Get By ID
// export const getFacilityById = async (id: number): Promise<Facility> => {
//   const response = await api.get<ApiResponse<Facility>>(
//     `/api/Admin/getfacilitybyid/${id}`
//   );
//   return response.data.data;
// };

// // 3. Create
// export const createFacility = async (data: FormData): Promise<Facility> => {
//   const response = await api.post("/api/Admin/create-facility", data, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return response.data.data;
// };

// // 4. Update
// export const updateFacility = async (
//   id: number,
//   data: FormData
// ): Promise<Facility> => {
//   const response = await api.put(
//     `/api/Admin/update-facility/${id}`,
//     data,
//     {
//       headers: { "Content-Type": "multipart/form-data" },
//     }
//   );
//   return response.data.data;
// };

// // 5. Delete
// export const deleteFacility = async (id: number): Promise<void> => {
//   await api.delete(`/api/Admin/delete-facility/${id}`);
// };