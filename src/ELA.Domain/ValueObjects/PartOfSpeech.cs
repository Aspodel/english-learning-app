namespace ELA;

public sealed class PartOfSpeech : ValueObject
{
    public string Value { get; }

    private static readonly HashSet<string> AllowedValues = new()
    {
        "Noun", "Verb", "Adjective", "Adverb", "Pronoun", "Preposition", "Conjunction", "Interjection", "Determiner"
    };

    private PartOfSpeech(string value)
    {
        Value = value;
    }

    public static PartOfSpeech From(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new ArgumentException("Part of speech cannot be null or empty.", nameof(value));

        if (!AllowedValues.Contains(value))
            throw new ArgumentException($"Invalid part of speech: {value}", nameof(value));

        return new PartOfSpeech(value);
    }

    public override string ToString() => Value;

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Value;
    }
}
