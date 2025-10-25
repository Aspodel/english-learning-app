namespace ELA;

public class VocabulariesController : BaseController
{

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken = default)
    {
        var result = await Mediator.Send(new GetVocabularyByIdQuery(id), cancellationToken);
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> GetWithPagination([FromQuery] int page = 1, [FromQuery] int pageSize = 10, CancellationToken cancellationToken = default)
    {
        var result = await Mediator.Send(new GetVocabulariesWithPaginationQuery(page, pageSize), cancellationToken);
        return Ok(result);
    }

    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] string searchText, CancellationToken cancellationToken = default)
    {
        var result = await Mediator.Send(new SearchVocabulariesQuery(searchText), cancellationToken);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateVocabularyCommand command, CancellationToken cancellationToken = default)
    {
        var result = await Mediator.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateVocabularyCommand command, CancellationToken cancellationToken = default)
    {
        if (id != command.Id) return BadRequest();

        await Mediator.Send(command, cancellationToken);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken = default)
    {
        await Mediator.Send(new DeleteVocabularyCommand(id), cancellationToken);
        return NoContent();
    }
}