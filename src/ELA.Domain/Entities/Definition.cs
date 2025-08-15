namespace ELA;

public class Definition : BaseEntity
{
    public string Meaning { get; set; }
    public string PartOfSpeech { get; set; }

    private readonly List<Example> _examples = new();
    public IReadOnlyList<Example> Examples => _examples.AsReadOnly();

    public Definition(string meaning, string partOfSpeech)
    {
        ValidateInputs(meaning, partOfSpeech);
        Meaning = meaning;
        PartOfSpeech = partOfSpeech;
    }

    public void Update(string meaning, string partOfSpeech)
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

    private static void ValidateInputs(string meaning, string partOfSpeech)
    {
        if (string.IsNullOrWhiteSpace(meaning))
        {
            throw new ArgumentException("Meaning cannot be null or empty.", nameof(meaning));
        }

        if (string.IsNullOrWhiteSpace(partOfSpeech))
        {
            throw new ArgumentException("Part of speech cannot be null or empty.", nameof(partOfSpeech));
        }
    }
}
