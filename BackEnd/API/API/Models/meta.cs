using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace API.Models;

public partial class meta
{
    public int ID_META { get; set; }

    public int? ID_ODS { get; set; }

    public string? DESCRIPCION { get; set; }
    [JsonIgnore]
    public virtual od? ID_ODSNavigation { get; set; }
    [JsonIgnore]
    public virtual ICollection<iniciativa> ID_INICIATIVAs { get; set; } = new List<iniciativa>();
}
