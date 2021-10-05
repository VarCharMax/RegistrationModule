using Microsoft.EntityFrameworkCore;
using RegistrationModule.Data.Classes;

namespace RegistrationModule.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(
            DbContextOptions options) : base(options)
        {

        }

        public DbSet<TreatmentLocation> TreatmentLocations { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Content> Content { get; set; }

        public DbSet<Clinician> Clinicians { get; set; }

        public DbSet<Project> Projects { get; set; }

        public DbSet<Patient> Patients { get; set; }

        //public DbSet<ProjectDetails> Projects { get; set; }
        public DbSet<Sex> Sexes { get; set; }
        public DbSet<Role> Roles { get; set; }

        public DbSet<UserTreatmentLocation> UserTreatmentLocations { get; set; }
        public DbSet<ClinicianTreatmentLocation> ClinicianTreatmentLocations { get; set; }

        public DbSet<ContentShowInPage> ContentShowInPages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ClinicianTreatmentLocation>().HasKey(ct => new { ct.ClinicianId, ct.TreatmentLocationId });
            modelBuilder.Entity<UserTreatmentLocation>().HasKey(ut => new { ut.UserId, ut.TreatmentLocationId });
            modelBuilder.Entity<ContentShowInPage>().HasKey(cs => new { cs.ContentId, cs.ShowInPageId });
        }
    }
}
