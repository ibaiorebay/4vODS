package com.dam.aplicacionandroid.models;

import java.util.List;

import io.realm.RealmObject;

public class Iniciatives extends RealmObject {
    private int id;
    private String asignatura;
    private String curso;
    private String ods;
    private String contratante;
    private List<String> profesores;
    private String metas;
    
}
