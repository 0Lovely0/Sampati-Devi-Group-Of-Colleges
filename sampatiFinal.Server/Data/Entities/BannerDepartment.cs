using System.ComponentModel.DataAnnotations.Schema;

namespace sampatiFinal.Server.Data.Entities
{
    [Table("bannerdepartment")]   // 🔥 THIS IS IMPORTANT
    public class BannerDepartment
    {
        public int Id { get; set; }

        public int BannerId { get; set; }
        public BannerMaster Banner { get; set; }

        public int DepartmentId { get; set; }
        public Department Department { get; set; }
    }
}
