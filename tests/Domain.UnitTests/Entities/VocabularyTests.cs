using FluentAssertions;

namespace ELA.Domain.UnitTests.Entities;

public class VocabularyTests
{
    [Fact]
    public void Should_Create_Vocabulary()
    {
        var vocab = new Vocabulary("apple", "ˈæp.əl", "user1");

        vocab.Text.Should().Be("apple");
        vocab.IPA.Should().Be("ˈæp.əl");
        vocab.UserId.Should().Be("user1");
        vocab.Definitions.Should().BeEmpty();
    }

    [Fact]
    public void Should_Throw_When_Text_IsEmpty()
    {
        Action act = () => new Vocabulary("", "ˈæp.əl", "user1");

        act.Should().Throw<ArgumentException>();
    }

    [Fact]
    public void Should_Throw_When_IPA_IsEmpty()
    {
        Action act = () => new Vocabulary("apple", "", "user1");

        act.Should().Throw<ArgumentException>();
    }

    [Fact]
    public void Should_Update_Vocabulary()
    {
        var vocab = new Vocabulary("apple", "ˈæp.əl", "user1");

        vocab.Update("banana", "bəˈnɑː.nə");

        vocab.Text.Should().Be("banana");
        vocab.IPA.Should().Be("bəˈnɑː.nə");
    }

    [Fact]
    public void Should_Add_Definition()
    {
        var vocab = new Vocabulary("apple", "ˈæp.əl", "user1");

        var def = vocab.AddDefinition("A fruit", "Quả táo", PartOfSpeech.Noun);

        vocab.Definitions.Should().Contain(def);
        def.Meaning.Should().Be("A fruit");
        def.Translation.Should().Be("Quả táo");
        def.PartOfSpeech.Should().Be(PartOfSpeech.Noun);
    }

    [Fact]
    public void Should_Remove_Definition()
    {
        var vocab = new Vocabulary("apple", "ˈæp.əl", "user1");
        var def = vocab.AddDefinition("A fruit", "Quả táo", PartOfSpeech.Noun);

        vocab.RemoveDefinition(def.Id);

        vocab.Definitions.Should().NotContain(def);
    }

    [Fact]
    public void RemoveDefinition_Should_Throw_When_NotFound()
    {
        var vocab = new Vocabulary("apple", "ˈæp.əl", "user1");

        Action act = () => vocab.RemoveDefinition(999);

        act.Should().Throw<ArgumentException>()
            .WithMessage("Definition not found.*");
    }

    [Fact]
    public void Should_Update_Definition()
    {
        var vocab = new Vocabulary("apple", "ˈæp.əl", "user1");
        var def = vocab.AddDefinition("A fruit", "Quả táo", PartOfSpeech.Noun);

        vocab.UpdateDefinition(def.Id, "A red fruit", "Trái táo", PartOfSpeech.Adjective);

        def.Meaning.Should().Be("A red fruit");
        def.Translation.Should().Be("Trái táo");
        def.PartOfSpeech.Should().Be(PartOfSpeech.Adjective);
    }

    [Fact]
    public void UpdateDefinition_Should_Throw_When_NotFound()
    {
        var vocab = new Vocabulary("apple", "ˈæp.əl", "user1");

        Action act = () => vocab.UpdateDefinition(999, "meaning", "translation", PartOfSpeech.Verb);

        act.Should().Throw<ArgumentException>()
            .WithMessage("Definition not found.*");
    }
}
