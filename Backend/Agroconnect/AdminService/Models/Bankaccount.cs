using System;
using System.Collections.Generic;

namespace AdminService.Models;

public partial class Bankaccount
{
    public int Accid { get; set; }

    public string Accno { get; set; } = null!;

    public string Bankname { get; set; } = null!;

    public string Branchname { get; set; } = null!;

    public string Ifsccode { get; set; } = null!;
}
