using System.ComponentModel.DataAnnotations;

namespace sampatiFinal.Server.Data.Entities
{
    public class Event
    {
        [Key]
        public int EventId { get; set; }

        [Required]
        [StringLength(150)]
        public string Title { get; set; }

        [StringLength(500)]
        public string Description { get; set; }

        public DateTime EventDate { get; set; }

        public string? ImagePath { get; set; }

        public bool Status { get; set; } = true;

        public ICollection<EventDepartment> EventDepartments { get; set; } = new List<EventDepartment>();
    }
}
