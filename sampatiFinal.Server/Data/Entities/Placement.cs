using System.ComponentModel.DataAnnotations;

namespace sampatiFinal.Server.Data.Entities
{
    public class Placement
    {
        [Key]
        public int PlacementId { get; set; }

        [Required, StringLength(150)]
        public string StudentName { get; set; }

        [Required]
        public string Batch { get; set; }

        [Required, StringLength(200)]
        public string PlacementName { get; set; }   // Hari-Har Hospital

        [Required, StringLength(150)]
        public string Location { get; set; }

        public string ImagePath { get; set; }

        public bool Status { get; set; } = true;

        // Many-to-Many
        public ICollection<PlacementDepartment> PlacementDepartments { get; set; }
            = new List<PlacementDepartment>();
    }
}
