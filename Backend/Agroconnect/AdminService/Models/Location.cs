using System;
using System.Collections.Generic;

namespace AdminService.Models;

public partial class Location
{
    public int Locid { get; set; }

    public string Locname { get; set; } = null!;

    public virtual ICollection<Farmer> Farmers { get; set; } = new List<Farmer>();
}
