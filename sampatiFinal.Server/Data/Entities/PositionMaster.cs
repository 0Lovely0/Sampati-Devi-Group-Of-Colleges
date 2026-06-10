namespace sampatiFinal.Server.Data.Entities
{
    public class PositionMaster
    {
        public int PositionMasterId { get; set; }

        public string PositionName { get; set; } = string.Empty;

        public bool IsActive { get; set; }

        public ICollection<CommitteeMember> CommitteeMembers { get; set; }
            = new List<CommitteeMember>();
    }
}
