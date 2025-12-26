CREATE TABLE Users (
    Id INT IDENTITY PRIMARY KEY,
    Username NVARCHAR(50) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    FirstName NVARCHAR(50) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE()
);

CREATE TABLE HaircutTypes (
    Id INT IDENTITY PRIMARY KEY,
    Name NVARCHAR(20) NOT NULL,
    DurationMinutes INT NOT NULL,
    Price DECIMAL(10,2) NOT NULL
);

INSERT INTO HaircutTypes (Name, DurationMinutes, Price)
VALUES
('Small', 30, 100),
('Medium', 45, 150),
('Large', 60, 200);

CREATE TABLE Appointments (
    Id INT IDENTITY PRIMARY KEY,
    UserId INT NOT NULL,
    HaircutTypeId INT NOT NULL,
    ScheduledTime DATETIME NOT NULL,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    FinalPrice DECIMAL(10,2) NOT NULL,

    CONSTRAINT FK_Appointments_Users
        FOREIGN KEY (UserId) REFERENCES Users(Id),

    CONSTRAINT FK_Appointments_HaircutTypes
        FOREIGN KEY (HaircutTypeId) REFERENCES HaircutTypes(Id)
);