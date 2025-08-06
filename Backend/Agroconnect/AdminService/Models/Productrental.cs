using System;
using System.Collections.Generic;

namespace AdminService.Models;

public partial class Productrental
{
    public int Prorid { get; set; }

    public int Prodid { get; set; }

    public int Vid { get; set; }

    public decimal Rateperday { get; set; }

    public virtual Product Prod { get; set; } = null!;

    public virtual Vendor VidNavigation { get; set; } = null!;
}
