namespace ELA;

public class ReviewLog : BaseEntity
{
    public int CardId { get; private set; }
    public DateTimeOffset ReviewDate { get; private set; } = DateTimeOffset.UtcNow;

    // Review result
    public int QualityRating { get; private set; } // 0 to 5 scale

    // Before applying SM-2
    public int PreviousInterval { get; private set; }
    public double PreviousEaseFactor { get; private set; }
    public int PreviousRepetition { get; private set; }

    // After applying SM-2
    public int NewInterval { get; private set; }
    public double NewEaseFactor { get; private set; }
    public int NewRepetition { get; private set; }

    public ReviewLog(int cardId, DateTimeOffset reviewDate, int qualityRating,
        int previousInterval, double previousEaseFactor, int previousRepetition,
        int newInterval, double newEaseFactor, int newRepetition)
    {
        ValidateInputs(cardId, qualityRating, previousInterval, previousEaseFactor, previousRepetition, newInterval, newEaseFactor, newRepetition);

        CardId = cardId;
        ReviewDate = reviewDate;
        QualityRating = qualityRating;
        PreviousInterval = previousInterval;
        PreviousEaseFactor = previousEaseFactor;
        PreviousRepetition = previousRepetition;
        NewInterval = newInterval;
        NewEaseFactor = newEaseFactor;
        NewRepetition = newRepetition;
    }

    private static void ValidateInputs(int cardId, int qualityRating, int previousInterval, double previousEaseFactor, int previousRepetition, int newInterval, double newEaseFactor, int newRepetition)
    {
        Guard.Against.Negative(cardId, nameof(cardId));
        Guard.Against.OutOfRange(qualityRating, nameof(qualityRating), 0, 5);
        Guard.Against.Negative(previousInterval, nameof(previousInterval));
        Guard.Against.Negative(previousRepetition, nameof(previousRepetition));
        Guard.Against.Negative(newInterval, nameof(newInterval));
        Guard.Against.Negative(newRepetition, nameof(newRepetition));

        if (previousEaseFactor < 1.3)
            throw new ArgumentException("Ease factor must be >= 1.3", nameof(previousEaseFactor));

        if (newEaseFactor < 1.3)
            throw new ArgumentException("Ease factor must be >= 1.3", nameof(newEaseFactor));

    }
}