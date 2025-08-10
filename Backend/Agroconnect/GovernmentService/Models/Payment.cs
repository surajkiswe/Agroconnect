using System;
using System.Collections.Generic;

namespace GovernmentService.Models;

public partial class Payment
{
    public int Paymentid { get; set; }

    public int Orderid { get; set; }

    public decimal Amount { get; set; }

    public string Method { get; set; } = null!;

    public string? Paymentstatus { get; set; }

    public string? TransactionId { get; set; }

    public DateTime? PaymentDate { get; set; }

    public virtual Ordermaster Order { get; set; } = null!;
}
