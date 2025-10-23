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
        CardId = cardId;
        ReviewDate = reviewDate;
        QualityRating = qualityRating;
        Interval = interval;
        EaseFactor = easeFactor;
        Repetition = repetition;
    }
}