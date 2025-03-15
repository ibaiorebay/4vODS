package com.dam.aplicacionandroid.services;

import com.dam.aplicacionandroid.models.Iniciatives;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;

public interface IniciativasApi {
    @GET("api/iniciativas")
    Call<List<Iniciatives>> getIniciativas();
}
