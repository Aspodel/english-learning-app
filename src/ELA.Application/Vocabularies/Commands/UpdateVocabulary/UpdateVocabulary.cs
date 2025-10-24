using ELA.Vocabularies.Dtos;

namespace ELA;

public record UpdateVocabularyCommand(
    int Id,
    string Text,
    string? IPA,
    List<UpdateDefinitionDto>? Definitions) : IRequest<Unit>;

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
            .FirstOrDefaultAsync(v => v.Id == request.Id, cancellationToken);

        Guard.Against.NotFound(request.Id, vocabulary);

         // 1️⃣ Update vocabulary itself
        vocabulary.Update(request.Text, request.IPA);

        var existingDefs = vocabulary.Definitions.ToList();
        var incomingDefs = request.Definitions ?? new List<UpdateDefinitionDto>();

        // 2️⃣ Update or add definitions
        foreach (var defInput in incomingDefs)
        {
            PartOfSpeech? partOfSpeech = defInput.PartOfSpeech is not null
                ? PartOfSpeech.From(defInput.PartOfSpeech)
                : null;

            Definition? definition = null;

            if (defInput.Id.HasValue)
            {
                definition = existingDefs.FirstOrDefault(d => d.Id == defInput.Id.Value);
                definition?.Update(defInput.Meaning, defInput.Translation, partOfSpeech);
            }

            if (definition == null)
            {
                // new definition
                definition = vocabulary.AddDefinition(defInput.Meaning, defInput.Translation, partOfSpeech);
            }

            // handle examples
            HandleExamples(definition, defInput.Examples);
        }

        // 3️⃣ Delete definitions missing from request
        var incomingDefIds = incomingDefs
            .Where(d => d.Id.HasValue)
            .Select(d => d.Id!.Value)
            .ToHashSet();

        var defsToRemove = existingDefs
            .Where(d => !incomingDefIds.Contains(d.Id))
            .ToList();

        foreach (var def in defsToRemove)
        {
            vocabulary.RemoveDefinition(def.Id);
        }

        // Save all changes
        await _context.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }

    private void HandleExamples(Definition definition, List<UpdateExampleDto>? exampleInputs)
    {
        var existingExamples = definition.Examples.ToList();
        var incomingExamples = exampleInputs ?? new List<UpdateExampleDto>();

        // Update or add examples
        foreach (var exInput in incomingExamples)
        {
            Example? example = null;

            if (exInput.Id.HasValue)
            {
                example = existingExamples.FirstOrDefault(e => e.Id == exInput.Id.Value);
                if (example != null)
                {
                    example.Update(exInput.Text, exInput.Translation);
                }
            }

            if (example == null)
            {
                // new example
                definition.AddExample(exInput.Text, exInput.Translation);
            }
        }

        // Delete examples missing from request
        var incomingExampleIds = incomingExamples
            .Where(e => e.Id.HasValue)
            .Select(e => e.Id!.Value)
            .ToHashSet();

        var examplesToRemove = existingExamples
            .Where(e => !incomingExampleIds.Contains(e.Id))
            .ToList();

        foreach (var ex in examplesToRemove)
        {
            definition.RemoveExample(ex.Id);
        }
    }
}