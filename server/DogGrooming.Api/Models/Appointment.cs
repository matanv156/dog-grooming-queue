using System;
using System.Collections.Generic;

namespace DogGrooming.Api.Models;

public partial class Appointment
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int HaircutTypeId { get; set; }

    public DateTime ScheduledTime { get; set; }

    public DateTime CreatedAt { get; set; }

    public decimal FinalPrice { get; set; }

    public virtual HaircutType HaircutType { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
