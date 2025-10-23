namespace ELA;

public record UpdateDefinitionCommand(int VocabularyId, int DefinitionId, string Meaning, string? Translation, string? PartOfSpeech) : IRequest<Unit>;

public class UpdateDefinitionCommandHandler : IRequestHandler<UpdateDefinitionCommand, Unit>
{
    private readonly IApplicationDbContext _context;

    public UpdateDefinitionCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(UpdateDefinitionCommand request, CancellationToken cancellationToken)
    {
        var vocab = await _context.Vocabularies
            .Include(v => v.Definitions)
            .FirstOrDefaultAsync(v => v.Id == request.VocabularyId, cancellationToken);

        Guard.Against.NotFound(request.VocabularyId, vocab);

        var partOfSpeech = request.PartOfSpeech is not null ? PartOfSpeech.From(request.PartOfSpeech) : null;
        vocab.UpdateDefinition(request.DefinitionId, request.Meaning, request.Translation, partOfSpeech);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
