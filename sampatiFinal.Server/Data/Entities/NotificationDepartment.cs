using System.ComponentModel.DataAnnotations.Schema;

namespace sampatiFinal.Server.Data.Entities
{
    [Table("notificationdepartment")]
    public class NotificationDepartment
    {
        public int Id { get; set; }

        public long NotificationId { get; set; }
        public Notification Notification { get; set; }

        public int DepartmentId { get; set; }
        public Department Department { get; set; }
    }
}
