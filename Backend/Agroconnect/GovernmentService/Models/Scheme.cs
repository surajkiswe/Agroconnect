using System;
using System.Collections.Generic;

namespace GovernmentService.Models;

public partial class Scheme
{
    public int Schemeid { get; set; }

    public string Schemename { get; set; } = null!;

    public DateOnly Startdate { get; set; }

    public DateOnly Lastdate { get; set; }

    public string Eligibility { get; set; } = null!;

    public string Description { get; set; } = null!;

    public int Gid { get; set; }

    public double Income { get; set; }

    public double Landsize { get; set; }

    public virtual ICollection<Appliedscheme> Appliedschemes { get; set; } = new List<Appliedscheme>();

    public virtual Government? GidNavigation { get; set; } = null!;
}
