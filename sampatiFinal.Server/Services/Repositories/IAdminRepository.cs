using sampatiFinal.Server.Data.Entities;
using static sampatiFinal.Server.DTO.AdminDTO;

namespace sampatiFinal.Server.Services.Repositories
{
    public interface IAdminRepository
    {
        #region Login

        Task<AdminLogin> GetAdminByUsername(string username);

        #endregion

        #region Admin 

        Task CreateAdmin(AdminLogin admin);

        Task<List<AdminLogin>> GetAllAdmins();

        Task<AdminLogin> GetById(int id);

        Task UpdateAdmin(AdminLogin admin);

        Task DeleteAdmin(AdminLogin admin);

        #endregion

        #region Video

        Task CreateVideo(Video video);

        Task<List<Video>> GetAllVideos();

        Task<Video> GetVideoById(int id);

        Task UpdateVideo(Video video);

        Task DeleteVideo(Video video);

        #endregion

        #region Gallery

        Task CreateGallery(Gallery gallery);

        Task<List<Gallery>> GetAllGallery();

        Task<Gallery> GetGalleryById(long id);

        Task UpdateGallery(Gallery gallery);

        Task DeleteGallery(Gallery gallery);
        Task<List<Gallery>> GetAllGalleriesWithDepartments();

        #endregion

        #region GalleryCategory

        Task CreateCategory(GalleryCategory category);
        Task UpdateCategory(GalleryCategory category);

        Task<List<GalleryCategory>> GetAllGalleryCategories();
        Task<GalleryCategory?> GetCategoryWithDepartments(int id);
        Task AddCategoryDepartments(List<GalleryCategoryDepartment> mappings);
        Task RemoveCategoryDepartments(ICollection<GalleryCategoryDepartment> mappings);

        Task<GalleryCategoryResponseDto?> GetGalleryCategoryById(int id);
        Task<bool> DeleteGalleryCategory(int id);

        #endregion

        #region News

        Task<List<NewsMaster>> GetAllNews();
        Task<NewsMaster?> GetNewsById(long id);
        Task<List<NewsMaster>> GetNewsByDepartment(int departmentId);

        Task AddNews(NewsMaster model);
        Task UpdateNews(NewsMaster model);
        Task<bool> DeleteNews(long id);

        Task AddNewsDepartments(List<NewsDepartment> data);

        Task UpdateNewsDepartments(
            long newsId,
            List<int> departmentIds
        );

        #endregion

        #region Notification

        Task<List<Notification>> GetAllNotification();
        Task<Notification?> GetNotificationById(long id); // ✅ FIX nullable
        Task<Notification> AddNotification(Notification model);
        Task<Notification> UpdateNotification(Notification model);
        Task<bool> DeleteNotification(long id);
        Task AddNotificationDepartments(List<NotificationDepartment> data);

        Task UpdateNotificationDepartments(
            long notificationId,
            List<int> departmentIds
        );
        Task<List<Notification>> GetNotificationByDepartmentAsync(int departmentId);

        #endregion

        #region Banner
        Task<List<BannerMaster>> GetAllBannerAsync();
        Task<BannerMaster?> GetBannerByIdAsync(int id);
        Task<List<BannerMaster>> GetBannerByDepartment(int departmentId);
        Task UpdateBannerDepartments(int bannerId, List<int> departmentIds);
        Task AddBannerDepartmentsAsync(List<BannerDepartment> bannerDepartments);

        Task AddBannerAsync(BannerMaster banner);
        Task UpdateBannerAsync(BannerMaster banner);
        Task<bool> DeleteBannerAsync(int id);
        #endregion

        #region  Department
        Task<List<Department>> GetAllDepartmentsAsync();
        Task<Department?> GetDepartmentByIdAsync(int departmentId);
        Task<Department> CreateDepartmentAsync(Department department);
        Task<Department> UpdateDepartmentAsync(Department department);
        Task<bool> DeleteDepartmentAsync(int departmentId);
        Task<List<Department>> GetActiveDepartmentsAsync();
        #endregion

        #region events
        Task<Event> CreateAsync(Event entity);
        Task<Event?> GetByIdAsync(int id);
        Task<List<Event>> GetAllAsync();
        Task UpdateAsync(Event entity);
        Task DeleteAsync(Event entity);

        #endregion

        #region Topper
        Task CreateTopperAsync(Topper topper);
        Task UpdateTopperAsync(Topper topper);
        Task DeleteTopperAsync(Topper topper);
        Task<Topper> GetTopperByIdAsync(int id);
        Task<List<Topper>> GetAllToppersAsync();
        #endregion


        #region committe

        Task<IEnumerable<CommitteeMember>> GetAllCommitteeMembersAsync();
        Task<CommitteeMember?> GetCommitteeMemberByIdAsync(int committeeMemberId);
        Task<CommitteeMember> AddCommitteeMemberAsync(CommitteeMember committeeMember);
        Task<CommitteeMember> UpdateCommitteeMemberAsync(CommitteeMember committeeMember);
        Task<bool> RemoveCommitteeMemberAsync(int committeeMemberId);
        Task<IEnumerable<CommitteeMaster>> GetActiveCommitteeMastersAsync();
        Task<IEnumerable<PositionMaster>> GetActivePositionMastersAsync();

        #endregion

        #region facilities
        Task<IEnumerable<Facility>> GetAllFacilitiesAsync();
        Task<Facility> GetFacilityByIdAsync(int id);
        Task AddFacilityAsync(Facility facility);
        Task UpdateFacilityAsync(Facility facility);
        Task DeleteFacilityAsync(int id);
        Task<IEnumerable<FacilityMaster>> GetAllActiveFacilityMastersAsync();

        #endregion

        #region Placement
        Task CreatePlacementAsync(Placement placement);
        Task UpdatePlacementAsync(Placement placement);
        Task DeletePlacementAsync(Placement placement);
        Task<Placement> GetPlacementByIdAsync(int id);
        Task<List<Placement>> GetAllPlacementsAsync();
        #endregion

        #region AdmissionEnquiry
        Task<List<AdmissionEnquiry>> GetAllAdmissionEnquiriesAsync();
        Task<AdmissionEnquiry?> GetAdmissionEnquiryByIdAsync(int id);
        Task AddAdmissionEnquiryAsync(AdmissionEnquiry enquiry);
        Task UpdateAdmissionEnquiryAsync(AdmissionEnquiry enquiry);
        Task DeleteAdmissionEnquiryAsync(AdmissionEnquiry enquiry);
        #endregion



        #region Student Adoption

        Task CreateStudentAsync(StudentMaster student);
        Task<List<StudentMaster>> GetAllStudentsAsync();
        Task<StudentMaster?> GetStudentByIdAsync(int id);
        Task UpdateStudentAsync(StudentMaster student);
        Task DeleteStudentAsync(StudentMaster student);
        Task CreateDonationInquiryAsync(DonationInquiry inquiry);
        Task<List<DonationInquiry>> GetDonationInquiriesAsync();

        #endregion

        #region Apply Now
        Task CreateApplyNowAsync(ApplyNow applyNow);
        Task<List<ApplyNow>> GetApplyNowListAsync();
        Task<List<ApplyNow>> GetApplyNowByTypeAsync(string formType);
        Task<ApplyNow?> GetApplyNowByIdAsync(int id);
        Task DeleteApplyNowAsync(ApplyNow applyNow);

        #endregion

        #region Contact Us
        Task CreateContactMessageAsync(ContactMessage message);
        Task<List<ContactMessage>> GetAllContactMessagesAsync();

        #endregion

    }
}