namespace ELA;

public interface ICardRepository
{
    Task<Card?> GetByIdAsync(Guid id);
    Task<IEnumerable<Card>> GetAllAsync();
    Task AddAsync(Card card);
    Task UpdateAsync(Card card);
    Task DeleteAsync(Guid id);

    Task<IEnumerable<Card>> GetByUserIdAsync(Guid userId);
}
