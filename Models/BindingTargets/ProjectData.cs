using RegistrationModule.Data.Classes;
using System.ComponentModel.DataAnnotations;

namespace RegistrationModule.Models.BindingTargets
{
    public class ProjectData
    {
        [Required]
        public string Name { get => Project.Name; set => Project.Name = value; }
        [Required]
        public string Url { get => Project.Url; set => Project.Url = value; }
        [Required]
        public string Token { get => Project.Token; set => Project.Token = value; }
        [Required]
        public bool IsActive { get => Project.IsActive; set => Project.IsActive = value; }

        public Project Project { get; set; } = new Project();
    }
}
