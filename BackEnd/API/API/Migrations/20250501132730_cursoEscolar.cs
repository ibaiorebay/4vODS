using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class cursoEscolar : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ID_CURSOESCOLAR",
                table: "iniciativas",
                type: "int(11)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "cursoEscolar",
                columns: table => new
                {
                    ID_CURSOESCOLAR = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    DESCRIPCION = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true, collation: "utf8mb4_general_ci")
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.ID_CURSOESCOLAR);
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateIndex(
                name: "ID_CURSOESCOLAR",
                table: "iniciativas",
                column: "ID_CURSOESCOLAR");

            migrationBuilder.AddForeignKey(
                name: "iniciativa_ibfk_cursoEscolar",
                table: "iniciativas",
                column: "ID_CURSOESCOLAR",
                principalTable: "cursoEscolar",
                principalColumn: "ID_CURSOESCOLAR");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "iniciativa_ibfk_cursoEscolar",
                table: "iniciativas");

            migrationBuilder.DropTable(
                name: "cursoEscolar");

            migrationBuilder.DropIndex(
                name: "ID_CURSOESCOLAR",
                table: "iniciativas");

            migrationBuilder.DropColumn(
                name: "ID_CURSOESCOLAR",
                table: "iniciativas");
        }
    }
}
