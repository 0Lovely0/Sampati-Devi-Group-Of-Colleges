using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace sampatiFinal.Server.Data.Entities
{
    [Table("gallerycategorydepartment")]
    public class GalleryCategoryDepartment
    {
        public int Id { get; set; }

        [ForeignKey("GalleryCategory")]
        public int GalleryCategoryId { get; set; }

        [JsonIgnore]
        public GalleryCategory GalleryCategory { get; set; }

        [ForeignKey("Department")]
        public int DepartmentId { get; set; }

        public Department Department { get; set; }
    }
}
