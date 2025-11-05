namespace ELA;

public class CreateVocabulariesCommandValidator : AbstractValidator<CreateVocabulariesCommand>
{
    public CreateVocabulariesCommandValidator()
    {
        RuleForEach(v => v.Vocabularies)
            .SetValidator(new CreateVocabularyCommandValidator());
    }
}

