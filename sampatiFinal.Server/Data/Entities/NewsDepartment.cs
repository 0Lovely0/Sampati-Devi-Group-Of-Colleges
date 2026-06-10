using System.ComponentModel.DataAnnotations.Schema;

namespace sampatiFinal.Server.Data.Entities
{
    [Table("newsdepartment")]
    public class NewsDepartment
    {
        public int Id { get; set; }

        public long NewsId { get; set; }
        public NewsMaster News { get; set; }

        public int DepartmentId { get; set; }
        public Department Department { get; set; }
    }
}
