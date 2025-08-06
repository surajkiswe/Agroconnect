using System;
using System.Collections.Generic;

namespace AdminService.Models;

public partial class Scheme
{
    public int Schemeid { get; set; }

    public string Schemename { get; set; } = null!;

    public DateOnly Startdate { get; set; }

    public DateOnly Lastdate { get; set; }

    public string Eligibility { get; set; } = null!;

    public string Description { get; set; } = null!;

    public int Gid { get; set; }

    public virtual Government GidNavigation { get; set; } = null!;
}
