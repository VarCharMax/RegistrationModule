using RegistrationModule.Data.Classes;
using System.ComponentModel.DataAnnotations;

namespace RegistrationModule.Models.BindingTargets
{
    public class TreatmentLocationData
    {
        [Required]
        public string Location { get => TreatmentLocation.Location; set => TreatmentLocation.Location = value; }
        [Required]
        public string Code { get => TreatmentLocation.Code; set => TreatmentLocation.Code = value; }

        public TreatmentLocation TreatmentLocation { get; set; } = new TreatmentLocation();
    }
}
