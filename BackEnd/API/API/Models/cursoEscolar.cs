namespace API.Models
{
    public class cursoEscolar
    {
        public int? ID_CURSOESCOLAR { get; set; }

        public string? DESCRIPCION { get; set; }
        public virtual ICollection<iniciativa> iniciativas { get; set; } = new List<iniciativa>();

    }
}
