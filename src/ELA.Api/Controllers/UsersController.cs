namespace ELA;

public class UsersController : BaseController
{
    [HttpGet("me")]
    public async Task<IActionResult> GetCurrentUser()
    {
        var user = await Mediator.Send(new GetCurrentUserQuery());
        return Ok(user);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllUsers([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, CancellationToken cancellationToken = default)
    {
        var users = await Mediator.Send(new GetAllUsersQuery(pageNumber, pageSize), cancellationToken);
        return Ok(users);
    }

    [HttpPut("profile")]
    public async Task<ActionResult> UpdateProfile(UpdateProfileCommand command)
    {
        await Mediator.Send(command);
        return NoContent();
    }

    [HttpPost("change-password")]
    public async Task<ActionResult> ChangePassword(ChangePasswordCommand command)
    {
        await Mediator.Send(command);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(string id)
    {
        await Mediator.Send(new DeleteUserCommand(id));
        return NoContent();
    }
}