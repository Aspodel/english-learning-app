namespace ELA;

public class Vocabulary : BaseAuditableEntity
{
    public string Text { get; private set; }
    public string? IPA { get; private set; }
    public string UserId { get; private set; }
    private readonly List<Definition> _definitions = [];
    public IReadOnlyList<Definition> Definitions => _definitions.AsReadOnly();

    protected Vocabulary()
    {
        Text = string.Empty;
        UserId = string.Empty;
    }

    public Vocabulary(string text, string userId, string? ipa)
    {
        Text = text;
        UserId = userId;
        IPA = ipa;
    }

    public void Update(string text, string? ipa)
    {
        Text = text;
        IPA = ipa;
    }

    public Definition AddDefinition(string meaning, string? translation, PartOfSpeech? partOfSpeech)
    {
        var definition = new Definition(meaning, translation, partOfSpeech, Id);
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

    public void UpdateDefinition(int definitionId, string newMeaning, string? newTranslation, PartOfSpeech? newPartOfSpeech)
    {
        var definition = _definitions.FirstOrDefault(d => d.Id == definitionId);
        if (definition == null)
        {
            throw new ArgumentException("Definition not found.", nameof(definitionId));
        }

        definition.Update(newMeaning, newTranslation, newPartOfSpeech);
    }
}