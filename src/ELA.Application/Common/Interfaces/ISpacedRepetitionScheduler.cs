namespace ELA;

public interface ISpacedRepetitionScheduler
{
    (int NewInterval, double NewEaseFactor, int NewRepetition, DateTimeOffset NextReviewDate)
        CalculateNextReview(Card card, int qualityRating, DateTimeOffset reviewDate);
}
