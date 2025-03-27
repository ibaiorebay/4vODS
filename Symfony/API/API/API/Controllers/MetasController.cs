using API.DTO;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MetasController : ControllerBase
    {
        private readonly _4vodsContext _context;

        public MetasController(_4vodsContext context)
        {
            _context = context;
        }

        // GET: api/<ValuesController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MetaDTO>>> GetMetas()
        {
            var metas = await _context.metas
                .Select(p => new MetaDTO
                {
                    ID_ODS = p.ID_ODS,
                    ID_META = p.ID_META,
                    DESCRIPCION = p.DESCRIPCION
                })
                .ToListAsync();

            return metas;
        }
        // GET: api/<ValuesController>
        [HttpGet("MetasOds/{id}")]
        public async Task<ActionResult<IEnumerable<MetaDTO>>> GetMetasODS(int id)
        {
            var metas = await _context.metas
                .Where(m=>m.ID_ODS==id)
                .Select(p => new MetaDTO
                {
                    ID_ODS = p.ID_ODS,
                    ID_META = p.ID_META,
                    DESCRIPCION = p.DESCRIPCION
                })
                .ToListAsync();

            return metas;
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<MetaDTO>>> GetMeta(int id)
        {
            var meta = await _context.metas
                .Where(p => p.ID_META == id)
                .Select(p => new MetaDTO
                {
                    ID_ODS=p.ID_ODS,
                    ID_META = p.ID_META,
                    DESCRIPCION = p.DESCRIPCION
                })
                .ToListAsync();

            return meta;
        }


        // POST api/<ValuesController>
        [HttpPost]
        public async Task<ActionResult<MetaDTO>> Post([FromBody] MetaDTO value)
        {
            var meta = new meta
            {
                ID_ODS = value.ID_ODS,
                ID_META = value.ID_META,
                DESCRIPCION = value.DESCRIPCION
            };

            _context.metas.Add(meta);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMeta), new { id = meta.ID_META }, value);
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] MetaDTO value)
        {
            var meta = await _context.metas.FindAsync(id);
            if (meta == null)
            {
                return NotFound();
            }

            meta.DESCRIPCION = value.DESCRIPCION;

            _context.Entry(meta).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var meta = await _context.metas.FindAsync(id);
            if (meta == null)
            {
                return NotFound();
            }

            _context.metas.Remove(meta);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
