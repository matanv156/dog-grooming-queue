CREATE VIEW AppointmentsView AS
SELECT
    a.Id AS AppointmentId,
    u.Id AS UserId,
    u.FirstName AS CustomerName,
    h.Name AS DogSize,
    h.DurationMinutes,
    a.ScheduledTime,
    a.CreatedAt,
    a.FinalPrice
FROM Appointments a
JOIN Users u ON a.UserId = u.Id
JOIN HaircutTypes h ON a.HaircutTypeId = h.Id;
