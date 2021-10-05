﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RegistrationModule.Data;

namespace RegistrationModule.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.19")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("RegistrationModule.Data.Classes.Clinician", b =>
                {
                    b.Property<long>("ClinicianId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ClinicianId");

                    b.ToTable("Clinicians");
                });

            modelBuilder.Entity("RegistrationModule.Data.Classes.ClinicianTreatmentLocation", b =>
                {
                    b.Property<long>("ClinicianId")
                        .HasColumnType("bigint");

                    b.Property<long>("TreatmentLocationId")
                        .HasColumnType("bigint");

                    b.HasKey("ClinicianId", "TreatmentLocationId");

                    b.HasIndex("TreatmentLocationId");

                    b.ToTable("ClinicianTreatmentLocations");
                });

            modelBuilder.Entity("RegistrationModule.Data.Classes.Content", b =>
                {
                    b.Property<long>("ContentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Contents")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsVisible")
                        .HasColumnType("bit");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ContentId");

                    b.ToTable("Content");
                });

            modelBuilder.Entity("RegistrationModule.Data.Classes.ContentShowInPage", b =>
                {
                    b.Property<long>("ContentId")
                        .HasColumnType("bigint");

                    b.Property<long>("ShowInPageId")
                        .HasColumnType("bigint");

                    b.HasKey("ContentId", "ShowInPageId");

                    b.HasIndex("ShowInPageId");

                    b.ToTable("ContentShowInPages");
                });

            modelBuilder.Entity("RegistrationModule.Data.Classes.Patient", b =>
                {
                    b.Property<long>("PatientId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Comments")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ConsentDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DOB")
                        .HasColumnType("datetime2");

                    b.Property<string>("DeleteComment")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long?>("DoctorClinicianId")
                        .HasColumnType("bigint");

                    b.Property<string>("EstDOB")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("HasConsented")
                        .HasColumnType("bit");

                    b.Property<string>("Hospital")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HospitalUR")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Institution")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long?>("LocationTreatmentLocationId")
                        .HasColumnType("bigint");

                    b.Property<string>("MedicareNo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Middle")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long?>("PatientSexSexId")
                        .HasColumnType("bigint");

                    b.Property<string>("PatientUIN")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PostCode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long?>("ProjectId")
                        .HasColumnType("bigint");

                    b.Property<string>("RestoreComment")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("StudyCoordinator")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("StudyCoordinatorPhone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SubStudyParticipation")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PatientId");

                    b.HasIndex("DoctorClinicianId");

                    b.HasIndex("LocationTreatmentLocationId");

                    b.HasIndex("PatientSexSexId");

                    b.HasIndex("ProjectId");

                    b.ToTable("Patients");
                });

            modelBuilder.Entity("RegistrationModule.Data.Classes.Project", b =>
                {
                    b.Property<long>("ProjectId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Token")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Url")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ProjectId");

                    b.ToTable("Projects");
                });

            modelBuilder.Entity("RegistrationModule.Data.Classes.Role", b =>
                {
                    b.Property<long>("RoleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("RoleId");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("RegistrationModule.Data.Classes.Sex", b =>
                {
                    b.Property<long>("SexId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("SexId");

                    b.ToTable("Sexes");
                });

            modelBuilder.Entity("RegistrationModule.Data.Classes.ShowInPage", b =>
                {
                    b.Property<long>("ShowInPageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ShowInPageId");

                    b.ToTable("ShowInPage");
                });

            modelBuilder.Entity("RegistrationModule.Data.Classes.TreatmentLocation", b =>
                {
                    b.Property<long>("TreatmentLocationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Code")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Location")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("TreatmentLocationId");

                    b.ToTable("TreatmentLocations");
                });

            modelBuilder.Entity("RegistrationModule.Data.Classes.User", b =>
                {
                    b.Property<long>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long?>("UserRoleRoleId")
                        .HasColumnType("bigint");

                    b.HasKey("UserId");

                    b.HasIndex("UserRoleRoleId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("RegistrationModule.Data.Classes.UserTreatmentLocation", b =>
                {
                    b.Property<long>("UserId")
                        .HasColumnType("bigint");

                    b.Property<long>("TreatmentLocationId")
                        .HasColumnType("bigint");

                    b.HasKey("UserId", "TreatmentLocationId");

                    b.HasIndex("TreatmentLocationId");

                    b.ToTable("UserTreatmentLocations");
                });

            modelBuilder.Entity("RegistrationModule.Data.Classes.ClinicianTreatmentLocation", b =>
                {
                    b.HasOne("RegistrationModule.Data.Classes.Clinician", "Clinician")
                        .WithMany("ClinicianTreatmentLocations")
                        .HasForeignKey("ClinicianId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("RegistrationModule.Data.Classes.TreatmentLocation", "TreatmentLocation")
                        .WithMany("ClinicianTreatmentLocations")
                        .HasForeignKey("TreatmentLocationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("RegistrationModule.Data.Classes.ContentShowInPage", b =>
                {
                    b.HasOne("RegistrationModule.Data.Classes.Content", "Content")
                        .WithMany("ContentShowOnPages")
                        .HasForeignKey("ContentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("RegistrationModule.Data.Classes.ShowInPage", "ShowInPage")
                        .WithMany("ContentShowInPage")
                        .HasForeignKey("ShowInPageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("RegistrationModule.Data.Classes.Patient", b =>
                {
                    b.HasOne("RegistrationModule.Data.Classes.Clinician", "Doctor")
                        .WithMany()
                        .HasForeignKey("DoctorClinicianId");

                    b.HasOne("RegistrationModule.Data.Classes.TreatmentLocation", "Location")
                        .WithMany()
                        .HasForeignKey("LocationTreatmentLocationId");

                    b.HasOne("RegistrationModule.Data.Classes.Sex", "PatientSex")
                        .WithMany()
                        .HasForeignKey("PatientSexSexId");

                    b.HasOne("RegistrationModule.Data.Classes.Project", "Project")
                        .WithMany()
                        .HasForeignKey("ProjectId");
                });

            modelBuilder.Entity("RegistrationModule.Data.Classes.User", b =>
                {
                    b.HasOne("RegistrationModule.Data.Classes.Role", "UserRole")
                        .WithMany()
                        .HasForeignKey("UserRoleRoleId");
                });

            modelBuilder.Entity("RegistrationModule.Data.Classes.UserTreatmentLocation", b =>
                {
                    b.HasOne("RegistrationModule.Data.Classes.TreatmentLocation", "TreatmentLocation")
                        .WithMany("UserTreatmentLocation")
                        .HasForeignKey("TreatmentLocationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("RegistrationModule.Data.Classes.User", "User")
                        .WithMany("UserTreatmentLocation")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
