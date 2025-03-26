using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace API.Models;

public partial class od
{
    public int ID_ODS { get; set; }

    public string? NOMBRE { get; set; }

    public string? DESCRIPCION { get; set; }

    public string? DIMENSION { get; set; }
    [JsonIgnore]
    public virtual ICollection<meta> meta { get; set; } = new List<meta>();
}
