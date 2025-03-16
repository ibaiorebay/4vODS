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
    }
}
