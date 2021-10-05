using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RegistrationModule.Data.Classes
{
    public class Content
    {
        [Key]
        public long ContentId { get; set; }
        public string Title { get; set; }
        public string Contents { get; set; }
        public bool IsVisible { get; set; }
        public IList<ContentShowInPage> ContentShowOnPages { get; set; }
    }

    public class ContentShowInPage
    {
        public long ContentId { get; set; }
        public Content Content { get; set; }

        public long ShowInPageId { get; set; }
        public ShowInPage ShowInPage { get; set; }
    }
}
