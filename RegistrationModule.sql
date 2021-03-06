Build started...
Build succeeded.
IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;

GO

CREATE TABLE [Clinicians] (
    [ClinicianId] int NOT NULL IDENTITY,
    [FirstName] nvarchar(max) NULL,
    [LastName] nvarchar(max) NULL,
    CONSTRAINT [PK_Clinicians] PRIMARY KEY ([ClinicianId])
);

GO

CREATE TABLE [Content] (
    [ContentId] int NOT NULL IDENTITY,
    [Title] nvarchar(max) NULL,
    [Contents] nvarchar(max) NULL,
    [IsVisible] bit NOT NULL,
    CONSTRAINT [PK_Content] PRIMARY KEY ([ContentId])
);

GO

CREATE TABLE [PatientsManagement] (
    [PatientManagementId] int NOT NULL IDENTITY,
    [PatientUIN] nvarchar(max) NULL,
    [LastName] nvarchar(max) NULL,
    [FirstName] nvarchar(max) NULL,
    [DOB] datetime2 NOT NULL,
    [Hospital] nvarchar(max) NULL,
    [StudyCoordinator] nvarchar(max) NULL,
    [Reason] nvarchar(max) NULL,
    CONSTRAINT [PK_PatientsManagement] PRIMARY KEY ([PatientManagementId])
);

GO

CREATE TABLE [ProjectApis] (
    [ProjectApiId] int NOT NULL IDENTITY,
    [Project] nvarchar(max) NULL,
    [Url] nvarchar(max) NULL,
    [Token] nvarchar(max) NULL,
    [IsActive] bit NOT NULL,
    CONSTRAINT [PK_ProjectApis] PRIMARY KEY ([ProjectApiId])
);

GO

CREATE TABLE [Role] (
    [RoleId] int NOT NULL IDENTITY,
    [Description] nvarchar(max) NULL,
    CONSTRAINT [PK_Role] PRIMARY KEY ([RoleId])
);

GO

CREATE TABLE [Sex] (
    [SexId] int NOT NULL IDENTITY,
    [Description] nvarchar(max) NULL,
    CONSTRAINT [PK_Sex] PRIMARY KEY ([SexId])
);

GO

CREATE TABLE [ShowInPage] (
    [ShowInPageId] int NOT NULL IDENTITY,
    [Description] nvarchar(max) NULL,
    CONSTRAINT [PK_ShowInPage] PRIMARY KEY ([ShowInPageId])
);

GO

CREATE TABLE [TreatmentLocations] (
    [TreatmentLocationId] int NOT NULL IDENTITY,
    [Location] nvarchar(max) NULL,
    [Code] nvarchar(max) NULL,
    CONSTRAINT [PK_TreatmentLocations] PRIMARY KEY ([TreatmentLocationId])
);

GO

CREATE TABLE [Projects] (
    [ProjectDetailsId] int NOT NULL IDENTITY,
    [ProjectApiId] int NULL,
    [StudyId] nvarchar(max) NULL,
    [SubStudyParticipation] int NOT NULL,
    [HasConsented] bit NOT NULL,
    [ConsentDate] datetime2 NOT NULL,
    CONSTRAINT [PK_Projects] PRIMARY KEY ([ProjectDetailsId]),
    CONSTRAINT [FK_Projects_ProjectApis_ProjectApiId] FOREIGN KEY ([ProjectApiId]) REFERENCES [ProjectApis] ([ProjectApiId]) ON DELETE NO ACTION
);

GO

CREATE TABLE [Users] (
    [UserId] int NOT NULL IDENTITY,
    [FirstName] nvarchar(max) NULL,
    [LastName] nvarchar(max) NULL,
    [Email] nvarchar(max) NULL,
    [UserRoleRoleId] int NULL,
    [Password] nvarchar(max) NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY ([UserId]),
    CONSTRAINT [FK_Users_Role_UserRoleRoleId] FOREIGN KEY ([UserRoleRoleId]) REFERENCES [Role] ([RoleId]) ON DELETE NO ACTION
);

GO

CREATE TABLE [ContentShowInPages] (
    [ContentId] int NOT NULL,
    [ShowInPageId] int NOT NULL,
    CONSTRAINT [PK_ContentShowInPages] PRIMARY KEY ([ContentId], [ShowInPageId]),
    CONSTRAINT [FK_ContentShowInPages_Content_ContentId] FOREIGN KEY ([ContentId]) REFERENCES [Content] ([ContentId]) ON DELETE CASCADE,
    CONSTRAINT [FK_ContentShowInPages_ShowInPage_ShowInPageId] FOREIGN KEY ([ShowInPageId]) REFERENCES [ShowInPage] ([ShowInPageId]) ON DELETE CASCADE
);

GO

CREATE TABLE [ClinicianTreatmentLocations] (
    [ClinicianId] int NOT NULL,
    [TreatmentLocationId] int NOT NULL,
    CONSTRAINT [PK_ClinicianTreatmentLocations] PRIMARY KEY ([ClinicianId], [TreatmentLocationId]),
    CONSTRAINT [FK_ClinicianTreatmentLocations_Clinicians_ClinicianId] FOREIGN KEY ([ClinicianId]) REFERENCES [Clinicians] ([ClinicianId]) ON DELETE CASCADE,
    CONSTRAINT [FK_ClinicianTreatmentLocations_TreatmentLocations_TreatmentLocationId] FOREIGN KEY ([TreatmentLocationId]) REFERENCES [TreatmentLocations] ([TreatmentLocationId]) ON DELETE CASCADE
);

GO

CREATE TABLE [Patients] (
    [PatientId] int NOT NULL IDENTITY,
    [PatientUIN] nvarchar(max) NULL,
    [HospitalUR] nvarchar(max) NULL,
    [Hospital] nvarchar(max) NULL,
    [FirstName] nvarchar(max) NULL,
    [LastName] nvarchar(max) NULL,
    [Middle] nvarchar(max) NULL,
    [DOB] datetime2 NOT NULL,
    [EstDOB] nvarchar(max) NULL,
    [PatientSexSexId] int NULL,
    [MedicareNo] nvarchar(max) NULL,
    [PostCode] nvarchar(max) NULL,
    [LocationTreatmentLocationId] int NULL,
    [DoctorClinicianId] int NULL,
    [Institution] nvarchar(max) NULL,
    [StudyCoordinator] nvarchar(max) NULL,
    [StudyCoordinatorPhone] nvarchar(max) NULL,
    [Comments] nvarchar(max) NULL,
    CONSTRAINT [PK_Patients] PRIMARY KEY ([PatientId]),
    CONSTRAINT [FK_Patients_Clinicians_DoctorClinicianId] FOREIGN KEY ([DoctorClinicianId]) REFERENCES [Clinicians] ([ClinicianId]) ON DELETE NO ACTION,
    CONSTRAINT [FK_Patients_TreatmentLocations_LocationTreatmentLocationId] FOREIGN KEY ([LocationTreatmentLocationId]) REFERENCES [TreatmentLocations] ([TreatmentLocationId]) ON DELETE NO ACTION,
    CONSTRAINT [FK_Patients_Sex_PatientSexSexId] FOREIGN KEY ([PatientSexSexId]) REFERENCES [Sex] ([SexId]) ON DELETE NO ACTION
);

GO

CREATE TABLE [UserTreatmentLocations] (
    [UserId] int NOT NULL,
    [TreatmentLocationId] int NOT NULL,
    CONSTRAINT [PK_UserTreatmentLocations] PRIMARY KEY ([UserId], [TreatmentLocationId]),
    CONSTRAINT [FK_UserTreatmentLocations_TreatmentLocations_TreatmentLocationId] FOREIGN KEY ([TreatmentLocationId]) REFERENCES [TreatmentLocations] ([TreatmentLocationId]) ON DELETE CASCADE,
    CONSTRAINT [FK_UserTreatmentLocations_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([UserId]) ON DELETE CASCADE
);

GO

CREATE INDEX [IX_ClinicianTreatmentLocations_TreatmentLocationId] ON [ClinicianTreatmentLocations] ([TreatmentLocationId]);

GO

CREATE INDEX [IX_ContentShowInPages_ShowInPageId] ON [ContentShowInPages] ([ShowInPageId]);

GO

CREATE INDEX [IX_Patients_DoctorClinicianId] ON [Patients] ([DoctorClinicianId]);

GO

CREATE INDEX [IX_Patients_LocationTreatmentLocationId] ON [Patients] ([LocationTreatmentLocationId]);

GO

CREATE INDEX [IX_Patients_PatientSexSexId] ON [Patients] ([PatientSexSexId]);

GO

CREATE INDEX [IX_Projects_ProjectApiId] ON [Projects] ([ProjectApiId]);

GO

CREATE INDEX [IX_Users_UserRoleRoleId] ON [Users] ([UserRoleRoleId]);

GO

CREATE INDEX [IX_UserTreatmentLocations_TreatmentLocationId] ON [UserTreatmentLocations] ([TreatmentLocationId]);

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210928141633_Initial', N'3.1.19');

GO


