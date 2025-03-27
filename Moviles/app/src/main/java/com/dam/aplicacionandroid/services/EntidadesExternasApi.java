package com.dam.aplicacionandroid.services;

import com.dam.aplicacionandroid.models.Iniciatives;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface EntidadesExternasApi {
    @GET("api/iniciativas/entidadesExternas/{id}")
    Call<Iniciatives> getIniciativaPorId(@Path("id") int id);
}

