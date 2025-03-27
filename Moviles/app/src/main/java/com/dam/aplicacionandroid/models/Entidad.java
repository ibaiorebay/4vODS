package com.dam.aplicacionandroid.models;

import java.util.List;

public class Entidad {
    private int idEntidad;
    private String nombre;
    private String descripcion;
    private List<Iniciatives> iniciatives;

    public Entidad(){

    }

    public Entidad(int idEntidad, String nombre, String descripcion, List<Iniciatives> iniciatives){
        this.idEntidad = idEntidad;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.iniciatives = iniciatives;
    }

    public int getIdEntidad() {
        return idEntidad;
    }

    public void setIdEntidad(int idEntidad) {
        this.idEntidad = idEntidad;
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

    public List<Iniciatives> getIniciatives() {
        return iniciatives;
    }

    public void setIniciatives(List<Iniciatives> iniciatives) {
        this.iniciatives = iniciatives;
    }
}
