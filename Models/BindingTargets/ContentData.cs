using RegistrationModule.Data.Classes;
using System.ComponentModel.DataAnnotations;

namespace RegistrationModule.Models.BindingTargets
{
    public class ContentData
    {
        [Required]
        public string Title { get => Content.Title; set => Content.Title = value; }
        [Required]
        public string Contents { get => Content.Contents; set => Content.Contents = value; }
        public bool IsVisible { get => Content.IsVisible; set => Content.IsVisible = value; }

        public Content Content { get; set; } = new Content();
    }
}
