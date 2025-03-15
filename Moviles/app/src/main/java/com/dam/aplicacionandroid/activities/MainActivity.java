package com.dam.aplicacionandroid.activities;

import android.content.Intent;
import android.os.Bundle;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.dam.aplicacionandroid.R;
import com.dam.aplicacionandroid.adapters.IniciativeAdapter;
import com.dam.aplicacionandroid.models.Asignaturas;
import com.dam.aplicacionandroid.models.Contratantes;
import com.dam.aplicacionandroid.models.Iniciatives;
import com.dam.aplicacionandroid.models.Metas;
import com.dam.aplicacionandroid.models.Profesores;
import com.dam.aplicacionandroid.services.RetrofitClient;
import com.dam.aplicacionandroid.services.IniciativasApi;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
        fetchIniciatives();

        searchEditText.addTextChangedListener(new android.text.TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {}

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                filter(s.toString());
            }

            @Override
            public void afterTextChanged(android.text.Editable s) {}
        });
    }

    private void fetchIniciatives() {
        IniciativasApi apiService = RetrofitClient.getApi();
        Call<List<Iniciatives>> call = apiService.getIniciativas();

        call.enqueue(new Callback<List<Iniciatives>>() {
            @Override
            public void onResponse(Call<List<Iniciatives>> call, Response<List<Iniciatives>> response) {
                if (response.isSuccessful()) {
                    initiativesList = response.body();
                    adapter = new IniciativeAdapter(initiativesList, new IniciativeAdapter.OnItemClickListener() {
                        @Override
                        public void onItemClick(int codigo, String titulo, int horas, String fechaInicio, String fechaFinal, ArrayList<Asignaturas> asignaturas, ArrayList<Contratantes> contratantes, ArrayList<Profesores> profesores, ArrayList<Metas> metas) {
                            Intent intent = new Intent(MainActivity.this, InitiativeDetailsActivity.class);
                            intent.putExtra("Codigo", codigo);
                            intent.putExtra("Titulo", titulo);
                            intent.putExtra("Horas", horas);
                            intent.putExtra("FechaInicio", fechaInicio);
                            intent.putExtra("FechaFinal", fechaFinal);
                            intent.putExtra("Asignaturas", asignaturas);
                            intent.putExtra("Contratantes", contratantes);
                            intent.putExtra("Profesores", profesores);
                            intent.putExtra("Metas", metas);
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

        for (Iniciatives ini : initiativesList) {
            if (ini.getTitulo().toLowerCase().contains(trimmedText.toLowerCase())) {
                filteredList.add(ini);
            }
        }

        if (filteredList.isEmpty()) {
            Toast.makeText(this, "No se encontraron iniciativas", Toast.LENGTH_SHORT).show();
        }

        adapter.updateData(filteredList);
    }
}
