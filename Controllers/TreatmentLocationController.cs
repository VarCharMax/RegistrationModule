using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using RegistrationModule.Data;
using RegistrationModule.Data.Classes;
using RegistrationModule.Models.BindingTargets;
using System.Collections.Generic;
using System.Linq;

namespace RegistrationModule.Controllers
{
    [Route("api/treatmentlocations")]
    [ApiController]
    public class TreatmentLocationController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public TreatmentLocationController(ApplicationDbContext ctx)
        {
            context = ctx;
        }

        // GET: api/<TreatmentLocationManagementController>
        [HttpGet]
        public IEnumerable<TreatmentLocation> GetTreatmentLocations()
        {
            return context.TreatmentLocations.ToList();
        }

        // GET api/<TreatmentLocationManagementController>/5
        [HttpGet("{id}")]
        public TreatmentLocation GetTreatmentLocation(long id)
        {
            return context.TreatmentLocations.FirstOrDefault(t => t.TreatmentLocationId == id);
        }

        // POST api/<TreatmentLocationManagementController>
        [HttpPost]
        public IActionResult CreateTreatmentLocation([FromBody] TreatmentLocationData trdata)
        {
            if (ModelState.IsValid)
            {
                TreatmentLocation tr = trdata.TreatmentLocation;

                context.Add(tr);
                context.SaveChanges();

                return Ok(tr.TreatmentLocationId);
            }
            else
            {
                return BadRequest(ModelState);
            }

        }

        // PUT api/<TreatmentLocationManagementController>/5
        [HttpPut("{id}")]
        public IActionResult ReplaceTreatmentLocation(long id, [FromBody] TreatmentLocationData trdata)
        {
            if (ModelState.IsValid)
            {
                TreatmentLocation tr = trdata.TreatmentLocation;
                tr.TreatmentLocationId = id;

                context.Update(tr);
                context.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPatch("{id}")]
        public IActionResult UpdateTreatmentLocation(long id, [FromBody] JsonPatchDocument<TreatmentLocationData> patch)
        {
            TreatmentLocation treatmentLocation = context.TreatmentLocations.First(tr => tr.TreatmentLocationId == id);

            TreatmentLocationData trdata = new TreatmentLocationData { TreatmentLocation  = treatmentLocation };

            patch.ApplyTo(trdata, ModelState);

            if (ModelState.IsValid && TryValidateModel(trdata))
            {


                context.SaveChanges();

                return Ok();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        // DELETE api/<TreatmentLocationManagementController>/5
        [HttpDelete("{id}")]
        public void Delete(long id)
        {
            context.TreatmentLocations.Remove(new TreatmentLocation { TreatmentLocationId = id });
            context.SaveChanges();
        }
    }
}
