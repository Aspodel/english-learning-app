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
        if (cardId == Guid.Empty)
        {
            throw new ArgumentException("Card ID cannot be empty.", nameof(cardId));
        }

        if (qualityRating < 0 || qualityRating > 5)
        {
            throw new ArgumentOutOfRangeException(nameof(qualityRating), "Quality rating must be between 0 and 5.");
        }

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
}