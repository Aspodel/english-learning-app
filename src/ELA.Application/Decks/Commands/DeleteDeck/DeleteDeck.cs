namespace ELA;

public record DeleteDeckCommand(int Id) : IRequest<Unit>;

public class DeleteDeckCommandHandler : IRequestHandler<DeleteDeckCommand, Unit>
{
    private readonly IApplicationDbContext _context;

    public DeleteDeckCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeleteDeckCommand request, CancellationToken cancellationToken)
    {
        var deck = await _context.Decks.FirstOrDefaultAsync(d => d.Id == request.Id, cancellationToken);

        Guard.Against.NotFound(request.Id, deck);

        _context.Decks.Remove(deck);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}