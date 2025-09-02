using ELA.Vocabularies.Dtos;

namespace ELA;

public record GetVocabulariesWithPaginationQuery(
    int PageNumber = 1,
    int PageSize = 10)
    : IRequest<PaginatedList<SummaryVocabularyDto>>;

public class GetVocabulariesWithPaginationQueryHandler : IRequestHandler<GetVocabulariesWithPaginationQuery, PaginatedList<SummaryVocabularyDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public GetVocabulariesWithPaginationQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    public async Task<PaginatedList<SummaryVocabularyDto>> Handle(GetVocabulariesWithPaginationQuery request, CancellationToken cancellationToken)
    {
        var query = _context.Vocabularies
            // .Where(v => v.UserId == _currentUser.Id)
            .OrderBy(v => v.Created)
                .ThenBy(v => v.Text)
            .Skip((request.PageNumber - 1) * request.PageSize)
            .Take(request.PageSize)
            .AsNoTracking()
            .Select(v => new SummaryVocabularyDto(
                v.Id,
                v.Text,
                v.IPA,
                v.Created,
                v.Definitions
                    .Select(d => d.PartOfSpeech.ToString())
                    .Distinct()
                    .ToList()
            ));

        return await PaginatedList<SummaryVocabularyDto>.CreateAsync(query, request.PageNumber, request.PageSize, cancellationToken);
    }
}