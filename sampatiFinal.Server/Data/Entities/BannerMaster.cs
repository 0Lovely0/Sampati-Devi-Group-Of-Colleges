using SampatiGroup.Data.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace sampatiFinal.Server.Data.Entities
{
    [Table("banner_master")]
    public class BannerMaster
    {
        [Key]
        [Column("bnnr_id")]
        public int BnnrId { get; set; }

        [Column("bnnr_cat")]
        public string? BnnrCat { get; set; }

        [Column("bnnr_image")]
        public string? BnnrImage { get; set; }

        [Column("bnnr_des")]
        public string? BnnrDes { get; set; }

        [Column("bnnr_date")]
        public DateTime? BnnrDate { get; set; }

        [Column("bnnr_status")]
        public bool? BnnrStatus { get; set; }
        public ICollection<BannerDepartment> BannerDepartments { get; set; } = new List<BannerDepartment>();
    }
}