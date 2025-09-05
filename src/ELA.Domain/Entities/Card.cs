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
        Guard.Against.NullOrWhiteSpace(front, nameof(front));
        Guard.Against.NullOrWhiteSpace(back, nameof(back));

        Front = front;
        Back = back;
        DeckId = deckId;
    }

    public void Update(string newFront, string newBack)
    {
        Guard.Against.NullOrWhiteSpace(newFront, nameof(newFront));
        Guard.Against.NullOrWhiteSpace(newBack, nameof(newBack));

        Front = newFront;
        Back = newBack;
    }

    public void AddReviewResult(int qualityRating, DateTimeOffset reviewDate,
        int newInterval, double newEaseFactor, int newRepetition, DateTimeOffset nextReview)
    {
        if (Suspended) throw new InvalidOperationException("Cannot review a suspended card.");
        Guard.Against.OutOfRange(qualityRating, nameof(qualityRating), 0, 5);

        Interval = newInterval;
        EaseFactor = Math.Max(1.3, newEaseFactor);
        Repetition = newRepetition;
        LastReview = reviewDate;
        NextReview = nextReview;

        var log = new ReviewLog(
            cardId: Id,
            reviewDate: reviewDate,
            qualityRating: qualityRating,
            easeFactor: EaseFactor,
            repetition: Repetition,
            interval: Interval);

        _reviewLogs.Add(log);
    }

    public void Suspend() => Suspended = true;
    public void Activate() => Suspended = false;
}