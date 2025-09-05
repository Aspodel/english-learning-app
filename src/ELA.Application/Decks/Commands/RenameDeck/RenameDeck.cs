namespace ELA;

public record RenameDeckCommand(int Id, string NewName) : IRequest<Unit>;

public class RenameDeckCommandHandler : IRequestHandler<RenameDeckCommand, Unit>
{
    private readonly IApplicationDbContext _context;

    public RenameDeckCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(RenameDeckCommand request, CancellationToken cancellationToken)
    {
        var deck = await _context.Decks.FirstOrDefaultAsync(d => d.Id == request.Id, cancellationToken);

        Guard.Against.NotFound(request.Id, deck);

        deck.Rename(request.NewName);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}