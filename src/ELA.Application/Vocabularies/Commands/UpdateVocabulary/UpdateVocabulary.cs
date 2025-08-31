namespace ELA;

public record UpdateVocabularyCommand : IRequest
{
    public int Id { get; init; }
    public string Text { get; init; } = string.Empty;
    public string IPA { get; init; } = string.Empty;
    public string UserId { get; init; } = string.Empty;
}

public class UpdateVocabularyCommandHandler : IRequestHandler<UpdateVocabularyCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateVocabularyCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(UpdateVocabularyCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Vocabularies
            .FirstOrDefaultAsync(v => v.Id == request.Id && v.UserId == request.UserId, cancellationToken);

        Guard.Against.NotFound(request.Id, entity);

        entity.Update(request.Text, request.IPA);

        await _context.SaveChangesAsync(cancellationToken);
    }
}