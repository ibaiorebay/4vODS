using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace API.Models;

public partial class Profesore
{
    public int IdProfesor { get; set; }

    public string NombreProfesor { get; set; } = null!;

    public string Apellido1 { get; set; } = null!;

    public string Apellido2 { get; set; } = null!;

    public DateOnly FechaNacimiento { get; set; }

    [JsonIgnore]
    public virtual ICollection<Iniciativa> CodIniciativas { get; set; } = new List<Iniciativa>();
}
