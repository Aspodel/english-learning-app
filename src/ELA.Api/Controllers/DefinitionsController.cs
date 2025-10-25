namespace ELA;

[Route("api/vocabularies/{vocabularyId:int}/[controller]")]
public class DefinitionsController : BaseController
{
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int vocabularyId, int id, [FromBody] UpdateDefinitionCommand command, CancellationToken cancellationToken = default)
    {
        if (id != command.DefinitionId || vocabularyId != command.VocabularyId) return BadRequest();
        await Mediator.Send(command, cancellationToken);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int vocabularyId, int id, CancellationToken cancellationToken = default)
    {
        await Mediator.Send(new RemoveDefinitionCommand(vocabularyId, id), cancellationToken);
        return NoContent();
    }
}