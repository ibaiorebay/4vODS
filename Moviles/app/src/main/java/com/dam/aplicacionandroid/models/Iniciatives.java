package com.dam.aplicacionandroid.models;

import com.google.gson.annotations.SerializedName;
import java.io.Serializable;
import java.util.Date;

public class Iniciatives implements Serializable {

    @SerializedName("ID_INICIATIVA")
    private int idIniciativa;

    @SerializedName("TITULO")
    private String titulo;

    @SerializedName("HORAS")
    private int horas;

    @SerializedName("FECHA_INICIO")
    private Date fechaInicio;

    @SerializedName("FECHA_FIN")
    private Date fechaFin;

    @SerializedName("DESCRIPCION")
    private String descripcion;

    @SerializedName("TIPO")
    private String tipo;

    @SerializedName("PRODUCTO_FINAL")
    private String productoFinal;

    @SerializedName("NUEVA")
    private boolean nueva;

    @SerializedName("DIFUSION")
    private String difusion;

    // Constructor vacío
    public Iniciatives() {}

    // Constructor con todos los campos
    public Iniciatives(int idIniciativa, String titulo, int horas, Date fechaInicio, Date fechaFin,
                      String descripcion, String tipo, String productoFinal, boolean nueva, String difusion) {
        this.idIniciativa = idIniciativa;
        this.titulo = titulo;
        this.horas = horas;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.descripcion = descripcion;
        this.tipo = tipo;
        this.productoFinal = productoFinal;
        this.nueva = nueva;
        this.difusion = difusion;
    }

    // Getters y Setters
    public int getIdIniciativa() {
        return idIniciativa;
    }

    public void setIdIniciativa(int idIniciativa) {
        this.idIniciativa = idIniciativa;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public int getHoras() {
        return horas;
    }

    public void setHoras(int horas) {
        this.horas = horas;
    }

    public Date getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(Date fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Date getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(Date fechaFin) {
        this.fechaFin = fechaFin;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getProductoFinal() {
        return productoFinal;
    }

    public void setProductoFinal(String productoFinal) {
        this.productoFinal = productoFinal;
    }

    public boolean isNueva() {
        return nueva;
    }

    public void setNueva(boolean nueva) {
        this.nueva = nueva;
    }

    public String getDifusion() {
        return difusion;
    }

    public void setDifusion(String difusion) {
        this.difusion = difusion;
    }
}
