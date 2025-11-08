using ELA.Vocabularies.Dtos;

namespace ELA;

public record UpdateVocabularyCommand(
    int Id,
    string Text,
    string? IPA,
    List<UpdateDefinitionDto>? Definitions
) : IRequest<Unit>;

public class UpdateVocabularyCommandHandler : IRequestHandler<UpdateVocabularyCommand, Unit>
{
    private readonly IApplicationDbContext _context;

    public UpdateVocabularyCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(UpdateVocabularyCommand request, CancellationToken cancellationToken)
    {
        var vocabulary = await _context.Vocabularies
            .Include(v => v.Definitions)
                .ThenInclude(d => d.Examples)
            .SingleOrDefaultAsync(v => v.Id == request.Id, cancellationToken);

        Guard.Against.NotFound(request.Id, vocabulary);

        // ---- Update base vocabulary fields ----
        vocabulary.Update(request.Text, request.IPA);

        var existingDefinitions = vocabulary.Definitions.ToDictionary(d => d.Id);
        var incomingDefinitions = request.Definitions ?? [];

        // ---- Process incoming definitions ----
        foreach (var defDto in incomingDefinitions)
        {
            if (defDto.Id is null or <= 0)
            {
                var newDefinition = vocabulary.AddDefinition(
                    defDto.Meaning,
                    defDto.Translation,
                    defDto.PartOfSpeech is not null ? PartOfSpeech.From(defDto.PartOfSpeech) : null
                );

                if (defDto.Examples?.Count > 0)
                    newDefinition.AddExamples(defDto.Examples.Select(e => (e.Text, e.Translation)));

                continue;
            }

            // Update existing definition
            if (!existingDefinitions.Remove(defDto.Id.Value, out var definition))
                throw new ArgumentException($"Definition {defDto.Id} not found in Vocabulary {vocabulary.Id}.");

            definition.Update(
                defDto.Meaning,
                defDto.Translation,
                defDto.PartOfSpeech is not null ? PartOfSpeech.From(defDto.PartOfSpeech) : null
            );

            SyncExamples(definition, defDto.Examples ?? Enumerable.Empty<UpdateExampleDto>());
        }

        // ---- Remove definitions not in request ----
        foreach (var obsolete in existingDefinitions.Values)
            vocabulary.RemoveDefinition(obsolete.Id);

        await _context.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }

    private static void SyncExamples(Definition definition, IEnumerable<UpdateExampleDto> incomingExamples)
    {
        var existingExamples = definition.Examples.ToDictionary(e => e.Id);

        foreach (var exDto in incomingExamples)
        {
            if (exDto.Id is null or <= 0)
            {
                definition.AddExample(exDto.Text, exDto.Translation);
                continue;
            }

            // Existing example → update and remove from dictionary
            if (existingExamples.Remove(exDto.Id.Value, out var existing))
            {
                existing.Update(exDto.Text, exDto.Translation);
            }
        }

        // Remove examples that no longer exist in DTO
        foreach (var obsolete in existingExamples.Values)
            definition.RemoveExample(obsolete.Id);
    }
}