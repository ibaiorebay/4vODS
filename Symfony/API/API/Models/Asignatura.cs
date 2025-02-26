using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace API.Models;

public partial class Asignatura
{
    public int CodAsignatura { get; set; }

    public string? NombreCurso { get; set; }

    public string NombreAsignatura { get; set; } = null!;

    [JsonIgnore]
    public virtual Curso? NombreCursoNavigation { get; set; }

    [JsonIgnore]
    public virtual ICollection<Iniciativa> CodIniciativas { get; set; } = new List<Iniciativa>();
}
