using FluentAssertions;

namespace ELA.Domain.UnitTests.Entities;

public class ExampleTests
{
    [Fact]
    public void Should_Create_Example()
    {
        var example = new Example("I eat an apple", "Tôi ăn một quả táo");

        example.Text.Should().Be("I eat an apple");
        example.Translation.Should().Be("Tôi ăn một quả táo");
    }

    [Fact]
    public void Should_Throw_When_Text_IsEmpty()
    {
        Action act = () => new Example("", "Tôi ăn một quả táo");

        act.Should().Throw<ArgumentException>();
    }

    [Fact]
    public void Should_Throw_When_Translation_IsEmpty()
    {
        Action act = () => new Example("I eat an apple", "");

        act.Should().Throw<ArgumentException>();
    }

    [Fact]
    public void Should_Update_Example()
    {
        var example = new Example("I eat an apple", "Tôi ăn một quả táo");

        example.Update("I like apples", "Tôi thích táo");

        example.Text.Should().Be("I like apples");
        example.Translation.Should().Be("Tôi thích táo");
    }
}
