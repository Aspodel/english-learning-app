namespace ELA;

[Route("api/decks/{deckId:int}/[controller]")]
public class CardsController : BaseController
{
    [HttpGet("due")]
    public async Task<IActionResult> GetDueCards(int deckId)
    {
        var result = await Mediator.Send(new GetDueCardsForReviewQuery(deckId));
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] AddCardCommand command)
    {
        var result = await Mediator.Send(command);
        return Ok(result);
    }

    [HttpPost("{id:int}/review")]
    public async Task<ActionResult<int>> Review(int id, ReviewCardCommand command)
    {
        if (id != command.CardId)
            return BadRequest();

        await Mediator.Send(command);
        return NoContent();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int deckId, int id, [FromBody] UpdateCardCommand command)
    {
        if (id != command.CardId || deckId != command.DeckId) return BadRequest();

        await Mediator.Send(command);
        return NoContent();
    }

    [HttpPut("{id:int}/suspend")]
    public async Task<ActionResult> Suspend(int id)
    {
        await Mediator.Send(new SuspendCardCommand(id));
        return NoContent();
    }

    [HttpPut("{id:int}/activate")]
    public async Task<ActionResult> Activate(int id)
    {
        await Mediator.Send(new ActivateCardCommand(id));
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int deckId, int id)
    {
        await Mediator.Send(new RemoveCardCommand(deckId, id));
        return NoContent();
    }
}