namespace ELA;

public class Definition : BaseEntity
{
    public string Meaning { get; private set; }
    public string Translation { get; private set; }
    public PartOfSpeech PartOfSpeech { get; private set; }

    public int VocabularyId { get; private set; }
    public Vocabulary? Vocabulary { get; private set; }

    private readonly List<Example> _examples = [];
    public IReadOnlyList<Example> Examples => _examples.AsReadOnly();

    private Definition()
    {
        Meaning = string.Empty;
        Translation = string.Empty;
        PartOfSpeech = PartOfSpeech.Noun;
        VocabularyId = 0;
    }

    public Definition(string meaning, string translation, PartOfSpeech partOfSpeech, int vocabularyId)
    {
        ValidateInputs(meaning, translation);
        Meaning = meaning;
        Translation = translation;
        PartOfSpeech = partOfSpeech;
        VocabularyId = vocabularyId;
    }

    public void Update(string meaning, string translation, PartOfSpeech partOfSpeech)
    {
        ValidateInputs(meaning, translation);
        Meaning = meaning;
        Translation = translation;
        PartOfSpeech = partOfSpeech;
    }

    public void AddExample(string text, string translation)
    {
        var example = new Example(text, translation);
        _examples.Add(example);
    }

    public void RemoveExample(int exampleId)
    {
        var example = _examples.FirstOrDefault(e => e.Id == exampleId);
        if (example == null)
        {
            throw new ArgumentException("Example not found.", nameof(exampleId));
        }

        _examples.Remove(example);
    }

    public void UpdateExample(int exampleId, string newText, string newTranslation)
    {
        var example = _examples.FirstOrDefault(e => e.Id == exampleId);
        if (example == null)
        {
            throw new ArgumentException("Example not found.", nameof(exampleId));
        }

        example.Update(newText, newTranslation);
    }

    private static void ValidateInputs(string meaning, string translation)
    {
        Guard.Against.NullOrWhiteSpace(meaning, nameof(meaning));
        Guard.Against.NullOrWhiteSpace(translation, nameof(translation));
    }
}
