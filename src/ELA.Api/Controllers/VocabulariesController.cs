namespace ELA;

public class VocabulariesController : BaseController
{
    [HttpGet("test-auth")]
    public IActionResult TestAuth()
    {
        return Ok(new
        {
            User.Identity?.IsAuthenticated,
            Claims = User.Claims.Select(c => new { c.Type, c.Value })
        });
    }

    [HttpGet]
    public async Task<IActionResult> GetWithPagination([FromQuery] int page = 1, [FromQuery] int pageSize = 10, CancellationToken cancellationToken = default)
    {
        var result = await Mediator.Send(new GetVocabulariesWithPaginationQuery(page, pageSize), cancellationToken);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken = default)
    {
        var result = await Mediator.Send(new GetVocabularyByIdQuery(id), cancellationToken);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateVocabularyCommand command)
    {
        var result = await Mediator.Send(command);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateVocabularyCommand command)
    {
        if (id != command.Id) return BadRequest();

        await Mediator.Send(command);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await Mediator.Send(new DeleteVocabularyCommand(id));
        return NoContent();
    }
}