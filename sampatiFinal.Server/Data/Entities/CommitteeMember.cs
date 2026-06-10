namespace sampatiFinal.Server.Data.Entities
{
    public class CommitteeMember
    {
        public int CommitteeMemberId { get; set; }

        public int CommitteeMasterId { get; set; }

        public int PositionMasterId { get; set; }

        public string? MemberName { get; set; }

        public string? MemberImage { get; set; }

        public int DisplayOrder { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? UpdatedOn { get; set; }

        public CommitteeMaster? CommitteeMaster { get; set; }

        public PositionMaster? PositionMaster { get; set; }
    }
}
