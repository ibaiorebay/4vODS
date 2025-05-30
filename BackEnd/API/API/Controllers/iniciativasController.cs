﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.Blazor;
using API.DTO;
using API.DTO.Iniciativa;
using API.DTO.Asignatura;


namespace API.Controllers
{
    [Route("api/iniciativas")]
    [ApiController]
    public class IniciativasController : ControllerBase
    {
        private readonly _4vodsContext _context;

        public IniciativasController(_4vodsContext context)
        {
            _context = context;
        }

        // GET: api/iniciativas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<IniciativaDTO>>> GetIniciativas()
        {
            var iniciativas = await _context.iniciativas
                .Include(i => i.ID_ASIGNATURAs)
                    .ThenInclude(a => a.ID_CURSONavigation) // Incluye curso en asignaturas
                .Include(i => i.ID_ENTIDADs)
                .Include(i => i.ID_METAs)
                    .ThenInclude(m => m.ID_ODSNavigation) // Incluye información del ODS
                .Include(i => i.ID_PROFESORs)
                .Select(i => new IniciativaDTO
                {
                    ID_INICIATIVA = i.ID_INICIATIVA,
                    TITULO = i.TITULO,
                    HORAS = i.HORAS,
                    FECHA_INICIO = i.FECHA_INICIO,
                    FECHA_FIN = i.FECHA_FIN,
                    DESCRIPCION = i.DESCRIPCION,
                    TIPO = i.TIPO,
                    PRODUCTO_FINAL = i.PRODUCTO_FINAL,
                    NUEVA = i.NUEVA,
                    DIFUSION = i.difusiones.Select(i => i.LINK).ToList(),
                    CURSOESCOLAR = i.ID_CURSOESCOLARNavigation.DESCRIPCION,
                    ID_ASIGNATURAs = i.ID_ASIGNATURAs.Select(ia => new AsignaturaDTO
                    {
                        ID_ASIGNATURA = ia.ID_ASIGNATURA,
                        ID_CURSO = ia.ID_CURSO,
                        NOMBRE = ia.NOMBRE,
                        NOMBRE_CURSO = ia.ID_CURSONavigation.NOMBRE
                    }).ToList(),

                    ID_ENTIDADs = i.ID_ENTIDADs.Select(e => new entidad
                    {
                        ID_ENTIDAD = e.ID_ENTIDAD,
                        NOMBRE = e.NOMBRE,
                        DESCRIPCION = e.DESCRIPCION
                    }).ToList(),

                    ID_PROFESORs = i.ID_PROFESORs.Select(p => new profesore
                    {
                        ID_PROFESOR = p.ID_PROFESOR,
                        NOMBRE = p.NOMBRE,
                        APELLIDO1 = p.APELLIDO1,
                        APELLIDO2 = p.APELLIDO2,
                        FECHA_NACIMIENTO = p.FECHA_NACIMIENTO
                    }).ToList(),

                    ID_METAs = i.ID_METAs.Select(im => new MetasDTO
                    {
                        ID_META = im.ID_META,
                        ID_ODS = im.ID_ODS,
                        DESCRIPCION_META = im.DESCRIPCION,
                        NOMBRE_ODS = im.ID_ODSNavigation.NOMBRE,
                        DESCRIPCION_ODS = im.ID_ODSNavigation.DESCRIPCION,
                        DIMENSION_ODS = im.ID_ODSNavigation.DIMENSION
                    }).ToList()

                })
                .ToListAsync();

            return iniciativas;
        }
        // GET: api/iniciativas/5
        [HttpGet("{id}", Name = "GetIniciativaById")]
        public async Task<ActionResult<IniciativaDTO>> GetIniciativaById(int id)
        {
            var iniciativas = await _context.iniciativas
                 .Include(i => i.ID_ASIGNATURAs)
                     .ThenInclude(a => a.ID_CURSONavigation) // Incluye curso en asignaturas
                 .Include(i => i.ID_ENTIDADs)
                 .Include(i => i.ID_METAs)
                     .ThenInclude(m => m.ID_ODSNavigation) // Incluye información del ODS
                 .Include(i => i.ID_PROFESORs)
                 .Where(i=>i.ID_INICIATIVA==id)
                 .Select(i => new IniciativaDTO
                 {
                     ID_INICIATIVA = i.ID_INICIATIVA,
                     TITULO = i.TITULO,
                     HORAS = i.HORAS,
                     FECHA_INICIO = i.FECHA_INICIO,
                     FECHA_FIN = i.FECHA_FIN,
                     DESCRIPCION = i.DESCRIPCION,
                     TIPO = i.TIPO,
                     PRODUCTO_FINAL = i.PRODUCTO_FINAL,
                     NUEVA = i.NUEVA,
                     DIFUSION = i.difusiones.Select(i => i.LINK).ToList(),
                     CURSOESCOLAR = i.ID_CURSOESCOLARNavigation.DESCRIPCION,
                     ID_ASIGNATURAs = i.ID_ASIGNATURAs.Select(ia => new AsignaturaDTO
                     {
                         ID_ASIGNATURA = ia.ID_ASIGNATURA,
                         ID_CURSO = ia.ID_CURSO,
                         NOMBRE = ia.NOMBRE,
                         NOMBRE_CURSO = ia.ID_CURSONavigation.NOMBRE
                     }).ToList(),

                     ID_ENTIDADs = i.ID_ENTIDADs.Select(e => new entidad
                     {
                         ID_ENTIDAD = e.ID_ENTIDAD,
                         NOMBRE = e.NOMBRE,
                         DESCRIPCION = e.DESCRIPCION
                     }).ToList(),

                     ID_PROFESORs = i.ID_PROFESORs.Select(p => new profesore
                     {
                         ID_PROFESOR = p.ID_PROFESOR,
                         NOMBRE = p.NOMBRE,
                         APELLIDO1 = p.APELLIDO1,
                         APELLIDO2 = p.APELLIDO2,
                         FECHA_NACIMIENTO = p.FECHA_NACIMIENTO
                     }).ToList(),

                     ID_METAs = i.ID_METAs.Select(im => new MetasDTO
                     {
                         ID_META = im.ID_META,
                         ID_ODS = im.ID_ODS,
                         DESCRIPCION_META = im.DESCRIPCION,
                         NOMBRE_ODS = im.ID_ODSNavigation.NOMBRE,
                         DESCRIPCION_ODS = im.ID_ODSNavigation.DESCRIPCION,
                         DIMENSION_ODS = im.ID_ODSNavigation.DIMENSION
                     }).ToList()

                 })
                 .FirstOrDefaultAsync();

            return iniciativas;
        }

        // INDICADOR1
        [HttpGet("IniciativasCurso/{nombreCurso}")]
        public async Task<ActionResult<IEnumerable<IniciativaDTO>>> GetIniciativasCurso(string nombreCurso)
        {
            var iniciativas = await _context.iniciativas
                .Include(i => i.ID_ASIGNATURAs)
                    .ThenInclude(a => a.ID_CURSONavigation) // Incluye curso en asignaturas
                .Include(i => i.ID_ENTIDADs)
                .Include(i => i.ID_METAs)
                    .ThenInclude(m => m.ID_ODSNavigation) // Incluye información del ODS
                .Include(i => i.ID_PROFESORs)
                .Where(i=> i.ID_CURSOESCOLARNavigation.DESCRIPCION==nombreCurso)
                .Select(i => new IniciativaDTO
                {
                    ID_INICIATIVA = i.ID_INICIATIVA,
                    TITULO = i.TITULO,
                    HORAS = i.HORAS,
                    FECHA_INICIO = i.FECHA_INICIO,
                    FECHA_FIN = i.FECHA_FIN,
                    DESCRIPCION = i.DESCRIPCION,
                    TIPO = i.TIPO,
                    PRODUCTO_FINAL = i.PRODUCTO_FINAL,
                    NUEVA = i.NUEVA,
                    DIFUSION = i.difusiones.Select(i => i.LINK).ToList(),
                    CURSOESCOLAR = i.ID_CURSOESCOLARNavigation.DESCRIPCION,
                    ID_ASIGNATURAs = i.ID_ASIGNATURAs.Select(ia => new AsignaturaDTO
                    {
                        ID_ASIGNATURA = ia.ID_ASIGNATURA,
                        ID_CURSO = ia.ID_CURSO,
                        NOMBRE = ia.NOMBRE,
                        NOMBRE_CURSO = ia.ID_CURSONavigation.NOMBRE
                    }).ToList(),

                    ID_ENTIDADs = i.ID_ENTIDADs.Select(e => new entidad
                    {
                        ID_ENTIDAD = e.ID_ENTIDAD,
                        NOMBRE = e.NOMBRE,
                        DESCRIPCION = e.DESCRIPCION
                    }).ToList(),

                    ID_PROFESORs = i.ID_PROFESORs.Select(p => new profesore
                    {
                        ID_PROFESOR = p.ID_PROFESOR,
                        NOMBRE = p.NOMBRE,
                        APELLIDO1 = p.APELLIDO1,
                        APELLIDO2 = p.APELLIDO2,
                        FECHA_NACIMIENTO = p.FECHA_NACIMIENTO
                    }).ToList(),

                    ID_METAs = i.ID_METAs.Select(im => new MetasDTO
                    {
                        ID_META = im.ID_META,
                        ID_ODS = im.ID_ODS,
                        DESCRIPCION_META = im.DESCRIPCION,
                        NOMBRE_ODS = im.ID_ODSNavigation.NOMBRE,
                        DESCRIPCION_ODS = im.ID_ODSNavigation.DESCRIPCION,
                        DIMENSION_ODS = im.ID_ODSNavigation.DIMENSION
                    }).ToList()


                })
                .ToListAsync();

            return iniciativas;
        }

        //INDICADOR2
        [HttpGet("DimensionSocial")]
        public async Task<ActionResult<IEnumerable<IniciativaDTO>>> GetIniciativasSocial()
        {
            var iniciativas = await _context.iniciativas
                .Include(i => i.ID_ASIGNATURAs)
                    .ThenInclude(a => a.ID_CURSONavigation) 
                .Include(i => i.ID_ENTIDADs)
                .Include(i => i.ID_METAs)
                    .ThenInclude(m => m.ID_ODSNavigation)
                .Include(i => i.ID_PROFESORs)
                .Where(i=>i.ID_METAs.Any(im=>im.ID_ODSNavigation.DIMENSION.ToLower()=="social"))
                .Select(i => new IniciativaDTO
                {
                    ID_INICIATIVA = i.ID_INICIATIVA,
                    TITULO = i.TITULO,
                    HORAS = i.HORAS,
                    FECHA_INICIO = i.FECHA_INICIO,
                    FECHA_FIN = i.FECHA_FIN,
                    DESCRIPCION = i.DESCRIPCION,
                    TIPO = i.TIPO,
                    PRODUCTO_FINAL = i.PRODUCTO_FINAL,
                    NUEVA = i.NUEVA,
                    DIFUSION = i.difusiones.Select(i => i.LINK).ToList(),
                    CURSOESCOLAR = i.ID_CURSOESCOLARNavigation.DESCRIPCION,
                    ID_ASIGNATURAs = i.ID_ASIGNATURAs.Select(ia => new AsignaturaDTO
                    {
                        ID_ASIGNATURA = ia.ID_ASIGNATURA,
                        ID_CURSO = ia.ID_CURSO,
                        NOMBRE = ia.NOMBRE,
                        NOMBRE_CURSO = ia.ID_CURSONavigation.NOMBRE
                    }).ToList(),

                    ID_ENTIDADs = i.ID_ENTIDADs.Select(e => new entidad
                    {
                        ID_ENTIDAD = e.ID_ENTIDAD,
                        NOMBRE = e.NOMBRE,
                        DESCRIPCION = e.DESCRIPCION
                    }).ToList(),

                    ID_PROFESORs = i.ID_PROFESORs.Select(p => new profesore
                    {
                        ID_PROFESOR = p.ID_PROFESOR,
                        NOMBRE = p.NOMBRE,
                        APELLIDO1 = p.APELLIDO1,
                        APELLIDO2 = p.APELLIDO2,
                        FECHA_NACIMIENTO = p.FECHA_NACIMIENTO
                    }).ToList(),

                    ID_METAs = i.ID_METAs.Select(im => new MetasDTO
                    {
                        ID_META = im.ID_META,
                        ID_ODS = im.ID_ODS,
                        DESCRIPCION_META = im.DESCRIPCION,
                        NOMBRE_ODS = im.ID_ODSNavigation.NOMBRE,
                        DESCRIPCION_ODS = im.ID_ODSNavigation.DESCRIPCION,
                        DIMENSION_ODS = im.ID_ODSNavigation.DIMENSION
                    }).ToList()
                })
                .ToListAsync();

            return iniciativas;
        }
        [HttpGet("DimensionMedioambiental")]
        public async Task<ActionResult<IEnumerable<IniciativaDTO>>> GetIniciativasMedioambiental()
        {
            var iniciativas = await _context.iniciativas
                .Include(i => i.ID_ASIGNATURAs)
                    .ThenInclude(a => a.ID_CURSONavigation) // Incluye curso en asignaturas
                .Include(i => i.ID_ENTIDADs)
                .Include(i => i.ID_METAs)
                    .ThenInclude(m => m.ID_ODSNavigation) // Incluye información del ODS
                .Include(i => i.ID_PROFESORs)
                .Where(i => i.ID_METAs.Any(im => im.ID_ODSNavigation.DIMENSION.ToLower() == "medioambiental"))
                .Select(i => new IniciativaDTO
                {
                    ID_INICIATIVA = i.ID_INICIATIVA,
                    TITULO = i.TITULO,
                    HORAS = i.HORAS,
                    FECHA_INICIO = i.FECHA_INICIO,
                    FECHA_FIN = i.FECHA_FIN,
                    DESCRIPCION = i.DESCRIPCION,
                    TIPO = i.TIPO,
                    PRODUCTO_FINAL = i.PRODUCTO_FINAL,
                    NUEVA = i.NUEVA,
                    DIFUSION = i.difusiones.Select(i => i.LINK).ToList(),
                    CURSOESCOLAR = i.ID_CURSOESCOLARNavigation.DESCRIPCION,
                    ID_ASIGNATURAs = i.ID_ASIGNATURAs.Select(ia => new AsignaturaDTO
                    {
                        ID_ASIGNATURA = ia.ID_ASIGNATURA,
                        ID_CURSO = ia.ID_CURSO,
                        NOMBRE = ia.NOMBRE,
                        NOMBRE_CURSO = ia.ID_CURSONavigation.NOMBRE
                    }).ToList(),

                    ID_ENTIDADs = i.ID_ENTIDADs.Select(e => new entidad
                    {
                        ID_ENTIDAD = e.ID_ENTIDAD,
                        NOMBRE = e.NOMBRE,
                        DESCRIPCION = e.DESCRIPCION
                    }).ToList(),

                    ID_PROFESORs = i.ID_PROFESORs.Select(p => new profesore
                    {
                        ID_PROFESOR = p.ID_PROFESOR,
                        NOMBRE = p.NOMBRE,
                        APELLIDO1 = p.APELLIDO1,
                        APELLIDO2 = p.APELLIDO2,
                        FECHA_NACIMIENTO = p.FECHA_NACIMIENTO
                    }).ToList(),

                    ID_METAs = i.ID_METAs.Select(im => new MetasDTO
                    {
                        ID_META = im.ID_META,
                        ID_ODS = im.ID_ODS,
                        DESCRIPCION_META = im.DESCRIPCION,
                        NOMBRE_ODS = im.ID_ODSNavigation.NOMBRE,
                        DESCRIPCION_ODS = im.ID_ODSNavigation.DESCRIPCION,
                        DIMENSION_ODS = im.ID_ODSNavigation.DIMENSION
                    }).ToList()
                })
                .ToListAsync();

            return iniciativas;
        }

        [HttpGet("DimensionEconomica")]
        public async Task<ActionResult<IEnumerable<IniciativaDTO>>> GetIniciativasEconomica()
        {
            var iniciativas = await _context.iniciativas
                .Include(i => i.ID_ASIGNATURAs)
                    .ThenInclude(a => a.ID_CURSONavigation) // Incluye curso en asignaturas
                .Include(i => i.ID_ENTIDADs)
                .Include(i => i.ID_METAs)
                    .ThenInclude(m => m.ID_ODSNavigation) // Incluye información del ODS
                .Include(i => i.ID_PROFESORs)
                .Where(i => i.ID_METAs.Any(im => im.ID_ODSNavigation.DIMENSION.ToLower() == "económica"))
                .Select(i => new IniciativaDTO
                {
                    ID_INICIATIVA = i.ID_INICIATIVA,
                    TITULO = i.TITULO,
                    HORAS = i.HORAS,
                    FECHA_INICIO = i.FECHA_INICIO,
                    FECHA_FIN = i.FECHA_FIN,
                    DESCRIPCION = i.DESCRIPCION,
                    TIPO = i.TIPO,
                    PRODUCTO_FINAL = i.PRODUCTO_FINAL,
                    NUEVA = i.NUEVA,
                    DIFUSION = i.difusiones.Select(i => i.LINK).ToList(),
                    CURSOESCOLAR = i.ID_CURSOESCOLARNavigation.DESCRIPCION,
                    ID_ASIGNATURAs = i.ID_ASIGNATURAs.Select(ia => new AsignaturaDTO
                    {
                        ID_ASIGNATURA = ia.ID_ASIGNATURA,
                        ID_CURSO = ia.ID_CURSO,
                        NOMBRE = ia.NOMBRE,
                        NOMBRE_CURSO = ia.ID_CURSONavigation.NOMBRE
                    }).ToList(),

                    ID_ENTIDADs = i.ID_ENTIDADs.Select(e => new entidad
                    {
                        ID_ENTIDAD = e.ID_ENTIDAD,
                        NOMBRE = e.NOMBRE,
                        DESCRIPCION = e.DESCRIPCION
                    }).ToList(),

                    ID_PROFESORs = i.ID_PROFESORs.Select(p => new profesore
                    {
                        ID_PROFESOR = p.ID_PROFESOR,
                        NOMBRE = p.NOMBRE,
                        APELLIDO1 = p.APELLIDO1,
                        APELLIDO2 = p.APELLIDO2,
                        FECHA_NACIMIENTO = p.FECHA_NACIMIENTO
                    }).ToList(),

                    ID_METAs = i.ID_METAs.Select(im => new MetasDTO
                    {
                        ID_META = im.ID_META,
                        ID_ODS = im.ID_ODS,
                        DESCRIPCION_META = im.DESCRIPCION,
                        NOMBRE_ODS = im.ID_ODSNavigation.NOMBRE,
                        DESCRIPCION_ODS = im.ID_ODSNavigation.DESCRIPCION,
                        DIMENSION_ODS = im.ID_ODSNavigation.DIMENSION
                    }).ToList()
                })
                .ToListAsync();

            return iniciativas;
        }
        //INDICADOR3
        [HttpGet("NumeroIniciativas")]
        public async Task<int> GetNumeroIniciativas()
        {
            var iniciativas = _context.iniciativas.Count();

            return iniciativas;
        }


        //INDICADOR4
        [HttpGet("NumeroIniciativas/{tipo}")]
        public async Task<int> GetNumeroIniciativasPorTipo(string tipo)
        {
            var iniciativas = _context.iniciativas.Select(i=>i).Where(i=>i.TIPO.ToLower()==tipo.ToLower()).Count();

            return iniciativas;
        }
        //INDICADOR7
        [HttpGet("TipoDescPF")]
        public async Task<IEnumerable<Indicador7>> GetTipoDescPF()
        {
            var iniciativas = _context.iniciativas
                .Select(i => new Indicador7
                {
                    Descripcion = i.DESCRIPCION,
                    ProductoFinal = String.IsNullOrWhiteSpace(i.PRODUCTO_FINAL),
                    Tipo = i.TIPO
                });

            return iniciativas;
        }




        // POST: api/iniciativas
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] IniciativaIDDTO iniciativaDto)
        {
            if (iniciativaDto == null)
            {
                return BadRequest("Los datos de la iniciativa no son válidos.");
            }

            try
            {
                // **1. Crear la iniciativa base sin relaciones**
                var nuevaIniciativa = new iniciativa
                {
                    TITULO = iniciativaDto.TITULO,
                    HORAS = iniciativaDto.HORAS,
                    FECHA_INICIO = iniciativaDto.FECHA_INICIO,
                    FECHA_FIN = iniciativaDto.FECHA_FIN,
                    DESCRIPCION = iniciativaDto.DESCRIPCION,
                    TIPO = iniciativaDto.TIPO,
                    PRODUCTO_FINAL = iniciativaDto.PRODUCTO_FINAL,
                    NUEVA = iniciativaDto.NUEVA,
                };

                _context.iniciativas.Add(nuevaIniciativa);
                await _context.SaveChangesAsync(); // Guarda la iniciativa y obtiene su ID

                // **2. Asignar relaciones con IDs recibidos**
                if (iniciativaDto.DIFUSION != null)
                {
                    var difusiones = new List<difusion>();
                    foreach (var item in iniciativaDto.DIFUSION)
                    {
                        difusiones.Add(new difusion(nuevaIniciativa.ID_INICIATIVA, item));
                    }
                    _context.difusiones.AddRange(difusiones);
                }
                if (iniciativaDto.ID_CURSOESCOLAR!= null)
                {
                    nuevaIniciativa.ID_CURSOESCOLAR = iniciativaDto.ID_CURSOESCOLAR;
                }
                if (iniciativaDto.ID_ASIGNATURAs != null)
                {
                    nuevaIniciativa.ID_ASIGNATURAs = await _context.asignaturas
                        .Where(a => iniciativaDto.ID_ASIGNATURAs.Contains(a.ID_ASIGNATURA))
                        .ToListAsync();
                }

                if (iniciativaDto.ID_ENTIDADs != null)
                {
                    nuevaIniciativa.ID_ENTIDADs = await _context.entidads
                        .Where(e => iniciativaDto.ID_ENTIDADs.Contains(e.ID_ENTIDAD))
                        .ToListAsync();
                }

                if (iniciativaDto.ID_METAs != null)
                {
                    nuevaIniciativa.ID_METAs = await _context.metas
                        .Where(m => iniciativaDto.ID_METAs.Contains(m.ID_META))
                        .ToListAsync();
                }

                if (iniciativaDto.ID_PROFESORs != null)
                {
                    nuevaIniciativa.ID_PROFESORs = await _context.profesores
                        .Where(p => iniciativaDto.ID_PROFESORs.Contains(p.ID_PROFESOR))
                        .ToListAsync();
                }

                await _context.SaveChangesAsync(); // Guarda las relaciones

                return CreatedAtRoute("GetIniciativaById", new { id = nuevaIniciativa.ID_INICIATIVA }, nuevaIniciativa);
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Error al guardar en la base de datos: {ex.InnerException?.Message ?? ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }




        // PUT: api/iniciativas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] IniciativaIDDTO iniciativaDTO)
        {
            if (iniciativaDTO == null)
            {
                return BadRequest("Datos inválidos o ID incorrecto.");
            }

            var iniciativaExistente = await _context.iniciativas
                .Include(i => i.ID_ASIGNATURAs)
                .Include(i => i.ID_ENTIDADs)
                .Include(i => i.ID_METAs)
                .Include(i => i.ID_PROFESORs)
                .FirstOrDefaultAsync(i => i.ID_INICIATIVA == id);

            if (iniciativaExistente == null)
            {
                return NotFound("Iniciativa no encontrada.");
            }

            try
            {
                // **Actualizar los campos de la iniciativa**
                iniciativaExistente.TITULO = iniciativaDTO.TITULO;
                iniciativaExistente.HORAS = iniciativaDTO.HORAS;
                iniciativaExistente.FECHA_INICIO = iniciativaDTO.FECHA_INICIO;
                iniciativaExistente.FECHA_FIN = iniciativaDTO.FECHA_FIN;
                iniciativaExistente.DESCRIPCION = iniciativaDTO.DESCRIPCION;
                iniciativaExistente.TIPO = iniciativaDTO.TIPO;
                iniciativaExistente.PRODUCTO_FINAL = iniciativaDTO.PRODUCTO_FINAL;
                iniciativaExistente.NUEVA = iniciativaDTO.NUEVA;


                // **Actualizar relaciones si están presentes**
                if (iniciativaDTO.DIFUSION != null)
                {
                    var difusiones = new List<difusion>();
                    foreach (var item in iniciativaDTO.DIFUSION)
                    {
                        difusiones.Add(new difusion(iniciativaExistente.ID_INICIATIVA, item));
                    }
                    _context.difusiones.AddRange(difusiones);
                }
                if (iniciativaDTO.ID_CURSOESCOLAR != null)
                {
                    iniciativaExistente.ID_CURSOESCOLAR = iniciativaDTO.ID_CURSOESCOLAR;
                }

                if (iniciativaDTO.ID_ASIGNATURAs != null)
                {
                    iniciativaExistente.ID_ASIGNATURAs = await _context.asignaturas
                        .Where(a => iniciativaDTO.ID_ASIGNATURAs.Contains(a.ID_ASIGNATURA))
                        .ToListAsync();
                }

                if (iniciativaDTO.ID_ENTIDADs != null)
                {
                    iniciativaExistente.ID_ENTIDADs = await _context.entidads
                        .Where(e => iniciativaDTO.ID_ENTIDADs.Contains(e.ID_ENTIDAD))
                        .ToListAsync();
                }

                if (iniciativaDTO.ID_METAs != null)
                {
                    iniciativaExistente.ID_METAs = await _context.metas
                        .Where(m => iniciativaDTO.ID_METAs.Contains(m.ID_META))
                        .ToListAsync();
                }

                if (iniciativaDTO.ID_PROFESORs != null)
                {
                    iniciativaExistente.ID_PROFESORs = await _context.profesores
                        .Where(p => iniciativaDTO.ID_PROFESORs.Contains(p.ID_PROFESOR))
                        .ToListAsync();
                }

                // **Guardar cambios**
                await _context.SaveChangesAsync();

                return Ok(iniciativaExistente);
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Error al actualizar la base de datos: {ex.InnerException?.Message ?? ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }





        // DELETE: api/iniciativas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIniciativa(int id)
        {
            var iniciativa = await _context.iniciativas
                .Include(i => i.ID_ASIGNATURAs)
                .Include(i => i.ID_ENTIDADs)
                .Include(i => i.ID_METAs)
                .Include(i => i.ID_PROFESORs)
                .FirstOrDefaultAsync(i => i.ID_INICIATIVA == id);

            if (iniciativa == null)
            {
                return NotFound();
            }

            // **Desasociar relaciones antes de eliminar**
            iniciativa.ID_ASIGNATURAs?.Clear();
            iniciativa.ID_ENTIDADs?.Clear();
            iniciativa.ID_METAs?.Clear();
            iniciativa.ID_PROFESORs?.Clear();

            await _context.SaveChangesAsync(); // Guardar cambios antes de eliminar

            _context.iniciativas.Remove(iniciativa);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        // INDICADOR 8
        [HttpGet("entidadesExternas/{id}")]
        public async Task<ActionResult<IEnumerable<entidad>>> GetEntidadesExternas(int id)
        {
            var entidades = await _context.entidads
                .Where(en => en.ID_INICIATIVAs.Any(ini => ini.ID_INICIATIVA == id))
                .ToListAsync();


            return entidades;
        }

        // INDICADOR 9
        [HttpGet("horasIniciativas/{id}")]

        public async Task<ActionResult<int>> GetHorasIniciativas(int id)
        {
            var iniciativa = await _context.iniciativas
                .FirstOrDefaultAsync(i => i.ID_INICIATIVA == id);

            if (iniciativa == null)
            {
                return NotFound();
            }

            return iniciativa.HORAS ?? 0;
        }

        // INDICADOR 10
        [HttpGet("tipoIniciativas/{id}")]

        public async Task<ActionResult<string>> GetTipoInicativas(int id)
        {
            var iniciativa = await _context.iniciativas
                .FirstOrDefaultAsync(i => i.ID_INICIATIVA == id);

            if (iniciativa == null)
            {
                return NotFound();
            }

            return iniciativa.TIPO ?? "";
        }

        // INDICADOR 11
        [HttpGet("difusionIniciativas/{id}")]

        public async Task<ActionResult<List<string>>> GetDifusionInicativas(int id)
        {
            var iniciativa = await _context.iniciativas
                .FirstOrDefaultAsync(i => i.ID_INICIATIVA == id);

            if (iniciativa == null)
            {
                return NotFound();
            }

            return iniciativa.difusiones.Select(d => d.LINK).ToList();
        }

        // INDICADOR 12
        [HttpGet("IniciativasNuevas/{id}")]
        public async Task<ActionResult<IEnumerable<IniciativaDTO>>> GetIniciativasNuevas(int id)
        {
            var iniciativas = await _context.iniciativas
                .Include(i => i.ID_ENTIDADs)
                .Include(i => i.ID_PROFESORs)
                .Select(i => new IniciativaDTO
                {
                    ID_INICIATIVA = i.ID_INICIATIVA,
                    DESCRIPCION = i.DESCRIPCION,
                    DIFUSION = i.difusiones.Select(d => d.LINK).ToList()
                    ,
                    FECHA_FIN = i.FECHA_FIN,
                    FECHA_INICIO = i.FECHA_INICIO,
                    HORAS = i.HORAS,
                    ID_ASIGNATURAs = i.ID_ASIGNATURAs.Select(ia => new AsignaturaDTO
                    {
                        ID_ASIGNATURA = ia.ID_ASIGNATURA,
                        ID_CURSO = ia.ID_CURSO,
                        NOMBRE = ia.NOMBRE,
                        NOMBRE_CURSO = ia.ID_CURSONavigation.NOMBRE,
                    }).ToList(),
                    ID_ENTIDADs = i.ID_ENTIDADs.ToList(),
                    ID_METAs = i.ID_METAs.Select(im => new MetasDTO
                    {
                        DESCRIPCION_META = im.DESCRIPCION,
                        DESCRIPCION_ODS = im.ID_ODSNavigation.DESCRIPCION,
                        DIMENSION_ODS = im.ID_ODSNavigation.DIMENSION,
                        ID_META = im.ID_META,
                        ID_ODS = im.ID_ODS,
                        NOMBRE_ODS = im.ID_ODSNavigation.NOMBRE
                    }).ToList(),
                    ID_PROFESORs = i.ID_PROFESORs.ToList(),
                    NUEVA = i.NUEVA,
                    PRODUCTO_FINAL = i.PRODUCTO_FINAL,
                    TIPO = i.TIPO,
                    TITULO = i.TITULO

                })
                .Where(ini => ini.NUEVA == (id == 1))
                .ToListAsync();

            return iniciativas;
        }

        // INDICADOR 13
        [HttpGet("cursosModulosIniciativa/{id}")]
        public async Task<ActionResult<IEnumerable<object>>> GetCursosYModulosPorIniciativa(int id)
        {
            var iniciativa = await _context.iniciativas
                .Include(i => i.ID_ASIGNATURAs)
                    .ThenInclude(a => a.ID_CURSONavigation)
                .FirstOrDefaultAsync(i => i.ID_INICIATIVA == id);

            if (iniciativa == null)
            {
                return NotFound();
            }

            var asignaturas = iniciativa.ID_ASIGNATURAs.ToList();

            var cursos = asignaturas
                .Where(a => a.ID_CURSONavigation != null) // Evita nulls
                .GroupBy(a => new { a.ID_CURSO, a.ID_CURSONavigation.NOMBRE })
                .Select(g => new
                {
                    ID_CURSO = g.Key.ID_CURSO,
                    NOMBRE_CURSO = g.Key.NOMBRE,
                    MODULOS = g.Select(a => new
                    {
                        a.ID_ASIGNATURA,
                        a.NOMBRE
                    }).ToList()
                })
                .ToList();

            return Ok(cursos);
        }
    }
}
