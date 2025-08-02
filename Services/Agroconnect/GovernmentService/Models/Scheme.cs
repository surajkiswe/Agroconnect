using System.Text.Json.Serialization;
using GovernmentService.Models;

public partial class Scheme
{
    public int Schemeid { get; set; }

    public string Schemename { get; set; } = null!;

    public DateOnly Startdate { get; set; }

    public DateOnly Lastdate { get; set; }

    public string Eligibility { get; set; } = null!;

    public string Description { get; set; } = null!;

    public int Gid { get; set; }  // Foreign key to Government table

    [JsonIgnore]
    public virtual Government? Government { get; set; }
}
