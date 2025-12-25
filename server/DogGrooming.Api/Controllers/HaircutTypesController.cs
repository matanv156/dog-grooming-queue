using DogGrooming.Api.Models;
using DogGrooming.Api.Data;
using Microsoft.AspNetCore.Mvc;

namespace DogGrooming.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HaircutTypesController : ControllerBase
    {
        private readonly HaircutTypeData _data;

        public HaircutTypesController(HaircutTypeData data)
        {
            _data = data;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var types = await _data.GetAllHaircutTypes();
            return Ok(types);
        }

        [HttpGet("(id)")]
        public async Task<ActionResult> GetById(int id)
        {
            var type = await _data.GetHaircutType(id);
            if (type == null) return NotFound();
            return Ok(type);
        }
    }
}