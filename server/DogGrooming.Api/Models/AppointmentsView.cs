using System;
using System.Collections.Generic;

namespace DogGrooming.Api.Models;

public partial class AppointmentsView
{
    public int AppointmentId { get; set; }

    public int UserId { get; set; }

    public string CustomerName { get; set; } = null!;

    public string DogSize { get; set; } = null!;

    public int DurationMinutes { get; set; }

    public DateTime ScheduledTime { get; set; }

    public DateTime CreatedAt { get; set; }

    public decimal FinalPrice { get; set; }
}
