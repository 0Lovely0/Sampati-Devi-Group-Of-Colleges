using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace sampatiFinal.Server.Data.Entities
{
    [Table("student_master")]
    public class StudentMaster
    {
        [Key]
        public int StudentId { get; set; }

        public string StudentName { get; set; }

        public string? Course { get; set; }

        public string? Description { get; set; }

        public string? PhotoUrl { get; set; }

        public bool IsActive { get; set; } = true;

        public DateTime CreatedDate { get; set; } = DateTime.Now;

    }
    public class CreateDonationInquiryDto
    {
        public int InquiryId { get; set; }
        public string HonorableName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public DateTime MeetingDate { get; set; }
        public string MeetingTime { get; set; }
        public string AdoptionFor { get; set; }
        public int StudentId { get; set; }

        // GET list ke liye
        public string? StudentName { get; set; }
    }

}
