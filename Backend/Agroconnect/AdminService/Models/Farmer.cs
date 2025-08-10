using System;
using System.Collections.Generic;

namespace AdminService.Models;

public partial class Farmer
{
    public int Fid { get; set; }

    public int? Uid { get; set; }

    public double Landsize { get; set; }

    public double Income { get; set; }

    public int Locid { get; set; }

    public virtual ICollection<Appliedscheme> Appliedschemes { get; set; } = new List<Appliedscheme>();

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual Location Loc { get; set; } = null!;

    public virtual ICollection<Ordermaster> Ordermasters { get; set; } = new List<Ordermaster>();

    public virtual User? UidNavigation { get; set; }
}
