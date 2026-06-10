using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using sampatiFinal.Server.Services.Services;
using static sampatiFinal.Server.DTO.AuthDTO;

namespace sampatiFinal.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAdminService _service;

        public AuthController(IAdminService service)
        {
            _service = service;
        }

        #region Login

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            try
            {
                var result = await _service.Login(
                    model.Username,
                    model.Password);

                if (result.user == null)
                {
                    return Unauthorized(new
                    {
                        success = false,
                        message = "Invalid credentials"
                    });
                }

                return Ok(new
                {
                    success = true,
                    message = "Login success",
                    token = result.token,
                    user = result.user.AdminName
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

        #region Admin 

        // ✅ CREATE ADMIN
        [Authorize(Roles = "SuperAdmin")]
        [HttpPost("create-admin")]
        public async Task<IActionResult> CreateAdmin([FromBody] CreateAdminDto dto)
        {
            try
            {
                await _service.CreateAdmin(dto);

                return Ok(new
                {
                    success = true,
                    message = "Admin Created"
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

        // ✅ GET ALL ADMINS
        [Authorize]
        [HttpGet("get-admins")]
        public async Task<IActionResult> GetAdmins()
        {
            try
            {
                var data = await _service.GetAllAdmins();

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

        // ✅ GET ADMIN BY ID
        [Authorize]
        [HttpGet("get-admin/{id}")]
        public async Task<IActionResult> GetAdminById(int id)
        {
            try
            {
                var admin = await _service.GetAdminById(id);

                if (admin == null)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = "Admin not found"
                    });
                }

                return Ok(new
                {
                    success = true,
                    data = admin
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

        // ✅ UPDATE ADMIN
        [Authorize(Roles = "SuperAdmin")]
        [HttpPut("update-admin/{id}")]
        public async Task<IActionResult> UpdateAdmin(
            int id,
            [FromBody] CreateAdminDto dto)
        {
            try
            {
                var result = await _service.UpdateAdmin(id, dto);

                if (!result)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = "Admin not found"
                    });
                }

                return Ok(new
                {
                    success = true,
                    message = "Admin Updated"
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

        // ✅ DELETE ADMIN
        [Authorize(Roles = "SuperAdmin")]
        [HttpDelete("delete-admin/{id}")]
        public async Task<IActionResult> DeleteAdmin(int id)
        {
            try
            {
                var result = await _service.DeleteAdmin(id);

                if (!result)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = "Admin not found"
                    });
                }

                return Ok(new
                {
                    success = true,
                    message = "Admin Deleted"
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

        #region Logout

        [Authorize]
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            return Ok(new
            {
                success = true,
                message = "Logout Successful"
            });
        }

        #endregion
    }
}
