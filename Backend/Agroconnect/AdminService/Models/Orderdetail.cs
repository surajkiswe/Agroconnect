using System;
using System.Collections.Generic;

namespace AdminService.Models;

public partial class Orderdetail
{
    public int Orderdetailid { get; set; }

    public int Orderid { get; set; }

    public int? Pvid { get; set; }

    public int? Prorid { get; set; }

    public int? Quantity { get; set; }

    public int? Durationdays { get; set; }

    public decimal Priceperunit { get; set; }

    public decimal Subtotal { get; set; }

    public int? Vid { get; set; }

    public decimal? Price { get; set; }

    public virtual Ordermaster Order { get; set; } = null!;

    public virtual Productrental? Pror { get; set; }

    public virtual Productvendor? Pv { get; set; }

    public virtual Vendor? VidNavigation { get; set; }
}
