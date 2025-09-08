using FluentAssertions;

namespace ELA.Domain.UnitTests.Entities;

public class CardTests
{
    [Fact]
    public void Should_Create_Card()
    {
        var card = new Card("Front", "Back", 1);

        card.Front.Should().Be("Front");
        card.Back.Should().Be("Back");
        card.DeckId.Should().Be(1);
        card.Suspended.Should().BeFalse();
        card.ReviewLogs.Should().BeEmpty();
    }

    [Fact]
    public void Should_Throw_When_Front_IsEmpty()
    {
        Action act = () => new Card("", "Back", 1);

        act.Should().Throw<ArgumentException>();
    }

    [Fact]
    public void Should_Throw_When_Back_IsEmpty()
    {
        Action act = () => new Card("Front", "", 1);

        act.Should().Throw<ArgumentException>();
    }

    [Fact]
    public void Should_Update_Card()
    {
        var card = new Card("Front", "Back", 1);

        card.Update("New Front", "New Back");

        card.Front.Should().Be("New Front");
        card.Back.Should().Be("New Back");
    }

    [Fact]
    public void Should_Suspend_And_Activate_Card()
    {
        var card = new Card("Front", "Back", 1);

        card.Suspend();
        card.Suspended.Should().BeTrue();

        card.Activate();
        card.Suspended.Should().BeFalse();
    }

    [Fact]
    public void Should_Add_ReviewResult()
    {
        var card = new Card("Front", "Back", 1);
        var reviewDate = DateTimeOffset.UtcNow;

        card.AddReviewResult(
            qualityRating: 4,
            reviewDate: reviewDate,
            newInterval: 10,
            newEaseFactor: 2.6,
            newRepetition: 3,
            nextReview: reviewDate.AddDays(10));

        card.Interval.Should().Be(10);
        card.EaseFactor.Should().Be(2.6);
        card.Repetition.Should().Be(3);
        card.LastReview.Should().Be(reviewDate);
        card.ReviewLogs.Should().ContainSingle();
    }

    [Fact]
    public void AddReviewResult_Should_Throw_When_Suspended()
    {
        var card = new Card("Front", "Back", 1);
        card.Suspend();

        Action act = () => card.AddReviewResult(3, DateTimeOffset.UtcNow, 5, 2.5, 2, DateTimeOffset.UtcNow.AddDays(5));

        act.Should().Throw<InvalidOperationException>()
            .WithMessage("Cannot review a suspended card.");
    }

    [Fact]
    public void AddReviewResult_Should_Throw_When_InvalidQualityRating()
    {
        var card = new Card("Front", "Back", 1);

        Action act = () => card.AddReviewResult(-1, DateTimeOffset.UtcNow, 5, 2.5, 2, DateTimeOffset.UtcNow.AddDays(5));

        act.Should().Throw<ArgumentOutOfRangeException>();
    }
}
