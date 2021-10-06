using System;
using System.ComponentModel.DataAnnotations;

namespace RegistrationModule.Data.Classes
{
    public class Patient
    {
        [Key]
        public long PatientId { get; set; }
        public string PatientUIN { get; set; }
        public string HospitalUR { get; set; }
        public string Hospital { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Middle { get; set; }
        public DateTime DOB { get; set; }
        public string EstDOB  { get; set; }
        public Sex PatientSex { get; set; }
        public string MedicareNo { get; set; }
        public string PostCode { get; set; }
        public TreatmentLocation Location { get; set; }
        public Clinician Doctor { get; set; }
        public string Institution { get; set; }
        public string StudyCoordinator { get; set; }
        public string StudyCoordinatorPhone { get; set; }
        public bool IsActive { get; set; }
        public string DeleteComment { get; set; }
        public string RestoreComment { get; set; }
        public string Comments { get; set; }
        public string SubStudyParticipation { get; set; }
        public bool HasConsented { get; set; }
        public DateTime ConsentDate { get; set; }
        public Project Project { get; set; }
        public string StudyId { get; set; }
    }
}
