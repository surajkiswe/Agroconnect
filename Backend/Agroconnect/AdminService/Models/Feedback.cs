using System;
using System.Collections.Generic;

namespace AdminService.Models;

public partial class Feedback
{
    public int Feedid { get; set; }

    public int Uid { get; set; }

    public int Vid { get; set; }

    public string? Message { get; set; }

    public DateOnly? Date { get; set; }

    public virtual User UidNavigation { get; set; } = null!;

    public virtual Vendor VidNavigation { get; set; } = null!;
}
