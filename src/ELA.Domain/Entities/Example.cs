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
        Guard.Against.NullOrWhiteSpace(text, nameof(text));
        Guard.Against.NullOrWhiteSpace(translation, nameof(translation));
    }
}
