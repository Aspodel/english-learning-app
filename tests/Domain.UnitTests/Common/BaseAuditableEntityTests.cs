using FluentAssertions;

namespace ELA.Domain.UnitTests.Common;

public class BaseAuditableEntityTests
{
    private class TestAuditableEntity : BaseAuditableEntity { }

    [Fact]
    public void Should_Set_And_Get_AuditFields()
    {
        var entity = new TestAuditableEntity
        {
            Created = DateTimeOffset.UtcNow,
            CreatedBy = "user1",
            LastModified = DateTimeOffset.UtcNow.AddMinutes(5),
            LastModifiedBy = "user2"
        };

        entity.CreatedBy.Should().Be("user1");
        entity.LastModifiedBy.Should().Be("user2");
        entity.LastModified.Should().BeAfter(entity.Created);
    }
}