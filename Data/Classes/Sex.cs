using System.ComponentModel.DataAnnotations;

namespace RegistrationModule.Data.Classes
{
    public class Sex
    {
        [Key]
        public long SexId { get; set; }
        public string Description { get; set; }
    }
}
