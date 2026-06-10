using Microsoft.EntityFrameworkCore;
using sampatiFinal.Server.Data;
using sampatiFinal.Server.Data.Entities;
using static sampatiFinal.Server.DTO.AdminDTO;
using static sampatiFinal.Server.Services.Repositories.AdminRepository;



namespace sampatiFinal.Server.Services.Repositories
{
    public class AdminRepository : IAdminRepository
    {
        private readonly SchoolDbContext _context;

        public AdminRepository(SchoolDbContext context)
        {
            _context = context;
        }

        #region Login

        public async Task<AdminLogin> GetAdminByUsername(string username)
        {
            return await _context.AdminLogin
                .FirstOrDefaultAsync(x => x.AdminUsername == username);
        }

        #endregion

        #region Admin

        // 🟢 Create
        public async Task CreateAdmin(AdminLogin admin)
        {
            await _context.AdminLogin.AddAsync(admin);
            await _context.SaveChangesAsync();
        }

        // 🟢 Get All
        public async Task<List<AdminLogin>> GetAllAdmins()
        {
            return await _context.AdminLogin.ToListAsync();
        }

        // 🟢 Get By Id
        public async Task<AdminLogin> GetById(int id)
        {
            return await _context.AdminLogin
                .FirstOrDefaultAsync(x => x.AdminId == id);
        }

        // ✏️ Update
        public async Task UpdateAdmin(AdminLogin admin)
        {
            _context.AdminLogin.Update(admin);
            await _context.SaveChangesAsync();
        }

        // ❌ Delete
        public async Task DeleteAdmin(AdminLogin admin)
        {
            _context.AdminLogin.Remove(admin);
            await _context.SaveChangesAsync();
        }

        #endregion

        #region Video

        // 🟢 Create Video
        public async Task CreateVideo(Video video)
        {
            await _context.Video.AddAsync(video);
            await _context.SaveChangesAsync();
        }

        // 🟢 Get All Videos
        public async Task<List<Video>> GetAllVideos()
        {
            return await _context.Video
                .Include(v => v.VideoDepartments)
                .ThenInclude(vd => vd.Department)
                .ToListAsync();
        }


        // 🟢 Get Video By Id
        public async Task<Video> GetVideoById(int id)
        {
            return await _context.Video
                .Include(v => v.VideoDepartments)
                .ThenInclude(vd => vd.Department)
                .FirstOrDefaultAsync(x => x.VideoId == id);
        }

        // ✏️ Update Video
        public async Task UpdateVideo(Video video)
        {
            _context.Video.Update(video);
            await _context.SaveChangesAsync();
        }

        // ❌ Delete Video
        public async Task DeleteVideo(Video video)
        {
            _context.Video.Remove(video);
            await _context.SaveChangesAsync();
        }

        #endregion

        #region Gallery 

        // 🟢 Create Gallery
        public async Task CreateGallery(Gallery gallery)
        {
            await _context.Gallery.AddAsync(gallery);
            await _context.SaveChangesAsync();
        }

        // 🟢 Get All Gallery
        public async Task<List<Gallery>> GetAllGallery()
        {
            return await _context.Gallery.ToListAsync();
        }

        // 🟢 Get Gallery By Id
        public async Task<Gallery> GetGalleryById(long id)
        {
            return await _context.Gallery
                .Include(g => g.GalleryDepartments)
                .ThenInclude(gd => gd.Department)
                .FirstOrDefaultAsync(x => x.ImgId == id);
        }

        // ✏️ Update Gallery
        public async Task UpdateGallery(Gallery gallery)
        {
            _context.Gallery.Update(gallery);
            await _context.SaveChangesAsync();
        }

        // ❌ Delete Gallery
        public async Task DeleteGallery(Gallery gallery)
        {
            _context.Gallery.Remove(gallery);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Gallery>> GetAllGalleriesWithDepartments()
        {
            return await _context.Gallery
                .Include(g => g.GalleryDepartments)
                .ThenInclude(gd => gd.Department)
                .ToListAsync();
        }

        #endregion

        #region GalleryCategory

        public async Task CreateCategory(GalleryCategory category)
        {
            await _context.GalleryCategories.AddAsync(category);
        }

        public async Task UpdateCategory(GalleryCategory category)
        {
            var existing = await _context.GalleryCategories
                .FirstOrDefaultAsync(x => x.CatId == category.CatId);

            if (existing != null)
            {
                existing.CatName = category.CatName;
                existing.CatImage = category.CatImage;
                existing.CatDesc = category.CatDesc;
                existing.CatUdf = category.CatUdf;
                existing.CatUdf1 = category.CatUdf1;
                existing.CatStatus = category.CatStatus;
            }
        }

        public async Task<List<GalleryCategory>> GetAllGalleryCategories()
        {
            return await _context.GalleryCategories
                .Include(c => c.GalleryCategoryDepartments)
                .ThenInclude(cd => cd.Department)
                .ToListAsync();
        }

        public async Task<GalleryCategory?> GetCategoryWithDepartments(int id)
        {
            return await _context.GalleryCategories
                .Include(c => c.GalleryCategoryDepartments)
                .ThenInclude(cd => cd.Department)
                .FirstOrDefaultAsync(x => x.CatId == id);
        }

        public async Task AddCategoryDepartments(List<GalleryCategoryDepartment> mappings)
        {
            await _context.GalleryCategoryDepartments.AddRangeAsync(mappings);

        }
        public async Task RemoveCategoryDepartments(ICollection<GalleryCategoryDepartment> mappings)
        {
            _context.GalleryCategoryDepartments.RemoveRange(mappings);
        }

        public async Task<GalleryCategoryResponseDto?> GetGalleryCategoryById(int id)
        {
            var data = await _context.GalleryCategories
                .Include(c => c.GalleryCategoryDepartments)
                .ThenInclude(cd => cd.Department)
                .FirstOrDefaultAsync(x => x.CatId == id);

            if (data == null) return null;

            return new GalleryCategoryResponseDto
            {
                CatId = data.CatId,
                CatName = data.CatName,
                CatImage = data.CatImage,
                CatDesc = data.CatDesc,
                CatUdf = data.CatUdf,
                CatUdf1 = data.CatUdf1,
                CatDate = data.CatDate,
                CatStatus = data.CatStatus,

                Departments = data.GalleryCategoryDepartments
            .Select(d => new DepartmentResponseDto
            {
                DepartmentId = d.Department.DepartmentId,
                DepartmentName = d.Department.DepartmentName,
                Status = d.Department.Status
            }).ToList()
            };
        }

        public async Task<bool> DeleteGalleryCategory(int id)
        {
            var data = await _context.GalleryCategories
                .Include(c => c.GalleryCategoryDepartments)
                .FirstOrDefaultAsync(x => x.CatId == id);

            if (data == null)
                return false;

            // 🔥 First remove mappings
            _context.GalleryCategoryDepartments.RemoveRange(data.GalleryCategoryDepartments);

            // 🔥 Then remove category
            _context.GalleryCategories.Remove(data);

            return true;
        }

        #endregion

        #region News

        public async Task<List<NewsMaster>> GetAllNews()
        {
            return await _context.NewsMasters
                .Include(x => x.NewsDepartments)
                    .ThenInclude(nd => nd.Department)
                .OrderByDescending(x => x.news_date)
                .ToListAsync();
        }

        public async Task<NewsMaster?> GetNewsById(long id)
        {
            return await _context.NewsMasters
                .Include(x => x.NewsDepartments)
                    .ThenInclude(nd => nd.Department)
                .FirstOrDefaultAsync(x => x.news_id == id);
        }

        public async Task<List<NewsMaster>> GetNewsByDepartment(int departmentId)
        {
            return await _context.newsdepartment
                .Where(x => x.DepartmentId == departmentId)

                .Include(x => x.News)
                    .ThenInclude(n => n.NewsDepartments)
                        .ThenInclude(nd => nd.Department)

                .Select(x => x.News)

                .ToListAsync();
        }

        public async Task AddNews(NewsMaster model)
        {
            await _context.NewsMasters.AddAsync(model);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateNews(NewsMaster model)
        {
            _context.NewsMasters.Update(model);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteNews(long id)
        {
            var data = await _context.NewsMasters.FindAsync(id);

            if (data == null)
                return false;

            _context.NewsMasters.Remove(data);

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task AddNewsDepartments(
            List<NewsDepartment> data)
        {
            await _context.newsdepartment.AddRangeAsync(data);

            await _context.SaveChangesAsync();
        }

        public async Task UpdateNewsDepartments(
            long newsId,
            List<int> departmentIds)
        {
            var oldData = _context.newsdepartment
                .Where(x => x.NewsId == newsId);

            _context.newsdepartment.RemoveRange(oldData);

            var newData = departmentIds.Select(d => new NewsDepartment
            {
                NewsId = newsId,
                DepartmentId = d
            });

            await _context.newsdepartment.AddRangeAsync(newData);

            await _context.SaveChangesAsync();
        }

        #endregion

        #region Notification
        public async Task<List<Notification>> GetAllNotification()
        {
            return await _context.notification
                .Include(x => x.NotificationDepartments)
                    .ThenInclude(nd => nd.Department)
                .OrderByDescending(x => x.notification_date)
                .ToListAsync();
        }
        public async Task<Notification?> GetNotificationById(long id)
        {
            return await _context.notification
                .Include(x => x.NotificationDepartments)
                    .ThenInclude(nd => nd.Department)
                .FirstOrDefaultAsync(x => x.notification_id == id);
        }

        public async Task<Notification> AddNotification(Notification model)
        {
            _context.notification.Add(model);
            await _context.SaveChangesAsync();
            return model;
        }

        public async Task<Notification> UpdateNotification(Notification model)
        {
            _context.notification.Update(model);
            await _context.SaveChangesAsync();
            return model;
        }

        public async Task<bool> DeleteNotification(long id)
        {
            var data = await _context.notification.FindAsync(id);
            if (data == null) return false;

            _context.notification.Remove(data);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task AddNotificationDepartments(
    List<NotificationDepartment> data)
        {
            await _context.notificationdepartment.AddRangeAsync(data);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateNotificationDepartments(
            long notificationId,
            List<int> departmentIds)
        {
            var oldData = _context.notificationdepartment
                .Where(x => x.NotificationId == notificationId);

            _context.notificationdepartment.RemoveRange(oldData);

            var newData = departmentIds.Select(d => new NotificationDepartment
            {
                NotificationId = notificationId,
                DepartmentId = d
            });

            await _context.notificationdepartment.AddRangeAsync(newData);

            await _context.SaveChangesAsync();
        }

        public async Task<List<Notification>> GetNotificationByDepartmentAsync(int departmentId)
        {
            return await _context.notificationdepartment
                .Include(x => x.Notification)
                    .ThenInclude(n => n.NotificationDepartments)
                .Where(x => x.DepartmentId == departmentId)
                .Select(x => x.Notification)
                .ToListAsync();
        }

        #endregion

        #region Banner
        public async Task<List<BannerMaster>> GetAllBannerAsync()
        {
            return await _context.banner_master
                .Include(x => x.BannerDepartments)
.ThenInclude(bd => bd.Department)
                .OrderByDescending(x => x.BnnrDate)
                .ToListAsync();
        }

        public async Task<BannerMaster?> GetBannerByIdAsync(int id)
        {
            return await _context.banner_master
                .Include(x => x.BannerDepartments)
.ThenInclude(bd => bd.Department)
                .FirstOrDefaultAsync(x => x.BnnrId == id);
        }

        public async Task<List<BannerMaster>> GetBannerByDepartment(int departmentId)
        {
            return await _context.bannerdepartment
                .Include(x => x.Banner)
                    .ThenInclude(b => b.BannerDepartments)
                .Where(x => x.DepartmentId == departmentId)
                .Select(x => x.Banner)
                .ToListAsync();
        }

        public async Task AddBannerDepartmentsAsync(List<BannerDepartment> bannerDepartments)
        {
            await _context.bannerdepartment.AddRangeAsync(bannerDepartments);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateBannerDepartments(int bannerId, List<int> departmentIds)
        {
            // 🔥 old delete
            var old = await _context.bannerdepartment
                .Where(x => x.BannerId == bannerId)
                .ToListAsync();

            _context.bannerdepartment.RemoveRange(old);

            // 🔥 new insert
            var newMappings = departmentIds.Select(d => new BannerDepartment
            {
                BannerId = bannerId,
                DepartmentId = d
            }).ToList();

            await _context.bannerdepartment.AddRangeAsync(newMappings);

            await _context.SaveChangesAsync();
        }

        public async Task AddBannerAsync(BannerMaster banner)
        {
            await _context.banner_master.AddAsync(banner);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateBannerAsync(BannerMaster banner)
        {
            _context.banner_master.Update(banner);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteBannerAsync(int id)
        {
            var data = await _context.banner_master.FindAsync(id);
            if (data == null) return false;

            _context.banner_master.Remove(data);
            await _context.SaveChangesAsync();
            return true;
        }
        #endregion

        #region Department
        public async Task<List<Department>> GetAllDepartmentsAsync()
        {
            return await _context.department
                .OrderByDescending(x => x.DepartmentId)
                .ToListAsync();
        }

        public async Task<Department?> GetDepartmentByIdAsync(int departmentId)
        {
            return await _context.department.FindAsync(departmentId);
        }

        public async Task<Department> CreateDepartmentAsync(Department department)
        {
            _context.department.Add(department);
            await _context.SaveChangesAsync();
            return department;
        }

        public async Task<Department> UpdateDepartmentAsync(Department department)
        {
            _context.department.Update(department);
            await _context.SaveChangesAsync();
            return department;
        }

        public async Task<bool> DeleteDepartmentAsync(int departmentId)
        {
            var department = await _context.department.FindAsync(departmentId);

            if (department == null)
                return false;

            // ✅ Check in junction table
            var isUsed = await _context.notificationdepartment
                .AnyAsync(x => x.DepartmentId == departmentId);

            if (isUsed)
                return false;

            _context.department.Remove(department);

            await _context.SaveChangesAsync();

            return true;
        }


        public async Task<List<Department>> GetActiveDepartmentsAsync()
        {
            return await _context.department
                .Where(x => x.Status == true)
                .OrderBy(x => x.DepartmentName)
                .ToListAsync();
        }

        #endregion

        #region Events
        public async Task<Event> CreateAsync(Event entity)
        {
            _context.Events.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<List<Event>> GetAllAsync()
        {
            return await _context.Events
                .Include(e => e.EventDepartments)
                .ThenInclude(ed => ed.Department)
                .ToListAsync();
        }

        public async Task<Event?> GetByIdAsync(int id)
        {
            return await _context.Events
                .Include(e => e.EventDepartments)
                .ThenInclude(ed => ed.Department)
                .FirstOrDefaultAsync(e => e.EventId == id);
        }

        public async Task UpdateAsync(Event entity)
        {
            _context.Events.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Event entity)
        {
            _context.Events.Remove(entity);
            await _context.SaveChangesAsync();
        }
        #endregion

        #region 
        public async Task CreateTopperAsync(Topper topper)
        {
            await _context.Toppers.AddAsync(topper);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateTopperAsync(Topper topper)
        {
            _context.Toppers.Update(topper);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTopperAsync(Topper topper)
        {
            _context.Toppers.Remove(topper);
            await _context.SaveChangesAsync();
        }

        public async Task<Topper> GetTopperByIdAsync(int id)
        {
            return await _context.Toppers
                .Include(t => t.TopperDepartments)
                .ThenInclude(td => td.Department)
                .FirstOrDefaultAsync(t => t.TopperId == id);
        }

        public async Task<List<Topper>> GetAllToppersAsync()
        {
            return await _context.Toppers
                .Include(t => t.TopperDepartments)
                .ThenInclude(td => td.Department)
                .OrderBy(t => t.Rank)
                .ToListAsync();
        }
        #endregion

        #region committee
        public async Task<IEnumerable<CommitteeMember>> GetAllCommitteeMembersAsync()
        {
            return await _context.CommitteeMembers
                .Include(cm => cm.CommitteeMaster)
                .Include(cm => cm.PositionMaster)
                .OrderBy(cm => cm.CommitteeMasterId)
                .ThenBy(cm => cm.DisplayOrder)
                .ToListAsync();
        }

        public async Task<CommitteeMember?> GetCommitteeMemberByIdAsync(int committeeMemberId)
        {
            return await _context.CommitteeMembers
                .Include(cm => cm.CommitteeMaster)
                .Include(cm => cm.PositionMaster)
                .FirstOrDefaultAsync(cm => cm.CommitteeMemberId == committeeMemberId);
        }

        public async Task<CommitteeMember> AddCommitteeMemberAsync(CommitteeMember committeeMember)
        {
            committeeMember.CreatedOn = DateTime.UtcNow;
            committeeMember.IsActive = true;
            _context.CommitteeMembers.Add(committeeMember);
            await _context.SaveChangesAsync();
            return committeeMember;
        }

        public async Task<CommitteeMember> UpdateCommitteeMemberAsync(CommitteeMember committeeMember)
        {
            committeeMember.UpdatedOn = DateTime.UtcNow;
            _context.CommitteeMembers.Update(committeeMember);
            await _context.SaveChangesAsync();
            return committeeMember;
        }

        public async Task<bool> RemoveCommitteeMemberAsync(int committeeMemberId)
        {
            var committeeMember = await _context.CommitteeMembers.FindAsync(committeeMemberId);
            if (committeeMember == null) return false;

            _context.CommitteeMembers.Remove(committeeMember);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<CommitteeMaster>> GetActiveCommitteeMastersAsync()
        {
            return await _context.CommitteeMasters
                .Where(c => c.IsActive)
                .OrderBy(c => c.CommitteeName)
                .ToListAsync();
        }

        public async Task<IEnumerable<PositionMaster>> GetActivePositionMastersAsync()
        {
            return await _context.PositionMasters
                .Where(p => p.IsActive)
                .OrderBy(p => p.PositionName)
                .ToListAsync();
        }
        #endregion

        #region facility
        public async Task<IEnumerable<Facility>> GetAllFacilitiesAsync()
        {
            return await _context.Facilities
                .Include(x => x.FacilityMaster)
                .ToListAsync();
        }

        public async Task<Facility> GetFacilityByIdAsync(int id)
        {
            return await _context.Facilities
                .Include(x => x.FacilityMaster)
                .FirstOrDefaultAsync(x => x.FacilityId == id);
        }

        public async Task AddFacilityAsync(Facility facility)
        {
            await _context.Facilities.AddAsync(facility);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateFacilityAsync(Facility facility)
        {
            _context.Facilities.Update(facility);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteFacilityAsync(int id)
        {
            var data = await _context.Facilities.FindAsync(id);
            if (data != null)
            {
                _context.Facilities.Remove(data);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<FacilityMaster>> GetAllActiveFacilityMastersAsync()
        {
            return await _context.FacilityMasters
                .AsNoTracking()
                .Where(fm => fm.IsActive)   // ✅ only active records
                .OrderBy(fm => fm.FacilityName)
                .ToListAsync();
        }
        #endregion
    }
}