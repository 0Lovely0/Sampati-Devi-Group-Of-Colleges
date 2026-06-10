namespace sampatiFinal.Server.Data.Entities
{
    public class Facility
    {
        public int FacilityId { get; set; }
        public int FacilityMasterId { get; set; }
        public string ImageUrl { get; set; }
        public string DescriptionHeading { get; set; }
        public string Description { get; set; }

        public DateTime CreatedOn { get; set; }

        public FacilityMaster FacilityMaster { get; set; }
    }
}
