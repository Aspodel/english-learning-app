namespace ELA;

public class Deck : BaseAuditableEntity
{
    public string Name { get; private set; }

    public string UserId { get; private set; }

    private readonly List<Card> _cards = [];
    public IReadOnlyCollection<Card> Cards => _cards.AsReadOnly();

    public Deck(string name, string userId)
    {
        Guard.Against.NullOrWhiteSpace(name, nameof(name));
        Name = name;
        UserId = userId;
    }

    public void Rename(string newName)
    {
        Guard.Against.NullOrWhiteSpace(newName, nameof(newName));
        Name = newName;
    }

    public Card AddCard(string front, string back)
    {
        var card = new Card(front, back, Id);
        _cards.Add(card);
        return card;
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
