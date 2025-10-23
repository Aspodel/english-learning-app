namespace ELA;

public class Example : BaseEntity
{
    public string Text { get; private set; }
    public string? Translation { get; private set; }

    public Example(string text, string? translation)
    {
        Text = text;
        Translation = translation;
    }

    public void Update(string text, string? translation)
    {
        Text = text;
        Translation = translation;
    }
}