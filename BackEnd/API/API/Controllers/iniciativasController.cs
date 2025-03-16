using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.Blazor;

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
        [HttpGet]
        public async Task<ActionResult<IEnumerable<iniciativa>>> GetIniciativas()
        {
            var iniciativas = await _context.iniciativas
                .Include(i => i.ID_ASIGNATURAs)
                .Include(i => i.ID_ENTIDADs)
                .Include(i => i.ID_METAs)
                .Include(i => i.ID_PROFESORs)
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
        public async Task<IActionResult> Create([FromBody] iniciativa iniciativa)
        {
            if (iniciativa == null)
            {
                return BadRequest("Los datos de la iniciativa no son válidos.");
            }

            try
            {
                // **1. Guardar solo la iniciativa (sin relaciones)**
                var nuevaIniciativa = new iniciativa
                {
                    TITULO = iniciativa.TITULO,
                    HORAS = iniciativa.HORAS,
                    FECHA_INICIO = iniciativa.FECHA_INICIO,
                    FECHA_FIN = iniciativa.FECHA_FIN,
                    DESCRIPCION = iniciativa.DESCRIPCION,
                    TIPO = iniciativa.TIPO,
                    PRODUCTO_FINAL = iniciativa.PRODUCTO_FINAL,
                    NUEVA = iniciativa.NUEVA,
                    DIFUSION = iniciativa.DIFUSION
                };

                _context.iniciativas.Add(nuevaIniciativa);
                await _context.SaveChangesAsync();  // Ahora la iniciativa tiene un ID

                // **2. Asociar las relaciones (asignaturas, entidades, metas, profesores)**
                nuevaIniciativa.ID_ASIGNATURAs = iniciativa.ID_ASIGNATURAs != null
                    ? await _context.asignaturas.Where(a => iniciativa.ID_ASIGNATURAs.Select(ia => ia.ID_ASIGNATURA).Contains(a.ID_ASIGNATURA)).ToListAsync()
                    : new List<asignatura>();

                nuevaIniciativa.ID_ENTIDADs = iniciativa.ID_ENTIDADs != null
                    ? await _context.entidads.Where(e => iniciativa.ID_ENTIDADs.Select(ie => ie.ID_ENTIDAD).Contains(e.ID_ENTIDAD)).ToListAsync()
                    : new List<entidad>();

                nuevaIniciativa.ID_METAs = iniciativa.ID_METAs != null
                    ? await _context.metas.Where(m => iniciativa.ID_METAs.Select(im => im.ID_META).Contains(m.ID_META)).ToListAsync()
                    : new List<meta>();

                nuevaIniciativa.ID_PROFESORs = iniciativa.ID_PROFESORs != null
                    ? await _context.profesores.Where(p => iniciativa.ID_PROFESORs.Select(ip => ip.ID_PROFESOR).Contains(p.ID_PROFESOR)).ToListAsync()
                    : new List<profesore>();

                // **3. Guardar nuevamente con las relaciones**
                await _context.SaveChangesAsync();

                // **4. Devolver la respuesta con Created (201)**
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
        public async Task<IActionResult> Update(int id, [FromBody] iniciativa iniciativa)
        {
            if (iniciativa == null || id != iniciativa.ID_INICIATIVA)
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
                // **1. ACTUALIZAR LOS CAMPOS DE LA INICIATIVA**
                iniciativaExistente.TITULO = iniciativa.TITULO;
                iniciativaExistente.HORAS = iniciativa.HORAS;
                iniciativaExistente.FECHA_INICIO = iniciativa.FECHA_INICIO;
                iniciativaExistente.FECHA_FIN = iniciativa.FECHA_FIN;
                iniciativaExistente.DESCRIPCION = iniciativa.DESCRIPCION;
                iniciativaExistente.TIPO = iniciativa.TIPO;
                iniciativaExistente.PRODUCTO_FINAL = iniciativa.PRODUCTO_FINAL;
                iniciativaExistente.NUEVA = iniciativa.NUEVA;
                iniciativaExistente.DIFUSION = iniciativa.DIFUSION;

                // **2. ACTUALIZAR RELACIONES**
                iniciativaExistente.ID_ASIGNATURAs = iniciativa.ID_ASIGNATURAs != null
                    ? await _context.asignaturas.Where(a => iniciativa.ID_ASIGNATURAs.Select(ia => ia.ID_ASIGNATURA).Contains(a.ID_ASIGNATURA)).ToListAsync()
                    : new List<asignatura>();

                iniciativaExistente.ID_ENTIDADs = iniciativa.ID_ENTIDADs != null
                    ? await _context.entidads.Where(e => iniciativa.ID_ENTIDADs.Select(ie => ie.ID_ENTIDAD).Contains(e.ID_ENTIDAD)).ToListAsync()
                    : new List<entidad>();

                iniciativaExistente.ID_METAs = iniciativa.ID_METAs != null
                    ? await _context.metas.Where(m => iniciativa.ID_METAs.Select(im => im.ID_META).Contains(m.ID_META)).ToListAsync()
                    : new List<meta>();

                iniciativaExistente.ID_PROFESORs = iniciativa.ID_PROFESORs != null
                    ? await _context.profesores.Where(p => iniciativa.ID_PROFESORs.Select(ip => ip.ID_PROFESOR).Contains(p.ID_PROFESOR)).ToListAsync()
                    : new List<profesore>();

                // **3. GUARDAR CAMBIOS**
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

    }
}
