using System.ComponentModel.DataAnnotations;

namespace RegistrationModule.Data.Classes
{
    public class Project
    {
        [Key]
        public long ProjectId { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public string Token { get; set; }
        public bool IsActive { get; set; }
    }
}
