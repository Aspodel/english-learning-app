using FluentAssertions;

namespace ELA.Domain.UnitTests.Common;

public class BaseEntityTests
{
    private class TestEvent : BaseEvent { }
    private class TestEntity : BaseEntity { }

    [Fact]
    public void Should_Add_And_Clear_DomainEvents()
    {
        var entity = new TestEntity();
        var ev = new TestEvent();

        entity.AddDomainEvent(ev);

        entity.DomainEvents.Should().ContainSingle()
              .Which.Should().Be(ev);

        entity.ClearDomainEvents();
        entity.DomainEvents.Should().BeEmpty();
    }

    [Fact]
    public void Should_Remove_Specific_DomainEvent()
    {
        var entity = new TestEntity();
        var ev1 = new TestEvent();
        var ev2 = new TestEvent();

        entity.AddDomainEvent(ev1);
        entity.AddDomainEvent(ev2);

        entity.RemoveDomainEvent(ev1);

        entity.DomainEvents.Should().ContainSingle()
              .Which.Should().Be(ev2);
    }
}