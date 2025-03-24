package com.dam.aplicacionandroid.models;

import java.io.Serializable;

import io.realm.RealmObject;

public class Metas{
    private int numOds;
    private String letra;
    private String descripcion;

    public Metas() {
    }

    public Metas(int numOds, String letra, String descripcion) {
        this.numOds = numOds;
        this.letra = letra;
        this.descripcion = descripcion;
    }

    public int getNumOds() {
        return numOds;
    }

    public void setNumOds(int numOds) {
        this.numOds = numOds;
    }

    public String getLetra() {
        return letra;
    }

    public void setLetra(String letra) {
        this.letra = letra;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
