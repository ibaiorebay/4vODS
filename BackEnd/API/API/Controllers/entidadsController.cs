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




        // GET: entidads/Create
        public IActionResult Create()
        {
            return Ok();
        }

        
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID_ENTIDAD,NOMBRE,DESCRIPCION")] entidad entidad)
        {
            if (ModelState.IsValid)
            {
                _context.Add(entidad);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return Ok(entidad);
        }

        // GET: entidads/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var entidad = await _context.entidads.FindAsync(id);
            if (entidad == null)
            {
                return NotFound();
            }
            return Ok(entidad);
        }

        // POST: entidads/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ID_ENTIDAD,NOMBRE,DESCRIPCION")] entidad entidad)
        {
            if (id != entidad.ID_ENTIDAD)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(entidad);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!entidadExists(entidad.ID_ENTIDAD))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return Ok(entidad);
        }

        // GET: entidads/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var entidad = await _context.entidads
                .FirstOrDefaultAsync(m => m.ID_ENTIDAD == id);
            if (entidad == null)
            {
                return NotFound();
            }

            return Ok(entidad);
        }

        // POST: entidads/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var entidad = await _context.entidads.FindAsync(id);
            if (entidad != null)
            {
                _context.entidads.Remove(entidad);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool entidadExists(int id)
        {
            return _context.entidads.Any(e => e.ID_ENTIDAD == id);
        }
    }
}
