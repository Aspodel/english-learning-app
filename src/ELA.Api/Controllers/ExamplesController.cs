namespace ELA;

[Route("api/vocabularies/{vocabularyId:int}/definitions/{definitionId:int}/[controller]")]
public class ExamplesController : BaseController
{
    [HttpPost]
    public async Task<IActionResult> Create(int vocabularyId, int definitionId, [FromBody] AddExampleCommand command, CancellationToken cancellationToken = default)
    {
        if (vocabularyId != command.VocabularyId || definitionId != command.DefinitionId) return BadRequest();
        var result = await Mediator.Send(command, cancellationToken);
        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int vocabularyId, int definitionId, int id, [FromBody] UpdateExampleCommand command, CancellationToken cancellationToken = default)
    {
        if (id != command.ExampleId || definitionId != command.DefinitionId || vocabularyId != command.VocabularyId) return BadRequest();
        await Mediator.Send(command, cancellationToken);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int vocabularyId, int definitionId, int id, CancellationToken cancellationToken = default)
    {
        await Mediator.Send(new RemoveExampleCommand(vocabularyId, definitionId, id), cancellationToken);
        return NoContent();
    }
}