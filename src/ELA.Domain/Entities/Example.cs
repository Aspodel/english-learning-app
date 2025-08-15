namespace ELA;

public class Example : BaseEntity
{
    public string Text { get; private set; }
    public string Translation { get; private set; }

    public Example(string text, string translation)
    {
        ValidateInputs(text, translation);
        Text = text;
        Translation = translation;
    }

    public void Update(string text, string translation)
    {
        ValidateInputs(text, translation);
        Text = text;
        Translation = translation;
    }

    private static void ValidateInputs(string text, string translation)
    {
        if (string.IsNullOrWhiteSpace(text))
        {
            throw new ArgumentException("Text cannot be null or empty.", nameof(text));
        }

        if (string.IsNullOrWhiteSpace(translation))
        {
            throw new ArgumentException("Translation cannot be null or empty.", nameof(translation));
        }
    }
}
