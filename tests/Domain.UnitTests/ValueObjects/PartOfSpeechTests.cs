using FluentAssertions;

namespace ELA.Domain.UnitTests.ValueObjects;

public class PartOfSpeechTests
{
    [Fact]
    public void Should_Create_Predefined_Noun()
    {
        var noun = PartOfSpeech.Noun;

        noun.Name.Should().Be("noun");
        noun.Abbreviation.Should().Be("n.");
    }

    [Fact]
    public void Should_Return_Correct_Instance_From_String()
    {
        var part = PartOfSpeech.From("verb");

        part.Should().BeEquivalentTo(PartOfSpeech.Verb);
    }

    [Fact]
    public void Should_Be_CaseInsensitive_When_Parsing()
    {
        var part = PartOfSpeech.From("AdJeCtIvE");

        part.Should().BeEquivalentTo(PartOfSpeech.Adjective);
    }

    [Fact]
    public void Should_Throw_When_Unsupported_Name()
    {
        Action act = () => PartOfSpeech.From("alienword");

        act.Should().Throw<ArgumentException>()
            .WithMessage("Unsupported part of speech*");
    }

    [Fact]
    public void Should_Compare_Equal_When_Same_Name_And_Abbreviation()
    {
        var p1 = PartOfSpeech.Noun;
        var p2 = PartOfSpeech.From("noun");

        p1.Should().Be(p2);
        p1.GetHashCode().Should().Be(p2.GetHashCode());
    }

    [Fact]
    public void Should_Not_Equal_Different_Instances()
    {
        var noun = PartOfSpeech.Noun;
        var verb = PartOfSpeech.Verb;

        noun.Should().NotBe(verb);
    }
}
