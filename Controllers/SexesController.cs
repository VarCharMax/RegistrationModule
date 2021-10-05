using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RegistrationModule.Data;
using RegistrationModule.Data.Classes;
using RegistrationModule.Models.BindingTargets;

namespace RegistrationModule.Controllers
{
    [Route("api/sexes")]
    [ApiController]
    public class SexesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SexesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Sexes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sex>>> GetSex()
        {
            return await _context.Sexes.ToListAsync();
        }

        // GET: api/Sexes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sex>> GetSex(long id)
        {
            var sex = await _context.Sexes.FindAsync(id);

            if (sex == null)
            {
                return NotFound();
            }

            return sex;
        }

        // PUT: api/Sexes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> ReplaceSex(long id, Sex sex)
        {
            //TODO: Make uniform with similar methods.
            if (id != sex.SexId)
            {
                return BadRequest();
            }

            _context.Entry(sex).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SexExists(id))
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

        // POST: api/Sexes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<int>> CreateSex([FromBody] SexData pdata)
        {
            if (ModelState.IsValid)
            {
                Sex s = pdata.Sex;

                _context.Add(s);
                await _context.SaveChangesAsync();

                return Ok(s.SexId);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        // DELETE: api/Sexes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Sex>> DeleteSex(long id)
        {
            var sex = await _context.Sexes.FindAsync(id);
            if (sex == null)
            {
                return NotFound();
            }

            _context.Sexes.Remove(sex);
            await _context.SaveChangesAsync();

            return sex;
        }

        private bool SexExists(long id)
        {
            return _context.Sexes.Any(e => e.SexId == id);
        }
    }
}
