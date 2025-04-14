using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "curso",
                columns: table => new
                {
                    ID_CURSO = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    NOMBRE = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true, collation: "utf8mb4_general_ci")
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.ID_CURSO);
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateTable(
                name: "entidad",
                columns: table => new
                {
                    ID_ENTIDAD = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    NOMBRE = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true, collation: "utf8mb4_general_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DESCRIPCION = table.Column<string>(type: "text", nullable: true, collation: "utf8mb4_general_ci")
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.ID_ENTIDAD);
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateTable(
                name: "iniciativas",
                columns: table => new
                {
                    ID_INICIATIVA = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    TITULO = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true, collation: "utf8mb4_general_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    HORAS = table.Column<int>(type: "int(11)", nullable: true),
                    FECHA_INICIO = table.Column<string>(type: "longtext", nullable: true, collation: "utf8mb4_general_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FECHA_FIN = table.Column<string>(type: "longtext", nullable: true, collation: "utf8mb4_general_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DESCRIPCION = table.Column<string>(type: "text", nullable: true, collation: "utf8mb4_general_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TIPO = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true, collation: "utf8mb4_general_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PRODUCTO_FINAL = table.Column<string>(type: "text", nullable: true, collation: "utf8mb4_general_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    NUEVA = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    DIFUSION = table.Column<string>(type: "text", nullable: true, collation: "utf8mb4_general_ci")
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.ID_INICIATIVA);
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateTable(
                name: "ods",
                columns: table => new
                {
                    ID_ODS = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    NOMBRE = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true, collation: "utf8mb4_general_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DESCRIPCION = table.Column<string>(type: "text", nullable: true, collation: "utf8mb4_general_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DIMENSION = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true, collation: "utf8mb4_general_ci")
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.ID_ODS);
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateTable(
                name: "profesores",
                columns: table => new
                {
                    ID_PROFESOR = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    NOMBRE = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true, collation: "utf8mb4_general_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    APELLIDO1 = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true, collation: "utf8mb4_general_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    APELLIDO2 = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true, collation: "utf8mb4_general_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FECHA_NACIMIENTO = table.Column<DateOnly>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.ID_PROFESOR);
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateTable(
                name: "asignatura",
                columns: table => new
                {
                    ID_ASIGNATURA = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ID_CURSO = table.Column<int>(type: "int(11)", nullable: true),
                    NOMBRE = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true, collation: "utf8mb4_general_ci")
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.ID_ASIGNATURA);
                    table.ForeignKey(
                        name: "asignatura_ibfk_1",
                        column: x => x.ID_CURSO,
                        principalTable: "curso",
                        principalColumn: "ID_CURSO");
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateTable(
                name: "entidad_iniciativa",
                columns: table => new
                {
                    ID_ENTIDAD = table.Column<int>(type: "int(11)", nullable: false),
                    ID_INICIATIVA = table.Column<int>(type: "int(11)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => new { x.ID_ENTIDAD, x.ID_INICIATIVA })
                        .Annotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                    table.ForeignKey(
                        name: "entidad_iniciativa_ibfk_1",
                        column: x => x.ID_ENTIDAD,
                        principalTable: "entidad",
                        principalColumn: "ID_ENTIDAD");
                    table.ForeignKey(
                        name: "entidad_iniciativa_ibfk_2",
                        column: x => x.ID_INICIATIVA,
                        principalTable: "iniciativas",
                        principalColumn: "ID_INICIATIVA");
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateTable(
                name: "metas",
                columns: table => new
                {
                    ID_META = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ID_ODS = table.Column<int>(type: "int(11)", nullable: true),
                    DESCRIPCION = table.Column<string>(type: "text", nullable: true, collation: "utf8mb4_general_ci")
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.ID_META);
                    table.ForeignKey(
                        name: "metas_ibfk_1",
                        column: x => x.ID_ODS,
                        principalTable: "ods",
                        principalColumn: "ID_ODS");
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateTable(
                name: "profesores_iniciativa",
                columns: table => new
                {
                    ID_PROFESOR = table.Column<int>(type: "int(11)", nullable: false),
                    ID_INICIATIVA = table.Column<int>(type: "int(11)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => new { x.ID_PROFESOR, x.ID_INICIATIVA })
                        .Annotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                    table.ForeignKey(
                        name: "profesores_iniciativa_ibfk_1",
                        column: x => x.ID_PROFESOR,
                        principalTable: "profesores",
                        principalColumn: "ID_PROFESOR");
                    table.ForeignKey(
                        name: "profesores_iniciativa_ibfk_2",
                        column: x => x.ID_INICIATIVA,
                        principalTable: "iniciativas",
                        principalColumn: "ID_INICIATIVA");
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateTable(
                name: "asignaturas_iniciativa",
                columns: table => new
                {
                    ID_ASIGNATURA = table.Column<int>(type: "int(11)", nullable: false),
                    ID_INICIATIVA = table.Column<int>(type: "int(11)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => new { x.ID_ASIGNATURA, x.ID_INICIATIVA })
                        .Annotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                    table.ForeignKey(
                        name: "asignaturas_iniciativa_ibfk_1",
                        column: x => x.ID_ASIGNATURA,
                        principalTable: "asignatura",
                        principalColumn: "ID_ASIGNATURA");
                    table.ForeignKey(
                        name: "asignaturas_iniciativa_ibfk_2",
                        column: x => x.ID_INICIATIVA,
                        principalTable: "iniciativas",
                        principalColumn: "ID_INICIATIVA");
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateTable(
                name: "metas_iniciativa",
                columns: table => new
                {
                    ID_INICIATIVA = table.Column<int>(type: "int(11)", nullable: false),
                    ID_META = table.Column<int>(type: "int(11)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => new { x.ID_INICIATIVA, x.ID_META })
                        .Annotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                    table.ForeignKey(
                        name: "metas_iniciativa_ibfk_1",
                        column: x => x.ID_INICIATIVA,
                        principalTable: "iniciativas",
                        principalColumn: "ID_INICIATIVA");
                    table.ForeignKey(
                        name: "metas_iniciativa_ibfk_2",
                        column: x => x.ID_META,
                        principalTable: "metas",
                        principalColumn: "ID_META");
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateIndex(
                name: "ID_CURSO",
                table: "asignatura",
                column: "ID_CURSO");

            migrationBuilder.CreateIndex(
                name: "ID_INICIATIVA",
                table: "asignaturas_iniciativa",
                column: "ID_INICIATIVA");

            migrationBuilder.CreateIndex(
                name: "ID_INICIATIVA1",
                table: "entidad_iniciativa",
                column: "ID_INICIATIVA");

            migrationBuilder.CreateIndex(
                name: "ID_ODS",
                table: "metas",
                column: "ID_ODS");

            migrationBuilder.CreateIndex(
                name: "ID_META",
                table: "metas_iniciativa",
                column: "ID_META");

            migrationBuilder.CreateIndex(
                name: "ID_INICIATIVA2",
                table: "profesores_iniciativa",
                column: "ID_INICIATIVA");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "asignaturas_iniciativa");

            migrationBuilder.DropTable(
                name: "entidad_iniciativa");

            migrationBuilder.DropTable(
                name: "metas_iniciativa");

            migrationBuilder.DropTable(
                name: "profesores_iniciativa");

            migrationBuilder.DropTable(
                name: "asignatura");

            migrationBuilder.DropTable(
                name: "entidad");

            migrationBuilder.DropTable(
                name: "metas");

            migrationBuilder.DropTable(
                name: "profesores");

            migrationBuilder.DropTable(
                name: "iniciativas");

            migrationBuilder.DropTable(
                name: "curso");

            migrationBuilder.DropTable(
                name: "ods");
        }
    }
}
