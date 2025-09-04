namespace ELA;

public static class ResultExtensions
{
    public static void ThrowIfFailed(this Result result, string propertyName = "Operation")
    {
        if (!result.Succeeded)
        {
            throw new ValidationException(
                result.Errors.Select(e =>
                    new FluentValidation.Results.ValidationFailure(propertyName, e))
            );
        }
    }
}
