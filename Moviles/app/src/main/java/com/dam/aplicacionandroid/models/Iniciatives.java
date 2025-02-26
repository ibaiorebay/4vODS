package com.dam.aplicacionandroid.models;

import java.util.Date;
import java.util.List;

import io.realm.RealmObject;

public class Iniciatives extends RealmObject {
    private int codIniciativa;
    private int horas;
    private String titulo;
    private Date fechaInicio;
    private Date fechaFinal;

    private List<Asignaturas> asignaturas;
    private List<Contratantes> contratantes;
    private List<Profesores> profesores;
    private List<Metas> metas;

    public Iniciatives() {
    }

    public Iniciatives(int codIniciativa, int horas, String titulo, Date fechaInicio, Date fechaFinal, List<Asignaturas> asignaturas, List<Contratantes> contratantes, List<Profesores> profesores, List<Metas> metas) {
        this.codIniciativa = codIniciativa;
        this.horas = horas;
        this.titulo = titulo;
        this.fechaInicio = fechaInicio;
        this.fechaFinal = fechaFinal;
        this.asignaturas = asignaturas;
        this.contratantes = contratantes;
        this.profesores = profesores;
        this.metas = metas;
    }

    public int getCodIniciativa() {
        return codIniciativa;
    }

    public void setCodIniciativa(int codIniciativa) {
        this.codIniciativa = codIniciativa;
    }

    public int getHoras() {
        return horas;
    }

    public void setHoras(int horas) {
        this.horas = horas;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Date getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(Date fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Date getFechaFinal() {
        return fechaFinal;
    }

    public void setFechaFinal(Date fechaFinal) {
        this.fechaFinal = fechaFinal;
    }

    public List<Asignaturas> getAsignaturas() {
        return asignaturas;
    }

    public void setAsignaturas(List<Asignaturas> asignaturas) {
        this.asignaturas = asignaturas;
    }

    public List<Contratantes> getContratantes() {
        return contratantes;
    }

    public void setContratantes(List<Contratantes> contratantes) {
        this.contratantes = contratantes;
    }

    public List<Profesores> getProfesores() {
        return profesores;
    }

    public void setProfesores(List<Profesores> profesores) {
        this.profesores = profesores;
    }

    public List<Metas> getMetas() {
        return metas;
    }

    public void setMetas(List<Metas> metas) {
        this.metas = metas;
    }
}