using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API.Models;

public partial class Iniciativa
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int CodIniciativa { get; set; }

    public int Horas { get; set; }

    public string Titulo { get; set; } = null!;

    public DateOnly FechaInicio { get; set; }

    public DateOnly FechaFin { get; set; }

    
    public virtual ICollection<Asignatura> CodAsignaturas { get; set; } = new List<Asignatura>();
    
    public virtual ICollection<Contratante> CodContratantes { get; set; } = new List<Contratante>();
    
    public virtual ICollection<Profesore> IdProfesors { get; set; } = new List<Profesore>();
    public virtual ICollection<Meta> Meta { get; set; } = new List<Meta>();
}
