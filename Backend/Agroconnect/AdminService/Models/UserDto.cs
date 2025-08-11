namespace AdminService.Models.Dto
{
    public class UserResponseDto
    {
        public int Uid { get; set; }
        public string Username { get; set; } = null!;
        public string Fname { get; set; } = null!;
        public string Lname { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Role { get; set; } = null!;

        public sbyte Status { get; set; }

    }
}
