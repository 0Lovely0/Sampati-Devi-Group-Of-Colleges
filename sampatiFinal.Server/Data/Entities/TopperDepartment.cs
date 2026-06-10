namespace sampatiFinal.Server.Data.Entities
{
    public class TopperDepartment
    {
        public int TopperId { get; set; }
        public Topper Topper { get; set; }

        public int DepartmentId { get; set; }
        public Department Department { get; set; }
    }
}
