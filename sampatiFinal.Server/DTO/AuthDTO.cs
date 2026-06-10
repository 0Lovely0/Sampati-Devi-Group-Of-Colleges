using System.ComponentModel.DataAnnotations;

namespace sampatiFinal.Server.DTO
{
    public class AuthDTO
    {
        public class LoginDto
        {
            [Required]
            public string Username { get; set; } = string.Empty;

            [Required]
            public string Password { get; set; } = string.Empty;
        }
        public class CreateAdminDto
        {
            [Required]
            public string AdminName { get; set; }

            [Required]
            [Phone]
            public string AdminMobile { get; set; }

            [Required]
            public string AdminUsername { get; set; }

            [Required]
            [MinLength(6)]
            public string AdminPassword { get; set; }

            public string AdminRole { get; set; }
        }
    }
}
