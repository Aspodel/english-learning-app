namespace ELA;

public class ReviewLog : BaseEntity
{
    public int CardId { get; private set; }
    public DateTimeOffset ReviewDate { get; private set; }

    // Review result
    public int QualityRating { get; private set; } // 0 to 5 scale

    // SM-2
    public int Interval { get; private set; }  
    public double EaseFactor { get; private set; }
    public int Repetition { get; private set; }

    public ReviewLog(int cardId, DateTimeOffset reviewDate, int qualityRating,
        int interval, double easeFactor, int repetition)
    {
        ValidateInputs(cardId, qualityRating, interval, easeFactor, repetition);

        CardId = cardId;
        ReviewDate = reviewDate;
        QualityRating = qualityRating;
        Interval = interval;
        EaseFactor = easeFactor;
        Repetition = repetition;
    }

    private static void ValidateInputs(int cardId, int qualityRating, int interval, double easeFactor, int repetition)
    {
        Guard.Against.Negative(cardId, nameof(cardId));
        Guard.Against.OutOfRange(qualityRating, nameof(qualityRating), 0, 5);
        Guard.Against.Negative(repetition, nameof(repetition));
        Guard.Against.Negative(interval, nameof(interval));
        Guard.Against.Negative(repetition, nameof(repetition));

        if (easeFactor < 1.3)
            throw new ArgumentException("Ease factor must be >= 1.3", nameof(easeFactor));
    }
}