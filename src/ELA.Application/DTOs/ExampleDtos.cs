namespace ELA;

public record AddExampleDto
(
    string Text,
    string Translation
);

public record ExampleDto
(
    Guid Id,
    string Text,
    string Translation
);
