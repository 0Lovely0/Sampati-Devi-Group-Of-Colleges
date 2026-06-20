using System.ComponentModel.DataAnnotations;
namespace sampatiFinal.Server.Data.Entities
{
    public class AdmissionEnquiry
    {
        [Key]
        public int AdmissionEnquiryId { get; set; }

        [Required, StringLength(100)]
        public string StudentName { get; set; }

        [Required, StringLength(100)]
        public string FatherName { get; set; }

        [Required, StringLength(15)]
        public string MobileNumber { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public StudyMode StudyMode { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<AdmissionEnquiryDepartment> AdmissionEnquiryDepartments { get; set; }
            = new List<AdmissionEnquiryDepartment>();
    }

    public enum StudyMode
    {
        Hostelite = 1,
        DayScholar = 2
    }
}
