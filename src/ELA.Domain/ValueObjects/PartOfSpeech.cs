namespace ELA;

public class PartOfSpeech : ValueObject
{
    private PartOfSpeech(string name, string abbreviation)
    {
        Name = name;
        Abbreviation = abbreviation;
    }

    public string Name { get; private set; }
    public string Abbreviation { get; private set; }

    // Predefined instances
    public static PartOfSpeech Noun => new("noun", "n");
    public static PartOfSpeech Verb => new("verb", "v");
    public static PartOfSpeech Adjective => new("adjective", "adj");
    public static PartOfSpeech Adverb => new("adverb", "adv");
    public static PartOfSpeech Pronoun => new("pronoun", "pron");
    public static PartOfSpeech Preposition => new("preposition", "prep");
    public static PartOfSpeech Conjunction => new("conjunction", "conj");
    public static PartOfSpeech Interjection => new("interjection", "interj");

    public static PartOfSpeech From(string name)
    {
        var match = SupportedParts.FirstOrDefault(p => p.Name.Equals(name, StringComparison.OrdinalIgnoreCase));
        if (match is null)
            throw new ArgumentException($"Unsupported part of speech: {name}");
        return match;
    }

    private static IEnumerable<PartOfSpeech> SupportedParts
    {
        get
        {
            yield return Noun;
            yield return Verb;
            yield return Adjective;
            yield return Adverb;
            yield return Pronoun;
            yield return Preposition;
            yield return Conjunction;
            yield return Interjection;
        }
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Name;
        yield return Abbreviation;
    }
}
