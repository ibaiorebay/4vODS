using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContratantesController : ControllerBase
    {
        private readonly IniciativasdbContext _context;

        public ContratantesController(IniciativasdbContext context)
        {
            _context = context;
        }

        // GET: api/Contratantes
        [HttpGet]
        public async Task<IActionResult> GetContratantes()
        {
            var contratantes = await _context.Contratantes
                .Include(c => c.CodIniciativas)
                .ToListAsync();
            return Ok(contratantes);
        }
    }
}
