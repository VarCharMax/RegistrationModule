using RegistrationModule.Data.Classes;
using System.ComponentModel.DataAnnotations;

namespace RegistrationModule.Models.BindingTargets
{
    public class ClinicianData
    {
        [Required]
        public string FirstName { get => Clinician.FirstName; set => Clinician.FirstName = value; }
        [Required]
        public string LastName { get; set; }

        public Clinician Clinician { get; set; } = new Clinician();
    }
}
