using API.DTO;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CursosController : ControllerBase
    {
        private readonly _4vodsContext _context;

        public CursosController(_4vodsContext context)
        {
            _context = context;
        }

        // GET: api/<ValuesController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CursoDTO>>> GetCursos()
        {
            var cursos = await _context.cursos
                .Select(p => new CursoDTO
                {
                    ID_CURSO = p.ID_CURSO,
                    NOMBRECURSO = p.NOMBRE
                })
                .ToListAsync();

            return cursos;
        }


        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<CursoDTO>>> GetCurso(int id)
        {
            var curso = await _context.cursos
                .Where(p => p.ID_CURSO == id)
                .Select(p => new CursoDTO
                {
                    ID_CURSO = p.ID_CURSO,
                    NOMBRECURSO = p.NOMBRE
                })
                .ToListAsync();

            return curso;
        }


        // POST api/<ValuesController>
        [HttpPost]
        public async Task<ActionResult<CursoDTO>> Post([FromBody] CursoDTO value)
        {
            var curso = new curso
            {
                ID_CURSO = value.ID_CURSO,
                NOMBRE= value.NOMBRECURSO
            };

            _context.cursos.Add(curso);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCurso), new { id = curso.ID_CURSO }, value);
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] CursoDTO value)
        {
            var profesor = await _context.cursos.FindAsync(id);
            if (profesor == null)
            {
                return NotFound();
            }

            profesor.NOMBRE = value.NOMBRECURSO;

            _context.Entry(profesor).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var profesor = await _context.cursos.FindAsync(id);
            if (profesor == null)
            {
                return NotFound();
            }

            _context.cursos.Remove(profesor);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
