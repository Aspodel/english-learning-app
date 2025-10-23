namespace ELA;

public record UpdateDeckCommand(int Id, string NewName, string? NewDescription) : IRequest<Unit>;

public class UpdateDeckCommandHandler : IRequestHandler<UpdateDeckCommand, Unit>
{
    private readonly IApplicationDbContext _context;

    public UpdateDeckCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(UpdateDeckCommand request, CancellationToken cancellationToken)
    {
        var deck = await _context.Decks.FirstOrDefaultAsync(d => d.Id == request.Id, cancellationToken);

        Guard.Against.NotFound(request.Id, deck);

        deck.Update(request.NewName, request.NewDescription);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}