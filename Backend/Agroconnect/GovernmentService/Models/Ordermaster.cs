using System;
using System.Collections.Generic;

namespace GovernmentService.Models;

public partial class Ordermaster
{
    public int Orderid { get; set; }

    public int Fid { get; set; }

    public DateTime? Orderdate { get; set; }

    public decimal Totalamount { get; set; }

    public string? Paymentstatus { get; set; }

    public string? Paymentmethod { get; set; }

    public string? Shippingaddress { get; set; }

    public virtual Farmer FidNavigation { get; set; } = null!;

    public virtual ICollection<Orderdetail> Orderdetails { get; set; } = new List<Orderdetail>();

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();
}
