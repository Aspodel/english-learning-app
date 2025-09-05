namespace ELA;

[Route("api/vocabularies/{vocabularyId:int}/definitions/{definitionId:int}/[controller]")]
public class ExamplesController : BaseController
{
    [HttpPost]
    public async Task<IActionResult> Create(int vocabularyId, int definitionId, [FromBody] AddExampleCommand command)
    {
        if (vocabularyId != command.VocabularyId || definitionId != command.DefinitionId) return BadRequest();
        var result = await Mediator.Send(command);
        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int vocabularyId, int definitionId, int id, [FromBody] UpdateExampleCommand command)
    {
        if (id != command.ExampleId || definitionId != command.DefinitionId || vocabularyId != command.VocabularyId) return BadRequest();
        await Mediator.Send(command);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int vocabularyId, int definitionId, int id)
    {
        await Mediator.Send(new RemoveExampleCommand(vocabularyId, definitionId, id));
        return NoContent();
    }
}