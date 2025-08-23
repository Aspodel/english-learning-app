namespace ELA;

public sealed record AddExampleDto
(
    string Text,
    string Translation
);

public sealed record ExampleDto
(
    Guid Id,
    string Text,
    string Translation
);
