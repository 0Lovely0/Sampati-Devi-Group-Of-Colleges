using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace sampatiFinal.Server.Data.Entities
{
    [Table("admin_login")]
    public class AdminLogin
    {
        [Key]
        [Column("admin_id")] // 🔥 FIX
        public int AdminId { get; set; }

        [Column("admin_name")]
        public string AdminName { get; set; }

        [Column("admin_mobile")]
        public string AdminMobile { get; set; }

        [Column("admin_username")]
        public string AdminUsername { get; set; }

        [Column("admin_password")]
        public string AdminPassword { get; set; }

        [Column("admin_date")]
        public DateTime AdminDate { get; set; }

        [Column("admin_status")]
        public bool AdminStatus { get; set; }

        [Column("admin_role")]
        public string AdminRole { get; set; }
    }
}
