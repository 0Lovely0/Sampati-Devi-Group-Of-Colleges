using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace sampatiFinal.Server.Data.Entities
{
    [Table("news_master")]
    public class NewsMaster
    {
        [Key]
        public long news_id { get; set; }

        public string? news_subject { get; set; }
        public string? news_description { get; set; }
        public string? news_images { get; set; }

        public bool? news_status { get; set; }

        public DateTime? news_date { get; set; }

        public string? news_type { get; set; }
        public string? news_cat { get; set; }

        public ICollection<NewsDepartment> NewsDepartments
        { get; set; } = new List<NewsDepartment>();
    }
}
