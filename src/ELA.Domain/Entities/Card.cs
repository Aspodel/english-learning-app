namespace ELA;

public class Card : BaseAuditableEntity
{
    public string UserId { get; private set; } = string.Empty;
    public string DefinitionId { get; private set; } = string.Empty;

    // SM-2
    public double EaseFactor { get; private set; } = 2.5;
    public int Interval { get; private set; }
    public int Repetition { get; private set; }
    public DateTimeOffset NextReview { get; private set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? LastReview { get; private set; }
    public bool Suspended { get; private set; }

    private readonly List<ReviewLog> _reviewLogs = new();
    public IReadOnlyCollection<ReviewLog> ReviewLogs => _reviewLogs.AsReadOnly();

    public Card(string definitionId, string userId)
    {
        if (string.IsNullOrWhiteSpace(definitionId))
        {
            throw new ArgumentException("Definition ID cannot be null or empty.", nameof(definitionId));
        }

        if (string.IsNullOrWhiteSpace(userId))
        {
            throw new ArgumentException("User ID cannot be null or empty.", nameof(userId));
        }

        DefinitionId = definitionId;
        UserId = userId;
    }

    public void Review(int qualityRating, DateTimeOffset reviewDate)
    {
        if (Suspended)
        {
            throw new InvalidOperationException("Cannot review a suspended card.");
        }

        if (qualityRating < 0 || qualityRating > 5)
        {
            throw new ArgumentOutOfRangeException(nameof(qualityRating), "Quality rating must be between 0 and 5.");
        }

        // Save previous state for ReviewLog
        var previousInterval = Interval;
        var previousEaseFactor = EaseFactor;
        var previousRepetition = Repetition;

        // SM-2 algorithm logic for spaced repetition
        if (qualityRating >= 3)
        {
            if (Repetition == 0)
                Interval = 1;
            else if (Repetition == 1)
                Interval = 6;
            else
                Interval = (int)Math.Round(Interval * EaseFactor);

            Repetition++;
        }
        else
        {
            Repetition = 0;
            Interval = 1;
        }

        EaseFactor = Math.Max(1.3, EaseFactor + (0.1 - (5 - qualityRating) * (0.08 + (5 - qualityRating) * 0.02)));
        LastReview = reviewDate;
        NextReview = reviewDate.AddDays(Interval);

        // Add a ReviewLog entry
        var reviewLog = new ReviewLog(
            cardId: Id,
            reviewDate: reviewDate,
            qualityRating: qualityRating,
            previousInterval: previousInterval,
            previousEaseFactor: previousEaseFactor,
            previousRepetition: previousRepetition,
            newInterval: Interval,
            newEaseFactor: EaseFactor,
            newRepetition: Repetition);

        _reviewLogs.Add(reviewLog);
    }

    public void Suspend() => Suspended = true;
    public void Activate() => Suspended = false;
}