using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SampatiGroup.Data.Entities;
using sampatiFinal.Server.Data.Entities;

namespace sampatiFinal.Server.Data
{
    public class SchoolDbContext : DbContext
    {
        public SchoolDbContext(DbContextOptions<SchoolDbContext> options)
            : base(options)
        {
        }
        public DbSet<AdminLogin> AdminLogin { get; set; }
        public DbSet<Video> Video { get; set; }
        public DbSet<VideoDepartment> VideoDepartment { get; set; }
        public DbSet<Gallery> Gallery { get; set; }
        public DbSet<GalleryCategoryDepartment> GalleryCategoryDepartments { get; set; }
        public DbSet<GalleryDepartment> GalleryDepartment { get; set; }

        public DbSet<GalleryCategory> GalleryCategories { get; set; }
        public DbSet<Department> department { get; set; }

        public DbSet<StaffMaster> staff_master { get; set; }
        public DbSet<Notification> notification { get; set; }
        public DbSet<NewsMaster> NewsMasters { get; set; }
        public DbSet<BannerMaster> banner_master { get; set; }
        public DbSet<BannerDepartment> bannerdepartment { get; set; }
        public DbSet<NotificationDepartment> notificationdepartment { get; set; }
        public DbSet<NewsDepartment> newsdepartment { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<EventDepartment> EventDepartments { get; set; }
        public DbSet<Topper> Toppers { get; set; }
        public DbSet<TopperDepartment> TopperDepartments { get; set; }
        public DbSet<CommitteeMember> CommitteeMembers { get; set; }
        public DbSet<CommitteeMaster> CommitteeMasters { get; set; }
        public DbSet<PositionMaster> PositionMasters { get; set; }
        public DbSet<Facility> Facilities { get; set; }
        public DbSet<FacilityMaster> FacilityMasters { get; set; }
        public DbSet<Placement> Placements { get; set; }
        public DbSet<PlacementDepartment> PlacementDepartments { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BannerDepartment>()
                .HasOne(bd => bd.Banner)
                .WithMany(b => b.BannerDepartments)
                .HasForeignKey(bd => bd.BannerId);

            modelBuilder.Entity<BannerDepartment>()
                .HasOne(bd => bd.Department)
                .WithMany(d => d.BannerDepartments)
                .HasForeignKey(bd => bd.DepartmentId);

            // Gallery ↔ Department

            modelBuilder.Entity<GalleryDepartment>()
                .HasOne(gd => gd.Gallery)
                .WithMany(g => g.GalleryDepartments)
                .HasForeignKey(gd => gd.GalleryId);

            modelBuilder.Entity<GalleryDepartment>()
                .HasOne(gd => gd.Department)
                .WithMany(d => d.GalleryDepartments)
                .HasForeignKey(gd => gd.DepartmentId);
            modelBuilder.Entity<VideoDepartment>()
        .HasKey(vd => new { vd.VideoId, vd.DepartmentId });

            modelBuilder.Entity<VideoDepartment>()
                .HasOne(vd => vd.Video)
                .WithMany(v => v.VideoDepartments)
                .HasForeignKey(vd => vd.VideoId);

            modelBuilder.Entity<VideoDepartment>()
                .HasOne(vd => vd.Department)
                .WithMany(d => d.VideoDepartments)
                .HasForeignKey(vd => vd.DepartmentId);

            modelBuilder.Entity<EventDepartment>()
        .HasKey(ed => new { ed.EventId, ed.DepartmentId });

            modelBuilder.Entity<EventDepartment>()
                .HasOne(ed => ed.Event)
                .WithMany(e => e.EventDepartments)
                .HasForeignKey(ed => ed.EventId);

            modelBuilder.Entity<EventDepartment>()
                .HasOne(ed => ed.Department)
                .WithMany()
                .HasForeignKey(ed => ed.DepartmentId);
            modelBuilder.Entity<TopperDepartment>()
        .HasKey(td => new { td.TopperId, td.DepartmentId });

            modelBuilder.Entity<TopperDepartment>()
                .HasOne(td => td.Topper)
                .WithMany(t => t.TopperDepartments)
                .HasForeignKey(td => td.TopperId);

            modelBuilder.Entity<TopperDepartment>()
                .HasOne(td => td.Department)
                .WithMany()
                .HasForeignKey(td => td.DepartmentId);

            modelBuilder.Entity<PlacementDepartment>()
    .HasKey(pd => new { pd.PlacementId, pd.DepartmentId });

            modelBuilder.Entity<PlacementDepartment>()
                .HasOne(pd => pd.Placement)
                .WithMany(p => p.PlacementDepartments)
                .HasForeignKey(pd => pd.PlacementId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PlacementDepartment>()
                .HasOne(pd => pd.Department)
                .WithMany(d => d.PlacementDepartments)
                .HasForeignKey(pd => pd.DepartmentId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
