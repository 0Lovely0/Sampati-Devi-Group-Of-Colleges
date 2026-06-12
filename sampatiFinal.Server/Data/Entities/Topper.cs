using System.ComponentModel.DataAnnotations;

namespace sampatiFinal.Server.Data.Entities
{
    public class Topper
    {
        [Key]
        public int TopperId { get; set; }

        [Required, StringLength(150)]
        public string Name { get; set; }

        public string YearSemester { get; set; }
        public string CollegeRank { get; set; }
        public string UniversityRank { get; set; }
        public string Batch { get; set; }
        public string Percentile { get; set; }

        public string ImagePath { get; set; }

        public bool Status { get; set; } = true;

        // ✅ MANY TO MANY (UNCHANGED)
        public ICollection<TopperDepartment> TopperDepartments { get; set; } = new List<TopperDepartment>();
    }
}
