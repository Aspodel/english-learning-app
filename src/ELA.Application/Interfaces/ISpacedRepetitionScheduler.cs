namespace ELA;

public interface ISpacedRepetitionScheduler
{
    ReviewComputationResult Compute(Card card, int qualityRating, DateTimeOffset reviewDate);
}

public sealed record ReviewComputationResult(
    int NewInterval,
    double NewEaseFactor,
    int NewRepetition,
    DateTimeOffset NextReview
);
