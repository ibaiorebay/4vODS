package com.dam.aplicacionandroid.activities;

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
import com.dam.aplicacionandroid.utils.MockIniciatives;

import java.util.ArrayList;
import java.util.List;

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

        // Cargar los datos simulados
        initiativesList = MockIniciatives.getMockIniciatives();

        adapter = new IniciativeAdapter(initiativesList);
        recycler.setAdapter(adapter);
        recycler.setLayoutManager(new LinearLayoutManager(this));

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

    private void filter(String text) {
        List<Iniciatives> filteredList = new ArrayList<>();

        // Eliminar espacios al principio y al final del texto
        String trimmedText = text.trim();

        for (Iniciatives ini : initiativesList) {
            // Comparar el título sin espacios adicionales
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
