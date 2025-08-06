using System.Text.Json.Serialization;
using GovernmentService.Models;

public class Product
{
    public int Prodid { get; set; }

    [JsonPropertyName("Cid")]
    public int Cid { get; set; }

    [JsonPropertyName("Pname")]
    public string Pname { get; set; } = null!;

    [JsonPropertyName("Pdescription")]
    public string? Pdescription { get; set; }

    public virtual Category CidNavigation { get; set; } = null!;
    public virtual ICollection<Productvendor> Productvendors { get; set; } = new List<Productvendor>();
}
