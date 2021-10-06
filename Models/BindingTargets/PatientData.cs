using RegistrationModule.Data.Classes;
using System;
using System.ComponentModel.DataAnnotations;

namespace RegistrationModule.Models.BindingTargets
{
    public class PatientData
    {
        [Required]
        public string PatientUIN { get => Patient.PatientUIN; set => Patient.PatientUIN = value; }
        public string HospitalUR { get => Patient.HospitalUR; set => Patient.HospitalUR = value; }
        [Required]
        public string Hospital { get => Patient.Hospital; set => Patient.Hospital = value; }
        [Required]
        public string FirstName { get => Patient.FirstName; set => Patient.FirstName = value; }
        [Required]
        public string LastName { get => Patient.LastName; set => Patient.LastName = value; }
        public string Middle { get => Patient.Middle; set => Patient.Middle = value; }
        [Required]
        public DateTime DOB { get => Patient.DOB; set => Patient.DOB = value; }
        public string EstDOB { get => Patient.EstDOB; set => Patient.EstDOB = value; }
        public Sex PatientSex { get => Patient.PatientSex; set => Patient.PatientSex = value; }
        public string MedicareNo { get => Patient.MedicareNo; set => Patient.MedicareNo = value; }
        public string PostCode { get => Patient.PostCode; set => Patient.PostCode = value; }
        public TreatmentLocation Location { get => Patient.Location; set => Patient.Location = value; }
        public Clinician Doctor { get => Patient.Doctor; set => Patient.Doctor = value; }
        [Required]
        public string Institution { get => Patient.Institution; set => Patient.Institution = value; }
        [Required]
        public string StudyCoordinator { get => Patient.StudyCoordinator; set => Patient.StudyCoordinator = value; }
        public string StudyCoordinatorPhone { get => Patient.StudyCoordinatorPhone; set => Patient.StudyCoordinatorPhone = value; }
        public bool IsActive { get => Patient.IsActive; set => Patient.IsActive = value; }
        public string DeleteComment { get => Patient.DeleteComment; set => Patient.DeleteComment = value; }
        public string RestoreComment { get => Patient.RestoreComment; set => Patient.RestoreComment = value; }
        public string Comments { get => Patient.Comments; set => Patient.Comments = value; }
        public string SubStudyParticipation { get => Patient.SubStudyParticipation; set => Patient.SubStudyParticipation = value; }
        public bool HasConsented { get => Patient.HasConsented; set => Patient.HasConsented = value; }
        public DateTime ConsentDate { get => Patient.ConsentDate; set => Patient.ConsentDate = value; }
        public Project Project { get => Patient.Project; set => Patient.Project = value; }
        public string StudyId { get => Patient.StudyId; set => Patient.StudyId = value; }

        public Patient Patient { get; set; } = new Patient();
     }
}
