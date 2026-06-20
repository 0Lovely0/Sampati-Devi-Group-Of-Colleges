using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using sampatiFinal.Server.Data;
using sampatiFinal.Server.Data.Entities;
using sampatiFinal.Server.Helper;
using sampatiFinal.Server.Services.Repositories;
using SampatiGroup.Data.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using static sampatiFinal.Server.DTO.AdminDTO;
using static sampatiFinal.Server.DTO.AuthDTO;

namespace sampatiFinal.Server.Services.Services
{
    public class AdminService : IAdminService
    {
        private readonly IAdminRepository _repo;
        private readonly IConfiguration _config;
        private readonly IWebHostEnvironment _env;
        private readonly SchoolDbContext _context;


        private static readonly string[] AllowedImageExtensions = { ".jpg", ".jpeg", ".png", ".webp" };
        private const long MaxImageSizeInBytes = 5 * 1024 * 1024; // 5 MB
        private const string ImageUploadFolder = "uploads/committee";


        public AdminService(
            SchoolDbContext context,
            IAdminRepository repo,
            IConfiguration config,
            IWebHostEnvironment env)
        {
            _repo = repo;
            _context = context;
            _config = config;
            _env = env;
        }


        #region Login

        public async Task<(AdminLogin user, string token)> Login(string username, string password)
        {
            var user = await _repo.GetAdminByUsername(username);

            if (user == null)
                return (null, null);

            if (password != user.AdminPassword)
                return (null, null);

            var token = GenerateToken(user);

            return (user, token);
        }

        #endregion

        #region Admin 

        public async Task CreateAdmin(CreateAdminDto dto)
        {
            var existingUser = await _repo.GetAdminByUsername(dto.AdminUsername);

            if (existingUser != null)
                throw new Exception("Username already exists");

            var admin = new AdminLogin
            {
                AdminName = dto.AdminName,
                AdminMobile = dto.AdminMobile,
                AdminUsername = dto.AdminUsername,
                AdminPassword = dto.AdminPassword,
                AdminRole = string.IsNullOrEmpty(dto.AdminRole)
                    ? "ADMIN"
                    : dto.AdminRole,

                AdminStatus = true,
                AdminDate = DateTime.Now
            };

            await _repo.CreateAdmin(admin);
        }

        public async Task<List<AdminLogin>> GetAllAdmins()
        {
            return await _repo.GetAllAdmins();
        }

        public async Task<AdminLogin> GetAdminById(int id)
        {
            return await _repo.GetById(id);
        }

        public async Task<bool> UpdateAdmin(int id, CreateAdminDto dto)
        {
            var admin = await _repo.GetById(id);

            if (admin == null)
                return false;

            admin.AdminName = dto.AdminName;
            admin.AdminMobile = dto.AdminMobile;
            admin.AdminUsername = dto.AdminUsername;
            admin.AdminPassword = dto.AdminPassword;
            admin.AdminRole = dto.AdminRole;

            await _repo.UpdateAdmin(admin);

            return true;
        }

        public async Task<bool> DeleteAdmin(int id)
        {
            var admin = await _repo.GetById(id);

            if (admin == null)
                return false;

            await _repo.DeleteAdmin(admin);

            return true;
        }

        #endregion

        #region Video

        public async Task CreateVideo(VideoDto dto)
        {
            var video = new Video
            {
                VideoTitle = dto.VideoTitle,
                VideoDescription = dto.VideoDescription,
                VideoUrl = dto.VideoUrl,
                VideoDate = DateTime.Now,
                VideoStatus = true
            };

            // ✅ ADD DEPARTMENTS
            video.VideoDepartments = dto.DepartmentIds
                .Select(depId => new VideoDepartment
                {
                    DepartmentId = depId
                }).ToList();

            await _repo.CreateVideo(video);
        }

        public async Task<List<VideoResponseDto>> GetAllVideos()
        {
            var videos = await _repo.GetAllVideos();

            return videos.Select(v => new VideoResponseDto
            {
                VideoId = v.VideoId,
                VideoTitle = v.VideoTitle,
                VideoDescription = v.VideoDescription,
                VideoUrl = v.VideoUrl,
                VideoDate = v.VideoDate,

                Departments = v.VideoDepartments
                    .Select(d => new DepartmentResponseDto
                    {
                        DepartmentId = d.Department.DepartmentId,
                        DepartmentName = d.Department.DepartmentName,
                        Status = d.Department.Status
                    }).ToList()
            }).ToList();
        }
        public async Task<VideoResponseDto> GetVideoById(int id)
        {
            var v = await _repo.GetVideoById(id);

            if (v == null) return null;

            return new VideoResponseDto
            {
                VideoId = v.VideoId,
                VideoTitle = v.VideoTitle,
                VideoDescription = v.VideoDescription,
                VideoUrl = v.VideoUrl,
                VideoDate = v.VideoDate,

                Departments = v.VideoDepartments
                    .Select(d => new DepartmentResponseDto
                    {
                        DepartmentId = d.Department.DepartmentId,
                        DepartmentName = d.Department.DepartmentName,
                        Status = d.Department.Status
                    }).ToList()
            };
        }

        public async Task<bool> UpdateVideo(int id, VideoDto dto)
        {
            var video = await _repo.GetVideoById(id);

            if (video == null)
                return false;

            // ✅ BASIC UPDATE
            video.VideoTitle = dto.VideoTitle;
            video.VideoDescription = dto.VideoDescription;
            video.VideoUrl = dto.VideoUrl;

            // ✅ REMOVE OLD RELATIONS
            video.VideoDepartments.Clear();

            // ✅ ADD NEW RELATIONS
            video.VideoDepartments = dto.DepartmentIds
                .Select(depId => new VideoDepartment
                {
                    VideoId = id,
                    DepartmentId = depId
                }).ToList();

            await _repo.UpdateVideo(video);

            return true;
        }

        public async Task<bool> DeleteVideo(int id)
        {
            var video = await _repo.GetVideoById(id);

            if (video == null)
                return false;

            await _repo.DeleteVideo(video);

            return true;
        }

        #endregion

        #region Gallery

        public async Task CreateGallery(GalleryDto dto)
        {
            string imagePath = await ImageUploader.SaveFileAsync(
                dto.ImgPic,
                "gallery",
                _env.WebRootPath);

            var gallery = new Gallery
            {
                ImgPic = imagePath,
                ImgMaincat = dto.ImgMaincat,
                ImgCat = dto.ImgCat,
                ImgDes = dto.ImgDes,
                ImgSession = dto.ImgSession,
                UploadedBy = dto.UploadedBy,
                ImgDate = DateTime.Now,
                ImgStatus = true
            };

            await _context.Gallery.AddAsync(gallery);
            await _context.SaveChangesAsync();

            // 🔥 MANY TO MANY INSERT
            foreach (var deptId in dto.DepartmentIds)
            {
                await _context.GalleryDepartment.AddAsync(new GalleryDepartment
                {
                    GalleryId = gallery.ImgId,
                    DepartmentId = deptId
                });
            }

            await _context.SaveChangesAsync();
        }

        public async Task<List<GalleryResponseDto>> GetAllGalleries()
        {
            var data = await _repo.GetAllGalleriesWithDepartments();

            return data.Select(g => new GalleryResponseDto
            {
                ImgId = g.ImgId,
                ImgPic = g.ImgPic,
                ImgMaincat = g.ImgMaincat,
                ImgCat = g.ImgCat,
                ImgDes = g.ImgDes,
                ImgSession = g.ImgSession,
                UploadedBy = g.UploadedBy,

                Departments = g.GalleryDepartments
                    .Select(d => new DepartmentResponseDto
                    {
                        DepartmentId = d.Department.DepartmentId,
                        DepartmentName = d.Department.DepartmentName,
                        Status = d.Department.Status
                    }).ToList()
            }).ToList();
        }

        public async Task<GalleryResponseDto> GetGalleryById(long id)
        {
            var gallery = await _repo.GetGalleryById(id);

            if (gallery == null) return null;

            return new GalleryResponseDto
            {
                ImgId = gallery.ImgId,
                ImgPic = gallery.ImgPic,
                ImgMaincat = gallery.ImgMaincat,
                ImgCat = gallery.ImgCat,
                ImgDes = gallery.ImgDes,
                ImgSession = gallery.ImgSession,
                UploadedBy = gallery.UploadedBy,

                Departments = gallery.GalleryDepartments
                    .Select(d => new DepartmentResponseDto
                    {
                        DepartmentId = d.Department.DepartmentId,
                        DepartmentName = d.Department.DepartmentName,
                        Status = d.Department.Status
                    }).ToList()
            };
        }

        public async Task<bool> UpdateGallery(long id, GalleryDto dto)
        {
            var oldData = await _context.Gallery
                .Include(g => g.GalleryDepartments)
                .FirstOrDefaultAsync(x => x.ImgId == id);

            if (oldData == null)

                return false;

            // 🖼️ Image Update
            string imagePath = oldData.ImgPic;

            if (dto.ImgPic != null)
            {
                imagePath = await ImageUploader.SaveFileAsync(
                    dto.ImgPic,
                    "gallery",
                    _env.WebRootPath,
                    oldData.ImgPic);
            }

            // ✏️ Update Fields
            oldData.ImgPic = imagePath;
            oldData.ImgMaincat = dto.ImgMaincat;
            oldData.ImgCat = dto.ImgCat;
            oldData.ImgDes = dto.ImgDes;
            oldData.ImgSession = dto.ImgSession;
            oldData.UploadedBy = dto.UploadedBy;

            // 🔥 REMOVE OLD DEPARTMENTS
            _context.GalleryDepartment.RemoveRange(oldData.GalleryDepartments);

            // 🔥 ADD NEW DEPARTMENTS
            foreach (var deptId in dto.DepartmentIds)
            {
                await _context.GalleryDepartment.AddAsync(new GalleryDepartment
                {
                    GalleryId = oldData.ImgId,
                    DepartmentId = deptId
                });
            }

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteGallery(long id)
        {
            var gallery = await _repo.GetGalleryById(id);

            if (gallery == null)
                return false;

            await _repo.DeleteGallery(gallery);

            return true;
        }

        #endregion

        #region JWT

        private string GenerateToken(AdminLogin user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.AdminUsername),
                new Claim(ClaimTypes.Role, user.AdminRole),
                new Claim(JwtRegisteredClaimNames.Sub, user.AdminId.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var jwtKey = _config["Jwt:Key"]
                ?? throw new Exception("JWT Key missing");

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtKey));

            var creds = new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler()
                .WriteToken(token);
        }

        #endregion

        #region GalleryCategory

        public async Task CreateGalleryCategory(GalleryCategoryDto dto)
        {
            string imagePath = await ImageUploader.SaveFileAsync(
                dto.CatImage,
                "gallery-category",
                _env.WebRootPath);

            var category = new GalleryCategory
            {
                CatName = dto.CatName,
                CatImage = imagePath,
                CatDesc = dto.CatDesc,
                CatUdf = dto.CatUdf,
                CatUdf1 = dto.CatUdf1,
                CatDate = DateTime.Now,
                CatStatus = dto.CatStatus
            };

            // ✅ Step 1: Save category first
            await _repo.CreateCategory(category);
            await _context.SaveChangesAsync();

            // ✅ Step 2: Add mappings
            if (dto.DepartmentIds != null && dto.DepartmentIds.Any())
            {
                var mappings = dto.DepartmentIds.Select(d => new GalleryCategoryDepartment
                {
                    GalleryCategoryId = category.CatId,
                    DepartmentId = d
                }).ToList();

                await _repo.AddCategoryDepartments(mappings);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> UpdateGalleryCategory(int id, GalleryCategoryDto dto)
        {
            var category = await _repo.GetCategoryWithDepartments(id);

            if (category == null)
                return false;

            if (dto.CatImage != null)
            {
                category.CatImage = await ImageUploader.SaveFileAsync(
                    dto.CatImage,
                    "gallery-category",
                    _env.WebRootPath,
                    category.CatImage);
            }

            category.CatName = dto.CatName;
            category.CatDesc = dto.CatDesc;
            category.CatUdf = dto.CatUdf;
            category.CatUdf1 = dto.CatUdf1;
            category.CatStatus = dto.CatStatus;

            await _repo.RemoveCategoryDepartments(category.GalleryCategoryDepartments);

            if (dto.DepartmentIds != null && dto.DepartmentIds.Any())
            {
                var mappings = dto.DepartmentIds.Select(d => new GalleryCategoryDepartment
                {
                    GalleryCategoryId = category.CatId,
                    DepartmentId = d
                }).ToList();

                await _repo.AddCategoryDepartments(mappings);
            }

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<GalleryCategoryResponseDto>> GetAllGalleryCategories()
        {
            var data = await _repo.GetAllGalleryCategories();

            return data.Select(c => new GalleryCategoryResponseDto
            {
                CatId = c.CatId,
                CatName = c.CatName,
                CatImage = c.CatImage,
                CatDesc = c.CatDesc,
                CatUdf = c.CatUdf,
                CatUdf1 = c.CatUdf1,
                CatDate = c.CatDate,
                CatStatus = c.CatStatus,

                Departments = c.GalleryCategoryDepartments
            .Select(d => new DepartmentResponseDto
            {
                DepartmentId = d.Department.DepartmentId,
                DepartmentName = d.Department.DepartmentName,
                Status = d.Department.Status
            }).ToList()
            }).ToList();
        }

        public async Task<GalleryCategory?> GetCategoryWithDepartments(int id)
        {
            return await _context.GalleryCategories
                .Include(c => c.GalleryCategoryDepartments)
                .FirstOrDefaultAsync(x => x.CatId == id);
        }



        public async Task RemoveCategoryDepartments(ICollection<GalleryCategoryDepartment> mappings)
        {
            _context.GalleryCategoryDepartments.RemoveRange(mappings);
            await _context.SaveChangesAsync();
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
            var data = await _context.GalleryCategories.FindAsync(id);

            if (data == null)
                return false;

            _context.GalleryCategories.Remove(data);
            await _context.SaveChangesAsync();

            return true;
        }

        #endregion

        #region Add Staff
        public async Task<object> CreateStaff(CreateStaffDto model, string createdBy)
        {
            var exists = _context.staff_master
                .Any(x => x.staff_email == model.Email);

            if (exists)
                throw new Exception("Staff email already exists");

            // ✅ Upload Photo
            var photoPath = await FileHelper.SaveFile(
                model.Photo,
                "uploads/photos",
                new[] { ".jpg", ".jpeg", ".png" },
                2 * 1024 * 1024 // 2MB
            );

            // ✅ Upload Resume
            var resumePath = await FileHelper.SaveFile(
                model.Resume,
                "uploads/resumes",
                new[] { ".pdf", ".doc", ".docx" },
                5 * 1024 * 1024 // 5MB
            );

            var staff = new StaffMaster
            {
                staff_name = model.Name,
                staff_mobile = model.Mobile,
                staff_email = model.Email,
                staff_address = model.Address,
                staff_country = model.Country,
                staff_state = model.State,
                staff_city = model.City,
                staff_dept = model.Department,
                staff_type = model.Type,
                staff_gender = model.Gender,

                staff_joining_date = model.JoiningDate,
                staff_status = true,
                staff_date = DateTime.Now,

                staff_photo = photoPath,
                staff_resume = resumePath,

                uploaded_by = createdBy,
                staff_session = DateTime.Now.Year.ToString()
            };

            _context.staff_master.Add(staff);
            await _context.SaveChangesAsync();

            return new
            {
                staff.staff_id,
                staff.staff_name,
                staff.staff_email,
                staff.staff_photo,
                staff.staff_resume
            };
        }
        #endregion

        #region Banner
        public async Task<List<BannerResponseDto>> GetAllBanner()
        {
            var data = await _repo.GetAllBannerAsync();

            return data.Select(x => new BannerResponseDto
            {
                BnnrId = x.BnnrId,

                // 🔥 Multiple departments
                Departments = x.BannerDepartments
                    .Select(d => new DepartmentResponseDto
                    {
                        DepartmentId = d.Department.DepartmentId,
                        DepartmentName = d.Department.DepartmentName,
                        Status = d.Department.Status
                    }).ToList(),
                BnnrCat = x.BnnrCat,
                BnnrDes = x.BnnrDes,
                BnnrImage = x.BnnrImage,
                BnnrDate = x.BnnrDate ?? DateTime.Now,
                BnnrStatus = x.BnnrStatus ?? false
            }).ToList();
        }

        public async Task<BannerResponseDto?> GetBannerById(int id)
        {
            var x = await _repo.GetBannerByIdAsync(id);
            if (x == null) return null;

            return new BannerResponseDto
            {
                BnnrId = x.BnnrId,

                // ✅ ADD THIS
                Departments = x.BannerDepartments
                    .Select(d => new DepartmentResponseDto
                    {
                        DepartmentId = d.Department.DepartmentId,
                        DepartmentName = d.Department.DepartmentName,
                        Status = d.Department.Status
                    }).ToList(),

                BnnrCat = x.BnnrCat,
                BnnrDes = x.BnnrDes,
                BnnrImage = x.BnnrImage,
                BnnrDate = x.BnnrDate ?? DateTime.Now,
                BnnrStatus = x.BnnrStatus ?? false
            };
        }
        public async Task<string> CreateBanner(CreateBannerDto dto)
        {
            var imagePath = await FileHelper.SaveFile(
                dto.Image,
                "uploads/banner",
                new[] { ".jpg", ".jpeg", ".png", ".webp" },
                2 * 1024 * 1024
            );

            var banner = new BannerMaster
            {
                BnnrCat = dto.BnnrCat,
                BnnrDes = dto.BnnrDes,
                BnnrImage = imagePath,
                BnnrDate = DateTime.Now,
                BnnrStatus = dto.BnnrStatus
            };

            await _repo.AddBannerAsync(banner);

            // 🔥 insert into junction table
            var bannerDepartments = dto.DepartmentIds.Select(d => new BannerDepartment
            {
                BannerId = banner.BnnrId,
                DepartmentId = d
            }).ToList();

            await _repo.AddBannerDepartmentsAsync(bannerDepartments);
            return "Banner created successfully";
        }

        public async Task<List<BannerResponseDto>> GetBannerByDepartment(int departmentId)
        {
            var data = await _repo.GetBannerByDepartment(departmentId);

            return data.Select(x => new BannerResponseDto
            {
                BnnrId = x.BnnrId,
                BnnrCat = x.BnnrCat,
                BnnrDes = x.BnnrDes,
                BnnrImage = x.BnnrImage,
                BnnrDate = x.BnnrDate ?? DateTime.Now,
                BnnrStatus = x.BnnrStatus ?? false
            }).ToList();
        }
        public async Task<string> UpdateBanner(UpdateBannerDto dto)
        {
            var existing = await _repo.GetBannerByIdAsync(dto.BnnrId);
            if (existing == null)
                throw new Exception("Banner not found");

            // 🔥 Image update
            if (dto.Image != null)
            {
                existing.BnnrImage = await FileHelper.SaveFile(
                    dto.Image,
                    "uploads/banner",
                    new[] { ".jpg", ".jpeg", ".png", ".webp" },
                    2 * 1024 * 1024
                );
            }

            // 🔥 Fields update
            existing.BnnrCat = dto.BnnrCat ?? existing.BnnrCat;
            existing.BnnrDes = dto.BnnrDes ?? existing.BnnrDes;
            existing.BnnrStatus = dto.BnnrStatus ?? existing.BnnrStatus;

            // 🔥 Many-to-many update
            if (dto.DepartmentIds != null && dto.DepartmentIds.Any())
            {
                await _repo.UpdateBannerDepartments(dto.BnnrId, dto.DepartmentIds);
            }

            await _repo.UpdateBannerAsync(existing);

            return "Banner updated successfully";
        }

        public async Task<string> DeleteBanner(int id)
        {
            var result = await _repo.DeleteBannerAsync(id);
            return result ? "Deleted successfully" : "Banner not found";
        }

        #endregion

        #region Department
        public async Task<List<DepartmentResponseDto>> GetAllDepartmentsAsync()
        {
            var departments = await _repo.GetAllDepartmentsAsync();

            return departments.Select(x => new DepartmentResponseDto
            {
                DepartmentId = x.DepartmentId,
                DepartmentName = x.DepartmentName,
                Status = x.Status
            }).ToList();
        }

        public async Task<List<DepartmentResponseDto>> GetActiveDepartmentsAsync()
        {
            var departments = await _repo.GetActiveDepartmentsAsync();

            return departments.Select(x => new DepartmentResponseDto
            {
                DepartmentId = x.DepartmentId,
                DepartmentName = x.DepartmentName,
                Status = x.Status
            }).ToList();
        }
        public async Task<DepartmentResponseDto?> GetDepartmentByIdAsync(int departmentId)
        {
            var department = await _repo.GetDepartmentByIdAsync(departmentId);
            if (department == null) return null;

            return new DepartmentResponseDto
            {
                DepartmentId = department.DepartmentId,
                DepartmentName = department.DepartmentName,
                Status = department.Status
            };
        }

        public async Task<string> CreateDepartmentAsync(CreateDepartmentDto dto)
        {
            var model = new Department
            {
                DepartmentName = dto.DepartmentName,
                Status = true
            };

            await _repo.CreateDepartmentAsync(model);
            return "Department created successfully";
        }

        public async Task<string> UpdateDepartmentAsync(UpdateDepartmentDto dto)
        {
            var existing = await _repo.GetDepartmentByIdAsync(dto.DepartmentId);

            if (existing == null)
                return "Department not found";

            existing.DepartmentName = dto.DepartmentName;
            existing.Status = dto.Status;

            await _repo.UpdateDepartmentAsync(existing);

            return "Department updated successfully";
        }

        public async Task<string> DeleteDepartmentAsync(int departmentId)
        {
            var result = await _repo.DeleteDepartmentAsync(departmentId);

            return result
                ? "Department deleted successfully"
                : "Department not found";
        }

        #endregion

        #region Notification
        public async Task<List<NotificationResponseDto>> GetAllNotificationAsync()
        {
            var data = await _repo.GetAllNotification();

            return data.Select(x => new NotificationResponseDto
            {
                notification_id = x.notification_id,

                // 🔥 Multiple departments
                Departments = x.NotificationDepartments
            .Select(d => new DepartmentResponseDto
            {
                DepartmentId = d.Department.DepartmentId,
                DepartmentName = d.Department.DepartmentName,
                Status = d.Department.Status
            }).ToList(),

                notification_sub = x.notification_sub,
                notification_des = x.notification_des,
                notification_date = x.notification_date,
                notification_status = x.notification_status,
                notification_cat = x.notification_cat,
                notification_file = x.notification_file

            }).ToList();
        }

        public async Task<NotificationResponseDto?> GetNotificationByIdAsync(long id)
        {
            var x = await _repo.GetNotificationById(id);

            if (x == null)
                return null;

            return new NotificationResponseDto
            {
                notification_id = x.notification_id,

                // 🔥 Multiple departments
                Departments = x.NotificationDepartments
            .Select(d => new DepartmentResponseDto
            {
                DepartmentId = d.Department.DepartmentId,
                DepartmentName = d.Department.DepartmentName,
                Status = d.Department.Status
            }).ToList(),

                notification_sub = x.notification_sub,
                notification_des = x.notification_des,
                notification_date = x.notification_date,
                notification_status = x.notification_status,
                notification_cat = x.notification_cat,
                notification_file = x.notification_file
            };
        }

        public async Task<string> CreateNotificationAsync(NotificationDTO dto)
        {
            string filePath = null;

            if (dto.file != null)
            {
                filePath = await FileHelper.SaveFile(
                    dto.file,
                    "uploads/notifications",
                    new[] { ".jpg", ".png", ".jpeg", ".pdf" },
                    2 * 1024 * 1024
                );
            }

            var notification = new Notification
            {
                notification_sub = dto.notification_sub,
                notification_des = dto.notification_des,
                notification_date = dto.notification_date ?? DateTime.Now,
                notification_status = dto.notification_status ?? true,
                notification_cat = dto.notification_cat,
                notification_file = filePath,

                Extra1 = dto.Extra1,
                Extra2 = dto.Extra2,
                Extra3 = dto.Extra3
            };

            // 🔥 Save notification first
            await _repo.AddNotification(notification);

            // 🔥 Insert into junction table
            var notificationDepartments = dto.DepartmentIds
                .Select(d => new NotificationDepartment
                {
                    NotificationId = notification.notification_id,
                    DepartmentId = d
                }).ToList();

            await _repo.AddNotificationDepartments(notificationDepartments);

            return "Notification created successfully";
        }

        public async Task<List<NotificationResponseDto>> GetNotificationByDepartmentAsync(int departmentId)
        {
            var data = await _repo.GetNotificationByDepartmentAsync(departmentId);

            return data.Select(x => new NotificationResponseDto
            {
                notification_id = x.notification_id,

                Departments = x.NotificationDepartments
            .Select(d => new DepartmentResponseDto
            {
                DepartmentId = d.Department.DepartmentId,
                DepartmentName = d.Department.DepartmentName,
                Status = d.Department.Status
            }).ToList(),

                notification_sub = x.notification_sub,
                notification_des = x.notification_des,
                notification_date = x.notification_date,
                notification_status = x.notification_status,
                notification_cat = x.notification_cat,
                notification_file = x.notification_file

            }).ToList();
        }

        public async Task<string> UpdateNotificationAsync(long id, NotificationDTO dto)
        {
            var existing = await _repo.GetNotificationById(id);

            if (existing == null)
                return "NotFound";

            // 🔥 File update
            if (dto.file != null)
            {
                existing.notification_file = await FileHelper.SaveFile(
                    dto.file,
                    "uploads/notifications",
                    new[] { ".jpg", ".png", ".jpeg", ".pdf" },
                    2 * 1024 * 1024
                );
            }

            // 🔥 Update fields
            existing.notification_sub = dto.notification_sub;
            existing.notification_des = dto.notification_des;
            existing.notification_cat = dto.notification_cat;
            existing.notification_status = dto.notification_status ?? true;
            existing.notification_date = dto.notification_date ?? DateTime.Now;

            existing.Extra1 = dto.Extra1;
            existing.Extra2 = dto.Extra2;
            existing.Extra3 = dto.Extra3;

            // 🔥 Update many-to-many
            if (dto.DepartmentIds != null && dto.DepartmentIds.Any())
            {
                await _repo.UpdateNotificationDepartments(
                    existing.notification_id,
                    dto.DepartmentIds
                );
            }

            await _repo.UpdateNotification(existing);

            return "Notification updated successfully";
        }

        public async Task<bool> DeleteNotificationAsync(long id)
        {
            return await _repo.DeleteNotification(id);
        }

        #endregion

        #region News

        public async Task<List<NewsResponseDto>> GetAllNews()
        {
            var data = await _repo.GetAllNews();

            return data.Select(x => new NewsResponseDto
            {
                news_id = x.news_id,

                Departments = x.NewsDepartments
            .Select(d => new DepartmentResponseDto
            {
                DepartmentId = d.Department.DepartmentId,
                DepartmentName = d.Department.DepartmentName,
                Status = d.Department.Status
            }).ToList(),

                news_subject = x.news_subject,
                news_description = x.news_description,
                news_images = x.news_images,
                news_status = x.news_status ?? false,
                news_date = x.news_date ?? DateTime.Now,
                news_type = x.news_type,
                news_cat = x.news_cat

            }).ToList();
        }

        public async Task<NewsResponseDto?> GetNewsById(long id)
        {
            var x = await _repo.GetNewsById(id);

            if (x == null)
                return null;

            return new NewsResponseDto
            {
                news_id = x.news_id,

                Departments = x.NewsDepartments
            .Select(d => new DepartmentResponseDto
            {
                DepartmentId = d.Department.DepartmentId,
                DepartmentName = d.Department.DepartmentName,
                Status = d.Department.Status
            }).ToList(),

                news_subject = x.news_subject,
                news_description = x.news_description,
                news_images = x.news_images,
                news_status = x.news_status ?? false,
                news_date = x.news_date ?? DateTime.Now,
                news_type = x.news_type,
                news_cat = x.news_cat
            };
        }

        public async Task<List<NewsResponseDto>>
            GetNewsByDepartment(int departmentId)
        {
            var data = await _repo.GetNewsByDepartment(departmentId);

            return data.Select(x => new NewsResponseDto
            {
                news_id = x.news_id,

                Departments = x.NewsDepartments
            .Select(d => new DepartmentResponseDto
            {
                DepartmentId = d.Department.DepartmentId,
                DepartmentName = d.Department.DepartmentName,
                Status = d.Department.Status
            }).ToList(),

                news_subject = x.news_subject,
                news_description = x.news_description,
                news_images = x.news_images,
                news_status = x.news_status ?? false,
                news_date = x.news_date ?? DateTime.Now,
                news_type = x.news_type,
                news_cat = x.news_cat

            }).ToList();
        }

        public async Task<string> CreateNews(CreateNewsDto dto)
        {
            string imagePath = null;

            if (dto.image != null)
            {
                imagePath = await FileHelper.SaveFile(
                    dto.image,
                    "uploads/news",
                    new[] { ".jpg", ".jpeg", ".png", ".webp" },
                    2 * 1024 * 1024
                );
            }

            var news = new NewsMaster
            {
                news_subject = dto.news_subject,
                news_description = dto.news_description,
                news_images = imagePath,
                news_status = dto.news_status,
                news_date = DateTime.Now,
                news_type = dto.news_type,
                news_cat = dto.news_cat
            };

            await _repo.AddNews(news);

            var newsDepartments = dto.DepartmentIds
                .Select(d => new NewsDepartment
                {
                    NewsId = news.news_id,
                    DepartmentId = d
                }).ToList();

            await _repo.AddNewsDepartments(newsDepartments);

            return "News created successfully";
        }

        public async Task<string> UpdateNews(UpdateNewsDto dto)
        {
            var existing = await _repo.GetNewsById(dto.news_id);

            if (existing == null)
                throw new Exception("News not found");

            if (dto.image != null)
            {
                existing.news_images = await FileHelper.SaveFile(
                    dto.image,
                    "uploads/news",
                    new[] { ".jpg", ".jpeg", ".png", ".webp" },
                    2 * 1024 * 1024
                );
            }

            existing.news_subject = dto.news_subject ?? existing.news_subject;
            existing.news_description = dto.news_description ?? existing.news_description;
            existing.news_status = dto.news_status ?? existing.news_status;
            existing.news_type = dto.news_type ?? existing.news_type;
            existing.news_cat = dto.news_cat ?? existing.news_cat;

            if (dto.DepartmentIds != null && dto.DepartmentIds.Any())
            {
                await _repo.UpdateNewsDepartments(
                    existing.news_id,
                    dto.DepartmentIds
                );
            }

            await _repo.UpdateNews(existing);

            return "News updated successfully";
        }

        public async Task<string> DeleteNews(long id)
        {
            var result = await _repo.DeleteNews(id);

            return result
                ? "Deleted successfully"
                : "News not found";
        }

        #endregion

        #region Events
        public async Task CreateEvent(CreateEventDto dto)
        {
            var imagePath = await FileHelper.SaveFile(
                dto.Image,
                "uploads/events",
                new[] { ".jpg", ".png", ".jpeg" },
                2 * 1024 * 1024
            );

            var eventEntity = new Event
            {
                Title = dto.Title,
                Description = dto.Description,
                EventDate = dto.EventDate,
                ImagePath = imagePath
            };

            foreach (var deptId in dto.DepartmentIds)
            {
                eventEntity.EventDepartments.Add(new EventDepartment
                {
                    DepartmentId = deptId
                });
            }

            await _repo.CreateAsync(eventEntity);
        }

        public async Task UpdateEvent(UpdateEventDto dto)
        {
            var eventEntity = await _repo.GetByIdAsync(dto.EventId);

            if (eventEntity == null)
                throw new Exception("Event not found");

            if (dto.Image != null)
            {
                eventEntity.ImagePath = await FileHelper.SaveFile(
                    dto.Image,
                    "uploads/events",
                    new[] { ".jpg", ".png", ".jpeg" },
                    2 * 1024 * 1024
                );
            }

            eventEntity.Title = dto.Title;
            eventEntity.Description = dto.Description;
            eventEntity.EventDate = dto.EventDate;

            // 🔥 Update Departments
            eventEntity.EventDepartments.Clear();

            foreach (var deptId in dto.DepartmentIds)
            {
                eventEntity.EventDepartments.Add(new EventDepartment
                {
                    DepartmentId = deptId
                });
            }

            await _repo.UpdateAsync(eventEntity);
        }

        public async Task DeleteEvent(int id)
        {
            var eventEntity = await _repo.GetByIdAsync(id);

            if (eventEntity == null)
                throw new Exception("Event not found");

            await _repo.DeleteAsync(eventEntity);
        }

        public async Task<EventResponseDto> GetEventById(int id)
        {
            var eventEntity = await _repo.GetByIdAsync(id);

            return new EventResponseDto
            {
                EventId = eventEntity.EventId,
                Title = eventEntity.Title,
                Description = eventEntity.Description,
                EventDate = eventEntity.EventDate,
                ImagePath = eventEntity.ImagePath,
                Departments = eventEntity.EventDepartments
            .Select(d => new DepartmentResponseDto
            {
                DepartmentId = d.Department.DepartmentId,
                DepartmentName = d.Department.DepartmentName,
                Status = d.Department.Status
            }).ToList(),
            };
        }

        public async Task<List<EventResponseDto>> GetAllEvents()
        {
            var events = await _repo.GetAllAsync();

            return events.Select(e => new EventResponseDto
            {
                EventId = e.EventId,
                Title = e.Title,
                Description = e.Description,
                EventDate = e.EventDate,
                ImagePath = e.ImagePath,
                Departments = e.EventDepartments
            .Select(d => new DepartmentResponseDto
            {
                DepartmentId = d.Department.DepartmentId,
                DepartmentName = d.Department.DepartmentName,
                Status = d.Department.Status
            }).ToList(),
            }).ToList();
        }
        #endregion

        #region Topper

        public async Task CreateTopperAsync(CreateTopperDto dto)
        {
            var imagePath = await FileHelper.SaveFile(
                dto.Image,
                "uploads/toppers",
                new[] { ".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif" },
                2 * 1024 * 1024
            );

            var topper = new Topper
            {
                Name = dto.Name,
                YearSemester = dto.YearSemester,
                CollegeRank = dto.CollegeRank,
                UniversityRank = dto.UniversityRank,
                Batch = dto.Batch,
                Percentile = dto.Percentile,
                ImagePath = imagePath
            };

       // ✅ MANY TO MANY
          topper.TopperDepartments = dto.DepartmentIds?
           .Select(d => new TopperDepartment { DepartmentId = d })
           .ToList();

            await _repo.CreateTopperAsync(topper);
        }

        public async Task<List<TopperResponseDto>> GetAllToppersAsync()
        {
            var data = await _repo.GetAllToppersAsync();

            return data.Select(t => new TopperResponseDto
            {
                TopperId = t.TopperId,
                Name = t.Name,
                YearSemester = t.YearSemester,
                CollegeRank = t.CollegeRank,
                UniversityRank = t.UniversityRank,
                Batch = t.Batch,
                Percentile = t.Percentile,
                ImagePath = t.ImagePath,

                Departments = t.TopperDepartments
                    .Select(d => new DepartmentResponseDto
                    {
                        DepartmentId = d.Department.DepartmentId,
                        DepartmentName = d.Department.DepartmentName,
                        Status = d.Department.Status
                    }).ToList()
            }).ToList();
        }

        public async Task<TopperResponseDto> GetTopperByIdAsync(int id)
        {
            var t = await _repo.GetTopperByIdAsync(id);

            if (t == null) throw new Exception("Topper not found");

            return new TopperResponseDto
            {
                TopperId = t.TopperId,
                Name = t.Name,
                YearSemester = t.YearSemester,
                CollegeRank = t.CollegeRank,
                UniversityRank = t.UniversityRank,
                Batch = t.Batch,
                Percentile = t.Percentile,
                ImagePath = t.ImagePath,

                Departments = t.TopperDepartments
                    .Select(d => new DepartmentResponseDto
                    {
                        DepartmentId = d.Department.DepartmentId,
                        DepartmentName = d.Department.DepartmentName,
                        Status = d.Department.Status
                    }).ToList()
            };
        }

        public async Task UpdateTopperAsync(UpdateTopperDto dto)
        {
            var topper = await _repo.GetTopperByIdAsync(dto.TopperId);
            if (topper == null) throw new Exception("Topper not found");
            string? updatedImagePath = topper.ImagePath;

            // ✅ Image Update Logic (same as Committee)if (dto.Image != null)
            {
                DeleteImageFileIfExists(topper.ImagePath);

                updatedImagePath = await FileHelper.SaveFile(
                    dto.Image,
                    ImageUploadFolder,
                    AllowedImageExtensions,
                    MaxImageSizeInBytes
                );
            }

            topper.Name = dto.Name;
            topper.YearSemester = dto.YearSemester;
            topper.CollegeRank = dto.CollegeRank;
            topper.UniversityRank = dto.UniversityRank;
            topper.Batch = dto.Batch;
            topper.Percentile = dto.Percentile;
            topper.ImagePath = updatedImagePath; 
            topper.TopperDepartments = dto.DepartmentIds?
           .Select(d => new TopperDepartment
            {
                TopperId = dto.TopperId,
                DepartmentId = d
            }).ToList();

            await _repo.UpdateTopperAsync(topper);
        }

        public async Task DeleteTopperAsync(int id)
        {
            var topper = await _repo.GetTopperByIdAsync(id);
            if (topper == null) throw new Exception("Topper not found");

            await _repo.DeleteTopperAsync(topper);
        }

        #endregion


        #region committee
        public async Task<IEnumerable<CommitteeMemberResponseDto>> GetAllCommitteeMembersAsync()
        {
            var committeeMembers = await _repo.GetAllCommitteeMembersAsync();
            return committeeMembers.Select(MapToResponseDto);
        }

        public async Task<CommitteeMemberResponseDto?> GetCommitteeMemberByIdAsync(int committeeMemberId)
        {
            var committeeMember = await _repo.GetCommitteeMemberByIdAsync(committeeMemberId);
            return committeeMember == null ? null : MapToResponseDto(committeeMember);
        }

        public async Task<CommitteeMemberResponseDto> AddCommitteeMemberAsync(CreateCommitteeMemberDto createDto)
        {
            string? savedImagePath = null;

            if (createDto.MemberImage != null)
            {
                savedImagePath = await FileHelper.SaveFile(
                    createDto.MemberImage,
                    ImageUploadFolder,
                    AllowedImageExtensions,
                    MaxImageSizeInBytes
                );
            }

            var newCommitteeMember = new CommitteeMember
            {
                CommitteeMasterId = createDto.CommitteeMasterId,
                PositionMasterId = createDto.PositionMasterId,
                MemberName = createDto.MemberName,
                MemberImage = savedImagePath,
                DisplayOrder = createDto.DisplayOrder,
                IsActive = true,
                CreatedOn = DateTime.UtcNow
            };

            var addedMember = await _repo.AddCommitteeMemberAsync(newCommitteeMember);

            // Re-fetch to get navigation properties (CommitteeMaster, PositionMaster)
            var memberWithDetails = await _repo.GetCommitteeMemberByIdAsync(addedMember.CommitteeMemberId);
            return MapToResponseDto(memberWithDetails!);
        }

        public async Task<CommitteeMemberResponseDto> UpdateCommitteeMemberAsync(UpdateCommitteeMemberDto updateDto)
        {
            var existingMember = await _repo.GetCommitteeMemberByIdAsync(updateDto.CommitteeMemberId)
                ?? throw new KeyNotFoundException($"CommitteeMember with Id {updateDto.CommitteeMemberId} was not found.");

            string? updatedImagePath = existingMember.MemberImage;

            if (updateDto.MemberImage != null)
            {
                DeleteImageFileIfExists(existingMember.MemberImage);

                updatedImagePath = await FileHelper.SaveFile(
                    updateDto.MemberImage,
                    ImageUploadFolder,
                    AllowedImageExtensions,
                    MaxImageSizeInBytes
                );
            }

            existingMember.CommitteeMasterId = updateDto.CommitteeMasterId;
            existingMember.PositionMasterId = updateDto.PositionMasterId;
            existingMember.MemberName = updateDto.MemberName;
            existingMember.MemberImage = updatedImagePath;
            existingMember.DisplayOrder = updateDto.DisplayOrder;
            existingMember.IsActive = updateDto.IsActive;
            existingMember.UpdatedOn = DateTime.UtcNow;

            await _repo.UpdateCommitteeMemberAsync(existingMember);

            var updatedMemberWithDetails = await _repo.GetCommitteeMemberByIdAsync(existingMember.CommitteeMemberId);
            return MapToResponseDto(updatedMemberWithDetails!);
        }

        public async Task<bool> RemoveCommitteeMemberAsync(int committeeMemberId)
        {
            var existingMember = await _repo.GetCommitteeMemberByIdAsync(committeeMemberId);
            if (existingMember == null) return false;

            DeleteImageFileIfExists(existingMember.MemberImage);

            return await _repo.RemoveCommitteeMemberAsync(committeeMemberId);
        }

        public async Task<IEnumerable<DropdownDto>> GetCommitteeMasterDropdownAsync()
        {
            var committeeMasters = await _repo.GetActiveCommitteeMastersAsync();
            return committeeMasters.Select(c => new DropdownDto
            {
                Value = c.CommitteeMasterId,
                Label = c.CommitteeName
            });
        }

        public async Task<IEnumerable<DropdownDto>> GetPositionMasterDropdownAsync()
        {
            var positionMasters = await _repo.GetActivePositionMastersAsync();
            return positionMasters.Select(p => new DropdownDto
            {
                Value = p.PositionMasterId,
                Label = p.PositionName
            });
        }

        // ── Private Helpers ──────────────────────────────────────────────────

        private static void DeleteImageFileIfExists(string? relativeImagePath)
        {
            if (string.IsNullOrEmpty(relativeImagePath)) return;

            var absoluteImagePath = Path.Combine(
                Directory.GetCurrentDirectory(), "wwwroot", relativeImagePath);

            if (File.Exists(absoluteImagePath))
                File.Delete(absoluteImagePath);
        }

        private static CommitteeMemberResponseDto MapToResponseDto(CommitteeMember committeeMember) => new()
        {
            CommitteeMemberId = committeeMember.CommitteeMemberId,
            CommitteeMasterId = committeeMember.CommitteeMasterId,
            CommitteeName = committeeMember.CommitteeMaster?.CommitteeName ?? string.Empty,
            PositionMasterId = committeeMember.PositionMasterId,
            PositionName = committeeMember.PositionMaster?.PositionName ?? string.Empty,
            MemberName = committeeMember.MemberName ?? string.Empty,
            MemberImage = committeeMember.MemberImage,
            DisplayOrder = committeeMember.DisplayOrder,
            IsActive = committeeMember.IsActive
        };
        #endregion

        #region Facility
        public async Task<IEnumerable<Facility>> GetAllFacilitiesAsync()
        {
            return await _repo.GetAllFacilitiesAsync();
        }

        public async Task<Facility> GetFacilityByIdAsync(int id)
        {
            var data = await _repo.GetFacilityByIdAsync(id);
            if (data == null)
                throw new Exception("Facility not found");

            return data;
        }

        public async Task<string> CreateFacilityAsync(CreateFacilityDto dto)
        {
            try
            {
                string imagePath = await FileHelper.SaveFile(
                    dto.Image,
                    "uploads/facilities",
                    new[] { ".jpg", ".jpeg", ".png", ".webp" },
                    2 * 1024 * 1024
                );

                var facility = new Facility
                {
                    FacilityMasterId = dto.FacilityMasterId,
                    ImageUrl = imagePath,
                    DescriptionHeading = dto.DescriptionHeading,
                    Description = dto.Description,
                    CreatedOn = DateTime.Now
                };

                await _repo.AddFacilityAsync(facility);

                return "Facility created successfully";
            }
            catch (Exception ex)
            {
                throw new Exception("Error creating facility: " + ex.Message);
            }
        }

        public async Task<string> UpdateFacilityAsync(int id, CreateFacilityDto dto)
        {
            try
            {
                var existing = await _repo.GetFacilityByIdAsync(id);
                if (existing == null)
                    throw new Exception("Facility not found");

                if (dto.Image != null)
                {
                    existing.ImageUrl = await FileHelper.SaveFile(
                        dto.Image,
                        "uploads/facilities",
                        new[] { ".jpg", ".jpeg", ".png", ".webp" },
                        2 * 1024 * 1024
                    );
                }

                existing.FacilityMasterId = dto.FacilityMasterId;
                existing.DescriptionHeading = dto.DescriptionHeading;
                existing.Description = dto.Description;

                await _repo.UpdateFacilityAsync(existing);

                return "Facility updated successfully";
            }
            catch (Exception ex)
            {
                throw new Exception("Error updating facility: " + ex.Message);
            }
        }

        public async Task<string> DeleteFacilityAsync(int id)
        {
            try
            {
                await _repo.DeleteFacilityAsync(id);
                return "Facility deleted successfully";
            }
            catch (Exception ex)
            {
                throw new Exception("Error deleting facility: " + ex.Message);
            }
        }

        public async Task<IEnumerable<FacilityMaster>> GetAllActiveFacilityMastersAsync()
        {
            return await _repo.GetAllActiveFacilityMastersAsync();
        }
        #endregion

        #region Parmotion
        public async Task CreatePlacementAsync(CreatePlacementDto dto)
        {
            var imagePath = await FileHelper.SaveFile(
                dto.Image,
                "uploads/placements",
                new[] { ".jpg", ".jpeg", ".png" },
                2 * 1024 * 1024
            );

            var placement = new Placement
            {
                StudentName = dto.StudentName,
                Batch = dto.Batch,
                PlacementName = dto.PlacementName,
                Location = dto.Location,
                ImagePath = imagePath
            };

            placement.PlacementDepartments = dto.DepartmentIds
                .Select(d => new PlacementDepartment
                {
                    DepartmentId = d
                })
                .ToList();

            await _repo.CreatePlacementAsync(placement);
        }

        public async Task<List<PlacementResponseDto>> GetAllPlacementsAsync()
        {
            var data = await _repo.GetAllPlacementsAsync();

            return data.Select(p => new PlacementResponseDto
            {
                PlacementId = p.PlacementId,
                StudentName = p.StudentName,
                Batch = p.Batch,
                PlacementName = p.PlacementName,
                Location = p.Location,
                ImagePath = p.ImagePath,

                Departments = p.PlacementDepartments.Select(d => new DepartmentResponseDto
                {
                    DepartmentId = d.Department.DepartmentId,
                    DepartmentName = d.Department.DepartmentName,
                    Status = d.Department.Status
                }).ToList()
            }).ToList();
        }

        public async Task<PlacementResponseDto> GetPlacementByIdAsync(int id)
        {
            var p = await _repo.GetPlacementByIdAsync(id);

            return new PlacementResponseDto
            {
                PlacementId = p.PlacementId,
                StudentName = p.StudentName,
                Batch = p.Batch,
                PlacementName = p.PlacementName,
                Location = p.Location,
                ImagePath = p.ImagePath,

                Departments = p.PlacementDepartments.Select(d => new DepartmentResponseDto
                {
                    DepartmentId = d.Department.DepartmentId,
                    DepartmentName = d.Department.DepartmentName,
                    Status = d.Department.Status
                }).ToList()
            };
        }
        public async Task UpdatePlacementAsync(UpdatePlacementDto dto)
        {
            var placement = await _repo.GetPlacementByIdAsync(dto.PlacementId);

            placement.StudentName = dto.StudentName;
            placement.Batch = dto.Batch;
            placement.PlacementName = dto.PlacementName;
            placement.Location = dto.Location;

            placement.PlacementDepartments = dto.DepartmentIds
                .Select(d => new PlacementDepartment
                {
                    PlacementId = dto.PlacementId,
                    DepartmentId = d
                })
                .ToList();

            await _repo.UpdatePlacementAsync(placement);
        }
        public async Task DeletePlacementAsync(int id)
        {
            var placement = await _repo.GetPlacementByIdAsync(id);
            if (placement == null) throw new Exception("Placement not found");

            await _repo.DeletePlacementAsync(placement);
        }
        #endregion

        #region AdmissionEnquiry
        public async Task<List<AdmissionEnquiryResponseDto>> GetAllAdmissionEnquiriesAsync()
        {
            var data = await _repo.GetAllAdmissionEnquiriesAsync();

            return data.Select(x => new AdmissionEnquiryResponseDto
            {
                AdmissionEnquiryId = x.AdmissionEnquiryId,
                StudentName = x.StudentName,
                FatherName = x.FatherName,
                MobileNumber = x.MobileNumber,
                Email = x.Email,
                StudyMode = x.StudyMode.ToString(),
                Departments = x.AdmissionEnquiryDepartments
                    .Select(d => d.Department.DepartmentName)
                    .ToList()
            }).ToList();
        }

        public async Task CreateAdmissionEnquiryAsync(CreateAdmissionEnquiryDto dto)
        {
            var enquiry = new AdmissionEnquiry
            {
                StudentName = dto.StudentName,
                FatherName = dto.FatherName,
                MobileNumber = dto.MobileNumber,
                Email = dto.Email,
                StudyMode = dto.StudyMode
            };

            enquiry.AdmissionEnquiryDepartments = dto.DepartmentIds
                .Select(id => new AdmissionEnquiryDepartment
                {
                    DepartmentId = id
                }).ToList();

            await _repo.AddAdmissionEnquiryAsync(enquiry);
        }

        public async Task UpdateAdmissionEnquiryAsync(UpdateAdmissionEnquiryDto dto)
        {
            var enquiry = await _repo.GetAdmissionEnquiryByIdAsync(dto.AdmissionEnquiryId);

            if (enquiry == null)
                throw new Exception("Admission Enquiry Not Found");

            enquiry.StudentName = dto.StudentName;
            enquiry.FatherName = dto.FatherName;
            enquiry.MobileNumber = dto.MobileNumber;
            enquiry.Email = dto.Email;
            enquiry.StudyMode = dto.StudyMode;

            enquiry.AdmissionEnquiryDepartments.Clear();

            foreach (var departmentId in dto.DepartmentIds)
            {
                enquiry.AdmissionEnquiryDepartments.Add(
                    new AdmissionEnquiryDepartment
                    {
                        AdmissionEnquiryId = enquiry.AdmissionEnquiryId,
                        DepartmentId = departmentId
                    });
            }

            await _repo.UpdateAdmissionEnquiryAsync(enquiry);
        }

        public async Task DeleteAdmissionEnquiryAsync(int id)
        {
            var enquiry = await _repo.GetAdmissionEnquiryByIdAsync(id);

            if (enquiry == null)
                throw new Exception("Admission Enquiry Not Found");

            await _repo.DeleteAdmissionEnquiryAsync(enquiry);
        }

        public async Task<AdmissionEnquiryResponseDto?> GetAdmissionEnquiryByIdAsync(int id)
        {
            var x = await _repo.GetAdmissionEnquiryByIdAsync(id);

            if (x == null)
                return null;

            return new AdmissionEnquiryResponseDto
            {
                AdmissionEnquiryId = x.AdmissionEnquiryId,
                StudentName = x.StudentName,
                FatherName = x.FatherName,
                MobileNumber = x.MobileNumber,
                Email = x.Email,
                StudyMode = x.StudyMode.ToString(),
                Departments = x.AdmissionEnquiryDepartments
                    .Select(d => d.Department.DepartmentName)
                    .ToList()
            };
        }
        #endregion


        #region Student Adoption

        public async Task CreateStudentAsync(CreateStudentDto dto)
        {
            string imagePath = null;

            if (dto.Photo != null)
            {
                imagePath = await FileHelper.SaveFile(
                    dto.Photo,
                    "uploads/students",
                    new[] { ".jpg", ".jpeg", ".png", ".webp" },
                    2 * 1024 * 1024
                );
            }

            var student = new StudentMaster
            {
                StudentName = dto.StudentName,
                Course = dto.Course,
                Description = dto.Description,
                PhotoUrl = imagePath,
                IsActive = true,
                CreatedDate = DateTime.Now
            };

            await _repo.CreateStudentAsync(student);
        }
        public async Task<List<StudentResponseDto>> GetAllStudentsAsync()
        {
            var students = await _repo.GetAllStudentsAsync();

            return students.Select(x => new StudentResponseDto
            {
                StudentId = x.StudentId,
                StudentName = x.StudentName,
                Course = x.Course,
                Description = x.Description,
                PhotoUrl = x.PhotoUrl
            }).ToList();
        }
        public async Task<StudentResponseDto?> GetStudentByIdAsync(int id)
        {
            var student = await _repo.GetStudentByIdAsync(id);

            if (student == null)
                return null;

            return new StudentResponseDto
            {
                StudentId = student.StudentId,
                StudentName = student.StudentName,
                Course = student.Course,
                Description = student.Description,
                PhotoUrl = student.PhotoUrl
            };
        }
        public async Task<bool> UpdateStudentAsync(int id, CreateStudentDto dto)
        {
            var student = await _repo.GetStudentByIdAsync(id);

            if (student == null)
                return false;

            if (dto.Photo != null)
            {
                student.PhotoUrl = await FileHelper.SaveFile(
                    dto.Photo,
                    "uploads/students",
                    new[] { ".jpg", ".jpeg", ".png", ".webp" },
                    2 * 1024 * 1024
                );
            }

            student.StudentName = dto.StudentName;
            student.Course = dto.Course;
            student.Description = dto.Description;

            await _repo.UpdateStudentAsync(student);
            return true;
        }
        public async Task<bool> DeleteStudentAsync(int id)
        {
            var student = await _repo.GetStudentByIdAsync(id);

            if (student == null)
                return false;

            await _repo.DeleteStudentAsync(student);
            return true;
        }
        public async Task CreateDonationInquiryAsync(CreateDonationInquiryDto dto)
        {
            var student = await _repo.GetStudentByIdAsync(dto.StudentId);

            if (student == null)
                throw new Exception("Student not found");

            var inquiry = new DonationInquiry
            {
                HonorableName = dto.HonorableName,
                Phone = dto.Phone,
                Email = dto.Email,
                MeetingDate = dto.MeetingDate,
                MeetingTime = dto.MeetingTime,
                AdoptionFor = dto.AdoptionFor,
                StudentId = dto.StudentId,
                StudentName = student.StudentName,
                CreatedOn = DateTime.Now
            };

            await _repo.CreateDonationInquiryAsync(inquiry);
        }
        public async Task<List<CreateDonationInquiryDto>> GetDonationInquiriesAsync()
        {
            var data = await _repo.GetDonationInquiriesAsync();

            return data.Select(x => new CreateDonationInquiryDto
            {
                InquiryId = x.Id,
                HonorableName = x.HonorableName,
                Phone = x.Phone,
                Email = x.Email,
                MeetingDate = x.MeetingDate,
                MeetingTime = x.MeetingTime,
                AdoptionFor = x.AdoptionFor,
                StudentId = x.StudentId,
                StudentName = x.StudentName
            }).ToList();
        }

        #endregion

        #region Apply Now

        public async Task CreateApplyNowAsync(ApplyNowDto dto)
        {
            var applyNow = new ApplyNow
            {
                FormType = dto.FormType,
                Name = dto.Name,
                FatherName = dto.FatherName,
                MobileNumber = dto.MobileNumber,
                Email = dto.Email,
                Course = dto.Course,
                EducationLevel = dto.EducationLevel,
                PreferredMode = dto.PreferredMode,
                CreatedDate = DateTime.Now
            };

            await _repo.CreateApplyNowAsync(applyNow);
        }

        public async Task<List<ApplyNowDto>> GetApplyNowListAsync()
        {
            var data = await _repo.GetApplyNowListAsync();

            return data.Select(x => new ApplyNowDto
            {
                Id = x.Id,
                FormType = x.FormType,
                Name = x.Name,
                FatherName = x.FatherName,
                MobileNumber = x.MobileNumber,
                Email = x.Email,
                Course = x.Course,
                EducationLevel = x.EducationLevel,
                PreferredMode = x.PreferredMode
            }).ToList();
        }

        public async Task<List<ApplyNowDto>> GetApplyNowByTypeAsync(string formType)
        {
            var data = await _repo.GetApplyNowByTypeAsync(formType);

            return data.Select(x => new ApplyNowDto
            {
                Id = x.Id,
                FormType = x.FormType,
                Name = x.Name,
                FatherName = x.FatherName,
                MobileNumber = x.MobileNumber,
                Email = x.Email,
                Course = x.Course,
                EducationLevel = x.EducationLevel,
                PreferredMode = x.PreferredMode
            }).ToList();
        }

        public async Task<ApplyNowDto?> GetApplyNowDetailAsync(int id)
        {
            var data = await _repo.GetApplyNowByIdAsync(id);

            if (data == null)
                return null;

            return new ApplyNowDto
            {
                Id = data.Id,
                FormType = data.FormType,
                Name = data.Name,
                FatherName = data.FatherName,
                MobileNumber = data.MobileNumber,
                Email = data.Email,
                Course = data.Course,
                EducationLevel = data.EducationLevel,
                PreferredMode = data.PreferredMode
            };
        }

        public async Task DeleteApplyNowAsync(int id)
        {
            var data = await _repo.GetApplyNowByIdAsync(id);

            if (data == null)
                throw new Exception("Record not found");

            await _repo.DeleteApplyNowAsync(data);
        }

        #endregion

        #region Contact Us

        public async Task CreateContactMessageAsync(ContactMessageDto dto)
        {
            var message = new ContactMessage
            {
                Name = dto.Name,
                Email = dto.Email,
                Subject = dto.Subject,
                Message = dto.Message,
                CreatedDate = DateTime.Now
            };

            await _repo.CreateContactMessageAsync(message);
        }

        public async Task<List<ContactMessageDto>> GetAllContactMessagesAsync()
        {
            var data = await _repo.GetAllContactMessagesAsync();

            return data.Select(x => new ContactMessageDto
            {
                Id = x.Id,
                Name = x.Name,
                Email = x.Email,
                Subject = x.Subject,
                Message = x.Message,
                CreatedDate = x.CreatedDate
            }).ToList();
        }

        #endregion

    }
}
