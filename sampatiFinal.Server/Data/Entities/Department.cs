using System.ComponentModel.DataAnnotations;

namespace sampatiFinal.Server.Data.Entities
{
    public class Department
    {
        [Key]
        public int DepartmentId { get; set; }   // ✅ FIXED (non-null)

        [Required]
        [StringLength(100)]
        public string DepartmentName { get; set; }

        public bool Status { get; set; } = true;   // ✅ FIXED (non-null)
        public ICollection<BannerDepartment> BannerDepartments { get; set; } = new List<BannerDepartment>();
        public ICollection<NotificationDepartment> NotificationDepartments { get; set; } = new List<NotificationDepartment>();
        public ICollection<NewsDepartment> NewsDepartments { get; set; } = new List<NewsDepartment>();
        public ICollection<GalleryDepartment> GalleryDepartments { get; set; } = new List<GalleryDepartment>();
        public ICollection<GalleryCategoryDepartment> GalleryCategoryDepartments { get; set; }
    = new List<GalleryCategoryDepartment>();
        public ICollection<VideoDepartment> VideoDepartments { get; set; } = new List<VideoDepartment>();
        public ICollection<PlacementDepartment> PlacementDepartments { get; set; }
    = new List<PlacementDepartment>();
    }
}
