package com.dam.aplicacionandroid.models;

import io.realm.RealmObject;

public class Asignaturas extends RealmObject {
    private int codigo;
    private String curso;
    private String nombre;

    public Asignaturas() {
    }

    public Asignaturas(int codAsignatura, String nomCurso, String nomAsignautra) {
        this.codigo = codAsignatura;
        this.curso = nomCurso;
        this.nombre = nomAsignautra;
    }

    public int getCodigo() {
        return codigo;
    }

    public void setCodigo(int codigo) {
        this.codigo = codigo;
    }

    public String getCurso() {
        return curso;
    }

    public void setCurso(String curso) {
        this.curso = curso;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
