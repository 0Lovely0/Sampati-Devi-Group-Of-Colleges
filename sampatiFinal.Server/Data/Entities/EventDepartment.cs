namespace sampatiFinal.Server.Data.Entities
{
    public class EventDepartment
    {
        public int EventId { get; set; }
        public Event Event { get; set; }

        public int DepartmentId { get; set; }
        public Department Department { get; set; }
    }
}
