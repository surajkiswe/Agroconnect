using System;
using System.Collections.Generic;

namespace GovernmentService.Models;

public partial class Government
{
    public int Gid { get; set; }

    public int Uid { get; set; }

    public int Empno { get; set; }

    public string Deptname { get; set; } = null!;

    public string Designation { get; set; } = null!;

    public virtual ICollection<Appliedscheme> Appliedschemes { get; set; } = new List<Appliedscheme>();

    public virtual ICollection<Scheme> Schemes { get; set; } = new List<Scheme>();

    public virtual User UidNavigation { get; set; } = null!;
}
