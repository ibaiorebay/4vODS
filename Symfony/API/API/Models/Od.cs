using System;
using System.Collections.Generic;

namespace API.Models;

public partial class Od
{
    public int NumeroOds { get; set; }

    public string Nombre { get; set; } = null!;

    public string? Descripcion { get; set; }

    public virtual ICollection<Meta> Meta { get; set; } = new List<Meta>();
}
