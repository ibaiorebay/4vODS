using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace API.Models;

public partial class Contratante
{
    public int CodContratante { get; set; }

    public string NombreContratante { get; set; } = null!;

    public string? Descripcion { get; set; }

    [JsonIgnore]
    public virtual ICollection<iniciativa> CodIniciativas { get; set; } = new List<iniciativa>();
}
