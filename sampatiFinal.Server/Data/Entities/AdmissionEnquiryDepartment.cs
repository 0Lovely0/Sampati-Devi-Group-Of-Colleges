namespace sampatiFinal.Server.Data.Entities
{
    public class AdmissionEnquiryDepartment
    {
        public int AdmissionEnquiryId { get; set; }
        public AdmissionEnquiry AdmissionEnquiry { get; set; }

        public int DepartmentId { get; set; }
        public Department Department { get; set; }
    }
}
