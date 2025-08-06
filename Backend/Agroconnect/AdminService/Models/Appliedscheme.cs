using System;
using System.Collections.Generic;

namespace AdminService.Models;

public partial class Appliedscheme
{
    public int Aid { get; set; }

    public int Gid { get; set; }

    public int Fid { get; set; }

    public sbyte Status { get; set; }

    public virtual Farmer FidNavigation { get; set; } = null!;

    public virtual Government GidNavigation { get; set; } = null!;
}
