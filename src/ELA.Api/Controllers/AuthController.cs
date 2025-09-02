using Microsoft.AspNetCore.Mvc;

namespace ELA;

[ApiController]
[Route("api/[controller]")]
public class AuthController : BaseController
{
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterUserCommand command)
    {
        var userId = await Mediator.Send(command);
        return Ok(new { UserId = userId });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginUserCommand command)
    {
        var token = await Mediator.Send(command);
        return Ok(new { Token = token });
    }
}
