using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class deleteCascade : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "difusion_ibfk_1",
                table: "difusion");

            migrationBuilder.AddForeignKey(
                name: "difusion_ibfk_1",
                table: "difusion",
                column: "ID_INICIATIVA",
                principalTable: "iniciativas",
                principalColumn: "ID_INICIATIVA",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "difusion_ibfk_1",
                table: "difusion");

            migrationBuilder.AddForeignKey(
                name: "difusion_ibfk_1",
                table: "difusion",
                column: "ID_INICIATIVA",
                principalTable: "iniciativas",
                principalColumn: "ID_INICIATIVA");
        }
    }
}
