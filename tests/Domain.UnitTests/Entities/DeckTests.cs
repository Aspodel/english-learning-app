using FluentAssertions;

namespace ELA.Domain.UnitTests.Entities;

public class DeckTests
{
    [Fact]
    public void Should_Create_Deck()
    {
        var deck = new Deck("My Deck", "user1");

        deck.Name.Should().Be("My Deck");
        deck.UserId.Should().Be("user1");
        deck.Cards.Should().BeEmpty();
    }

    [Fact]
    public void Should_Throw_When_Name_IsEmpty()
    {
        Action act = () => new Deck("", "user1");

        act.Should().Throw<ArgumentException>();
    }

    [Fact]
    public void Should_Rename_Deck()
    {
        var deck = new Deck("Old Name", "user1");

        deck.Update("New Name");

        deck.Name.Should().Be("New Name");
    }

    [Fact]
    public void Should_Add_Card()
    {
        var deck = new Deck("My Deck", "user1");

        var card = deck.AddCard("Front", "Back");

        deck.Cards.Should().Contain(card);
        card.Front.Should().Be("Front");
        card.Back.Should().Be("Back");
    }

    [Fact]
    public void Should_Remove_Card()
    {
        var deck = new Deck("My Deck", "user1");
        var card = deck.AddCard("Front", "Back");

        deck.RemoveCard(card.Id);

        deck.Cards.Should().BeEmpty();
    }

    [Fact]
    public void RemoveCard_Should_Throw_When_NotFound()
    {
        var deck = new Deck("My Deck", "user1");

        Action act = () => deck.RemoveCard(999);

        act.Should().Throw<ArgumentException>()
            .WithMessage("Card not found.*");
    }

    [Fact]
    public void Should_Update_Card()
    {
        var deck = new Deck("My Deck", "user1");
        var card = deck.AddCard("Front", "Back");

        deck.UpdateCard(card.Id, "New Front", "New Back");

        card.Front.Should().Be("New Front");
        card.Back.Should().Be("New Back");
    }

    [Fact]
    public void UpdateCard_Should_Throw_When_NotFound()
    {
        var deck = new Deck("My Deck", "user1");

        Action act = () => deck.UpdateCard(999, "Front", "Back");

        act.Should().Throw<ArgumentException>()
            .WithMessage("Card not found.*");
    }
}
