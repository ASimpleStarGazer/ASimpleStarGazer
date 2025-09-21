namespace ASimpleStarGazer.Model.Entity.User;

public class User : BaseEntity
{
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
}