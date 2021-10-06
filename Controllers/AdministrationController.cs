using Microsoft.AspNetCore.Mvc;

namespace RegistrationModule.Controllers
{
    public class AdministrationController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
