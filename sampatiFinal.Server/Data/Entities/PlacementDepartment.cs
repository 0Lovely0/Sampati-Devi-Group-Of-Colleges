namespace sampatiFinal.Server.Data.Entities
{
    public class PlacementDepartment
    {
        public int PlacementId { get; set; }
        public Placement Placement { get; set; }

        public int DepartmentId { get; set; }
        public Department Department { get; set; }
    }
}
