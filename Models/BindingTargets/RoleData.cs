using RegistrationModule.Data.Classes;
using System.ComponentModel.DataAnnotations;

namespace RegistrationModule.Models.BindingTargets
{
    public class RoleData
    {
        [Required]
        public string Description { get => Role.Description; set => Role.Description = value; }
        
        public Role Role { get; set; } = new Role();
    }
}
