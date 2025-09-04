using ELA.Vocabularies.Dtos;

namespace ELA;

public record CreateVocabularyCommand(
    string Text,
    string IPA)
    : IRequest<VocabularyDto>;

public class CreateVocabularyCommandHandler : IRequestHandler<CreateVocabularyCommand, VocabularyDto>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public CreateVocabularyCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    public async Task<VocabularyDto> Handle(CreateVocabularyCommand request, CancellationToken cancellationToken)
    {
        Guard.Against.NotFound(_currentUser.Id ?? "Unknown User", _currentUser.Id);

        var entity = new Vocabulary(request.Text, request.IPA, _currentUser.Id);

        _context.Vocabularies.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return new VocabularyDto(entity.Id, entity.Text, entity.IPA, []);
    }
}