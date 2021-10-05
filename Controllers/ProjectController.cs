using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RegistrationModule.Data;
using RegistrationModule.Data.Classes;
using RegistrationModule.Models.BindingTargets;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RegistrationModule.Controllers
{
    [Route("api/projects")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public ProjectController(ApplicationDbContext ctx)
        {
            context = ctx;
        }

        // GET: api/<ProjectApiManagementController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
            List<Project> projects = await context.Projects.ToListAsync();

            return Ok(projects);
        }

        // GET api/<ProjectApiManagementController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProject(long id)
        {
            Project project = await context.Projects.FirstOrDefaultAsync(p => p.ProjectId == id);

            return Ok(project);
        }

        // POST api/<ProjectApiManagementController>
        [HttpPost]
        public async Task<ActionResult<int>> CreateProject([FromBody] ProjectData pdata)
        {
            if (ModelState.IsValid)
            {
                Project p = pdata.Project;

                context.Add(p);
                await context.SaveChangesAsync();

                return Ok(p.ProjectId);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        // PUT api/<ProjectApiManagementController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> ReplaceProject(long id, [FromBody] ProjectData pdata)
        {
            if (ModelState.IsValid)
            {
                Project p = pdata.Project;
                p.ProjectId = id;

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
        public async Task<ActionResult> UpdateProject(long id, [FromBody] JsonPatchDocument<ProjectData> patch)
        {
            Project project = context.Projects.First(p => p.ProjectId == id);

            ProjectData pdata = new ProjectData { Project = project };

            patch.ApplyTo(pdata, ModelState);

            if (ModelState.IsValid && TryValidateModel(pdata))
            {


                await context.SaveChangesAsync();

                return Ok();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        // DELETE api/<ProjectApiManagementController>/5
        [HttpDelete("{id}")]
        public async void DeleteProject(long id)
        {
            context.Projects.Remove(new Project { ProjectId = id });
            await context.SaveChangesAsync();
        }
    }
}
