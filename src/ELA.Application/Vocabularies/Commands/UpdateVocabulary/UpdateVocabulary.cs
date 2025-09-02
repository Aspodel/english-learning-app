namespace ELA;

public record UpdateVocabularyCommand(
    int Id,
    string Text,
    string IPA)
    : IRequest<Unit>;

public class UpdateVocabularyCommandHandler : IRequestHandler<UpdateVocabularyCommand, Unit>
{
    private readonly IApplicationDbContext _context;

    public UpdateVocabularyCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(UpdateVocabularyCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Vocabularies.FindAsync(request.Id, cancellationToken);

        Guard.Against.NotFound(request.Id, entity);

        entity.Update(request.Text, request.IPA);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}