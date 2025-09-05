namespace ELA;

public record ReviewCardCommand(int CardId, int QualityRating, DateTimeOffset ReviewDate) : IRequest<Unit>;

public class ReviewCardCommandHandler : IRequestHandler<ReviewCardCommand, Unit>
{
    private readonly IApplicationDbContext _context;
    private readonly ISpacedRepetitionScheduler _scheduler;

    public ReviewCardCommandHandler(IApplicationDbContext context, ISpacedRepetitionScheduler scheduler)
    {
        _context = context;
        _scheduler = scheduler;
    }

    public async Task<Unit> Handle(ReviewCardCommand request, CancellationToken cancellationToken)
    {
        var card = await _context.Cards
            .Include(c => c.ReviewLogs)
            .FirstOrDefaultAsync(c => c.Id == request.CardId, cancellationToken);

        Guard.Against.NotFound(request.CardId, card);
        if (card.Suspended)
            throw new ValidationException(
            [
                new FluentValidation.Results.ValidationFailure("Card", "Card is suspended.")
            ]);

        var (newInterval, newEaseFactor, newRepetition, nextReview) =
            _scheduler.CalculateNextReview(card, request.QualityRating, request.ReviewDate);

        card.AddReviewResult(
            qualityRating: request.QualityRating,
            reviewDate: request.ReviewDate,
            newInterval: newInterval,
            newEaseFactor: newEaseFactor,
            newRepetition: newRepetition,
            nextReview: nextReview
        );

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}