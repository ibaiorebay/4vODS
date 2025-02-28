using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace API.Models;

public partial class asignatura
{
    public int ID_ASIGNATURA { get; set; }

    public int? ID_CURSO { get; set; }

    public string? NOMBRE { get; set; }
    [JsonIgnore]
    public virtual curso? ID_CURSONavigation { get; set; }

    public virtual ICollection<iniciativa> ID_INICIATIVAs { get; set; } = new List<iniciativa>();
}
