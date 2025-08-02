using System;
using System.Collections.Generic;

namespace GovernmentService.Models;

public partial class Order
{
    public int Oid { get; set; }

    public int Fid { get; set; }

    public int Cartid { get; set; }

    public decimal? Amount { get; set; }

    public DateOnly? Orderdate { get; set; }

    public virtual Cart Cart { get; set; } = null!;

    public virtual Farmer FidNavigation { get; set; } = null!;

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual ICollection<Rentalsp> Rentalsps { get; set; } = new List<Rentalsp>();
}
