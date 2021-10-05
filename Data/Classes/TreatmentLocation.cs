using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RegistrationModule.Data.Classes
{
    public class TreatmentLocation
    {
        [Key]
        public long TreatmentLocationId { get; set; }
        public string Location { get; set; }
        public string Code { get; set; }

        public IList<ClinicianTreatmentLocation> ClinicianTreatmentLocations { get; set; }

        public IList<UserTreatmentLocation> UserTreatmentLocation { get; set; }
    }
}
