CREATE PROCEDURE CreateAppointment
    @UserId INT,
    @HaircutTypeId INT,
    @ScheduledTime DATETIME
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @PreviousAppointments INT;
    DECLARE @BasePrice DECIMAL(10,2);
    DECLARE @FinalPrice DECIMAL(10,2);

    -- Count previous appointments
    SELECT @PreviousAppointments = COUNT(*)
    FROM Appointments
    WHERE UserId = @UserId;

    -- Get base price
    SELECT @BasePrice = Price
    FROM HaircutTypes
    WHERE Id = @HaircutTypeId;

    -- Apply discount if needed
    IF @PreviousAppointments >= 3
        SET @FinalPrice = @BasePrice * 0.9;
    ELSE
        SET @FinalPrice = @BasePrice;

    -- Insert appointment
    INSERT INTO Appointments (
        UserId,
        HaircutTypeId,
        ScheduledTime,
        FinalPrice
    )
    VALUES (
        @UserId,
        @HaircutTypeId,
        @ScheduledTime,
        @FinalPrice
    );
END;
