using sampatiFinal.Server.Data.Entities;
using static sampatiFinal.Server.DTO.AdminDTO;
using static sampatiFinal.Server.DTO.AuthDTO;

namespace sampatiFinal.Server.Services.Services
{
    public interface IAdminService
    {
        #region Login

        Task<(AdminLogin user, string token)> Login(string username, string password);

        #endregion

        #region Admin 

        Task CreateAdmin(CreateAdminDto dto);

        Task<List<AdminLogin>> GetAllAdmins();

        Task<AdminLogin> GetAdminById(int id);

        Task<bool> UpdateAdmin(int id, CreateAdminDto dto);

        Task<bool> DeleteAdmin(int id);

        #endregion

        #region Video

        Task CreateVideo(VideoDto dto);

        Task<List<VideoResponseDto>> GetAllVideos();

        Task<VideoResponseDto> GetVideoById(int id);

        Task<bool> UpdateVideo(int id, VideoDto dto);

        Task<bool> DeleteVideo(int id);

        #endregion

        #region Gallery

        Task CreateGallery(GalleryDto dto);

        Task<List<GalleryResponseDto>> GetAllGalleries();
        Task<GalleryResponseDto> GetGalleryById(long id);
        Task<bool> UpdateGallery(long id, GalleryDto dto);

        Task<bool> DeleteGallery(long id);

        #endregion

        #region GalleryCategory

        Task CreateGalleryCategory(GalleryCategoryDto dto);

        Task<bool> UpdateGalleryCategory(int id, GalleryCategoryDto dto);

        Task<List<GalleryCategoryResponseDto>> GetAllGalleryCategories();

        Task<GalleryCategoryResponseDto?> GetGalleryCategoryById(int id);

        Task<bool> DeleteGalleryCategory(int id);

        #endregion

        #region Department
        Task<List<DepartmentResponseDto>> GetAllDepartmentsAsync();
        Task<DepartmentResponseDto?> GetDepartmentByIdAsync(int departmentId);
        Task<string> CreateDepartmentAsync(CreateDepartmentDto dto);
        Task<string> UpdateDepartmentAsync(UpdateDepartmentDto dto);
        Task<string> DeleteDepartmentAsync(int departmentId);
        Task<List<DepartmentResponseDto>> GetActiveDepartmentsAsync();

        #endregion


        #region Notification

        Task<List<NotificationResponseDto>> GetAllNotificationAsync();
        Task<NotificationResponseDto?> GetNotificationByIdAsync(long id);
        Task<string> CreateNotificationAsync(NotificationDTO dto);
        Task<string> UpdateNotificationAsync(long id, NotificationDTO dto);
        Task<List<NotificationResponseDto>> GetNotificationByDepartmentAsync(int departmentId);
        Task<bool> DeleteNotificationAsync(long id);

        #endregion



        Task<object> CreateStaff(CreateStaffDto model, string createdBy);

        #region News
        Task<List<NewsResponseDto>> GetAllNews();
        Task<NewsResponseDto?> GetNewsById(long id);
        Task<List<NewsResponseDto>> GetNewsByDepartment(int departmentId);
        Task<string> CreateNews(CreateNewsDto dto);
        Task<string> UpdateNews(UpdateNewsDto dto);
        Task<string> DeleteNews(long id);
        #endregion

        #region Banner
        Task<List<BannerResponseDto>> GetAllBanner();
        Task<BannerResponseDto?> GetBannerById(int id);
        Task<List<BannerResponseDto>> GetBannerByDepartment(int departmentId);
        Task<string> CreateBanner(CreateBannerDto dto);
        Task<string> UpdateBanner(UpdateBannerDto dto);
        Task<string> DeleteBanner(int id);
        #endregion

        #region Events
            Task CreateEvent(CreateEventDto dto);
            Task UpdateEvent(UpdateEventDto dto);
            Task DeleteEvent(int id);
            Task<EventResponseDto> GetEventById(int id);
            Task<List<EventResponseDto>> GetAllEvents();
        #endregion

        #region topper
        Task CreateTopperAsync(CreateTopperDto dto);
        Task UpdateTopperAsync(UpdateTopperDto dto);
        Task DeleteTopperAsync(int id);
        Task<List<TopperResponseDto>> GetAllToppersAsync();
        Task<TopperResponseDto> GetTopperByIdAsync(int id);
        #endregion

        #region committee
        Task<IEnumerable<CommitteeMemberResponseDto>> GetAllCommitteeMembersAsync();
        Task<CommitteeMemberResponseDto?> GetCommitteeMemberByIdAsync(int committeeMemberId);
        Task<CommitteeMemberResponseDto> AddCommitteeMemberAsync(CreateCommitteeMemberDto createDto);
        Task<CommitteeMemberResponseDto> UpdateCommitteeMemberAsync(UpdateCommitteeMemberDto updateDto);
        Task<bool> RemoveCommitteeMemberAsync(int committeeMemberId);
        Task<IEnumerable<DropdownDto>> GetCommitteeMasterDropdownAsync();
        Task<IEnumerable<DropdownDto>> GetPositionMasterDropdownAsync();
        #endregion

        #region facility
        Task<IEnumerable<Facility>> GetAllFacilitiesAsync();
        Task<Facility> GetFacilityByIdAsync(int id);
        Task<string> CreateFacilityAsync(CreateFacilityDto dto);
        Task<string> UpdateFacilityAsync(int id, CreateFacilityDto dto);
        Task<string> DeleteFacilityAsync(int id);
        Task<IEnumerable<FacilityMaster>> GetAllActiveFacilityMastersAsync();

        #endregion

        #region
        Task CreatePlacementAsync(CreatePlacementDto dto);
        Task UpdatePlacementAsync(UpdatePlacementDto dto);
        Task DeletePlacementAsync(int id);
        Task<List<PlacementResponseDto>> GetAllPlacementsAsync();
        Task<PlacementResponseDto> GetPlacementByIdAsync(int id);
        #endregion
    }
}
