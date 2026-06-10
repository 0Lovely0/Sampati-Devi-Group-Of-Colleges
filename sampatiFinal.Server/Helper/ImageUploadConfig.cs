namespace sampatiFinal.Server.Helper
{
    // ── Image upload config ───────────────────────
    internal static class ImageUploadConfig
    {
        public const string FolderPath = "uploads/committee";
        public static string[] AllowedExt = { ".jpg", ".jpeg", ".png", ".webp" };
        public const long MaxSize = 2 * 1024 * 1024;   // 2 MB
    }
}
