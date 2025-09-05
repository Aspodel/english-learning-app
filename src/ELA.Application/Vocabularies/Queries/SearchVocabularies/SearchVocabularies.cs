using ELA.Vocabularies.Dtos;

namespace ELA;

public record SearchVocabulariesQuery(string SearchText) : IRequest<List<VocabularyListItemDto>>;

public class SearchVocabulariesQueryHandler : IRequestHandler<SearchVocabulariesQuery, List<VocabularyListItemDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public SearchVocabulariesQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    public async Task<List<VocabularyListItemDto>> Handle(SearchVocabulariesQuery request, CancellationToken cancellationToken)
    {
        return await _context.Vocabularies
            .Where(v => v.UserId == _currentUser.Id &&
                        (v.Text.Contains(request.SearchText) ||
                         v.Definitions.Any(d => d.Meaning.Contains(request.SearchText) ||
                                                d.Translation.Contains(request.SearchText))))
            .OrderBy(v => v.Text)
            .Select(v => new VocabularyListItemDto(
                v.Id,
                v.Text,
                v.IPA,
                v.Definitions.Count,
                v.Created
            ))
            .ToListAsync(cancellationToken);
    }
}
