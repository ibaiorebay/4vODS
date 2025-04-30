namespace API.Models
{
    public class difusion
    {
        public int ID_DIFUSION { get; set; }

        public int ID_INICIATIVA { get; set; }

        public string LINK { get; set; }

        public difusion( int iD_INICIATIVA, string? lINK)
        {
            ID_INICIATIVA = iD_INICIATIVA;
            LINK = lINK;
        }
    }
}
