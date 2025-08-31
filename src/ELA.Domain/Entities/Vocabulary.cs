namespace ELA;

public class Vocabulary : BaseAuditableEntity<int>
{

    public string Text { get; private set; }
    public string IPA { get; private set; }

    public string UserId { get; private set; }
    public User? User { get; private set; }

    private readonly List<Definition> _definitions = [];
    public IReadOnlyList<Definition> Definitions => _definitions.AsReadOnly();

    public Vocabulary(string text, string ipa, string userId)
    {
        ValidateInputs(text, ipa);
        Text = text;
        IPA = ipa;
        UserId = userId;
    }

    public void Update(string text, string ipa)
    {
        ValidateInputs(text, ipa);
        Text = text;
        IPA = ipa;
    }

    public Definition AddDefinition(string meaning, string translation, PartOfSpeech partOfSpeech)
    {
        var definition = new Definition(meaning, translation, partOfSpeech, Id, this);
        _definitions.Add(definition);
        return definition;
    }

    public void RemoveDefinition(int definitionId)
    {
        var definition = _definitions.FirstOrDefault(d => d.Id == definitionId);
        if (definition == null)
        {
            throw new ArgumentException("Definition not found.", nameof(definitionId));
        }

        _definitions.Remove(definition);
    }

    public void UpdateDefinition(int definitionId, string newMeaning, string newTranslation, PartOfSpeech newPartOfSpeech)
    {
        var definition = _definitions.FirstOrDefault(d => d.Id == definitionId);
        if (definition == null)
        {
            throw new ArgumentException("Definition not found.", nameof(definitionId));
        }

        definition.Update(newMeaning, newTranslation, newPartOfSpeech);
    }

    private static void ValidateInputs(string text, string ipa)
    {
        if (string.IsNullOrWhiteSpace(text))
        {
            throw new ArgumentException("Text cannot be null or empty.", nameof(text));
        }

        if (text.Length > 255) throw new ArgumentException("Text too long", nameof(text));

        if (string.IsNullOrWhiteSpace(ipa))
        {
            throw new ArgumentException("IPA cannot be null or empty.", nameof(ipa));
        }

        if (ipa.Length > 50) throw new ArgumentException("IPA too long", nameof(ipa));
    }
}
