using API.DTO.ODS;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OdsController : ControllerBase
    {
        private readonly _4vodsContext _context;

        public OdsController(_4vodsContext context)
        {
            _context = context;
        }

        // GET: api/<ValuesController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OdsDTO>>> GetODSs()
        {
            var odss = await _context.ods
                .Select(o => new OdsDTO
                {
                    ID_ODS = o.ID_ODS,
                    NOMBRE = o.NOMBRE
                })
                .ToListAsync();

            return odss;
        }
        //INDICADOR5
        [HttpGet("OdsPorNombre/{ods}")]
        public async Task<ActionResult<IEnumerable<OdsMetasDto>>> GetODS(string ods)
        {
            var odss = await _context.ods
                .Where(o => o.DESCRIPCION.ToLower() == ods.ToLower())
                .Select(o => new OdsMetasDto
                {
                    NOMBRE = o.NOMBRE,
                    metas = o.meta.Select(m => m.DESCRIPCION).ToList()

                })
                .ToListAsync();

            return odss;
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<OdsDTO>>> GetODS(int id)
        {
            var ods = await _context.ods
                .Where(o => o.ID_ODS == id)
                .Select(o => new OdsDTO
                {
                    ID_ODS = o.ID_ODS,
                    NOMBRE = o.NOMBRE
                })
                .ToListAsync();

            return ods;
        }


        // POST api/<ValuesController>
        [HttpPost]
        public async Task<ActionResult<OdsDTO>> Post([FromBody] OdsDTO value)
        {
            var ods = new od
            {
                ID_ODS = value.ID_ODS,
                NOMBRE = value.NOMBRE
            };

            _context.ods.Add(ods);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetODS), new { id = ods.ID_ODS }, value);
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] OdsDTO value)
        {
            var ods = await _context.ods.FindAsync(id);
            if (ods == null)
            {
                return NotFound();
            }

            ods.NOMBRE = value.NOMBRE;

            _context.Entry(ods).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var ods = await _context.ods.FindAsync(id);
            if (ods == null)
            {
                return NotFound();
            }

            _context.ods.Remove(ods);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
