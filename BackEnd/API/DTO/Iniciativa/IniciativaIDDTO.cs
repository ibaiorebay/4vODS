﻿using System.Collections.Generic;

namespace API.DTO.Iniciativa
{
    public class IniciativaIDDTO
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

        // 🔹 Ahora solo aceptamos listas de enteros (IDs)
        public List<int>? ID_ASIGNATURAs { get; set; }
        public List<int>? ID_ENTIDADs { get; set; }
        public List<int>? ID_METAs { get; set; }
        public List<int>? ID_PROFESORs { get; set; }
    }
}
