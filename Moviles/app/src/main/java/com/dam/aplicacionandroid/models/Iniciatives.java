package com.dam.aplicacionandroid.models;

import java.io.Serializable;
import java.util.Date;
import java.util.ArrayList;

public class Iniciatives implements Serializable {
    private int codIniciativa;
    private int horas;
    private String titulo;
    private Date fechaInicio;
    private Date fechaFinal;

    private ArrayList<Asignaturas> asignaturas;
    private ArrayList<Contratantes> contratantes;
    private ArrayList<Profesores> profesores;
    private ArrayList<Metas> metas;

    public Iniciatives() {
    }

    public Iniciatives(int codIniciativa, int horas, String titulo, Date fechaInicio, Date fechaFinal, ArrayList<Asignaturas> asignaturas, ArrayList<Contratantes> contratantes, ArrayList<Profesores> profesores, ArrayList<Metas> metas) {
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

    public ArrayList<Asignaturas> getAsignaturas() {
        return asignaturas;
    }

    public void setAsignaturas(ArrayList<Asignaturas> asignaturas) {
        this.asignaturas = asignaturas;
    }

    public ArrayList<Contratantes> getContratantes() {
        return contratantes;
    }

    public void setContratantes(ArrayList<Contratantes> contratantes) {
        this.contratantes = contratantes;
    }

    public ArrayList<Profesores> getProfesores() {
        return profesores;
    }

    public void setProfesores(ArrayList<Profesores> profesores) {
        this.profesores = profesores;
    }

    public ArrayList<Metas> getMetas() {
        return metas;
    }

    public void setMetas(ArrayList<Metas> metas) {
        this.metas = metas;
    }
}