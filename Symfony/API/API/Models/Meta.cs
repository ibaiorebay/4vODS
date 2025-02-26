using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace API.Models;

public partial class Meta
{
    public int NumeroOds { get; set; }

    public string CaracterMeta { get; set; } = null!;

    public string? Descripcion { get; set; }

    public virtual Od NumeroOdsNavigation { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<Iniciativa> CodIniciativas { get; set; } = new List<Iniciativa>();
}
