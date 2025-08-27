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

    public void AddReviewResult(int qualityRating, DateTimeOffset reviewDate,
        int newInterval, double newEaseFactor, int newRepetition, DateTimeOffset nextReview)
    {
        if (Suspended) throw new InvalidOperationException("Cannot review a suspended card.");
        if (qualityRating < 0 || qualityRating > 5) throw new ArgumentOutOfRangeException(nameof(qualityRating));

        var previousInterval = Interval;
        var previousEaseFactor = EaseFactor;
        var previousRepetition = Repetition;

        Interval = newInterval;
        EaseFactor = Math.Max(1.3, newEaseFactor);
        Repetition = newRepetition;
        LastReview = reviewDate;
        NextReview = nextReview;

        var log = new ReviewLog(
            cardId: Id,
            reviewDate: reviewDate,
            qualityRating: qualityRating,
            previousInterval: previousInterval,
            previousEaseFactor: previousEaseFactor,
            previousRepetition: previousRepetition,
            newInterval: newInterval,
            newEaseFactor: newEaseFactor,
            newRepetition: newRepetition);

        _reviewLogs.Add(log);
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