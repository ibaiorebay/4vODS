using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace API.Models;

public partial class profesore
{
    public int ID_PROFESOR { get; set; }

    public string? NOMBRE { get; set; }

    public string? APELLIDO1 { get; set; }

    public string? APELLIDO2 { get; set; }

    public DateOnly? FECHA_NACIMIENTO { get; set; }
    [JsonIgnore]
    public virtual ICollection<iniciativa> ID_INICIATIVAs { get; set; } = new List<iniciativa>();
}
