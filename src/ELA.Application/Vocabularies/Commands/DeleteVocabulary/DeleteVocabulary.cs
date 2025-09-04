namespace ELA;

public record DeleteVocabularyCommand(int Id) : IRequest<Unit>;

public class DeleteVocabularyCommandHandler : IRequestHandler<DeleteVocabularyCommand, Unit>
{
    private readonly IApplicationDbContext _context;

    public DeleteVocabularyCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeleteVocabularyCommand request, CancellationToken cancellationToken)
    {
        var vocabulary = await _context.Vocabularies.FindAsync(request.Id, cancellationToken);

        Guard.Against.NotFound(request.Id, vocabulary);

        _context.Vocabularies.Remove(vocabulary);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}