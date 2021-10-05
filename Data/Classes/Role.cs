using System.ComponentModel.DataAnnotations;

namespace RegistrationModule.Data.Classes
{
    public class Role
    {
        [Key]
        public long RoleId { get; set; }
        [Required]
        public string Description { get; set; }
    }
}
