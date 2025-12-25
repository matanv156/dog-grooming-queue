using System;
using System.Collections.Generic;

namespace DogGrooming.Api.Models;

public partial class HaircutType
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int DurationMinutes { get; set; }

    public decimal Price { get; set; }

    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
}
