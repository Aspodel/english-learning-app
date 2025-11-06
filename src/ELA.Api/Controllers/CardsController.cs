namespace ELA;

[Route("api/decks/{deckId:int}/[controller]")]
public class CardsController : BaseController
{
    [HttpGet("due")]
    public async Task<IActionResult> GetDueCards(int deckId, CancellationToken cancellationToken = default)
    {
        var result = await Mediator.Send(new GetDueCardsForReviewQuery(deckId), cancellationToken);
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(int deckId, CancellationToken cancellationToken = default)
    {
        var result = await Mediator.Send(new GetDeckCardsQuery(deckId), cancellationToken);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] AddCardCommand command, CancellationToken cancellationToken = default)
    {
        var result = await Mediator.Send(command, cancellationToken);
        return Ok(result);
    }

    [HttpPost("bulk")]
    public async Task<IActionResult> CreateBulk([FromBody] AddCardsCommand command, CancellationToken cancellationToken = default)
    {
        var result = await Mediator.Send(command, cancellationToken);
        return Ok(result);
    }

    [HttpPost("{id:int}/review")]
    public async Task<ActionResult<int>> Review(int id, [FromBody] ReviewCardCommand command, CancellationToken cancellationToken = default)
    {
        if (id != command.CardId)
            return BadRequest();

        await Mediator.Send(command, cancellationToken);
        return NoContent();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int deckId, int id, [FromBody] UpdateCardCommand command, CancellationToken cancellationToken = default)
    {
        if (id != command.CardId || deckId != command.DeckId) return BadRequest();

        await Mediator.Send(command, cancellationToken);
        return NoContent();
    }

    [HttpPut("{id:int}/suspend")]
    public async Task<ActionResult> Suspend(int id, CancellationToken cancellationToken = default)
    {
        await Mediator.Send(new SuspendCardCommand(id), cancellationToken);
        return NoContent();
    }

    [HttpPut("{id:int}/activate")]
    public async Task<ActionResult> Activate(int id, CancellationToken cancellationToken = default)
    {
        await Mediator.Send(new ActivateCardCommand(id), cancellationToken);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int deckId, int id, CancellationToken cancellationToken = default)
    {
        await Mediator.Send(new RemoveCardCommand(deckId, id), cancellationToken);
        return NoContent();
    }
}