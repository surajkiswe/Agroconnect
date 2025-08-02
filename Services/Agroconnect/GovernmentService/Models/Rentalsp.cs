using System;
using System.Collections.Generic;

namespace GovernmentService.Models;

public partial class Rentalsp
{
    public int Prid { get; set; }

    public int Oid { get; set; }

    public decimal? Deposit { get; set; }

    public int Duration { get; set; }

    public decimal? Rentperday { get; set; }

    public virtual Order OidNavigation { get; set; } = null!;
}
