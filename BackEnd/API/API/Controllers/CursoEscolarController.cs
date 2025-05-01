using API.DTO;
using API.DTO.Asignatura;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CursoEscolarController : ControllerBase
    {
        private readonly _4vodsContext _context;

        public CursoEscolarController(_4vodsContext context)
        {
            _context = context;
        }

        // GET: api/<ValuesController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CursoEscolarDto>>> GetAsignaturas()
        {
            var anyosEscolares = await _context.cursosEscolares
                .Select(p => new CursoEscolarDto
                {
                    ID_CURSOESCOLAR=p.ID_CURSOESCOLAR,
                    DESCRIPCION=p.DESCRIPCION
                })
                .ToListAsync();

            return anyosEscolares;
        }


        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<CursoEscolarDto>>> GetAsignatura(int id)
        {
            var anyosEscolares = await _context.cursosEscolares
                .Where(c=>c.ID_CURSOESCOLAR==id)
                .Select(p => new CursoEscolarDto
                {
                    ID_CURSOESCOLAR = p.ID_CURSOESCOLAR,
                    DESCRIPCION = p.DESCRIPCION
                })
                .ToListAsync();

            return anyosEscolares;
        }


        // POST api/<ValuesController>
        [HttpPost]
        public async Task<ActionResult<CursoEscolarDto>> Post(string value)
        {
            var curso = new cursoEscolar
            {
                DESCRIPCION = value
            };

            _context.cursosEscolares.Add(curso);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAsignatura), new { id = curso.ID_CURSOESCOLAR }, value);
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, string value)
        {
            var curso = await _context.cursosEscolares.FindAsync(id);
            if (curso == null)
            {
                return NotFound();
            }

            curso.DESCRIPCION = value;

            _context.Entry(curso).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var curso = await _context.cursosEscolares.FindAsync(id);
            if (curso == null)
            {
                return NotFound();
            }

            _context.cursosEscolares.Remove(curso);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
