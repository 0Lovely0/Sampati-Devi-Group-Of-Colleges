using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace sampatiFinal.Server.Data.Entities
{
    [Table("Video")]
    public class Video
    {
        [Key]
        [Column("video_id")]
        public int VideoId { get; set; }

        [Column("video_title")]
        public string VideoTitle { get; set; }

        [Column("video_description")]
        public string VideoDescription { get; set; }

        [Column("video_url")]
        public string VideoUrl { get; set; }

        [Column("video_date")]
        public DateTime VideoDate { get; set; }

        [Column("video_status")]
        public bool VideoStatus { get; set; }

        // ✅ MANY TO MANY
        public ICollection<VideoDepartment> VideoDepartments { get; set; } = new List<VideoDepartment>();
    }
}