using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using sampatiFinal.Server.Services.Repositories;
using sampatiFinal.Server.Services.Services;
using System.Security.Claims;
using static sampatiFinal.Server.DTO.AdminDTO;
namespace sampatiFinal.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "SuperAdmin")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _service;
        private readonly IAdminRepository _adminRepo;
        private readonly ILogger<AdminController> _logger;


        public AdminController(IAdminService service, IAdminRepository adminRepo, ILogger<AdminController> logger)
        {
            _service = service;
            _adminRepo = adminRepo;
            _logger = logger;

        }

        #region Video

        // ✅ CREATE VIDEO
        [HttpPost("create-video")]
        public async Task<IActionResult> CreateVideo([FromForm] VideoDto dto)
        {
            try
            {
                await _service.CreateVideo(dto);

                return Ok(new
                {
                    success = true,
                    message = "Video Created"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = ex.Message
                });
            }
        }

        // ✅ GET ALL VIDEOS
        [HttpGet("get-videos")]
        [AllowAnonymous]
        public async Task<IActionResult> GetVideos()
        {
            var data = await _service.GetAllVideos();

            return Ok(new
            {
                success = true,
                data
            });
        }

        // ✅ GET VIDEO BY ID
        [HttpGet("get-video/{id}")]
        public async Task<IActionResult> GetVideoById(int id)
        {
            try
            {
                var video = await _service.GetVideoById(id);

                if (video == null)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = "Video Not Found"
                    });
                }

                return Ok(new
                {
                    success = true,
                    data = video
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = ex.Message
                });
            }
        }

        // ✅ UPDATE VIDEO
        [HttpPut("update-video/{id}")]
        public async Task<IActionResult> UpdateVideo(int id, [FromForm] VideoDto dto)
        {
            try
            {
                var result = await _service.UpdateVideo(id, dto);

                if (!result)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = "Video Not Found"
                    });
                }

                return Ok(new
                {
                    success = true,
                    message = "Video Updated"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = ex.Message
                });
            }
        }

        // ✅ DELETE VIDEO
        [HttpDelete("delete-video/{id}")]
        public async Task<IActionResult> DeleteVideo(int id)
        {
            try
            {
                var result = await _service.DeleteVideo(id);

                if (!result)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = "Video Not Found"
                    });
                }

                return Ok(new
                {
                    success = true,
                    message = "Video Deleted"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = ex.Message
                });
            }
        }

        #endregion

        #region Gallery

        // ✅ CREATE GALLERY

        [HttpPost("create-gallery")]
        public async Task<IActionResult> CreateGallery([FromForm] GalleryDto dto)
        {
            try
            {
                await _service.CreateGallery(dto);

                return Ok(new
                {
                    success = true,
                    message = "Gallery Created"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = ex.Message
                });
            }
        }

        // ✅ GET ALL GALLERY
        [HttpGet("get-galleries")]
        [AllowAnonymous]
        public async Task<IActionResult> GetGalleries()
        {
            try
            {
                var data = await _service.GetAllGalleries();

                return Ok(new
                {
                    success = true,
                    data = data
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = ex.Message
                });
            }
        }

        // ✅ GET GALLERY BY ID
        [HttpGet("get-gallery/{id}")]
        public async Task<IActionResult> GetGalleryById(long id)
        {
            try
            {
                var gallery = await _service.GetGalleryById(id);

                if (gallery == null)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = "Gallery Not Found"
                    });
                }

                return Ok(new
                {
                    success = true,
                    data = gallery
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = ex.Message
                });
            }
        }

        // ✅ UPDATE GALLERY
        [HttpPut("update-gallery/{id}")]
        public async Task<IActionResult> UpdateGallery(long id, [FromForm] GalleryDto dto)
        {
            try
            {
                var result = await _service.UpdateGallery(id, dto);

                if (!result)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = "Gallery Not Found"
                    });
                }

                return Ok(new
                {
                    success = true,
                    message = "Gallery Updated"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = ex.Message
                });
            }
        }

        // ✅ DELETE GALLERY
        [HttpDelete("delete-gallery/{id}")]
        public async Task<IActionResult> DeleteGallery(long id)
        {
            try
            {
                var result = await _service.DeleteGallery(id);

                if (!result)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = "Gallery Not Found"
                    });
                }

                return Ok(new
                {
                    success = true,
                    message = "Gallery Deleted"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = ex.Message
                });
            }
        }

        #endregion

        #region Gallery Category

        // ✅ CREATE GALLERY CATEGORY
        [HttpPost("create-gallery-category")]
        public async Task<IActionResult> CreateGalleryCategory(
                    [FromForm] GalleryCategoryDto dto)
        {
            try
            {
                await _service.CreateGalleryCategory(dto);

                return Ok(new
                {
                    success = true,
                    message = "Gallery Category Created"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = ex.Message
                });
            }
        }

        // ✅ GET ALL GALLERY CATEGORIES
        [HttpGet("get-gallery-categories")]
        [AllowAnonymous]
        public async Task<IActionResult> GetGalleryCategories()
        {
            try
            {
                var data = await _service.GetAllGalleryCategories();

                return Ok(new
                {
                    success = true,
                    data = data
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = ex.Message
                });
            }
        }

        // ✅ GET GALLERY CATEGORY BY ID
        [HttpGet("get-gallery-category/{id}")]
        public async Task<IActionResult> GetGalleryCategoryById(int id)
        {
            try
            {
                var data = await _service.GetGalleryCategoryById(id);

                if (data == null)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = "Gallery Category Not Found"
                    });
                }

                return Ok(new
                {
                    success = true,
                    data = data
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = ex.Message
                });
            }
        }

        // ✅ UPDATE GALLERY CATEGORY
        [HttpPut("update-gallery-category/{id}")]
        public async Task<IActionResult> UpdateGalleryCategory(int id,
             [FromForm] GalleryCategoryDto dto)
        {
            try
            {
                var result = await _service.UpdateGalleryCategory(id, dto);

                if (!result)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = "Gallery Category Not Found"
                    });
                }

                return Ok(new
                {
                    success = true,
                    message = "Gallery Category Updated"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = ex.Message
                });
            }
        }

        // ✅ DELETE GALLERY CATEGORY
        [HttpDelete("delete-gallery-category/{id}")]
        public async Task<IActionResult> DeleteGalleryCategory(int id)
        {
            try
            {
                var result = await _service.DeleteGalleryCategory(id);

                if (!result)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = "Gallery Category Not Found"
                    });
                }

                return Ok(new
                {
                    success = true,
                    message = "Gallery Category Deleted"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = ex.Message
                });
            }
        }

        #endregion

        #region Staff Member
        [HttpPost("add-staff")]
        public async Task<IActionResult> AddStaff([FromForm] CreateStaffDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var currentUser = User.FindFirst(ClaimTypes.Name)?.Value;

                var result = await _service.CreateStaff(model, currentUser);

                return Ok(new
                {
                    message = "Staff created successfully",
                    data = result
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    message = ex.Message
                });
            }
        }

        #endregion

        #region Department

        // ✅ GET ALL
        [AllowAnonymous]
        [HttpGet("get_all_departments")]
        public async Task<IActionResult> GetAllDepartments()
        {
            var data = await _service.GetAllDepartmentsAsync();
            return Ok(data);
        }

        // ✅ GET BY ID
        [HttpGet("get_department/{id}")]
        public async Task<IActionResult> GetDepartmentById(int id)
        {
            var data = await _service.GetDepartmentByIdAsync(id);

            if (data == null)
                return NotFound(new { message = "Department not found" });

            return Ok(new
            {
                success = true,
                message = "Success",
                data = data
            });
        }

        // ✅ CREATE
        [HttpPost("create_department")]
        public async Task<IActionResult> CreateDepartment([FromBody] CreateDepartmentDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _service.CreateDepartmentAsync(dto);
            return Ok(new
            {
                success = true,
                message = "Success",
                data = result
            });
        }

        // ✅ UPDATE
        [HttpPut("update_department/{id}")]
        public async Task<IActionResult> UpdateDepartment(int id, [FromBody] UpdateDepartmentDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id != dto.DepartmentId)
                return BadRequest("ID mismatch");

            var result = await _service.UpdateDepartmentAsync(dto);
            return Ok(new
            {
                success = true,
                message = "Success",
                data = result
            });
        }

        // ✅ DELETE
        [HttpDelete("delete_department/{id}")]
        public async Task<IActionResult> DeleteDepartment(int id)
        {
            var result = await _service.DeleteDepartmentAsync(id);
            return Ok(new
            {
                success = true,
                message = "Success",
                data = result
            });
        }




        // ✅ Get Notification by Department
        [HttpGet("by-department/{departmentId}")]
        public async Task<IActionResult> GetByDepartment(int departmentId)
        {
            var data = await _service.GetNotificationByDepartmentAsync(departmentId);

            return Ok(new
            {
                success = true,
                data = data
            });
        }


        // ✅ Active Departments (Dropdown)
        [HttpGet("active-departments")]
        public async Task<IActionResult> GetActiveDepartments()
        {
            var data = await _service.GetActiveDepartmentsAsync();

            return Ok(new
            {
                success = true,
                data = data
            });
        }

        #endregion


        #region Notification

        // ✅ Get All
        [AllowAnonymous]
        [HttpGet("get_allnotification")]
        public async Task<IActionResult> GetAllNotification()
        {
            var data = await _service.GetAllNotificationAsync();

            return Ok(new { success = true, data });
        }

        // ✅ Get By Id
        [HttpGet("get_notification/{id}")]
        public async Task<IActionResult> GetNotificationById(long id)
        {
            var data = await _service.GetNotificationByIdAsync(id);

            if (data == null)
                return NotFound(new { message = "Notification not found" });

            return Ok(new { success = true, data });
        }

        // ✅ Create
        [HttpPost("add-notification")]
        public async Task<IActionResult> CreateNotification([FromForm] NotificationDTO dto)
        {
            var result = await _service.CreateNotificationAsync(dto);
            return Ok(new { message = result });
        }

        // ✅ Update
        [HttpPut("update_notification/{id}")]
        public async Task<IActionResult> UpdateNotification(long id, [FromForm] NotificationDTO dto)
        {
            var result = await _service.UpdateNotificationAsync(id, dto);

            if (result == "NotFound")
                return NotFound("Notification not found");

            return Ok(new { message = result });
        }

        // ✅ Delete
        [HttpDelete("delete_notification/{id}")]
        public async Task<IActionResult> DeleteNotification(long id)
        {
            var result = await _service.DeleteNotificationAsync(id);

            if (!result)
                return NotFound("Notification not found");

            return Ok(new { message = "Deleted successfully" });
        }

        #endregion

        #region News Master
        [AllowAnonymous]
        [HttpGet("all-news")]
        public async Task<IActionResult> GetAllNews()
        {
            var data = await _service.GetAllNews();
            return Ok(new { success = true, data });
        }

        [HttpGet("news/{id}")]
        public async Task<IActionResult> GetNewsById(long id)
        {
            var data = await _service.GetNewsById(id);

            if (data == null)
                return NotFound(new { success = false, message = "Not found" });

            return Ok(new { success = true, data });
        }

        [HttpGet("news-by-department/{departmentId}")]
        public async Task<IActionResult> GetNewsByDepartment(int departmentId)
        {
            var data = await _service.GetNewsByDepartment(departmentId);
            return Ok(new { success = true, data });
        }

        [HttpPost("add-news")]
        public async Task<IActionResult> AddNews([FromForm] CreateNewsDto dto)
        {
            var result = await _service.CreateNews(dto);
            return Ok(new { success = true, message = result });
        }

        [HttpPut("update-news/{id}")]
        public async Task<IActionResult> UpdateNews(long id, [FromForm] UpdateNewsDto dto)
        {
            dto.news_id = id;

            var result = await _service.UpdateNews(dto);
            return Ok(new { success = true, message = result });
        }

        [HttpDelete("delete-news/{id}")]
        public async Task<IActionResult> DeleteNews(long id)
        {
            var result = await _service.DeleteNews(id);
            return Ok(new { success = true, message = result });
        }

        #endregion

        #region Banner
        [AllowAnonymous]
        [HttpGet("all-banners")]
        public async Task<IActionResult> GetAllBanner()
        {
            var data = await _service.GetAllBanner();
            return Ok(new { success = true, data });
        }

        [HttpGet("banner/{id}")]
        public async Task<IActionResult> GetBannerById(int id)
        {
            var data = await _service.GetBannerById(id);

            if (data == null)
                return NotFound(new { success = false });

            return Ok(new { success = true, data });
        }

        [HttpGet("banner-by-department/{departmentId}")]
        public async Task<IActionResult> GetBannerByDepartment(int departmentId)
        {
            var data = await _service.GetBannerByDepartment(departmentId);
            return Ok(new { success = true, data });
        }

        [HttpPost("add-banner")]
        public async Task<IActionResult> CreateBanner([FromForm] CreateBannerDto dto)
        {
            var result = await _service.CreateBanner(dto);
            return Ok(new { success = true, message = result });
        }

        [HttpPut("update-banner/{id}")]
        public async Task<IActionResult> UpdateBanner(int id, [FromForm] UpdateBannerDto dto)
        {
            dto.BnnrId = id;
            var result = await _service.UpdateBanner(dto);
            return Ok(new { success = true, message = result });
        }

        [HttpDelete("delete-banner/{id}")]
        public async Task<IActionResult> DeleteBanner(int id)
        {
            var result = await _service.DeleteBanner(id);
            return Ok(new { success = true, message = result });
        }

        #endregion

        #region Events
        // ✅ CREATE EVENT
        [HttpPost("create-event")]
        public async Task<IActionResult> CreateEvent([FromForm] CreateEventDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new
                {
                    success = false,
                    message = "Validation failed",
                    errors = ModelState.Values.SelectMany(v => v.Errors)
                });

            await _service.CreateEvent(dto);

            return StatusCode(201, new
            {
                success = true,
                message = "Event created successfully"
            });
        }

        // ✅ UPDATE EVENT
        [HttpPut("update-event/{id}")]
        public async Task<IActionResult> UpdateEvent(int id, [FromForm] UpdateEventDto dto)
        {
            if (id != dto.EventId)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Id mismatch"
                });
            }

            if (!ModelState.IsValid)
                return BadRequest(new
                {
                    success = false,
                    message = "Validation failed",
                    errors = ModelState.Values.SelectMany(v => v.Errors)
                });

            await _service.UpdateEvent(dto);

            return Ok(new
            {
                success = true,
                message = "Event updated successfully"
            });
        }

        // ✅ DELETE EVENT
        [HttpDelete("delete-event/{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            await _service.DeleteEvent(id);

            return Ok(new
            {
                success = true,
                message = "Event deleted successfully"
            });
        }

        // ✅ GET BY ID
        [HttpGet("get-event/{id}")]
        public async Task<IActionResult> GetEventById(int id)
        {
            var data = await _service.GetEventById(id);

            if (data == null)
            {
                return NotFound(new
                {
                    success = false,
                    message = "Event not found"
                });
            }

            return Ok(new
            {
                success = true,
                data
            });
        }

        // ✅ GET ALL EVENTS
        [HttpGet("get-all-events")]
        public async Task<IActionResult> GetAllEvents()
        {
            var data = await _service.GetAllEvents();

            return Ok(new
            {
                success = true,
                count = data.Count,
                data
            });
        }
        #endregion

        #region Topper
        // ================= CREATE =================
        [HttpPost("create-topper")]
        public async Task<IActionResult> CreateTopper([FromForm] CreateTopperDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "Validation failed",
                        errors = ModelState.Values.SelectMany(v => v.Errors)
                                                  .Select(e => e.ErrorMessage)
                    });
                }

                await _service.CreateTopperAsync(dto);

                return Ok(new
                {
                    success = true,
                    message = "Topper created successfully"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = ex.Message
                });
            }
        }

        // ================= GET ALL =================
        [HttpGet("get-all-toppers")]
        public async Task<IActionResult> GetAllToppers()
        {
            try
            {
                var data = await _service.GetAllToppersAsync();

                return Ok(new
                {
                    success = true,
                    count = data.Count,
                    data
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = ex.Message
                });
            }
        }

        // ================= GET BY ID =================
        [HttpGet("get-topper-by-id/{id}")]
        public async Task<IActionResult> GetTopperById(int id)
        {
            try
            {
                var data = await _service.GetTopperByIdAsync(id);

                if (data == null)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = "Topper not found"
                    });
                }

                return Ok(new
                {
                    success = true,
                    data
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = ex.Message
                });
            }
        }

        // ================= UPDATE =================
        [HttpPut("update-topper")]
        public async Task<IActionResult> UpdateTopper([FromForm] UpdateTopperDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "Validation failed",
                        errors = ModelState.Values.SelectMany(v => v.Errors)
                                                  .Select(e => e.ErrorMessage)
                    });
                }

                await _service.UpdateTopperAsync(dto);

                return Ok(new
                {
                    success = true,
                    message = "Topper updated successfully"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = ex.Message
                });
            }
        }

        // ================= DELETE =================
        [HttpDelete("delete-topper/{id}")]
        public async Task<IActionResult> DeleteTopper(int id)
        {
            try
            {
                await _service.DeleteTopperAsync(id);

                return Ok(new
                {
                    success = true,
                    message = "Topper deleted successfully"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = ex.Message
                });
            }
        }
        #endregion

        #region Committee
        [HttpGet("committee-get-all")]
        public async Task<IActionResult> GetAllCommitteeMembers()
        {
            try
            {
                var committeeMembers = await _service.GetAllCommitteeMembersAsync();
                return Ok(new ApiResponse<IEnumerable<CommitteeMemberResponseDto>>
                {
                    Success = true,
                    Data = committeeMembers
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while fetching all committee members.");
                return StatusCode(500, new ApiResponse<object>
                {
                    Success = false,
                    Message = ex.Message
                });
            }
        }

        // GET api/committeemember/5
        [HttpGet("committee-get-by-id/{committeeMemberId:int}")]
        public async Task<IActionResult> GetCommitteeMemberById(int committeeMemberId)
        {
            try
            {
                var committeeMember = await _service.GetCommitteeMemberByIdAsync(committeeMemberId);
                if (committeeMember == null)
                    return NotFound(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Committee member not found."
                    });

                return Ok(new ApiResponse<CommitteeMemberResponseDto>
                {
                    Success = true,
                    Data = committeeMember
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while fetching committee member with Id {CommitteeMemberId}.", committeeMemberId);
                return StatusCode(500, new ApiResponse<object>
                {
                    Success = false,
                    Message = ex.Message
                });
            }
        }

        [HttpPost("committee-create")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> AddCommitteeMember([FromForm] CreateCommitteeMemberDto createDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Validation failed.",
                    Data = ModelState
                });

            try
            {
                var createdMember = await _service.AddCommitteeMemberAsync(createDto);
                return CreatedAtAction(
                    nameof(GetCommitteeMemberById),
                    new { committeeMemberId = createdMember.CommitteeMemberId },
                    new ApiResponse<CommitteeMemberResponseDto>
                    {
                        Success = true,
                        Message = "Committee member created successfully.",
                        Data = createdMember
                    });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while adding a new committee member.");
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = ex.Message
                });
            }
        }

        [HttpPut("committee-update/{committeeMemberId:int}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UpdateCommitteeMember(int committeeMemberId, [FromForm] UpdateCommitteeMemberDto updateDto)
        {
            if (committeeMemberId != updateDto.CommitteeMemberId)
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Route Id and body Id do not match."
                });

            if (!ModelState.IsValid)
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Validation failed.",
                    Data = ModelState
                });

            try
            {
                var updatedMember = await _service.UpdateCommitteeMemberAsync(updateDto);
                return Ok(new ApiResponse<CommitteeMemberResponseDto>
                {
                    Success = true,
                    Message = "Committee member updated successfully.",
                    Data = updatedMember
                });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new ApiResponse<object>
                {
                    Success = false,
                    Message = ex.Message
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while updating committee member with Id {CommitteeMemberId}.", committeeMemberId);
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = ex.Message
                });
            }
        }

        [HttpDelete("committee-delete/{committeeMemberId:int}")]
        public async Task<IActionResult> RemoveCommitteeMember(int committeeMemberId)
        {
            try
            {
                var isRemoved = await _service.RemoveCommitteeMemberAsync(committeeMemberId);
                if (!isRemoved)
                    return NotFound(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Committee member not found."
                    });

                return Ok(new ApiResponse<object>
                {
                    Success = true,
                    Message = "Committee member removed successfully."
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while removing committee member with Id {CommitteeMemberId}.", committeeMemberId);
                return StatusCode(500, new ApiResponse<object>
                {
                    Success = false,
                    Message = ex.Message
                });
            }
        }

        [HttpGet("committee-dropdown/committees")]
        public async Task<IActionResult> GetCommitteeMasterDropdown()
        {
            try
            {
                var committeeDropdown = await _service.GetCommitteeMasterDropdownAsync();
                return Ok(new ApiResponse<IEnumerable<DropdownDto>>
                {
                    Success = true,
                    Data = committeeDropdown
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while fetching committee master dropdown.");
                return StatusCode(500, new ApiResponse<object>
                {
                    Success = false,
                    Message = ex.Message
                });
            }
        }

        [HttpGet("committee-dropdown/positions")]
        public async Task<IActionResult> GetPositionMasterDropdown()
        {
            try
            {
                var positionDropdown = await _service.GetPositionMasterDropdownAsync();
                return Ok(new ApiResponse<IEnumerable<DropdownDto>>
                {
                    Success = true,
                    Data = positionDropdown
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while fetching position master dropdown.");
                return StatusCode(500, new ApiResponse<object>
                {
                    Success = false,
                    Message = ex.Message
                });
            }
        }
        #endregion

        #region Facility

        [HttpGet("GetAllFacilities")]
        public async Task<IActionResult> GetAllFacilitiesAsync()
        {
            var facilities = await _service.GetAllFacilitiesAsync();
            return Ok(facilities);
        }

        // ✅ GET: api/facilities/{id}
        [HttpGet("getfacilitybyid/{id:int}")]
        public async Task<IActionResult> GetFacilityByIdAsync(int id)
        {
            try
            {
                var facility = await _service.GetFacilityByIdAsync(id);
                return Ok(facility);
            }
            catch (Exception ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        [HttpPost("create-facility")]
        public async Task<IActionResult> CreateFacilityAsync([FromForm] CreateFacilityDto createFacilityDto)
        {
            try
            {
                var response = await _service.CreateFacilityAsync(createFacilityDto);
                return Ok(new { message = response });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("update-facility/{id:int}")]
        public async Task<IActionResult> UpdateFacilityAsync(int id, [FromForm] CreateFacilityDto updateFacilityDto)
        {
            try
            {
                var response = await _service.UpdateFacilityAsync(id, updateFacilityDto);
                return Ok(new { message = response });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("delete-facility/{id:int}")]
        public async Task<IActionResult> DeleteFacilityAsync(int id)
        {
            try
            {
                var response = await _service.DeleteFacilityAsync(id);
                return Ok(new { message = response });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        [HttpGet("GetAllActiveFacilityMasters")]
        public async Task<IActionResult> GetAllActiveFacilityMastersAsync()
        {
            var data = await _service.GetAllActiveFacilityMastersAsync();
            return Ok(data);
        }
        #endregion
    }
}
