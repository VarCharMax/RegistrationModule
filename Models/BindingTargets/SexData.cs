using RegistrationModule.Data.Classes;
using System.ComponentModel.DataAnnotations;

namespace RegistrationModule.Models.BindingTargets
{
    public class SexData
    {
        [Required]
        public string Description { get => Sex.Description; set => Sex.Description = value; }

        public Sex Sex { get; set; } = new Sex();
    }
}
