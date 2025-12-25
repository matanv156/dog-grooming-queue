using Microsoft.AspNetCore.Mvc;
using DogGrooming.Api.Utils;
using DogGrooming.Api.DTOs;
using DogGrooming.Api.Data;
using DogGrooming.Api.Models;

namespace DogGrooming.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserData _data;
        private readonly JwtUtils _jwtUtils;

        public AuthController(UserData data, JwtUtils jwtUtils)
        {
            _data = data;
            _jwtUtils = jwtUtils;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            var existingUser = await _data.GetByUsernameAsync(dto.Username);
            if (existingUser != null)
                return BadRequest("Username already taken");

            var passwordHash = EncryptionUtils.HashPassword(dto.Password);

            var user = new User
            {
                Username = dto.Username,
                PasswordHash = passwordHash,
                FirstName = dto.FirstName
            };

            await _data.AddAsync(user);
            return Ok(new { message = "User registered successfully" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await _data.GetByUsernameAsync(dto.Username);
            if (user == null || !EncryptionUtils.VerifyPassword(dto.Password, user.PasswordHash))
                return Unauthorized("Invalid username or password");

            var token = _jwtUtils.GenerateToken(user.Id, user.Username);
            return Ok(new { token });
        }
    }
}