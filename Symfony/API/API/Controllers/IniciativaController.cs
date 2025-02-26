using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IniciativasController : ControllerBase
    {
        private readonly IniciativasdbContext _context;

        public IniciativasController(IniciativasdbContext context)
        {
            _context = context;
        }

        // GET: api/Iniciativas
        [HttpGet]
        public async Task<IActionResult> GetIniciativas()
        {
            var iniciativas = await _context.Iniciativas
                .Include(i => i.CodAsignaturas)
                .Include(i => i.CodContratantes)
                .Include(i => i.IdProfesors)
                .Include(i => i.Meta).Include(i => i.CodAsignaturas)
                .ToListAsync();
            return Ok(iniciativas);
        }

        // GET api/Iniciativas/5//FILTRO
        [HttpGet("{id}")]
        public async Task<IActionResult> GetIniciativa(int id)
        {
            var iniciativa = await _context.Iniciativas
                .Include(i => i.CodAsignaturas)
                .Include(i => i.CodContratantes)
                .Include(i => i.IdProfesors)
                .Include(i => i.Meta)
                .FirstOrDefaultAsync(i => i.CodIniciativa == id);

            if (iniciativa == null)
            {
                return NotFound();
            }

            return Ok(iniciativa);
        }

        // POST api/Iniciativas
        [HttpPost]
        [HttpPost]
        public async Task<IActionResult> CreateIniciativa([FromBody] Iniciativa iniciativa)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Iniciativas.Add(iniciativa); // NO ASIGNAR CodIniciativa
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetIniciativa), new { id = iniciativa.CodIniciativa }, iniciativa);
        }

        // PUT api/Iniciativas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateIniciativa(int id, [FromBody] Iniciativa iniciativa)
        {
            if (id != iniciativa.CodIniciativa)
            {
                return BadRequest();
            }

            _context.Entry(iniciativa).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IniciativaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE api/Iniciativas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIniciativa(int id)
        {
            var iniciativa = await _context.Iniciativas
                .Include(i => i.CodAsignaturas)  // Incluye las asignaturas relacionadas
                .Include(i => i.Meta)            // Incluye las metas relacionadas
                .Include(i => i.IdProfesors)     // Incluye los profesores relacionados
                .Include(i => i.CodContratantes) // Incluye los contratantes relacionados
                .FirstOrDefaultAsync(i => i.CodIniciativa == id);

            if (iniciativa == null)
            {
                return NotFound();
            }

            // Elimina las relaciones asociadas manualmente
            foreach (var asignatura in iniciativa.CodAsignaturas.ToList())
            {
                asignatura.CodIniciativas.Remove(iniciativa);
            }

            foreach (var profesor in iniciativa.IdProfesors.ToList())
            {
                profesor.CodIniciativas.Remove(iniciativa);
            }

            foreach (var contratante in iniciativa.CodContratantes.ToList())
            {
                contratante.CodIniciativas.Remove(iniciativa);
            }

            foreach (var meta in iniciativa.Meta.ToList())
            {
                meta.CodIniciativas.Remove(iniciativa);
            }

            // Ahora elimina la iniciativa
            _context.Iniciativas.Remove(iniciativa);

            // Guarda los cambios
            await _context.SaveChangesAsync();

            return NoContent();
        }




        private bool IniciativaExists(int id)
        {
            return _context.Iniciativas.Any(i => i.CodIniciativa == id);
        }
    }
}
