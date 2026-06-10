namespace sampatiFinal.Server.Data.Entities
{
    public class CommitteeMaster
    {
        public int CommitteeMasterId { get; set; }

        public string CommitteeName { get; set; } = string.Empty;

        public bool IsActive { get; set; }

        public ICollection<CommitteeMember> CommitteeMembers { get; set; }
            = new List<CommitteeMember>();
    }
}
