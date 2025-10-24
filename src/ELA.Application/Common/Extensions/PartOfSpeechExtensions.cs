namespace ELA;

public static class PartOfSpeechValidation
{
    private static readonly HashSet<string> ValidParts = new(StringComparer.OrdinalIgnoreCase)
    {
        "noun",
        "verb",
        "adjective",
        "adverb",
        "pronoun",
        "preposition",
        "conjunction",
        "interjection"
    };

    public static bool IsValidPartOfSpeech(this string? partOfSpeech)
    {
        if (string.IsNullOrWhiteSpace(partOfSpeech)) return false;
        return ValidParts.Contains(partOfSpeech);
    }
}