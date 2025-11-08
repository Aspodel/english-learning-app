namespace ELA;

public class Deck : BaseAuditableEntity
{
    public string Name { get; private set; }
    public string? Description { get; private set; }
    public string UserId { get; private set; }

    private readonly List<Card> _cards = [];
    public IReadOnlyCollection<Card> Cards => _cards.AsReadOnly();

    public Deck(string name, string userId, string? description = null)
    {
        Name = name;
        UserId = userId;
        Description = description;
    }

    public void Update(string newName, string? newDescription)
    {
        Name = newName;
        Description = newDescription;
    }

    public Card AddCard(string front, string back)
    {
        var card = new Card(front, back, Id);
        _cards.Add(card);
        return card;
    }

    public List<Card> AddCards(IEnumerable<(string Front, string Back)> cards)
    {
        var newCards = new List<Card>();
        foreach (var (front, back) in cards)
        {
            var card = new Card(front, back, Id);
            _cards.Add(card);
            newCards.Add(card);
        }

        return newCards;
    }

    public void RemoveCard(int cardId)
    {
        var index = _cards.FindIndex(c => c.Id == cardId);
        if (index < 0)
            throw new ArgumentException($"Card with Id {cardId} not found.", nameof(cardId));

        _cards.RemoveAt(index);
    }

    public void UpdateCard(int cardId, string newFront, string newBack)
    {
        var card = _cards.FirstOrDefault(c => c.Id == cardId)
            ?? throw new ArgumentException($"Card with Id {cardId} not found.", nameof(cardId));
        
        card.Update(newFront, newBack);
    }
}