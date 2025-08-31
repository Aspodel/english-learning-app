using ELA.Application.Vocabularies.Queries.GetVocabulariesWithPagination;

namespace ELA;

public record GetVocabulariesWithPaginationQuery : IRequest<PaginatedList<VocabularyDto>>
{
    public int PageNumber { get; init; } = 1;
    public int PageSize { get; init; } = 10;
}

public class GetVocabulariesWithPaginationQueryHandler : IRequestHandler<GetVocabulariesWithPaginationQuery, PaginatedList<VocabularyDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public GetVocabulariesWithPaginationQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    public async Task<PaginatedList<VocabularyDto>> Handle(GetVocabulariesWithPaginationQuery request, CancellationToken cancellationToken)
    {
        var query = _context.Vocabularies
            .AsNoTracking()
            .Where(v => v.UserId == _currentUser.Id)
            .OrderBy(v => v.Created)
            .ThenBy(v => v.Id)
            .Select(v => new VocabularyDto
            {
                Id = v.Id,
                Text = v.Text,
                IPA = v.IPA,
                Created = v.Created,
            });

        return await PaginatedList<VocabularyDto>.CreateAsync(query, request.PageNumber, request.PageSize, cancellationToken);
    }
}