namespace sampatiFinal.Server.Helper
{
    public static class FileHelper
    {
        public static async Task<string> SaveFile(IFormFile file, string folderPath, string[] allowedExtensions, long maxSize)
        {
            if (file == null || file.Length == 0)
                return null;

            var extension = Path.GetExtension(file.FileName).ToLower();

            // ✅ Extension validation
            if (!allowedExtensions.Contains(extension))
                throw new Exception($"Invalid file type. Allowed: {string.Join(",", allowedExtensions)}");

            // ✅ Size validation
            if (file.Length > maxSize)
                throw new Exception($"File size exceeds limit ({maxSize / (1024 * 1024)} MB)");

            // ✅ Unique file name
            var fileName = Guid.NewGuid().ToString() + extension;

            var fullPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", folderPath);

            if (!Directory.Exists(fullPath))
                Directory.CreateDirectory(fullPath);

            var filePath = Path.Combine(fullPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return $"{folderPath}/{fileName}";
        }
    }
}
