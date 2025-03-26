using API.DTO;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AsignaturasController : ControllerBase
    {
        private readonly _4vodsContext _context;

        public AsignaturasController(_4vodsContext context)
        {
            _context = context;
        }

        // GET: api/<ValuesController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AsignaturaResumidaDTO>>> GetAsignaturas()
        {
            var profes = await _context.asignaturas
                .Select(p => new AsignaturaResumidaDTO
                {
                    ID_CURSO=p.ID_CURSO,
                    ID_ASIGNATURA=p.ID_ASIGNATURA,
                    NOMBRE = p.NOMBRE
                })
                .ToListAsync();

            return profes;
        }


        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<AsignaturaResumidaDTO>>> GetAsignatura(int id)
        {
            var profes = await _context.asignaturas
                .Where(p => p.ID_ASIGNATURA == id)
                .Select(p => new AsignaturaResumidaDTO
                {
                    ID_CURSO = p.ID_CURSO,
                    ID_ASIGNATURA = p.ID_ASIGNATURA,
                    NOMBRE = p.NOMBRE
                })
                .ToListAsync();

            return profes;
        }


        // POST api/<ValuesController>
        [HttpPost]
        public async Task<ActionResult<AsignaturaResumidaDTO>> Post([FromBody] AsignaturaResumidaDTO value)
        {
            var asignatura = new asignatura
            {
                ID_ASIGNATURA=value.ID_ASIGNATURA,
                ID_CURSO=value.ID_CURSO,
                NOMBRE = value.NOMBRE
            };

            _context.asignaturas.Add(asignatura);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAsignatura), new { id = asignatura.ID_ASIGNATURA }, value);
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] AsignaturaResumidaDTO value)
        {
            var profesor = await _context.asignaturas.FindAsync(id);
            if (profesor == null)
            {
                return NotFound();
            }

            profesor.NOMBRE = value.NOMBRE;

            _context.Entry(profesor).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var profesor = await _context.asignaturas.FindAsync(id);
            if (profesor == null)
            {
                return NotFound();
            }

            _context.asignaturas.Remove(profesor);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
