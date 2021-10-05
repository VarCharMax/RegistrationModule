using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using RegistrationModule.Data;
using RegistrationModule.Data.Classes;
using RegistrationModule.Models.BindingTargets;
using System.Collections.Generic;
using System.Linq;
using Serilog;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using LinqKit;
using System;
using System.Web;

namespace RegistrationModule.Controllers
{
    [Route("api/patients")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public PatientController(ApplicationDbContext ctx)
        {
            context = ctx;
        }

        // GET: api/<PatientController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Patient>>> GetPatients(string search, bool related = false)
        {
            IQueryable<Patient> query = context.Patients; ;

            if (!string.IsNullOrWhiteSpace(search))
            {
                var searchString = this.HttpContext.Request.QueryString.Value;

                var predicate = PredicateBuilder.New<Patient>();

                var lst = searchString.Split('&');

                foreach(var s in lst)
                {
                    var keyval = s.Split('=');

                    if (keyval[0] != "search")
                    {
                        QueryBuilder(predicate, keyval[0], HttpUtility.UrlDecode(keyval[1]));
                    }
                }
                
                query = query.Where(predicate);
            }

            if (related)
            {
                query = query.Include(p => p.PatientSex).Include(p => p.Location).Include(p => p.Doctor).Include(p => p.Project);
                List<Patient> data = await query.ToListAsync();
                return Ok(data);
            }
            else
            {
                return Ok(query);
            }
        }

        // GET api/<PatientController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Patient>> GetPatient(long id)
        {
            Patient result = await context.Patients
                .Include(p => p.Doctor)
                .Include(p => p.PatientSex)
                .Include(p => p.Location)
                .Include(p => p.Project)
                .FirstOrDefaultAsync(p => p.PatientId == id);

            return Ok(result);
        }

        // POST api/<PatientController>
        [HttpPost]
        public async Task<ActionResult<int>> CreatePatient([FromBody] PatientData pdata)
        {
            if (ModelState.IsValid)
            {
                Patient p = pdata.Patient;

                if (p.Location != null && p.Location.TreatmentLocationId != 0)
                {
                    context.Attach(p.Location);
                }

                if (p.Doctor != null && p.Doctor.ClinicianId != 0)
                {
                    context.Attach(p.Doctor);
                }

                if (p.PatientSex != null && p.PatientSex.SexId != 0)
                {
                    context.Attach(p.PatientSex);
                }

                if (p.Project != null && p.Project.ProjectId != 0)
                {
                    context.Attach(p.Project);
                }

                await context.AddAsync(p);
                await context.SaveChangesAsync();

                return Ok(p.PatientId);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        // PUT api/<PatientController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> ReplacePatient(long id, [FromBody] PatientData pdata)
        {
            if (ModelState.IsValid)
            {
                Patient p = pdata.Patient;
                p.PatientId = id;

                if (p.Location != null && p.Location.TreatmentLocationId != 0)
                {
                    context.Attach(p.Location);
                }

                if (p.Doctor != null && p.Doctor.ClinicianId != 0)
                {
                    context.Attach(p.Doctor);
                }

                if (p.PatientSex != null && p.PatientSex.SexId != 0)
                {
                    context.Attach(p.PatientSex);
                }

                if (p.Project != null && p.Project.ProjectId != 0)
                {
                    context.Attach(p.Project);
                }

                context.Update(p);
                await context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult> UpdatePatient(long id, [FromBody] JsonPatchDocument<PatientData> patch)
        {
            Patient patient = context.Patients.First(c => c.PatientId == id);

            PatientData pdata = new PatientData { Patient = patient };

            patch.ApplyTo(pdata, ModelState);

            if (ModelState.IsValid && TryValidateModel(pdata))
            {
                if (patient.Location != null && patient.Location.TreatmentLocationId != 0)
                {
                    context.Attach(patient.Location);
                }

                if (patient.Doctor != null && patient.Doctor.ClinicianId != 0)
                {
                    context.Attach(patient.Doctor);
                }

                if (patient.PatientSex != null && patient.PatientSex.SexId != 0)
                {
                    context.Attach(patient.PatientSex);
                }

                if (patient.Project != null && patient.Project.ProjectId != 0)
                {
                    context.Attach(patient.Project);
                }

                await context.SaveChangesAsync();

                return Ok();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        // DELETE api/<PatientController>/5
        [HttpDelete("{id}")]
        public async void DeletePatient(long id)
        {
            context.Patients.Remove(new Patient { PatientId = id });
            await context.SaveChangesAsync();
        }

        private void QueryBuilder(ExpressionStarter<Patient> predicate, string key, string value)
        {
            switch (key)
            {
                case "projectid":
                    predicate.And(p => p.Project.ProjectId == Convert.ToInt64(value));
                    break;
                case "firstname":
                    predicate.And(p => p.FirstName.ToLower() == value.ToLower());
                    break;
                case "lastname":
                    predicate.And(p => p.LastName.ToLower() == value.ToLower());
                    break;
                case "patientuin":
                    predicate.And(p => p.PatientUIN.ToLower() == value.ToLower());
                    break;
                case "hospitalur":
                    predicate.And(p => p.HospitalUR.ToLower() == value.ToLower());
                    break;
            }
        }
    }
}
