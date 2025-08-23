namespace ELA;

public interface IVocabularyRepository
{
    Task<Vocabulary?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<IEnumerable<Vocabulary>> GetAllAsync(CancellationToken cancellationToken = default);
    Task AddAsync(Vocabulary vocabulary, CancellationToken cancellationToken = default);
    Task UpdateAsync(Vocabulary vocabulary, CancellationToken cancellationToken = default);
    Task DeleteAsync(Guid id, CancellationToken cancellationToken = default);
}
