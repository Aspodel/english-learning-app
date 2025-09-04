namespace ELA;

public record RemoveDefinitionCommand(int VocabularyId, int DefinitionId) : IRequest<Unit>;

public class RemoveDefinitionCommandHandler : IRequestHandler<RemoveDefinitionCommand, Unit>
{
    private readonly IApplicationDbContext _context;

    public RemoveDefinitionCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(RemoveDefinitionCommand request, CancellationToken cancellationToken)
    {
        var vocab = await _context.Vocabularies
            .Include(v => v.Definitions)
            .FirstOrDefaultAsync(v => v.Id == request.VocabularyId, cancellationToken);

        Guard.Against.NotFound(request.VocabularyId, vocab);

        vocab.RemoveDefinition(request.DefinitionId);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
