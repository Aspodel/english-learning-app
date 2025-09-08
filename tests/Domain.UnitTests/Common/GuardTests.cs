using Ardalis.GuardClauses;
using FluentAssertions;

namespace ELA.Domain.UnitTests.Common;

public class GuardTests
{
    [Fact]
    public void NullOrWhiteSpace_Should_Throw_When_Value_Is_Null()
    {
        Action act = () => Guard.Against.NullOrWhiteSpace(null, nameof(NullOrWhiteSpace_Should_Throw_When_Value_Is_Null));

        act.Should().Throw<ArgumentNullException>();
    }

    [Fact]
    public void NullOrWhiteSpace_Should_Throw_When_Value_Is_Empty()
    {
        Action act = () => Guard.Against.NullOrWhiteSpace("", "text");

        act.Should().Throw<ArgumentException>()
            .WithMessage("Required input text was empty. (Parameter 'text')");
    }

    [Fact]
    public void NullOrWhiteSpace_Should_Throw_When_Value_Is_Whitespace()
    {
        Action act = () => Guard.Against.NullOrWhiteSpace("   ", "text");

        act.Should().Throw<ArgumentException>()
            .WithMessage("Required input text was empty. (Parameter 'text')");
    }

    [Fact]
    public void NullOrWhiteSpace_Should_Not_Throw_When_Value_Is_Valid()
    {
        var result = Guard.Against.NullOrWhiteSpace("valid", "text");

        result.Should().Be("valid");
    }

    [Fact]
    public void OutOfRange_Should_Throw_When_Value_Is_Out_Of_Range()
    {
        Action act = () => Guard.Against.OutOfRange(10, "rating", 0, 5);

        act.Should().Throw<ArgumentOutOfRangeException>()
            .WithMessage("Input rating was out of range*");
    }

    [Fact]
    public void OutOfRange_Should_Not_Throw_When_Value_Is_In_Range()
    {
        var value = Guard.Against.OutOfRange(3, "rating", 0, 5);

        value.Should().Be(3);
    }

    [Fact]
    public void Negative_Should_Throw_When_Value_Is_Negative()
    {
        Action act = () => Guard.Against.Negative(-1, "id");

        act.Should().Throw<ArgumentException>()
            .WithMessage("Required input id cannot be negative. (Parameter 'id')");
    }

    [Fact]
    public void Negative_Should_Not_Throw_When_Value_Is_Zero_Or_Positive()
    {
        var zero = Guard.Against.Negative(0, "id");
        var positive = Guard.Against.Negative(5, "id");

        zero.Should().Be(0);
        positive.Should().Be(5);
    }
}