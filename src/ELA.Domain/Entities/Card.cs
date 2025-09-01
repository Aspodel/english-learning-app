namespace ELA;

public class Card : BaseAuditableEntity
{
    public string Front { get; private set; }
    public string Back { get; private set; }

    public int DeckId { get; private set; }
    public Deck? Deck { get; private set; }

    // SM-2
    public double EaseFactor { get; private set; } = 2.5;
    public int Interval { get; private set; } = 0;
    public int Repetition { get; private set; } = 0;
    public DateTimeOffset NextReview { get; private set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? LastReview { get; private set; }
    public bool Suspended { get; private set; } = false;

    private readonly List<ReviewLog> _reviewLogs = [];
    public IReadOnlyCollection<ReviewLog> ReviewLogs => _reviewLogs.AsReadOnly();

    public Card(string front, string back, int deckId)
    {
        Front = front;
        Back = back;
        DeckId = deckId;
    }

    public void Update(string newFront, string newBack)
    {
        if (string.IsNullOrWhiteSpace(newFront))
            throw new ArgumentException("Card front cannot be empty.", nameof(newFront));
        if (string.IsNullOrWhiteSpace(newBack))
            throw new ArgumentException("Card back cannot be empty.", nameof(newBack));

        Front = newFront;
        Back = newBack;
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
}