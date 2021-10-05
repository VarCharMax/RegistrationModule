using System;
using System.ComponentModel.DataAnnotations;

namespace RegistrationModule.Data.Classes
{
    public class PatientManagement
    {
        [Key]
        public int PatientManagementId { get; set; }
        public string PatientUIN { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public DateTime DOB { get; set; }
        public string Hospital { get; set; }
        public string StudyCoordinator { get; set; }
        public string Reason { get; set; }
    }
}
