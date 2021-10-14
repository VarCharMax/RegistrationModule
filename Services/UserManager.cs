using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using RegistrationModule.Classes;
using Newtonsoft.Json.Linq;
using Serilog;
using System;
using System.IdentityModel.Tokens.Jwt;

namespace RegistrationModule.Services
{
    public class UserManagerService
    {
        private HttpContext _httpContext;
        private FilterConfig _config;

        public string UserId { get; set; }
        public bool IsUser { get; set; } = false;
        public bool IsAdmin { get; set; } = false;

        public UserManagerService(IHttpContextAccessor httpContextAccessor, FilterConfig config)
        {
            _httpContext = httpContextAccessor.HttpContext;
            _config = config;
            
            //It would be great if we could find a way of doing this in a non-blocking way.
            //But I wanted to parse the token only once and you can't have an synchronous constructor.
            var accessToken = _httpContext.GetUserAccessTokenAsync().Result;
            
            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(accessToken);

            ParseToken(token.Payload);
        }

        private void ParseToken(JwtPayload payload)
        {
            var userId = Convert.ToString(payload["sub"]);

            UserId = userId;

            if (payload.ContainsKey("role"))
            {
                Log.Logger.Debug($"Role: {Convert.ToString(payload["role"])}");

                try
                {
                    //If user is in multiple roles, roles will be in array.
                    //Try parsing as array first.
                    var rl = JArray.Parse(Convert.ToString(payload["role"]));

                    foreach (var k in rl)
                    {
                        if (_config.ApplicationName == k.ToString())
                        {
                            IsUser = true;
                            Log.Logger.Debug($"Is user: {true}");
                        }

                        if (k.ToString() == $"{_config.ApplicationName}_Admin")
                        {
                            IsAdmin = true;
                            Log.Logger.Debug($"Is admin: {true}");
                        }
                    }
                }
                catch (Exception) { }

                //Should be user only. You can't be an admin but not a user.
                var role = Convert.ToString(payload["role"]) ;

                if (role == _config.ApplicationName)
                {
                    Log.Logger.Debug($"Is user: true");
                    IsAdmin = false;
                    IsUser = true;
                }
            }
        }
    }
}
