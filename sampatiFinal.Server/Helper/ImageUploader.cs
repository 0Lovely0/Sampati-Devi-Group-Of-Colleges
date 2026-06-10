using ImageMagick;
using Microsoft.AspNetCore.Http;

namespace sampatiFinal.Server.Helper
{
    public class ImageUploader
    {
        public static async Task<string> SaveFileAsync(
            IFormFile file,
            string folderName,
            string rootPath,
            string oldFilePath = null)
        {
            if (file == null || file.Length == 0)
                return null;

            // ===== Delete Old File =====
            if (!string.IsNullOrWhiteSpace(oldFilePath))
            {
                try
                {
                    string oldFullPath = Path.Combine(
                        rootPath,
                        oldFilePath.TrimStart('/')
                        .Replace("/", Path.DirectorySeparatorChar.ToString()));

                    if (File.Exists(oldFullPath))
                    {
                        GC.Collect();
                        GC.WaitForPendingFinalizers();

                        File.Delete(oldFullPath);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }

            // ===== Create Folder =====
            string uploadFolder = Path.Combine(
                rootPath,
                "uploads",
                folderName);

            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }

            // ===== File Extension =====
            string fileExtension = Path
                .GetExtension(file.FileName)
                .ToLower();

            string[] imageExtensions =
            {
                ".jpg",
                ".jpeg",
                ".png",
                ".webp",
                ".bmp",
                ".gif"
            };

            string fileName;
            string savePath;

            // ===== IMAGE FILE =====
            if (imageExtensions.Contains(fileExtension))
            {
                using var stream = file.OpenReadStream();

                using var image = new MagickImage(stream);

                bool isWebP = image.Format == MagickFormat.WebP;

                bool isSmallEnough = file.Length <= 200 * 1024;

                if (isWebP && isSmallEnough)
                {
                    fileName = Guid.NewGuid() + ".webp";

                    savePath = Path.Combine(uploadFolder, fileName);

                    using var fs = new FileStream(
                        savePath,
                        FileMode.Create);

                    await file.CopyToAsync(fs);
                }
                else
                {
                    image.Format = MagickFormat.WebP;

                    image.Quality = 95;

                    fileName = Guid.NewGuid() + ".webp";

                    savePath = Path.Combine(uploadFolder, fileName);

                    image.Write(savePath);
                }
            }
            else
            {
                // ===== NON IMAGE FILE =====
                fileName = Guid.NewGuid() + fileExtension;

                savePath = Path.Combine(uploadFolder, fileName);

                using var fileStream = new FileStream(
                    savePath,
                    FileMode.Create);

                await file.CopyToAsync(fileStream);
            }

            return $"/uploads/{folderName}/{fileName}";
        }
    }
}