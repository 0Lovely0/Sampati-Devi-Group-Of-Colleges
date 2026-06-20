using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("apply_now_inquiries")]
public class ApplyNow
{
    [Key]
    public int Id { get; set; }
    public string FormType { get; set; }
    public string Name { get; set; }
    public string FatherName { get; set; }
    public string MobileNumber { get; set; }
    public string Email { get; set; }
    public string? Course { get; set; }
    public string? EducationLevel { get; set; }
    public string PreferredMode { get; set; }

    [Column("CreatedAt")]
    public DateTime CreatedDate { get; set; }
}
