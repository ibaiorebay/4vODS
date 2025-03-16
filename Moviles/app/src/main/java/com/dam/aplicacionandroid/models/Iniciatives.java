package com.dam.aplicacionandroid.models;


import com.google.gson.annotations.SerializedName;

public class Iniciatives{

    private int idIniciativa;

    private String titulo;

    private int horas;
    @SerializedName("fechA_INICIO")
    private String fechaInicio;
    @SerializedName("fechA_FIN")
    private String fechaFin;

    private String descripcion;

    private String tipo;
    @SerializedName("productO_FINAL")
    private String productoFinal;

    private boolean nueva;

    private String difusion;

    // Constructor vacío
    public Iniciatives() {}

    // Constructor con todos los campos
    public Iniciatives(int idIniciativa, String titulo, int horas, String fechaInicio, String fechaFin,
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

    public String getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(String fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public String getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(String fechaFin) {
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
