using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using RegistrationModule.Data;
using RegistrationModule.Data.Classes;
using RegistrationModule.Models.BindingTargets;
using System.Collections.Generic;
using System.Linq;

namespace RegistrationModule.Controllers
{
    [Route("api/content")]
    [ApiController]
    public class ContentController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        public ContentController(ApplicationDbContext ctx)
        {
            context = ctx;
        }

        // GET: api/<ContentManagementController>
        [HttpGet]
        public IEnumerable<Content> GetContent()
        {
            return context.Content.ToList();
        }

        // GET api/<ContentManagementController>/5
        [HttpGet("{id}")]
        public Content GetContent(long id)
        {
            return context.Content.First(c => c.ContentId == id);
        }

        // POST api/<ContentManagementController>
        [HttpPost]
        public IActionResult CreateContent([FromBody] ContentData cdata)
        {
            if (ModelState.IsValid)
            {
                Content c = cdata.Content;

                context.Add(c);
                context.SaveChanges();

                return Ok(c.ContentId);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        // PUT api/<ContentManagementController>/5
        [HttpPut("{id}")]
        public IActionResult ReplaceContent(long id, [FromBody] ContentData cdata)
        {
            if (ModelState.IsValid)
            {
                Content c = cdata.Content;
                c.ContentId = id;

                context.Update(c);
                context.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPatch("{id}")]
        public IActionResult UpdateContent(long id, [FromBody] JsonPatchDocument<ContentData> patch)
        {
            Content content = context.Content.First(c => c.ContentId == id);

            ContentData cdata = new ContentData { Content = content };

            patch.ApplyTo(cdata, ModelState);

            if (ModelState.IsValid && TryValidateModel(cdata))
            {


                context.SaveChanges();

                return Ok();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        // DELETE api/<ContentManagementController>/5
        [HttpDelete("{id}")]
        public void DeleteContent(long id)
        {
            context.Content.Remove(new Content { ContentId = id });
            context.SaveChanges();
        }
    }
}
