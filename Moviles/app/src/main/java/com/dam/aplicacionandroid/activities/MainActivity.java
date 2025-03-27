package com.dam.aplicacionandroid.activities;

import android.content.Intent;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.dam.aplicacionandroid.R;
import com.dam.aplicacionandroid.adapters.IniciativeAdapter;
import com.dam.aplicacionandroid.models.Iniciatives;
import com.dam.aplicacionandroid.services.RetrofitClient;
import com.dam.aplicacionandroid.services.IniciativasApi;
import com.google.android.material.navigation.NavigationView;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity extends AppCompatActivity implements NavigationView.OnNavigationItemSelectedListener {

    private DrawerLayout drawerLayout;
    private NavigationView navigationView;
    private ActionBarDrawerToggle toggle;
    private RecyclerView recycler;
    private EditText searchEditText;
    private List<Iniciatives> initiativesList;
    private IniciativeAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Inicializar DrawerLayout y NavigationView
        drawerLayout = findViewById(R.id.drawer_layout);
        navigationView = findViewById(R.id.navigation_view);

        // Configurar el botón de hamburguesa
        toggle = new ActionBarDrawerToggle(this, drawerLayout, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawerLayout.addDrawerListener(toggle);
        toggle.syncState();

        // Habilitar el botón en la ActionBar
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        // Configurar el listener del menú
        navigationView.setNavigationItemSelectedListener(this);

        recycler = findViewById(R.id.recyclerView);
        searchEditText = findViewById(R.id.searchEditText);
        recycler.setLayoutManager(new LinearLayoutManager(this));

        // Cargar datos desde la API
        fetchInitiatives();

        searchEditText.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {}

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                filter(s.toString());
            }

            @Override
            public void afterTextChanged(Editable s) {}
        });
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        if (toggle.onOptionsItemSelected(item)) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    @Override
    public void onBackPressed() {
        if (drawerLayout.isDrawerOpen(GravityCompat.START)) {
            drawerLayout.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
        // Manejar los clics en los elementos del menú
        int id = item.getItemId();
        if (id == R.id.item1) {
            Toast.makeText(this, "Entidades Externas de una iniciativa", Toast.LENGTH_SHORT).show();
        } else {
            Toast.makeText(this, "En progreso", Toast.LENGTH_SHORT).show();
        }
        drawerLayout.closeDrawer(GravityCompat.START);
        return true;
    }

    private void fetchInitiatives() {
        IniciativasApi apiService = RetrofitClient.getApi();
        Call<List<Iniciatives>> call = apiService.getIniciativas();

        call.enqueue(new Callback<List<Iniciatives>>() {
            @Override
            public void onResponse(Call<List<Iniciatives>> call, Response<List<Iniciatives>> response) {
                if (response.isSuccessful()) {
                    initiativesList = response.body();
                    adapter = new IniciativeAdapter(initiativesList, (idIniciativa, titulo, horas, fechaInicio, fechaFin, descripcion, tipo, productoFinal, nueva, difusion) -> {
                        Intent intent = new Intent(MainActivity.this, InitiativeDetailsActivity.class);
                        intent.putExtra("Codigo", idIniciativa);
                        intent.putExtra("Titulo", titulo);
                        intent.putExtra("Horas", horas);
                        intent.putExtra("FechaInicio", fechaInicio);
                        intent.putExtra("FechaFinal", fechaFin);
                        intent.putExtra("Descripcion", descripcion);
                        intent.putExtra("Tipo", tipo);
                        intent.putExtra("ProductoFinal", productoFinal);
                        intent.putExtra("Nueva", nueva);
                        intent.putExtra("Difusion", difusion);
                        startActivity(intent);
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
