using DogGrooming.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace DogGrooming.Api.Data
{
    public class HaircutTypeData
    {
        private readonly DogGroomingContext _context;

        public HaircutTypeData(DogGroomingContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<HaircutType>> GetAllHaircutTypes()
        {
            return await _context.HaircutTypes.ToListAsync();
        }

        public async Task<HaircutType?> GetHaircutType(int id)
        {
            return await _context.HaircutTypes.FirstOrDefaultAsync(ht => ht.Id == id);
        }
    }
}