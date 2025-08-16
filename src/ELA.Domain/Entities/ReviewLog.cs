namespace ELA;

public class ReviewLog : BaseEntity
{
    public Guid CardId { get; private set; }
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

    public ReviewLog(Guid cardId, DateTimeOffset reviewDate, int qualityRating,
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

    private static void ValidateInputs(Guid cardId, int qualityRating, int previousInterval, double previousEaseFactor, int previousRepetition, int newInterval, double newEaseFactor, int newRepetition)
    {
        if (cardId == Guid.Empty)
            throw new ArgumentException("CardId cannot be empty.", nameof(cardId));
        if (qualityRating < 0 || qualityRating > 5)
            throw new ArgumentOutOfRangeException(nameof(qualityRating), "QualityRating must be between 0 and 5.");
        if (previousInterval < 0)
            throw new ArgumentOutOfRangeException(nameof(previousInterval), "PreviousInterval cannot be negative.");
        if (previousEaseFactor < 1.3)
            throw new ArgumentOutOfRangeException(nameof(previousEaseFactor), "PreviousEaseFactor must be at least 1.3.");
        if (previousRepetition < 0)
            throw new ArgumentOutOfRangeException(nameof(previousRepetition), "PreviousRepetition cannot be negative.");
        if (newInterval < 0)
            throw new ArgumentOutOfRangeException(nameof(newInterval), "NewInterval cannot be negative.");
        if (newEaseFactor < 1.3)
            throw new ArgumentOutOfRangeException(nameof(newEaseFactor), "NewEaseFactor must be at least 1.3.");
        if (newRepetition < 0)
            throw new ArgumentOutOfRangeException(nameof(newRepetition), "NewRepetition cannot be negative.");
    }
}