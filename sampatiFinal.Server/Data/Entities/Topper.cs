using System.ComponentModel.DataAnnotations;

namespace sampatiFinal.Server.Data.Entities
{
    public class Topper
    {
        [Key]
        public int TopperId { get; set; }

        [Required, StringLength(150)]
        public string Name { get; set; }

        [Required]
        public string Achievement { get; set; }

        [Required, StringLength(150)]
        public string FatherName { get; set; }

        [Required, StringLength(150)]
        public string MotherName { get; set; }

        [Required, StringLength(200)]
        public string Degree { get; set; }

        [Required]
        public string CollegeName { get; set; }

        public string SchoolDetails { get; set; }

        [Required]
        public string Address { get; set; }

        [Required, Phone]
        public string PhoneNumber { get; set; }

        public string ImagePath { get; set; }

        [Required]
        public int Rank { get; set; }

        public bool Status { get; set; } = true;

        public ICollection<TopperDepartment> TopperDepartments { get; set; } = new List<TopperDepartment>();
    }
}
