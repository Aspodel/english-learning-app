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
        Front = newFront;
        Back = newBack;
    }

    public void AddReviewResult(int qualityRating, DateTimeOffset reviewDate,
        int newInterval, double newEaseFactor, int newRepetition, DateTimeOffset nextReview)
    {
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