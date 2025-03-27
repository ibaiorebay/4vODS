using API.DTO.Asignatura;
using API.Models;

namespace API.DTO
{
    public class IniciativaDTO
    {
        public int ID_INICIATIVA { get; set; }

        public string? TITULO { get; set; }

        public int? HORAS { get; set; }

        public string? FECHA_INICIO { get; set; }

        public string? FECHA_FIN { get; set; }

        public string? DESCRIPCION { get; set; }

        public string? TIPO { get; set; }

        public string? PRODUCTO_FINAL { get; set; }

        public bool NUEVA { get; set; }

        public string? DIFUSION { get; set; }

        public virtual List<AsignaturaDTO> ID_ASIGNATURAs { get; set; }

        public virtual List<entidad> ID_ENTIDADs { get; set; }

        public virtual List<MetasDTO> ID_METAs { get; set; }

        public virtual List<profesore> ID_PROFESORs { get; set; }
    }
}