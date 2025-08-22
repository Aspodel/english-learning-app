namespace ELA;

public class Card : BaseAuditableEntity
{
    public Guid UserId { get; private set; } = Guid.Empty;
    public Guid DefinitionId { get; private set; } = Guid.Empty;
    public Definition Definition { get; private set; }


    // SM-2
    public double EaseFactor { get; private set; } = 2.5;
    public int Interval { get; private set; } = 0;
    public int Repetition { get; private set; } = 0;
    public DateTimeOffset NextReview { get; private set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? LastReview { get; private set; }
    public bool Suspended { get; private set; } = false;

    private readonly List<ReviewLog> _reviewLogs = new();
    public IReadOnlyCollection<ReviewLog> ReviewLogs => _reviewLogs.AsReadOnly();

    public Card(Guid userId, Definition definition)
    {
        ValidateInputs(definition.Id, userId);
        UserId = userId;
        Definition = definition;
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

    private static void ValidateInputs(Guid definitionId, Guid userId)
    {
        if (definitionId == Guid.Empty)
        {
            throw new ArgumentException("Definition ID cannot be empty.", nameof(definitionId));
        }

        if (userId == Guid.Empty)
        {
            throw new ArgumentException("User ID cannot be empty.", nameof(userId));
        }
    }
}