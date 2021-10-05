using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RegistrationModule.Data.Classes
{
    public class User
    {
        [Key]
        public long UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public Role UserRole { get; set; }
        public IList<UserTreatmentLocation> UserTreatmentLocation { get; set; }
        public string Password { get; set; }
    }

    public class UserTreatmentLocation
    {
        public long UserId { get; set; }
        public User User { get; set; }

        public long TreatmentLocationId { get; set; }
        public TreatmentLocation TreatmentLocation { get; set; }
    }
}
