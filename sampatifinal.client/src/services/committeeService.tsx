import api from "../api/axios";

export interface CommitteeMember {
  committeeMemberId: number;
  committeeMasterId: number;
  committeeName: string;
  positionMasterId: number;
  positionName: string;
  memberName: string;
  memberImage: string;
  displayOrder: number;
  isActive: boolean;
}

export interface DropdownDto {
  value: number;
  label: string;
}

export const getAllCommitteeMembers = async (): Promise<CommitteeMember[]> => {
  const response = await api.get("/api/Admin/committee-get-all");
  return response.data.data; // Note: accessing the nested 'data' property
};

export const createCommitteeMember = async (data: FormData): Promise<void> => {
  await api.post("/api/Admin/committee-create", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateCommitteeMember = async (id: number, data: FormData): Promise<void> => {
  await api.put(`/api/Admin/committee-update/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteCommitteeMember = async (id: number): Promise<void> => {
  await api.delete(`/api/Admin/committee-delete/${id}`);
};

// Add these to committeeService.ts
export const getCommitteeDropdown = async (): Promise<DropdownDto[]> => {
  const response = await api.get("/api/Admin/committee-dropdown/committees");
  return response.data.data;
};

export const getPositionDropdown = async (): Promise<DropdownDto[]> => {
  const response = await api.get("/api/Admin/committee-dropdown/positions");
  return response.data.data;
};

