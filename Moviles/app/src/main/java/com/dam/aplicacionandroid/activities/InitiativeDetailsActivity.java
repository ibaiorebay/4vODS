package com.dam.aplicacionandroid.activities;

import android.os.Bundle;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.dam.aplicacionandroid.R;
import com.dam.aplicacionandroid.models.Asignaturas;
import com.dam.aplicacionandroid.models.Contratantes;
import com.dam.aplicacionandroid.models.Iniciatives;
import com.dam.aplicacionandroid.models.Metas;
import com.dam.aplicacionandroid.models.Profesores;

public class InitiativeDetailsActivity extends AppCompatActivity {

    private TextView titleTextView;
    private TextView hoursTextView;
    private TextView startDateTextView;
    private TextView endDateTextView;
    private TextView asignaturasTextView;
    private TextView contratantesTextView;
    private TextView profesoresTextView;
    private TextView metasTextView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_initiative_details);

        titleTextView = findViewById(R.id.titleTextView);
        hoursTextView = findViewById(R.id.hoursTextView);
        startDateTextView = findViewById(R.id.startDateTextView);
        endDateTextView = findViewById(R.id.endDateTextView);
        asignaturasTextView = findViewById(R.id.asignaturasTextView);
        contratantesTextView = findViewById(R.id.contratantesTextView);
        profesoresTextView = findViewById(R.id.profesoresTextView);
        metasTextView = findViewById(R.id.metasTextView);

        Iniciatives initiative = (Iniciatives) getIntent().getSerializableExtra("INICIATIVE");

        if (initiative != null) {
            titleTextView.setText(initiative.getTitulo());
            hoursTextView.setText("Horas: " + initiative.getHoras());
            startDateTextView.setText("Fecha de inicio: " + initiative.getFechaInicio().toString());
            endDateTextView.setText("Fecha de fin: " + initiative.getFechaFinal().toString());

            StringBuilder asignaturas = new StringBuilder("Asignaturas:\n");
            for (Asignaturas asignatura : initiative.getAsignaturas()) {
                asignaturas.append(asignatura.getNombre()).append("\n");
            }
            asignaturasTextView.setText(asignaturas.toString());

            StringBuilder contratantes = new StringBuilder("Contratantes:\n");
            for (Contratantes contratante : initiative.getContratantes()) {
                contratantes.append(contratante.getNombre()).append("\n");
            }
            contratantesTextView.setText(contratantes.toString());

            StringBuilder profesores = new StringBuilder("Profesores:\n");
            for (Profesores profesor : initiative.getProfesores()) {
                profesores.append(profesor.getNombre()).append(" ").append(profesor.getApellido1()).append("\n");
            }
            profesoresTextView.setText(profesores.toString());

            StringBuilder metas = new StringBuilder("Metas:\n");
            for (Metas meta : initiative.getMetas()) {
                metas.append(meta.getDescripcion()).append("\n");
            }
            metasTextView.setText(metas.toString());
        }
    }
}