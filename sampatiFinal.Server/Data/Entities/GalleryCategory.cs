using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace sampatiFinal.Server.Data.Entities
{
    [Table("category_master")]
    public class GalleryCategory
    {
        [Key]
        [Column("cat_id")]
        public int CatId { get; set; }

        [Column("cat_name")]
        public string? CatName { get; set; }

        [Column("cat_image")]
        public string? CatImage { get; set; }

        [Column("cat_desc")]
        public string? CatDesc { get; set; }

        [Column("cat_udf")]
        public string? CatUdf { get; set; }

        [Column("cat_udf1")]
        public string? CatUdf1 { get; set; }

        [Column("cat_date")]
        public DateTime CatDate { get; set; }

        [Column("cat_status")]
        public bool CatStatus { get; set; }

        public ICollection<GalleryCategoryDepartment> GalleryCategoryDepartments { get; set; }
            = new List<GalleryCategoryDepartment>();
    }
}