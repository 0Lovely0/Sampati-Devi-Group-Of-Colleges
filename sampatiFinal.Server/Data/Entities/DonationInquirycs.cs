using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("donation_inquiry")]
public class DonationInquiry
{
    [Key]
    public int Id { get; set; }

    public string HonorableName { get; set; }

    public string Phone { get; set; }

    public string Email { get; set; }

    public DateTime MeetingDate { get; set; }

    public string MeetingTime { get; set; }

    public string AdoptionFor { get; set; }

    public int StudentId { get; set; }

    public string StudentName { get; set; }

    public DateTime CreatedOn { get; set; }
}
