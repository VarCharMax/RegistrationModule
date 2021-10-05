using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RegistrationModule.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Clinicians",
                columns: table => new
                {
                    ClinicianId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clinicians", x => x.ClinicianId);
                });

            migrationBuilder.CreateTable(
                name: "Content",
                columns: table => new
                {
                    ContentId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(nullable: true),
                    Contents = table.Column<string>(nullable: true),
                    IsVisible = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Content", x => x.ContentId);
                });

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    ProjectId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Url = table.Column<string>(nullable: true),
                    Token = table.Column<string>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.ProjectId);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    RoleId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.RoleId);
                });

            migrationBuilder.CreateTable(
                name: "Sexes",
                columns: table => new
                {
                    SexId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sexes", x => x.SexId);
                });

            migrationBuilder.CreateTable(
                name: "ShowInPage",
                columns: table => new
                {
                    ShowInPageId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShowInPage", x => x.ShowInPageId);
                });

            migrationBuilder.CreateTable(
                name: "TreatmentLocations",
                columns: table => new
                {
                    TreatmentLocationId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Location = table.Column<string>(nullable: true),
                    Code = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TreatmentLocations", x => x.TreatmentLocationId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    UserRoleRoleId = table.Column<long>(nullable: true),
                    Password = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_Users_Roles_UserRoleRoleId",
                        column: x => x.UserRoleRoleId,
                        principalTable: "Roles",
                        principalColumn: "RoleId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ContentShowInPages",
                columns: table => new
                {
                    ContentId = table.Column<long>(nullable: false),
                    ShowInPageId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContentShowInPages", x => new { x.ContentId, x.ShowInPageId });
                    table.ForeignKey(
                        name: "FK_ContentShowInPages_Content_ContentId",
                        column: x => x.ContentId,
                        principalTable: "Content",
                        principalColumn: "ContentId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ContentShowInPages_ShowInPage_ShowInPageId",
                        column: x => x.ShowInPageId,
                        principalTable: "ShowInPage",
                        principalColumn: "ShowInPageId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClinicianTreatmentLocations",
                columns: table => new
                {
                    ClinicianId = table.Column<long>(nullable: false),
                    TreatmentLocationId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClinicianTreatmentLocations", x => new { x.ClinicianId, x.TreatmentLocationId });
                    table.ForeignKey(
                        name: "FK_ClinicianTreatmentLocations_Clinicians_ClinicianId",
                        column: x => x.ClinicianId,
                        principalTable: "Clinicians",
                        principalColumn: "ClinicianId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClinicianTreatmentLocations_TreatmentLocations_TreatmentLocationId",
                        column: x => x.TreatmentLocationId,
                        principalTable: "TreatmentLocations",
                        principalColumn: "TreatmentLocationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Patients",
                columns: table => new
                {
                    PatientId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PatientUIN = table.Column<string>(nullable: true),
                    HospitalUR = table.Column<string>(nullable: true),
                    Hospital = table.Column<string>(nullable: true),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Middle = table.Column<string>(nullable: true),
                    DOB = table.Column<DateTime>(nullable: false),
                    EstDOB = table.Column<string>(nullable: true),
                    PatientSexSexId = table.Column<long>(nullable: true),
                    MedicareNo = table.Column<string>(nullable: true),
                    PostCode = table.Column<string>(nullable: true),
                    LocationTreatmentLocationId = table.Column<long>(nullable: true),
                    DoctorClinicianId = table.Column<long>(nullable: true),
                    Institution = table.Column<string>(nullable: true),
                    StudyCoordinator = table.Column<string>(nullable: true),
                    StudyCoordinatorPhone = table.Column<string>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false),
                    DeleteComment = table.Column<string>(nullable: true),
                    RestoreComment = table.Column<string>(nullable: true),
                    Comments = table.Column<string>(nullable: true),
                    SubStudyParticipation = table.Column<string>(nullable: true),
                    HasConsented = table.Column<bool>(nullable: false),
                    ConsentDate = table.Column<DateTime>(nullable: false),
                    ProjectId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Patients", x => x.PatientId);
                    table.ForeignKey(
                        name: "FK_Patients_Clinicians_DoctorClinicianId",
                        column: x => x.DoctorClinicianId,
                        principalTable: "Clinicians",
                        principalColumn: "ClinicianId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Patients_TreatmentLocations_LocationTreatmentLocationId",
                        column: x => x.LocationTreatmentLocationId,
                        principalTable: "TreatmentLocations",
                        principalColumn: "TreatmentLocationId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Patients_Sexes_PatientSexSexId",
                        column: x => x.PatientSexSexId,
                        principalTable: "Sexes",
                        principalColumn: "SexId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Patients_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "ProjectId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserTreatmentLocations",
                columns: table => new
                {
                    UserId = table.Column<long>(nullable: false),
                    TreatmentLocationId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTreatmentLocations", x => new { x.UserId, x.TreatmentLocationId });
                    table.ForeignKey(
                        name: "FK_UserTreatmentLocations_TreatmentLocations_TreatmentLocationId",
                        column: x => x.TreatmentLocationId,
                        principalTable: "TreatmentLocations",
                        principalColumn: "TreatmentLocationId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserTreatmentLocations_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ClinicianTreatmentLocations_TreatmentLocationId",
                table: "ClinicianTreatmentLocations",
                column: "TreatmentLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_ContentShowInPages_ShowInPageId",
                table: "ContentShowInPages",
                column: "ShowInPageId");

            migrationBuilder.CreateIndex(
                name: "IX_Patients_DoctorClinicianId",
                table: "Patients",
                column: "DoctorClinicianId");

            migrationBuilder.CreateIndex(
                name: "IX_Patients_LocationTreatmentLocationId",
                table: "Patients",
                column: "LocationTreatmentLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_Patients_PatientSexSexId",
                table: "Patients",
                column: "PatientSexSexId");

            migrationBuilder.CreateIndex(
                name: "IX_Patients_ProjectId",
                table: "Patients",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_UserRoleRoleId",
                table: "Users",
                column: "UserRoleRoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UserTreatmentLocations_TreatmentLocationId",
                table: "UserTreatmentLocations",
                column: "TreatmentLocationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClinicianTreatmentLocations");

            migrationBuilder.DropTable(
                name: "ContentShowInPages");

            migrationBuilder.DropTable(
                name: "Patients");

            migrationBuilder.DropTable(
                name: "UserTreatmentLocations");

            migrationBuilder.DropTable(
                name: "Content");

            migrationBuilder.DropTable(
                name: "ShowInPage");

            migrationBuilder.DropTable(
                name: "Clinicians");

            migrationBuilder.DropTable(
                name: "Sexes");

            migrationBuilder.DropTable(
                name: "Projects");

            migrationBuilder.DropTable(
                name: "TreatmentLocations");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Roles");
        }
    }
}
