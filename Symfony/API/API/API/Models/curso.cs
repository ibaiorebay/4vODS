using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace API.Models;

public partial class curso
{
    public int ID_CURSO { get; set; }

    public string? NOMBRE { get; set; }
    [JsonIgnore]
    public virtual ICollection<asignatura> asignaturas { get; set; } = new List<asignatura>();
}
