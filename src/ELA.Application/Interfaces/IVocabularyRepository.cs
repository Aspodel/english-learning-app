namespace ELA;

public interface IVocabularyRepository
{
    Task<Vocabulary?> GetByIdAsync(Guid id);
    Task<IEnumerable<Vocabulary>> GetAllAsync();
    Task AddAsync(Vocabulary vocabulary);
    Task UpdateAsync(Vocabulary vocabulary);
    Task DeleteAsync(Guid id);
}
