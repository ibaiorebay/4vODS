using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace API.Models;

public partial class _4vodsContext : DbContext
{
    public _4vodsContext()
    {
    }

    public _4vodsContext(DbContextOptions<_4vodsContext> options)
        : base(options)
    {
    }

    public virtual DbSet<asignatura> asignaturas { get; set; }

    public virtual DbSet<curso> cursos { get; set; }

    public virtual DbSet<entidad> entidads { get; set; }

    public virtual DbSet<iniciativa> iniciativas { get; set; }

    public virtual DbSet<meta> metas { get; set; }

    public virtual DbSet<od> ods { get; set; }

    public virtual DbSet<profesore> profesores { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=127.0.0.1;port=3306;database=_4vods;user=root", Microsoft.EntityFrameworkCore.ServerVersion.Parse("10.4.32-mariadb"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_general_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<asignatura>(entity =>
        {
            entity.HasKey(e => e.ID_ASIGNATURA).HasName("PRIMARY");

            entity.ToTable("asignatura");

            entity.HasIndex(e => e.ID_CURSO, "ID_CURSO");

            entity.Property(e => e.ID_ASIGNATURA)
                .ValueGeneratedNever()
                .HasColumnType("int(11)");
            entity.Property(e => e.ID_CURSO).HasColumnType("int(11)");
            entity.Property(e => e.NOMBRE).HasMaxLength(255);

            entity.HasOne(d => d.ID_CURSONavigation).WithMany(p => p.asignaturas)
                .HasForeignKey(d => d.ID_CURSO)
                .HasConstraintName("asignatura_ibfk_1");

            entity.HasMany(d => d.ID_INICIATIVAs).WithMany(p => p.ID_ASIGNATURAs)
                .UsingEntity<Dictionary<string, object>>(
                    "asignaturas_iniciativa",
                    r => r.HasOne<iniciativa>().WithMany()
                        .HasForeignKey("ID_INICIATIVA")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("asignaturas_iniciativa_ibfk_2"),
                    l => l.HasOne<asignatura>().WithMany()
                        .HasForeignKey("ID_ASIGNATURA")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("asignaturas_iniciativa_ibfk_1"),
                    j =>
                    {
                        j.HasKey("ID_ASIGNATURA", "ID_INICIATIVA")
                            .HasName("PRIMARY")
                            .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                        j.ToTable("asignaturas_iniciativa");
                        j.HasIndex(new[] { "ID_INICIATIVA" }, "ID_INICIATIVA");
                        j.IndexerProperty<int>("ID_ASIGNATURA").HasColumnType("int(11)");
                        j.IndexerProperty<int>("ID_INICIATIVA").HasColumnType("int(11)");
                    });
        });

        modelBuilder.Entity<curso>(entity =>
        {
            entity.HasKey(e => e.ID_CURSO).HasName("PRIMARY");

            entity.ToTable("curso");

            entity.Property(e => e.ID_CURSO)
                .ValueGeneratedNever()
                .HasColumnType("int(11)");
            entity.Property(e => e.NOMBRE).HasMaxLength(255);
        });

        modelBuilder.Entity<entidad>(entity =>
        {
            entity.HasKey(e => e.ID_ENTIDAD).HasName("PRIMARY");

            entity.ToTable("entidad");

            entity.Property(e => e.ID_ENTIDAD)
                .ValueGeneratedNever()
                .HasColumnType("int(11)");
            entity.Property(e => e.DESCRIPCION).HasColumnType("text");
            entity.Property(e => e.NOMBRE).HasMaxLength(255);

            entity.HasMany(d => d.ID_INICIATIVAs).WithMany(p => p.ID_ENTIDADs)
                .UsingEntity<Dictionary<string, object>>(
                    "entidad_iniciativa",
                    r => r.HasOne<iniciativa>().WithMany()
                        .HasForeignKey("ID_INICIATIVA")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("entidad_iniciativa_ibfk_2"),
                    l => l.HasOne<entidad>().WithMany()
                        .HasForeignKey("ID_ENTIDAD")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("entidad_iniciativa_ibfk_1"),
                    j =>
                    {
                        j.HasKey("ID_ENTIDAD", "ID_INICIATIVA")
                            .HasName("PRIMARY")
                            .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                        j.ToTable("entidad_iniciativa");
                        j.HasIndex(new[] { "ID_INICIATIVA" }, "ID_INICIATIVA");
                        j.IndexerProperty<int>("ID_ENTIDAD").HasColumnType("int(11)");
                        j.IndexerProperty<int>("ID_INICIATIVA").HasColumnType("int(11)");
                    });
        });

        modelBuilder.Entity<iniciativa>(entity =>
        {
            entity.HasKey(e => e.ID_INICIATIVA).HasName("PRIMARY");

            entity.Property(e => e.ID_INICIATIVA)
                 .HasColumnType("int(11)")
                 .ValueGeneratedOnAdd();
            entity.Property(e => e.DESCRIPCION).HasColumnType("text");
            entity.Property(e => e.DIFUSION).HasColumnType("text");
            entity.Property(e => e.HORAS).HasColumnType("int(11)");
            entity.Property(e => e.PRODUCTO_FINAL).HasColumnType("text");
            entity.Property(e => e.TIPO).HasMaxLength(50);
            entity.Property(e => e.TITULO).HasMaxLength(255);

            entity.HasMany(d => d.ID_METAs).WithMany(p => p.ID_INICIATIVAs)
                .UsingEntity<Dictionary<string, object>>(
                    "metas_iniciativa",
                    r => r.HasOne<meta>().WithMany()
                        .HasForeignKey("ID_META")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("metas_iniciativa_ibfk_2"),
                    l => l.HasOne<iniciativa>().WithMany()
                        .HasForeignKey("ID_INICIATIVA")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("metas_iniciativa_ibfk_1"),
                    j =>
                    {
                        j.HasKey("ID_INICIATIVA", "ID_META")
                            .HasName("PRIMARY")
                            .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                        j.ToTable("metas_iniciativa");
                        j.HasIndex(new[] { "ID_META" }, "ID_META");
                        j.IndexerProperty<int>("ID_INICIATIVA").HasColumnType("int(11)");
                        j.IndexerProperty<int>("ID_META").HasColumnType("int(11)");
                    });
        });

        modelBuilder.Entity<meta>(entity =>
        {
            entity.HasKey(e => e.ID_META).HasName("PRIMARY");

            entity.HasIndex(e => e.ID_ODS, "ID_ODS");

            entity.Property(e => e.ID_META)
                .ValueGeneratedNever()
                .HasColumnType("int(11)");
            entity.Property(e => e.DESCRIPCION).HasColumnType("text");
            entity.Property(e => e.ID_ODS).HasColumnType("int(11)");

            entity.HasOne(d => d.ID_ODSNavigation).WithMany(p => p.meta)
                .HasForeignKey(d => d.ID_ODS)
                .HasConstraintName("metas_ibfk_1");
        });

        modelBuilder.Entity<od>(entity =>
        {
            entity.HasKey(e => e.ID_ODS).HasName("PRIMARY");

            entity.Property(e => e.ID_ODS)
                .ValueGeneratedNever()
                .HasColumnType("int(11)");
            entity.Property(e => e.DESCRIPCION).HasColumnType("text");
            entity.Property(e => e.DIMENSION).HasMaxLength(50);
            entity.Property(e => e.NOMBRE).HasMaxLength(255);
        });

        modelBuilder.Entity<profesore>(entity =>
        {
            entity.HasKey(e => e.ID_PROFESOR).HasName("PRIMARY");

            entity.Property(e => e.ID_PROFESOR)
                .ValueGeneratedNever()
                .HasColumnType("int(11)");
            entity.Property(e => e.APELLIDO1).HasMaxLength(255);
            entity.Property(e => e.APELLIDO2).HasMaxLength(255);
            entity.Property(e => e.NOMBRE).HasMaxLength(255);

            entity.HasMany(d => d.ID_INICIATIVAs).WithMany(p => p.ID_PROFESORs)
                .UsingEntity<Dictionary<string, object>>(
                    "profesores_iniciativa",
                    r => r.HasOne<iniciativa>().WithMany()
                        .HasForeignKey("ID_INICIATIVA")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("profesores_iniciativa_ibfk_2"),
                    l => l.HasOne<profesore>().WithMany()
                        .HasForeignKey("ID_PROFESOR")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("profesores_iniciativa_ibfk_1"),
                    j =>
                    {
                        j.HasKey("ID_PROFESOR", "ID_INICIATIVA")
                            .HasName("PRIMARY")
                            .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                        j.ToTable("profesores_iniciativa");
                        j.HasIndex(new[] { "ID_INICIATIVA" }, "ID_INICIATIVA");
                        j.IndexerProperty<int>("ID_PROFESOR").HasColumnType("int(11)");
                        j.IndexerProperty<int>("ID_INICIATIVA").HasColumnType("int(11)");
                    });
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
