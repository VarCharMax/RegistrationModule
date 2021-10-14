using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using RegistrationModule.Services;
using Serilog;

namespace MvcClient.Filters
{
    public class RoleFilter : ActionFilterAttribute
    {
        public string RequiredRole { get; set; }

        /*
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            Log.Logger.Debug("OnActionExecuting ...");

            base.OnActionExecuting(context);
        }
        */

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            Log.Logger.Debug("OnActionExecuting ...");

            var userManager = context.HttpContext.RequestServices.GetService<UserManagerService>();

            bool isAuthorised = true;

            if (userManager.IsUser == false)
            {
                isAuthorised = false;
            }
            else if (userManager.IsUser == true && (RequiredRole == "Administrator" && userManager.IsAdmin != true))
            {
                isAuthorised = false;
            }

            if (isAuthorised == false)
            {
                context.Result = new RedirectToRouteResult(ConstructRouteValueDictionary());
            }

            base.OnActionExecuting(context);
        }


        private RouteValueDictionary ConstructRouteValueDictionary()
        {
            var dict = new RouteValueDictionary();
            
            dict.Add("controller", "Access");
            dict.Add("action", "Forbidden");

            return dict;
        }
    }
}
