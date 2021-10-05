using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RegistrationModule.Data.Classes
{
    public class ShowInPage
    {
        [Key]
        public long ShowInPageId { get; set; }
        public string Description { get; set; }

        public IList<ContentShowInPage> ContentShowInPage { get; set; }
    }
}
