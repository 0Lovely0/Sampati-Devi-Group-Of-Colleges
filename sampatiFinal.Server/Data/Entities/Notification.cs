using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace sampatiFinal.Server.Data.Entities
{
    public class Notification
    {
        [Key]
        public long notification_id { get; set; }

        public string? notification_sub { get; set; }
        public string? notification_des { get; set; }

        public DateTime? notification_date { get; set; }
        public bool? notification_status { get; set; }

        public string? notification_file { get; set; }

        public string? notification_cat { get; set; }

        public string? Extra1 { get; set; }
        public string? Extra2 { get; set; }
        public string? Extra3 { get; set; }

        public ICollection<NotificationDepartment> NotificationDepartments
        { get; set; } = new List<NotificationDepartment>();
    }
}