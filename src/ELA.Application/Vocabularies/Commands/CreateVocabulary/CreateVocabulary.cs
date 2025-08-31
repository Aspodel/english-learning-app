namespace ELA;

public record CreateVocabularyCommand : IRequest<int>
{
    public string Text { get; init; } = string.Empty;

    public string IPA { get; init; } = string.Empty;

    public string UserId { get; init; } = string.Empty;
}

public class CreateVocabularyCommandHandler : IRequestHandler<CreateVocabularyCommand, int>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public CreateVocabularyCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    public async Task<int> Handle(CreateVocabularyCommand request, CancellationToken cancellationToken)
    {
        Guard.Against.NullOrWhiteSpace(_currentUser.Id);

        var entity = new Vocabulary(request.Text, request.IPA, _currentUser.Id);

        _context.Vocabularies.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}