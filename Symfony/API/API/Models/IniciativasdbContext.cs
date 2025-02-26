using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace API.Models;

public partial class IniciativasdbContext : DbContext
{
    public IniciativasdbContext()
    {
    }

    public IniciativasdbContext(DbContextOptions<IniciativasdbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Asignatura> Asignaturas { get; set; }

    public virtual DbSet<Contratante> Contratantes { get; set; }

    public virtual DbSet<Curso> Cursos { get; set; }

    public virtual DbSet<Iniciativa> Iniciativas { get; set; }

    public virtual DbSet<Meta> Metas { get; set; }

    public virtual DbSet<Od> Ods { get; set; }

    public virtual DbSet<Profesore> Profesores { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=127.0.0.1;port=3306;database=iniciativasdb;user=root", Microsoft.EntityFrameworkCore.ServerVersion.Parse("10.4.32-mariadb"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_general_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Asignatura>(entity =>
        {
            entity.HasKey(e => e.CodAsignatura).HasName("PRIMARY");

            entity.ToTable("asignatura");

            entity.HasIndex(e => e.NombreCurso, "NOMBRE_CURSO");

            entity.Property(e => e.CodAsignatura)
                .HasColumnType("int(11)")
                .HasColumnName("COD_ASIGNATURA");
            entity.Property(e => e.NombreAsignatura)
                .HasMaxLength(255)
                .HasColumnName("NOMBRE_ASIGNATURA");
            entity.Property(e => e.NombreCurso).HasColumnName("NOMBRE_CURSO");

            entity.HasOne(d => d.NombreCursoNavigation).WithMany(p => p.Asignaturas)
                .HasForeignKey(d => d.NombreCurso)
                .HasConstraintName("asignatura_ibfk_1");

            entity.HasMany(d => d.CodIniciativas).WithMany(p => p.CodAsignaturas)
                .UsingEntity<Dictionary<string, object>>(
                    "AsignaturasIniciativa",
                    r => r.HasOne<Iniciativa>().WithMany()
                        .HasForeignKey("CodIniciativa")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("asignaturas_iniciativa_ibfk_2"),
                    l => l.HasOne<Asignatura>().WithMany()
                        .HasForeignKey("CodAsignatura")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("asignaturas_iniciativa_ibfk_1"),
                    j =>
                    {
                        j.HasKey("CodAsignatura", "CodIniciativa")
                            .HasName("PRIMARY")
                            .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                        j.ToTable("asignaturas_iniciativa");
                        j.HasIndex(new[] { "CodIniciativa" }, "COD_INICIATIVA");
                        j.IndexerProperty<int>("CodAsignatura")
                            .HasColumnType("int(11)")
                            .HasColumnName("COD_ASIGNATURA");
                        j.IndexerProperty<int>("CodIniciativa")
                            .HasColumnType("int(11)")
                            .HasColumnName("COD_INICIATIVA");
                    });
        });

        modelBuilder.Entity<Contratante>(entity =>
        {
            entity.HasKey(e => e.CodContratante).HasName("PRIMARY");

            entity.ToTable("contratante");

            entity.Property(e => e.CodContratante)
                .HasColumnType("int(11)")
                .HasColumnName("COD_CONTRATANTE");
            entity.Property(e => e.Descripcion)
                .HasColumnType("text")
                .HasColumnName("DESCRIPCION");
            entity.Property(e => e.NombreContratante)
                .HasMaxLength(255)
                .HasColumnName("NOMBRE_CONTRATANTE");

            entity.HasMany(d => d.CodIniciativas).WithMany(p => p.CodContratantes)
                .UsingEntity<Dictionary<string, object>>(
                    "ContratanteIniciativa",
                    r => r.HasOne<Iniciativa>().WithMany()
                        .HasForeignKey("CodIniciativa")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("contratante_iniciativa_ibfk_2"),
                    l => l.HasOne<Contratante>().WithMany()
                        .HasForeignKey("CodContratante")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("contratante_iniciativa_ibfk_1"),
                    j =>
                    {
                        j.HasKey("CodContratante", "CodIniciativa")
                            .HasName("PRIMARY")
                            .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                        j.ToTable("contratante_iniciativa");
                        j.HasIndex(new[] { "CodIniciativa" }, "COD_INICIATIVA");
                        j.IndexerProperty<int>("CodContratante")
                            .HasColumnType("int(11)")
                            .HasColumnName("COD_CONTRATANTE");
                        j.IndexerProperty<int>("CodIniciativa")
                            .HasColumnType("int(11)")
                            .HasColumnName("COD_INICIATIVA");
                    });
        });

        modelBuilder.Entity<Curso>(entity =>
        {
            entity.HasKey(e => e.NombreCurso).HasName("PRIMARY");

            entity.ToTable("curso");

            entity.Property(e => e.NombreCurso).HasColumnName("NOMBRE_CURSO");
        });

        modelBuilder.Entity<Iniciativa>(entity =>
        {
            entity.HasKey(e => e.CodIniciativa).HasName("PRIMARY");

            entity.ToTable("iniciativas");

            entity.Property(e => e.CodIniciativa)
                .HasColumnType("int(11)")
                .HasColumnName("COD_INICIATIVA");
            entity.Property(e => e.FechaFin).HasColumnName("FECHA_FIN");
            entity.Property(e => e.FechaInicio).HasColumnName("FECHA_INICIO");
            entity.Property(e => e.Horas)
                .HasColumnType("int(11)")
                .HasColumnName("HORAS");
            entity.Property(e => e.Titulo)
                .HasMaxLength(255)
                .HasColumnName("TITULO");
        });

        modelBuilder.Entity<Meta>(entity =>
        {
            entity.HasKey(e => new { e.NumeroOds, e.CaracterMeta })
                .HasName("PRIMARY")
                .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

            entity.ToTable("metas");

            entity.Property(e => e.NumeroOds)
                .HasColumnType("int(11)")
                .HasColumnName("NUMERO_ODS");
            entity.Property(e => e.CaracterMeta).HasColumnName("CARACTER_META");
            entity.Property(e => e.Descripcion)
                .HasColumnType("text")
                .HasColumnName("DESCRIPCION");

            entity.HasOne(d => d.NumeroOdsNavigation).WithMany(p => p.Meta)
                .HasForeignKey(d => d.NumeroOds)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("metas_ibfk_1");

            entity.HasMany(d => d.CodIniciativas).WithMany(p => p.Meta)
                .UsingEntity<Dictionary<string, object>>(
                    "MetasIniciativa",
                    r => r.HasOne<Iniciativa>().WithMany()
                        .HasForeignKey("CodIniciativa")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("metas_iniciativa_ibfk_2"),
                    l => l.HasOne<Meta>().WithMany()
                        .HasForeignKey("NumeroOds", "CaracterMeta")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("metas_iniciativa_ibfk_1"),
                    j =>
                    {
                        j.HasKey("NumeroOds", "CaracterMeta", "CodIniciativa")
                            .HasName("PRIMARY")
                            .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0, 0 });
                        j.ToTable("metas_iniciativa");
                        j.HasIndex(new[] { "CodIniciativa" }, "COD_INICIATIVA");
                        j.IndexerProperty<int>("NumeroOds")
                            .HasColumnType("int(11)")
                            .HasColumnName("NUMERO_ODS");
                        j.IndexerProperty<string>("CaracterMeta").HasColumnName("CARACTER_META");
                        j.IndexerProperty<int>("CodIniciativa")
                            .HasColumnType("int(11)")
                            .HasColumnName("COD_INICIATIVA");
                    });
        });

        modelBuilder.Entity<Od>(entity =>
        {
            entity.HasKey(e => e.NumeroOds).HasName("PRIMARY");

            entity.ToTable("ods");

            entity.Property(e => e.NumeroOds)
                .ValueGeneratedNever()
                .HasColumnType("int(11)")
                .HasColumnName("NUMERO_ODS");
            entity.Property(e => e.Descripcion)
                .HasColumnType("text")
                .HasColumnName("DESCRIPCION");
            entity.Property(e => e.Nombre)
                .HasMaxLength(255)
                .HasColumnName("NOMBRE");
        });

        modelBuilder.Entity<Profesore>(entity =>
        {
            entity.HasKey(e => e.IdProfesor).HasName("PRIMARY");

            entity.ToTable("profesores");

            entity.Property(e => e.IdProfesor)
                .HasColumnType("int(11)")
                .HasColumnName("ID_PROFESOR");
            entity.Property(e => e.Apellido1)
                .HasMaxLength(255)
                .HasColumnName("APELLIDO1");
            entity.Property(e => e.Apellido2)
                .HasMaxLength(255)
                .HasColumnName("APELLIDO2");
            entity.Property(e => e.FechaNacimiento).HasColumnName("FECHA_NACIMIENTO");
            entity.Property(e => e.NombreProfesor)
                .HasMaxLength(255)
                .HasColumnName("NOMBRE_PROFESOR");

            entity.HasMany(d => d.CodIniciativas).WithMany(p => p.IdProfesors)
                .UsingEntity<Dictionary<string, object>>(
                    "ProfesoresIniciativa",
                    r => r.HasOne<Iniciativa>().WithMany()
                        .HasForeignKey("CodIniciativa")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("profesores_iniciativa_ibfk_2"),
                    l => l.HasOne<Profesore>().WithMany()
                        .HasForeignKey("IdProfesor")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("profesores_iniciativa_ibfk_1"),
                    j =>
                    {
                        j.HasKey("IdProfesor", "CodIniciativa")
                            .HasName("PRIMARY")
                            .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                        j.ToTable("profesores_iniciativa");
                        j.HasIndex(new[] { "CodIniciativa" }, "COD_INICIATIVA");
                        j.IndexerProperty<int>("IdProfesor")
                            .HasColumnType("int(11)")
                            .HasColumnName("ID_PROFESOR");
                        j.IndexerProperty<int>("CodIniciativa")
                            .HasColumnType("int(11)")
                            .HasColumnName("COD_INICIATIVA");
                    });
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
