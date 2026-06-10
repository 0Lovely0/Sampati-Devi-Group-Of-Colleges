namespace sampatiFinal.Server.Data.Entities
{
    public class VideoDepartment
    {
        public int VideoId { get; set; }
        public Video Video { get; set; }

        public int DepartmentId { get; set; }
        public Department Department { get; set; }
    }
}
