namespace ELA;

public class Vocabulary : BaseAuditableEntity
{

    public string Text { get; private set; }
    public string IPA { get; private set; }

    private readonly List<Definition> _definitions = new();
    public IReadOnlyList<Definition> Definitions => _definitions.AsReadOnly();

    public Vocabulary(string text, string ipa)
    {
        ValidateInputs(text, ipa);
        Text = text;
        IPA = ipa;
    }

    public void Update(string text, string ipa)
    {
        ValidateInputs(text, ipa);

        Text = text;
        IPA = ipa;

        UpdateLastModified();
    }

    public Definition AddDefinition(string meaning, string partOfSpeech)
    {
        var definition = new Definition(meaning, partOfSpeech);
        _definitions.Add(definition);
        UpdateLastModified();
        return definition;
    }

    public void RemoveDefinition(Guid definitionId)
    {
        var definition = _definitions.FirstOrDefault(d => d.Id == definitionId);
        if (definition == null)
        {
            throw new ArgumentException("Definition not found.", nameof(definitionId));
        }

        _definitions.Remove(definition);
        UpdateLastModified();
    }

    private static void ValidateInputs(string text, string ipa)
    {
        if (string.IsNullOrWhiteSpace(text))
        {
            throw new ArgumentException("Text cannot be null or empty.", nameof(text));
        }

        if (string.IsNullOrWhiteSpace(ipa))
        {
            throw new ArgumentException("IPA cannot be null or empty.", nameof(ipa));
        }
    }
}
