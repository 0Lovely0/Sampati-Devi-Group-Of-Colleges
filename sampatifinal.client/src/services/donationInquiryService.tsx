import api from "../api/axios";

export interface DonationInquiry {
  inquiryId: number;
  honorableName: string;
  phone: string;
  email: string;
  meetingDate: string;
  meetingTime: string;
  adoptionFor: string;
  studentId: number;
  studentName: string;
}

export interface CreateDonationInquiryDto {
  honorableName: string;
  phone: string;
  email: string;
  meetingDate: string;
  meetingTime: string;
  adoptionFor: string;
  studentId: number;
  studentName: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

/**
 * Create Donation Inquiry
 */
export const createDonationInquiry = async (
  data: CreateDonationInquiryDto
) => {
  const response = await api.post(
    "/api/Admin/donation-inquiry",
    data
  );

  return response.data;
};

/**
 * Get All Donation Inquiries
 */
export const getAllDonationInquiries = async (): Promise<
  DonationInquiry[]
> => {
  const response = await api.get<
    ApiResponse<DonationInquiry[]>
  >("/api/Admin/donation-inquiries");

  return response.data.data || [];
};

/**
 * Get Donation Inquiry By Id
 * (Use only if backend endpoint exists)
 */
export const getDonationInquiryById = async (
  id: number
): Promise<DonationInquiry | null> => {
  const response = await api.get<
    ApiResponse<DonationInquiry>
  >(`/api/Admin/donation-inquiry/${id}`);

  return response.data.data || null;
};

/**
 * Delete Donation Inquiry
 * (Use only if backend endpoint exists)
 */
export const deleteDonationInquiry = async (
  id: number
) => {
  const response = await api.delete(
    `/api/Admin/donation-inquiry/${id}`
  );

  return response.data;
};