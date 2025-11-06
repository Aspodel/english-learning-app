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
        var newCards = cards.Select(c => new Card(c.Front, c.Back, Id)).ToList();
        _cards.AddRange(newCards);
        return newCards;
    }

    public void RemoveCard(int cardId)
    {
        var card = _cards.FirstOrDefault(c => c.Id == cardId);
        if (card == null)
        {
            throw new ArgumentException("Card not found.", nameof(cardId));
        }

        _cards.Remove(card);
    }

    public void UpdateCard(int cardId, string newFront, string newBack)
    {
        var card = _cards.FirstOrDefault(c => c.Id == cardId);
        if (card == null)
        {
            throw new ArgumentException("Card not found.", nameof(cardId));
        }

        card.Update(newFront, newBack);
    }
}