using sampatiFinal.Server.Data.Entities;
using System.ComponentModel.DataAnnotations;

namespace sampatiFinal.Server.DTO
{
    public class AdminDTO
    {
        public class CreateBannerDto
        {
            public List<int> DepartmentIds { get; set; }

            public string BnnrCat { get; set; }
            public string BnnrDes { get; set; }
            public bool BnnrStatus { get; set; }

            public IFormFile Image { get; set; }
        }

        public class UpdateBannerDto
        {
            [Required]
            public int BnnrId { get; set; }

            public List<int> DepartmentIds { get; set; }
            public string? BnnrCat { get; set; }
            public string? BnnrDes { get; set; }
            public bool? BnnrStatus { get; set; }

            public IFormFile? Image { get; set; }
        }

        public class BannerResponseDto
        {
            public int BnnrId { get; set; }

            public List<DepartmentResponseDto> Departments { get; set; }

            public string BnnrCat { get; set; }
            public string BnnrImage { get; set; }
            public string BnnrDes { get; set; }
            public DateTime BnnrDate { get; set; }
            public bool BnnrStatus { get; set; }
        }

        public class CreateStaffDto
        {
            [Required]
            public string Name { get; set; }

            [Required]
            [Phone]
            [StringLength(10)]
            public string Mobile { get; set; }

            [Required]
            [EmailAddress]
            public string Email { get; set; }

            public string Address { get; set; }
            public string Country { get; set; }
            public string State { get; set; }
            public string City { get; set; }

            [Required]
            public string Department { get; set; }

            public string Type { get; set; }
            public string Gender { get; set; }
            public DateTime? JoiningDate { get; set; }

            // ✅ FILES
            public IFormFile Photo { get; set; }
            public IFormFile Resume { get; set; }
        }

        public class CreateNewsDto
        {
            //[Required]
            public List<int> DepartmentIds { get; set; }
            [Required]
            public string news_subject { get; set; }

            [Required]
            public string news_description { get; set; }

            public IFormFile? image { get; set; }

            public bool news_status { get; set; }

            public string news_type { get; set; }

            public string news_cat { get; set; }
        }
        public class UpdateNewsDto
        {
            [Required]
            public long news_id { get; set; }

            public List<int> DepartmentIds { get; set; }
            public string news_subject { get; set; }

            public string news_description { get; set; }

            public IFormFile? image { get; set; }

            public bool? news_status { get; set; }

            public string? news_type { get; set; }

            public string? news_cat { get; set; }
        }
        public class NewsResponseDto
        {
            public long news_id { get; set; }
            public List<DepartmentResponseDto> Departments { get; set; }

            public string news_subject { get; set; }
            public string news_description { get; set; }
            public string news_images { get; set; }
            public bool news_status { get; set; }
            public DateTime news_date { get; set; }
            public string news_type { get; set; }
            public string news_cat { get; set; }
        }


        public class NotificationDTO
        {
            public long? notification_id { get; set; }

            [Required]
            public string notification_sub { get; set; }

            [Required]
            public string notification_des { get; set; }

            public DateTime? notification_date { get; set; }
            public bool? notification_status { get; set; }

            [Required]
            public string notification_cat { get; set; }

            public List<int> DepartmentIds { get; set; }

            public string? Extra1 { get; set; }
            public string? Extra2 { get; set; }
            public string? Extra3 { get; set; }
            public IFormFile? file { get; set; }
        }
        public class NotificationResponseDto
        {
            public long notification_id { get; set; }

            public string notification_sub { get; set; }
            public string notification_des { get; set; }

            public DateTime? notification_date { get; set; }
            public bool? notification_status { get; set; }

            public string notification_cat { get; set; }

            public string? notification_file { get; set; }

            public List<DepartmentResponseDto> Departments { get; set; }
        }

        public class CreateDepartmentDto
        {
            [Required]
            [StringLength(100)]
            public string DepartmentName { get; set; }
        }

        public class UpdateDepartmentDto
        {
            [Required]
            public int DepartmentId { get; set; }

            [Required]
            [StringLength(100)]
            public string DepartmentName { get; set; }
            public bool Status { get; set; }
        }

        public class DepartmentResponseDto
        {
            public int DepartmentId { get; set; }
            public string DepartmentName { get; set; }
            public bool Status { get; set; }
        }


        public class VideoDto
        {
            public string VideoTitle { get; set; }
            public string VideoDescription { get; set; }
            public string VideoUrl { get; set; }

            // ✅ MULTIPLE DEPARTMENT SELECT
            public List<int> DepartmentIds { get; set; } = new List<int>();
        }
        public class VideoResponseDto
        {
            public int VideoId { get; set; }
            public string VideoTitle { get; set; }
            public string VideoDescription { get; set; }
            public string VideoUrl { get; set; }
            public DateTime VideoDate { get; set; }
            public List<DepartmentResponseDto> Departments { get; set; }
        }

        public class GalleryCategoryDto
        {
            public string? CatName { get; set; }
            public IFormFile? CatImage { get; set; }
            public string? CatDesc { get; set; }
            public string? CatUdf { get; set; }
            public string? CatUdf1 { get; set; }
            public bool CatStatus { get; set; }

            public List<int> DepartmentIds { get; set; } = new();
        }
        public class GalleryCategoryResponseDto
        {
            public int CatId { get; set; }
            public string CatName { get; set; }
            public string CatImage { get; set; }
            public string CatDesc { get; set; }
            public string CatUdf { get; set; }
            public string CatUdf1 { get; set; }
            public DateTime CatDate { get; set; }  // ✅ add this
            public bool CatStatus { get; set; }

            public List<DepartmentResponseDto> Departments { get; set; }
        }
        public class GalleryDto
        {
            public IFormFile? ImgPic { get; set; }

            public string ImgMaincat { get; set; }

            public string ImgCat { get; set; }

            public string ImgDes { get; set; }

            public string ImgSession { get; set; }

            public string UploadedBy { get; set; }

            // 🔥 ADD THIS
            public List<int> DepartmentIds { get; set; }
        }
        public class GalleryResponseDto
        {
            public long ImgId { get; set; }
            public string ImgPic { get; set; }
            public string ImgMaincat { get; set; }
            public string ImgCat { get; set; }
            public string ImgDes { get; set; }
            public string ImgSession { get; set; }
            public string UploadedBy { get; set; }

            public List<DepartmentResponseDto> Departments { get; set; }
        }

        public class CreateEventDto
        {
            [Required]
            public string Title { get; set; }

            public string? Description { get; set; }

            [Required]
            public DateTime EventDate { get; set; }

            public IFormFile? Image { get; set; }

            public List<int> DepartmentIds { get; set; }
        }
        public class UpdateEventDto
        {
            [Required]
            public int EventId { get; set; }

            public string Title { get; set; }

            public string? Description { get; set; }

            public DateTime EventDate { get; set; }

            public IFormFile? Image { get; set; }

            public List<int> DepartmentIds { get; set; }
        }
        public class EventResponseDto
        {
            public int EventId { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public DateTime EventDate { get; set; }
            public string ImagePath { get; set; }

            public List<DepartmentResponseDto> Departments { get; set; }
        }
        public class CreateTopperDto
        {
            [Required]
            public string Name { get; set; }

            public string YearSemester { get; set; }
            public string CollegeRank { get; set; }
            public string UniversityRank { get; set; }
            public string Batch { get; set; }
            public string Percentile { get; set; }
            public List<int> DepartmentIds { get; set; }

            public IFormFile Image { get; set; }
        }

        public class UpdateTopperDto : CreateTopperDto
        {
            [Required]
            public int TopperId { get; set; }
        }
        public class TopperResponseDto
        {
            public int TopperId { get; set; }
            public string Name { get; set; }

            public string YearSemester { get; set; }
            public string CollegeRank { get; set; }
            public string UniversityRank { get; set; }
            public string Batch { get; set; }
            public string Percentile { get; set; }
            public string ImagePath { get; set; }

            public List<DepartmentResponseDto> Departments { get; set; }
        }

        // ── Dropdown ──────────────────────────────────
        public class DropdownDto
        {
            public int Value { get; set; }
            public string Label { get; set; } = string.Empty;
        }

        public class DropdownsResponseDto
        {
            public IEnumerable<DropdownDto> Committees { get; set; } = new List<DropdownDto>();
            public IEnumerable<DropdownDto> Positions { get; set; } = new List<DropdownDto>();
        }

        // ── Create ────────────────────────────────────
        public class CreateCommitteeMemberDto
        {
            public int CommitteeMasterId { get; set; }
            public int PositionMasterId { get; set; }
            public string MemberName { get; set; } = string.Empty;
            public IFormFile? MemberImage { get; set; }
            public int DisplayOrder { get; set; }
        }

        // ── Update ────────────────────────────────────
        public class UpdateCommitteeMemberDto
        {
            public int CommitteeMemberId { get; set; }
            public int CommitteeMasterId { get; set; }
            public int PositionMasterId { get; set; }
            public string MemberName { get; set; } = string.Empty;
            public IFormFile? MemberImage { get; set; }
            public int DisplayOrder { get; set; }
            public bool IsActive { get; set; }
        }

        // ── Response ──────────────────────────────────
        public class CommitteeMemberResponseDto
        {
            public int CommitteeMemberId { get; set; }
            public int CommitteeMasterId { get; set; }
            public string CommitteeName { get; set; } = string.Empty;
            public int PositionMasterId { get; set; }
            public string PositionName { get; set; } = string.Empty;
            public string MemberName { get; set; } = string.Empty;
            public string? MemberImage { get; set; }
            public int DisplayOrder { get; set; }
            public bool IsActive { get; set; }
            public DateTime CreatedOn { get; set; }
            public DateTime? UpdatedOn { get; set; }
        }

        // ── API wrapper ───────────────────────────────
        public class ApiResponse<T>
        {
            public bool Success { get; set; }
            public string Message { get; set; } = string.Empty;
            public T? Data { get; set; }

            public static ApiResponse<T> Ok(T data, string message = "Success") =>
                new() { Success = true, Message = message, Data = data };

            public static ApiResponse<T> Fail(string message) =>
                new() { Success = false, Message = message };
        }

        public class CreateFacilityDto
        {
            public int FacilityMasterId { get; set; }
            public IFormFile Image { get; set; }
            public string DescriptionHeading { get; set; }
            public string Description { get; set; }
        }

        public class CreatePlacementDto
        {
            [Required]
            public string StudentName { get; set; }

            [Required]
            public string Batch { get; set; }

            [Required]
            public string PlacementName { get; set; }

            [Required]
            public string Location { get; set; }

            public List<int> DepartmentIds { get; set; }

            public IFormFile Image { get; set; }
        }

        public class UpdatePlacementDto : CreatePlacementDto
        {
            [Required]
            public int PlacementId { get; set; }
        }

        public class PlacementResponseDto
        {
            public int PlacementId { get; set; }
            public string StudentName { get; set; }
            public string Batch { get; set; }
            public string PlacementName { get; set; }
            public string Location { get; set; }
            public string ImagePath { get; set; }

            public List<DepartmentResponseDto> Departments { get; set; }
        }

        public class CreateAdmissionEnquiryDto
        {
            public string StudentName { get; set; }
            public string FatherName { get; set; }
            public string MobileNumber { get; set; }
            public string Email { get; set; }
            public StudyMode StudyMode { get; set; }

            public List<int> DepartmentIds { get; set; }
        }
        public class UpdateAdmissionEnquiryDto
        {
            public int AdmissionEnquiryId { get; set; }

            public string StudentName { get; set; }
            public string FatherName { get; set; }
            public string MobileNumber { get; set; }
            public string Email { get; set; }
            public StudyMode StudyMode { get; set; }

            public List<int> DepartmentIds { get; set; }
        }
        public class AdmissionEnquiryResponseDto
        {
            public int AdmissionEnquiryId { get; set; }
            public string StudentName { get; set; }
            public string FatherName { get; set; }
            public string MobileNumber { get; set; }
            public string Email { get; set; }
            public string StudyMode { get; set; }

            public List<string> Departments { get; set; }
        }


        public class CreateStudentDto
        {
            public string StudentName { get; set; }
            public string Course { get; set; }
            public string Description { get; set; }

            public IFormFile? Photo { get; set; }
        }
        public class StudentResponseDto
        {
            public int StudentId { get; set; }
            public string StudentName { get; set; }
            public string Course { get; set; }
            public string Description { get; set; }
            public string PhotoUrl { get; set; }
        }
        public class ApplyNowDto
        {
            public int Id { get; set; }
            public string FormType { get; set; }
            public string Name { get; set; }
            public string FatherName { get; set; }
            public string MobileNumber { get; set; }
            public string Email { get; set; }
            public string? Course { get; set; }
            public string? EducationLevel { get; set; }
            public string PreferredMode { get; set; }
        }
        public class ContactMessageDto
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Email { get; set; }
            public string Subject { get; set; }
            public string Message { get; set; }
            public DateTime CreatedDate { get; set; }
        }

    }
}
