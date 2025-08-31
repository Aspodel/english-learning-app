namespace ELA;

public record DeleteVocabularyCommand(int Id) : IRequest;

public class DeleteVocabularyCommandHandler : IRequestHandler<DeleteVocabularyCommand>
{
    private readonly IApplicationDbContext _context;

    public DeleteVocabularyCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(DeleteVocabularyCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Vocabularies
            .FindAsync([request.Id], cancellationToken);

        Guard.Against.NotFound(request.Id, entity);

        _context.Vocabularies.Remove(entity);

        await _context.SaveChangesAsync(cancellationToken);
    }
}