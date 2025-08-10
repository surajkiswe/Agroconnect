using System;
using System.Collections.Generic;

namespace AdminService.Models;

public partial class Cart
{
    public int Cartid { get; set; }

    public int Fid { get; set; }

    public int? Quantity { get; set; }

    public int? DurationDays { get; set; }

    public int? Pvid { get; set; }

    public int? Prorid { get; set; }

    public DateTime? AddedDate { get; set; }

    public double Price { get; set; }

    public virtual Farmer FidNavigation { get; set; } = null!;

    public virtual Productrental? Pror { get; set; }

    public virtual Productvendor? Pv { get; set; }
}
