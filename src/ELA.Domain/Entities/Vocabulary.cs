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

    public void AddDefinitions(IEnumerable<(string Meaning, string? Translation, PartOfSpeech? PartOfSpeech, List<(string Text, string? Translation)> Examples)> definitions)
    {
        foreach (var def in definitions)
        {
            var newDefinition = AddDefinition(def.Meaning, def.Translation, def.PartOfSpeech);

            if (def.Examples is { Count: > 0 })
                newDefinition.AddExamples(def.Examples);
        }
    }

    public void RemoveDefinition(int definitionId)
    {
        var index = _definitions.FindIndex(d => d.Id == definitionId);
        if (index < 0)
            throw new ArgumentException($"Definition with Id {definitionId} not found.", nameof(definitionId));

        _definitions.RemoveAt(index);
    }

    public void UpdateDefinition(int definitionId, string newMeaning, string? newTranslation, PartOfSpeech? newPartOfSpeech)
    {
        var definition = _definitions.FirstOrDefault(d => d.Id == definitionId)
            ?? throw new ArgumentException($"Definition with Id {definitionId} not found.", nameof(definitionId));
        
        definition.Update(newMeaning, newTranslation, newPartOfSpeech);
    }
}