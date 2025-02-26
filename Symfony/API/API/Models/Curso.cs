using System;
using System.Collections.Generic;

namespace API.Models;

public partial class Curso
{
    public string NombreCurso { get; set; } = null!;

    public virtual ICollection<Asignatura> Asignaturas { get; set; } = new List<Asignatura>();
}
