namespace ELA;

public class Vocabulary : BaseAuditableEntity
{

    public string Text { get; private set; }
    public string IPA { get; private set; }

    public string UserId { get; private set; }

    private readonly List<Definition> _definitions = [];
    public IReadOnlyList<Definition> Definitions => _definitions.AsReadOnly();

    private Vocabulary()
    {
        Text = string.Empty;
        IPA = string.Empty;
        UserId = string.Empty;
    }

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
        Guard.Against.NullOrWhiteSpace(text, nameof(text));
        Guard.Against.NullOrWhiteSpace(ipa, nameof(ipa));
    }
}
