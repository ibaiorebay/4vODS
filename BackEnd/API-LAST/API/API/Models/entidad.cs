using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace API.Models;

public partial class entidad
{
    public int ID_ENTIDAD { get; set; }

    public string? NOMBRE { get; set; }

    public string? DESCRIPCION { get; set; }
    [JsonIgnore]
    public virtual ICollection<iniciativa> ID_INICIATIVAs { get; set; } = new List<iniciativa>();
}
