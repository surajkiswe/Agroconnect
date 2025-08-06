using System;
using System.Collections.Generic;

namespace AdminService.Models;

public partial class Payment
{
    public int Payid { get; set; }

    public DateOnly? Paydate { get; set; }

    public string? Method { get; set; }

    public int Oid { get; set; }

    public virtual Order OidNavigation { get; set; } = null!;
}
