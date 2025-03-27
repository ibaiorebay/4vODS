using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.Blazor;
using API.DTO;
using API.DTO.Iniciativa;

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
                    DIFUSION = i.DIFUSION,

                    // ✅ Mapeo de asignaturas con información completa
                    ID_ASIGNATURAs = i.ID_ASIGNATURAs.Select(ia => new AsignaturaDTO
                    {
                        ID_ASIGNATURA = ia.ID_ASIGNATURA,
                        ID_CURSO = ia.ID_CURSO,
                        NOMBRE = ia.NOMBRE,
                        NOMBRE_CURSO = ia.ID_CURSONavigation.NOMBRE
                    }).ToList(),

                    // ✅ Mapeo de entidades con información completa
                    ID_ENTIDADs = i.ID_ENTIDADs.Select(e => new entidad
                    {
                        ID_ENTIDAD = e.ID_ENTIDAD,
                        NOMBRE = e.NOMBRE,
                        DESCRIPCION = e.DESCRIPCION
                    }).ToList(),

                    // ✅ Mapeo de profesores con información completa
                    ID_PROFESORs = i.ID_PROFESORs.Select(p => new profesore
                    {
                        ID_PROFESOR = p.ID_PROFESOR,
                        NOMBRE = p.NOMBRE,
                        APELLIDO1 = p.APELLIDO1,
                        APELLIDO2 = p.APELLIDO2,
                        FECHA_NACIMIENTO = p.FECHA_NACIMIENTO
                    }).ToList(),

                    // ✅ Mapeo de metas con información del ODS
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
        public async Task<ActionResult<iniciativa>> GetIniciativaById(int id)
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

            return Ok(iniciativa);
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
                    DIFUSION = iniciativaDto.DIFUSION
                };

                _context.iniciativas.Add(nuevaIniciativa);
                await _context.SaveChangesAsync(); // Guarda la iniciativa y obtiene su ID

                // **2. Asignar relaciones con IDs recibidos**
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
            if (iniciativaDTO == null || id != iniciativaDTO.ID_INICIATIVA)
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
                iniciativaExistente.DIFUSION = iniciativaDTO.DIFUSION;

                // **Actualizar relaciones si están presentes**
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



        [HttpGet("entidadesExternas/{id}")]
        public async Task<ActionResult<IEnumerable<entidad>>> GetEntidadesExternas(int id)
        {
            var entidades = await _context.entidads
                .Where(en => en.ID_INICIATIVAs.Any(ini => ini.ID_INICIATIVA == id))
                .ToListAsync();

            return entidades;
        }

        //[HttpGet("IniciativasNuevas/{id}")]
        //public async Task<ActionResult<IEnumerable<IniciativaDTO>>> GetIniciativasNuevas(int id)
        //{
        //    var iniciativas = await _context.iniciativas
        //        .Include(i => i.ID_ENTIDADs)
        //        .Include(i => i.ID_PROFESORs)
        //        .Select(i => new IniciativaDTO
        //        {
        //            ID_INICIATIVA = i.ID_INICIATIVA,
        //            DESCRIPCION = i.DESCRIPCION,
        //            DIFUSION = i.DIFUSION,
        //            FECHA_FIN = i.FECHA_FIN,
        //            FECHA_INICIO = i.FECHA_INICIO,
        //            HORAS = i.HORAS,
        //            ID_ASIGNATURAs = i.ID_ASIGNATURAs.Select(ia => new AsignaturaDTO
        //            {
        //                ID_ASIGNATURA = ia.ID_ASIGNATURA,
        //                ID_CURSO = ia.ID_CURSO,
        //                NOMBRE = ia.NOMBRE,
        //                NOMBRE_CURSO = ia.ID_CURSONavigation.NOMBRE,
        //            }).ToList(),
        //            ID_ENTIDADs = i.ID_ENTIDADs.ToList(),
        //            ID_METAs = i.ID_METAs.Select(im => new MetasDTO
        //            {
        //                DESCRIPCION_META = im.DESCRIPCION,
        //                DESCRIPCION_ODS = im.ID_ODSNavigation.DESCRIPCION,
        //                DIMENSION_ODS = im.ID_ODSNavigation.DIMENSION,
        //                ID_META = im.ID_META,
        //                ID_ODS = im.ID_ODS,
        //                NOMBRE_ODS = im.ID_ODSNavigation.NOMBRE
        //            }).ToList(),
        //            ID_PROFESORs = i.ID_PROFESORs.ToList(),
        //            NUEVA = i.NUEVA,
        //            PRODUCTO_FINAL = i.PRODUCTO_FINAL,
        //            TIPO = i.TIPO,
        //            TITULO = i.TITULO

        //        })
        //        .Where(ini => ini.NUEVA == (id == 1))
        //        .ToListAsync();

        //    return iniciativas;
        //}

        //[HttpGet("horas/{id}")]
        //public async Task<ActionResult<int>> GetHorasIniciativas(int id)
        //{
        //    var horas = await _context.iniciativas.Where(ini => ini.ID_INICIATIVA == id).Select(ini => ini.HORAS).FirstOrDefault();
        
        //    return horas;
        //}
    }
}
