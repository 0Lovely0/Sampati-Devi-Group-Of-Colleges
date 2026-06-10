using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace sampatiFinal.Server.Data.Entities
{
    [Table("gallery")]
    public class Gallery
    {
        [Key]
        [Column("img_id")]
        public long ImgId { get; set; }

        [Column("img_pic")]
        public string ImgPic { get; set; }

        [Column("img_maincat")]
        public string ImgMaincat { get; set; }

        [Column("img_cat")]
        public string ImgCat { get; set; }

        [Column("img_date")]
        public DateTime ImgDate { get; set; }

        [Column("img_status")]
        public bool ImgStatus { get; set; }

        [Column("img_des")]
        public string ImgDes { get; set; }

        [Column("img_session")]
        public string ImgSession { get; set; }

        [Column("uploaded_by")]
        public string UploadedBy { get; set; }

        // 🔥 ADD THIS
        public ICollection<GalleryDepartment> GalleryDepartments { get; set; } = new List<GalleryDepartment>();
    }
}