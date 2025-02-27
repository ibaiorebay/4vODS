package com.dam.aplicacionandroid.models;

import java.io.Serializable;

import io.realm.RealmObject;

public class Contratantes extends RealmObject implements Serializable {
    private int codigo;
    private String nombre;
    private String descripcion;

    public Contratantes() {
    }

    public Contratantes(int codContratantes, String nomContratante, String descripcion) {
        this.codigo = codContratantes;
        this.nombre = nomContratante;
        this.descripcion = descripcion;
    }

    public int getCodigo() {
        return codigo;
    }

    public void setCodigo(int codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
