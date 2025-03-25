using System;
using System.Collections.Generic;

namespace API.Models;

public partial class iniciativa
{
    public int ID_INICIATIVA { get; set; }

    public string? TITULO { get; set; }

    public int? HORAS { get; set; }

    public string? FECHA_INICIO { get; set; }

    public string? FECHA_FIN { get; set; }

    public string? DESCRIPCION { get; set; }

    public string? TIPO { get; set; }

    public string? PRODUCTO_FINAL { get; set; }

    public bool? NUEVA { get; set; }

    public string? DIFUSION { get; set; }

    public virtual ICollection<asignatura> ID_ASIGNATURAs { get; set; } = new List<asignatura>();

    public virtual ICollection<entidad> ID_ENTIDADs { get; set; } = new List<entidad>();

    public virtual ICollection<meta> ID_METAs { get; set; } = new List<meta>();

    public virtual ICollection<profesore> ID_PROFESORs { get; set; } = new List<profesore>();
}
