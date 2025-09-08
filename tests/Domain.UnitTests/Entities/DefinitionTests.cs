using FluentAssertions;

namespace ELA.Domain.UnitTests.Entities;

public class DefinitionTests
{
    [Fact]
    public void Should_Create_Definition()
    {
        var def = new Definition("A fruit", "Quả táo", PartOfSpeech.Noun, 1);

        def.Meaning.Should().Be("A fruit");
        def.Translation.Should().Be("Quả táo");
        def.PartOfSpeech.Should().Be(PartOfSpeech.Noun);
        def.VocabularyId.Should().Be(1);
        def.Examples.Should().BeEmpty();
    }

    [Fact]
    public void Should_Throw_When_Meaning_IsEmpty()
    {
        Action act = () => new Definition("", "Quả táo", PartOfSpeech.Noun, 1);

        act.Should().Throw<ArgumentException>();
    }

    [Fact]
    public void Should_Throw_When_Translation_IsEmpty()
    {
        Action act = () => new Definition("A fruit", "", PartOfSpeech.Noun, 1);

        act.Should().Throw<ArgumentException>();
    }

    [Fact]
    public void Should_Update_Definition()
    {
        var def = new Definition("A fruit", "Quả táo", PartOfSpeech.Noun, 1);

        def.Update("A red fruit", "Trái táo", PartOfSpeech.Adjective);

        def.Meaning.Should().Be("A red fruit");
        def.Translation.Should().Be("Trái táo");
        def.PartOfSpeech.Should().Be(PartOfSpeech.Adjective);
    }

    [Fact]
    public void Should_Add_Example()
    {
        var def = new Definition("A fruit", "Quả táo", PartOfSpeech.Noun, 1);

        def.AddExample("I eat an apple", "Tôi ăn một quả táo");

        def.Examples.Should().ContainSingle()
            .Which.Text.Should().Be("I eat an apple");
    }

    [Fact]
    public void Should_Remove_Example()
    {
        var def = new Definition("A fruit", "Quả táo", PartOfSpeech.Noun, 1);
        def.AddExample("I eat an apple", "Tôi ăn một quả táo");
        var example = def.Examples.First();

        def.RemoveExample(example.Id);

        def.Examples.Should().BeEmpty();
    }

    [Fact]
    public void RemoveExample_Should_Throw_When_NotFound()
    {
        var def = new Definition("A fruit", "Quả táo", PartOfSpeech.Noun, 1);

        Action act = () => def.RemoveExample(999);

        act.Should().Throw<ArgumentException>()
            .WithMessage("Example not found.*");
    }

    [Fact]
    public void Should_Update_Example()
    {
        var def = new Definition("A fruit", "Quả táo", PartOfSpeech.Noun, 1);
        def.AddExample("I eat an apple", "Tôi ăn một quả táo");
        var example = def.Examples.First();

        def.UpdateExample(example.Id, "I like apples", "Tôi thích táo");

        example.Text.Should().Be("I like apples");
        example.Translation.Should().Be("Tôi thích táo");
    }

    [Fact]
    public void UpdateExample_Should_Throw_When_NotFound()
    {
        var def = new Definition("A fruit", "Quả táo", PartOfSpeech.Noun, 1);

        Action act = () => def.UpdateExample(999, "new text", "new translation");

        act.Should().Throw<ArgumentException>()
            .WithMessage("Example not found.*");
    }
}
