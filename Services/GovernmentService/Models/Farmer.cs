using System;
using System.Collections.Generic;

namespace GovernmentService.Models;

public partial class Farmer
{
    public int Fid { get; set; }

    public int? Uid { get; set; }

    public int Landsize { get; set; }

    public decimal Income { get; set; }

    public int Locid { get; set; }

    public virtual Location Loc { get; set; } = null!;

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual User? UidNavigation { get; set; }
}
