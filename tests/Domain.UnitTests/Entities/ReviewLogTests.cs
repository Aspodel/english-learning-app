using FluentAssertions;

namespace ELA.Domain.UnitTests.Entities;

public class ReviewLogTests
{
    [Fact]
    public void Should_Create_ReviewLog()
    {
        var log = new ReviewLog(1, DateTimeOffset.UtcNow, 4, 10, 2.5, 3);

        log.CardId.Should().Be(1);
        log.QualityRating.Should().Be(4);
        log.Interval.Should().Be(10);
        log.EaseFactor.Should().Be(2.5);
        log.Repetition.Should().Be(3);
    }

    [Fact]
    public void Should_Throw_When_CardId_IsNegative()
    {
        Action act = () => new ReviewLog(-1, DateTimeOffset.UtcNow, 3, 5, 2.5, 1);

        act.Should().Throw<ArgumentException>();
    }

    [Fact]
    public void Should_Throw_When_QualityRating_IsInvalid()
    {
        Action act = () => new ReviewLog(1, DateTimeOffset.UtcNow, 6, 5, 2.5, 1);

        act.Should().Throw<ArgumentOutOfRangeException>();
    }

    [Fact]
    public void Should_Throw_When_EaseFactor_IsTooLow()
    {
        Action act = () => new ReviewLog(1, DateTimeOffset.UtcNow, 3, 5, 1.0, 1);

        act.Should().Throw<ArgumentException>()
            .WithMessage("Ease factor must be >= 1.3*");
    }
}
