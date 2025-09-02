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
        var entity = await _context.Vocabularies.FindAsync(request.Id, cancellationToken);

        Guard.Against.NotFound(request.Id, entity);

        _context.Vocabularies.Remove(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}