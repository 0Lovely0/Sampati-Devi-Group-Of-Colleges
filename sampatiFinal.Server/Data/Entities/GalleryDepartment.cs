using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace sampatiFinal.Server.Data.Entities
{
    [Table("gallerydepartment")]
    public class GalleryDepartment
    {
        public int Id { get; set; }

        public long GalleryId { get; set; }
        [JsonIgnore]   // 🔥 VERY IMPORTANT
        public Gallery Gallery { get; set; }

        public int DepartmentId { get; set; }
        public Department Department { get; set; }
    }
}
