using API.DTO;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfesoresController : ControllerBase
    {
        private readonly _4vodsContext _context;

        public ProfesoresController(_4vodsContext context)
        {
            _context = context;
        }

        // GET: api/<ValuesController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProfesorDTO>>> GetProfesores()
        {
            var profes = await _context.profesores
                .Select(p => new ProfesorDTO
                {
                    ID_Profesor= p.ID_PROFESOR,
                    NOMBRE=p.NOMBRE
                })
                .ToListAsync();

            return profes;
        }


        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<ProfesorDTO>>> GetProfesor(int id)
        {
            var profes = await _context.profesores
                .Where(p=>p.ID_PROFESOR==id)
                .Select(p => new ProfesorDTO
                {
                    ID_Profesor = p.ID_PROFESOR,
                    NOMBRE = p.NOMBRE
                })
                .ToListAsync();

            return profes;
        }


        // POST api/<ValuesController>
        [HttpPost]
        public async Task<ActionResult<ProfesorDTO>> Post([FromBody] ProfesorDTO value)
        {
            var profesor = new profesore
            {
                ID_PROFESOR = value.ID_Profesor,
                NOMBRE = value.NOMBRE
            };

            _context.profesores.Add(profesor);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProfesor), new { id = profesor.ID_PROFESOR }, value);
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] ProfesorDTO value)
        {
            var profesor = await _context.profesores.FindAsync(id);
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
            var profesor = await _context.profesores.FindAsync(id);
            if (profesor == null)
            {
                return NotFound();
            }

            _context.profesores.Remove(profesor);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
