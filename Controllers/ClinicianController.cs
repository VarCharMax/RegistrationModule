using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RegistrationModule.Data;
using RegistrationModule.Data.Classes;
using RegistrationModule.Models.BindingTargets;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RegistrationModule.Controllers
{
    [Route("api/clinicians")]
    [ApiController]
    public class ClinicianController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public ClinicianController(ApplicationDbContext ctx)
        {
            context = ctx;
        }

        // GET: api/<ClinicianManagementController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Clinician>>> GetClinicians()
        {
            IEnumerable<Clinician> result = await context.Clinicians.ToListAsync();

            return Ok(result);
        }

        // GET api/<ClinicianManagementController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Clinician>> GetClinician(long id)
        {
            Clinician result = await context.Clinicians.FirstOrDefaultAsync(c => c.ClinicianId == id);

            return Ok(result);
        }

        // POST api/<ClinicianManagementController>
        [HttpPost]
        public async Task<ActionResult<int>> CreateClinician([FromBody] ClinicianData cdata)
        {
            if (ModelState.IsValid)
            {
                Clinician c = cdata.Clinician;

                context.Add(c);
                await context.SaveChangesAsync();

                return Ok(c.ClinicianId);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        // PUT api/<ClinicianManagementController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> ReplaceClinician(long id, [FromBody] ClinicianData cdata)
        {
            if (ModelState.IsValid)
            {
                Clinician c = cdata.Clinician;
                c.ClinicianId = id;

                context.Update(c);
                await context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateClinician(long id, [FromBody] JsonPatchDocument<ClinicianData> patch)
        {
            Clinician clinician = context.Clinicians.First(c => c.ClinicianId == id);

            ClinicianData cdata = new ClinicianData { Clinician = clinician };

            patch.ApplyTo(cdata, ModelState);

            if (ModelState.IsValid && TryValidateModel(cdata))
            {

                
                await context.SaveChangesAsync();

                return Ok();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        // DELETE api/<ClinicianManagementController>/5
        [HttpDelete("{id}")]
        public async void DeleteClinician(long id)
        {
            context.Clinicians.Remove(new Clinician { ClinicianId = id });
            await context.SaveChangesAsync();
        }
    }
}
