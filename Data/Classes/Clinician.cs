using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RegistrationModule.Data.Classes
{
    public class Clinician
    {
        [Key]
        public long ClinicianId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public IList<ClinicianTreatmentLocation> ClinicianTreatmentLocations { get; set; }
    }

    public class ClinicianTreatmentLocation
    {
        public long ClinicianId { get; set; }
        public Clinician Clinician { get; set; }
        public long TreatmentLocationId { get; set; }
        public TreatmentLocation TreatmentLocation { get; set; }
    }
}
