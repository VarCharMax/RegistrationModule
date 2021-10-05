using RegistrationModule.Data.Classes;
using System;
using System.Linq;

namespace RegistrationModule.Data
{
    public class SeedData
    {
        public static void SeedDatabase(ApplicationDbContext context)
        {
            var s1 = new Sex() { Description = "Male" };
            var s2 = new Sex { Description = "Female" };
            var s3 = new Sex { Description = "Intersex" };
            var s4 = new Sex { Description = "Not Stated" };

            var p1 = new Project { Name = "Project 1", IsActive = true, Token = "Token1", Url = "www.project1.com" };
            var p2 = new Project { Name = "Project 2", Url = "www.project2.com", IsActive = true, Token = "Token2" };

            if (context.Sexes.Count() == 0)
            {
                context.Sexes.AddRange(s1, s2, s3, s4);
            }
            

            if (context.Projects.Count() == 0)
            {
                context.Projects.AddRange(p1, p2);
            }

            if (context.Patients.Count() == 0)
            {
                var t1 = new TreatmentLocation { Code = "Code1", Location = "Melbourne" };
                var t2 = new TreatmentLocation { Code = "Code2", Location = "Carlton" };

                //List<TreatmentLocation> locations = new List<TreatmentLocation> { t1, t2 };

                var c1 = new Clinician { FirstName = "Jeremy", LastName = "Jones" };
                var c2 = new Clinician { FirstName = "Sue", LastName = "Allen" };

                context.Patients.AddRange(new Patient { 
                    FirstName = "John",
                    LastName = "Smith",
                    DOB = DateTime.Now,
                    Doctor = c1,
                    Hospital = "RMH",
                    HospitalUR = "123",
                    PatientSex = s1,
                    PatientUIN = "123",
                    MedicareNo = "123",
                    StudyCoordinator = "Anne",
                    PostCode ="3053",
                    Location = t1,
                    Institution = "Public",
                    Project = p1,
                    IsActive = true,
                    HasConsented = false
                },
                new Patient {
                    FirstName = "Alan",
                    LastName = "Browne",
                    DOB = DateTime.Now,
                    Doctor = c2,
                    Hospital = "RMH",
                    HospitalUR = "123",
                    PatientSex = s2,
                    PatientUIN = "123",
                    MedicareNo = "123",
                    StudyCoordinator = "Allen",
                    PostCode = "3023",
                    Location = t2,
                    Institution = "Private",
                    Project = p2,
                    IsActive = true,
                    HasConsented = false
                });
            }

            context.SaveChanges();
        }
    }
}
