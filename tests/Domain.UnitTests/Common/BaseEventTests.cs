using FluentAssertions;

namespace ELA.Domain.UnitTests.Common;

public class BaseEventTests
{
    private class SampleEvent : BaseEvent { }

    [Fact]
    public void Should_Create_Event_Instance()
    {
        var ev = new SampleEvent();

        ev.Should().BeOfType<SampleEvent>();
        ev.Should().BeAssignableTo<BaseEvent>();
    }
}
