namespace ELA;

public class Definition : BaseEntity
{
    public string Meaning { get; set; }
    public PartOfSpeech PartOfSpeech { get; set; }

    public Card? Card { get; private set; }
    private readonly List<Example> _examples = new();
    public IReadOnlyList<Example> Examples => _examples.AsReadOnly();

    public Definition(string meaning, PartOfSpeech partOfSpeech)
    {
        ValidateInputs(meaning, partOfSpeech);
        Meaning = meaning;
        PartOfSpeech = partOfSpeech;
    }

    public void Update(string meaning, PartOfSpeech partOfSpeech)
    {
        ValidateInputs(meaning, partOfSpeech);
        Meaning = meaning;
        PartOfSpeech = partOfSpeech;
    }

    public Example AddExample(string text, string translation)
    {
        var example = new Example(text, translation);
        _examples.Add(example);
        return example;
    }

    public void RemoveExample(Guid exampleId)
    {
        var example = _examples.FirstOrDefault(e => e.Id == exampleId);
        if (example == null)
        {
            throw new ArgumentException("Example not found.", nameof(exampleId));
        }

        _examples.Remove(example);
    }

    public void UpdateExample(Guid exampleId, string newText, string newTranslation)
    {
        var example = _examples.FirstOrDefault(e => e.Id == exampleId);
        if (example == null)
        {
            throw new ArgumentException("Example not found.", nameof(exampleId));
        }

        example.Update(newText, newTranslation);
    }

    public void AddCard(string userId)
    {
        if (Card != null)
        {
            throw new InvalidOperationException("This definition is already associated with a card.");
        }

        Card = new Card(Id.ToString(), userId, this);
    }

    public void RemoveCard()
    {
        if (Card == null)
        {
            throw new InvalidOperationException("This definition is not associated with any card.");
        }

        Card = null;
    }

    private static void ValidateInputs(string meaning, PartOfSpeech partOfSpeech)
    {
        if (string.IsNullOrWhiteSpace(meaning))
        {
            throw new ArgumentException("Meaning cannot be null or empty.", nameof(meaning));
        }

        if (partOfSpeech == null)
        {
            throw new ArgumentException("Part of speech cannot be null.", nameof(partOfSpeech));
        }
    }
}
