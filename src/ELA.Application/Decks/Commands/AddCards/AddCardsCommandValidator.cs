using ELA.Decks.Dtos;

namespace ELA;

public class AddCardsCommandValidator : AbstractValidator<AddCardsCommand>
{
    public AddCardsCommandValidator()
    {
        RuleFor(c => c.DeckId)
            .NotEmpty().WithMessage("Id is required.")
            .GreaterThan(0).WithMessage("Id must be greater than zero.");

        RuleForEach(c => c.Cards).SetValidator(new AddCardDtoValidator());
    }
}

public class AddCardDtoValidator : AbstractValidator<AddCardDto>
{
    public AddCardDtoValidator()
    {
        RuleFor(c => c.Front)
            .NotEmpty().WithMessage("Front card text is required.")
            .MaximumLength(250).WithMessage("Front card text must not exceed 250 characters.");

        RuleFor(c => c.Back)
            .NotEmpty().WithMessage("Back card text is required.")
            .MaximumLength(500).WithMessage("Back card text must not exceed 500 characters.");
    }
}