namespace ELA;

[Route("api/vocabularies/{vocabularyId:int}/[controller]")]
public class DefinitionsController : BaseController
{
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] AddDefinitionCommand command)
    {
        var result = await Mediator.Send(command);
        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int vocabularyId, int id, [FromBody] UpdateDefinitionCommand command)
    {
        if (id != command.DefinitionId || vocabularyId != command.VocabularyId) return BadRequest();
        await Mediator.Send(command);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int vocabularyId, int id)
    {
        await Mediator.Send(new RemoveDefinitionCommand(vocabularyId, id));
        return NoContent();
    }
}