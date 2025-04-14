using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using API.Models;

namespace API.Controllers
{
    [Route("api/entidades")]
    [ApiController]

    public class entidadsController : Controller
    {
        private readonly _4vodsContext _context;

        public entidadsController(_4vodsContext context)
        {
            _context = context;
        }
        ///api/entidades
        [HttpGet]
        public async Task<ActionResult<IEnumerable<entidad>>> GetEntidades()
        {
            var entidades = await _context.entidads.ToListAsync();
            return Ok(entidades);
        }

        [HttpPost]
        public async Task<ActionResult<entidad>> PostEntidad(entidad nuevaEntidad)
        {
            _context.entidads.Add(nuevaEntidad);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetEntidades), new { id = nuevaEntidad.ID_ENTIDAD }, nuevaEntidad);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEntidad(int id, entidad entidadActualizada)
        {
            if (id != entidadActualizada.ID_ENTIDAD)
            {
                return BadRequest("El ID de la entidad no coincide.");
            }

            _context.Entry(entidadActualizada).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.entidads.Any(e => e.ID_ENTIDAD == id))
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEntidad(int id)
        {
            var entidad = await _context.entidads.FindAsync(id);
            if (entidad == null)
            {
                return NotFound();
            }

            _context.entidads.Remove(entidad);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
