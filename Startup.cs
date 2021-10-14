using IdentityModel;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Polly;
using RegistrationModule.Classes;
using RegistrationModule.Data;
using RegistrationModule.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RegistrationModule
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            string connectionString = Configuration["ConnectionStrings:Default"];
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(connectionString)
            );

            services.AddControllersWithViews()
                .AddJsonOptions(opts => {
                    opts.JsonSerializerOptions.IgnoreNullValues = true;
                }).AddNewtonsoftJson();


            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            services.AddAuthentication(options =>
            {
                options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme; //"Cookies"
                options.DefaultChallengeScheme = "oidc";
            })
            .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options => {

                Configuration.GetSection("CookieAuthenticationDefaults:Cookie").Bind(options);

                //options.Cookie.Name = ".AspNet.SharedCookie";
                //options.Cookie.Domain = ".biogrid.org.au";
                //options.Cookie.Path = "/";

                options.ExpireTimeSpan = TimeSpan.FromHours(Configuration.GetValue<int>("CookieAuthenticationDefaults:Expires"));

                options.Events.OnSigningIn = e =>
                {


                    return Task.CompletedTask;
                };

                options.Events.OnSignedIn = e =>
                {
                    var d = e.HttpContext;


                    return Task.CompletedTask;
                };

                options.Events.OnSigningOut = async e =>
                {
                    // automatically revoke refresh token at signout time
                    await e.HttpContext.RevokeUserRefreshTokenAsync();
                };
            })
            .AddOpenIdConnect("oidc", options =>
            {
                Configuration.GetSection("OpenIdConnect").Bind(options);

                options.Scope.Clear();

                Configuration.GetValue<List<string>>("AllowedScopes").ForEach(s => options.Scope.Add(s));

                //options.Scope.Add("openid");
                //options.Scope.Add("profile");
                //options.Scope.Add("offline_access");

                Configuration.GetValue<List<string>>("ApiScopes").ForEach(s => options.Scope.Add(s)); ;

                //options.ClaimActions.MapJsonKey("website", "website");

                options.TokenValidationParameters = new TokenValidationParameters
                {
                    NameClaimType = JwtClaimTypes.Name,
                    RoleClaimType = JwtClaimTypes.Role
                };

                //options.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;
                //options.SignOutScheme = IdentityServerConstants.SignoutScheme;
            });

            var filterConfig = new FilterConfig
            {
                Host = Configuration.GetValue<string>("OpenIdConnect:Authority"),
                ApplicationName = Configuration.GetValue<string>("OpenIdConnect:ClientId")
            };

            services.AddSingleton(filterConfig);
            services.AddHttpContextAccessor();
            services.AddScoped<UserManagerService>();

            services.AddAccessTokenManagement()
                .ConfigureBackchannelHttpClient()
                .AddTransientHttpErrorPolicy(policy => policy.WaitAndRetryAsync(new[]
                {
                    TimeSpan.FromSeconds(1),
                    TimeSpan.FromSeconds(2),
                    TimeSpan.FromSeconds(3)
                }));

            //Create clients that use the access token
            services.AddUserAccessTokenClient("api_client", client =>
            {
                client.BaseAddress = new Uri("");
            });



            services.AddRazorPages();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider services)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
            });

            app.UseSpa(spa =>
            {
                string strategy = Configuration.GetValue<string>("DevTools:ConnectionStrategy");

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    if (strategy == "proxy")
                    {
                        spa.UseProxyToSpaDevelopmentServer("http://127.0.0.1:4200");
                    }
                    else if (strategy == "managed")
                    {
                        spa.UseAngularCliServer(npmScript: "start");
                    }
                }
            });

            // SeedData.SeedDatabase(services.GetRequiredService<ApplicationDbContext>());
        }
    }
}

