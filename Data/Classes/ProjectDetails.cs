using System;
using System.ComponentModel.DataAnnotations;

namespace RegistrationModule.Data.Classes
{
    public class ProjectDetails
    {
        [Key]
        public long ProjectDetailsId { get; set; }
        public Project Project { get; set; }
        public string StudyId { get; set; }
        public int SubStudyParticipation { get; set; }
        public bool HasConsented { get; set; }
        public DateTime ConsentDate { get; set; }
    }
}
