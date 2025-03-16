package com.dam.aplicacionandroid.activities;

import android.content.Intent;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.dam.aplicacionandroid.R;
import com.dam.aplicacionandroid.adapters.IniciativeAdapter;
import com.dam.aplicacionandroid.models.Iniciatives;
import com.dam.aplicacionandroid.services.RetrofitClient;
import com.dam.aplicacionandroid.services.IniciativasApi;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity extends AppCompatActivity {

    private List<Iniciatives> initiativesList;
    private IniciativeAdapter adapter;
    private RecyclerView recycler;
    private EditText searchEditText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        recycler = findViewById(R.id.recyclerView);
        searchEditText = findViewById(R.id.searchEditText);

        recycler.setLayoutManager(new LinearLayoutManager(this));

        // Llamar a la API para obtener las iniciativas
        fetchInitiatives();

        searchEditText.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {
                // No se requiere acción antes del cambio
            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                filter(s.toString());
            }

            @Override
            public void afterTextChanged(Editable s) {
                // No se requiere acción después del cambio
            }
        });
    }

    private void fetchInitiatives() {
        IniciativasApi apiService = RetrofitClient.getApi();
        Call<List<Iniciatives>> call = apiService.getIniciativas();

        call.enqueue(new Callback<List<Iniciatives>>() {
            @Override
            public void onResponse(Call<List<Iniciatives>> call, Response<List<Iniciatives>> response) {
                if (response.isSuccessful()) {
                    initiativesList = response.body();
                    adapter = new IniciativeAdapter(initiativesList, new IniciativeAdapter.OnItemClickListener() {
                        @Override
                        public void onItemClick(int idIniciativa, String titulo, int horas, java.util.Date fechaInicio, java.util.Date fechaFin,
                                                String descripcion, String tipo, String productoFinal, boolean nueva, String difusion) {
                            Intent intent = new Intent(MainActivity.this, InitiativeDetailsActivity.class);
                            intent.putExtra("Codigo", idIniciativa);
                            intent.putExtra("Titulo", titulo);
                            intent.putExtra("Horas", horas);

                            // Convertir las fechas a String con el formato 'yyyy-MM-dd'
                            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault());
                            intent.putExtra("FechaInicio", fechaInicio != null ? sdf.format(fechaInicio) : "");
                            intent.putExtra("FechaFinal", fechaFin != null ? sdf.format(fechaFin) : "");

                            intent.putExtra("Descripcion", descripcion);
                            intent.putExtra("Tipo", tipo);
                            intent.putExtra("ProductoFinal", productoFinal);
                            intent.putExtra("Nueva", nueva);
                            intent.putExtra("Difusion", difusion);

                            startActivity(intent);
                        }
                    });
                    recycler.setAdapter(adapter);
                } else {
                    Toast.makeText(MainActivity.this, "Error en la respuesta de la API", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<List<Iniciatives>> call, Throwable t) {
                Toast.makeText(MainActivity.this, "Error al realizar la solicitud: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void filter(String text) {
        List<Iniciatives> filteredList = new ArrayList<>();

        String trimmedText = text.trim();

        for (Iniciatives initiative : initiativesList) {
            if (initiative.getTitulo().toLowerCase().contains(trimmedText.toLowerCase())) {
                filteredList.add(initiative);
            }
        }

        if (filteredList.isEmpty()) {
            Toast.makeText(this, "No se encontraron iniciativas", Toast.LENGTH_SHORT).show();
        }

        adapter.updateData(filteredList);
    }
}
