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

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class InitiativeDetailsActivity extends AppCompatActivity {

    private TextView titleTextView;
    private TextView hoursTextView;
    private TextView startDateTextView;
    private TextView endDateTextView;
    private TextView asignaturasTextView;
    private TextView contratantesTextView;
    private TextView profesoresTextView;
    private TextView metasTextView;
    private Bundle bundle;
    int codIniciativa;
    String titulo;
    int horas;
    String fechaInicio;
    String fechaFinal;
    ArrayList<Asignaturas> asignaturas;
    ArrayList<Contratantes> contratantes;
    ArrayList<Profesores> profesores;
    ArrayList<Metas> metas;
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
        bundle = getIntent().getExtras();


        // Recibir la iniciativa pasada desde el RecyclerView
        if (bundle != null){
            codIniciativa = bundle.getInt("Codigo");
            titulo = bundle.getString("Titulo");
            horas = bundle.getInt("Horas");
            fechaInicio = bundle.getString("FechaInicio");
            fechaFinal = bundle.getString("FechaFinal");
            asignaturas = (ArrayList<Asignaturas>) bundle.get("Asignaturas");
            contratantes = (ArrayList<Contratantes>) bundle.get("Contratantes");
            profesores = (ArrayList<Profesores>) bundle.get("Profesores");
            metas = (ArrayList<Metas>) bundle.get("Asignaturas");
        }
        Iniciatives initiative = new Iniciatives( codIniciativa, horas, titulo, fechaInicio, fechaFinal, asignaturas, contratantes, profesores, metas);

        if (initiative != null) {
            // Establecer los datos en los TextViews
            titleTextView.setText(initiative.getTitulo());
            hoursTextView.setText("Horas: " + initiative.getHoras());

            startDateTextView.setText("Fecha de inicio: " + initiative.getFechaInicio());
            endDateTextView.setText("Fecha de fin: " + initiative.getFechaFinal());

            // Asignaturas
            StringBuilder asignaturas = new StringBuilder("Asignaturas:\n");
            if (initiative.getAsignaturas() != null && !initiative.getAsignaturas().isEmpty()) {
                for (Asignaturas asignatura : initiative.getAsignaturas()) {
                    asignaturas.append(asignatura.getNombre()).append("\n");
                }
            } else {
                asignaturas.append("No hay asignaturas disponibles\n");
            }
            asignaturasTextView.setText(asignaturas.toString());

            // Contratantes
            StringBuilder contratantes = new StringBuilder("Contratantes:\n");
            if (initiative.getContratantes() != null && !initiative.getContratantes().isEmpty()) {
                for (Contratantes contratante : initiative.getContratantes()) {
                    contratantes.append(contratante.getNombre()).append("\n");
                }
            } else {
                contratantes.append("No hay contratantes disponibles\n");
            }
            contratantesTextView.setText(contratantes.toString());

            // Profesores
            StringBuilder profesores = new StringBuilder("Profesores:\n");
            if (initiative.getProfesores() != null && !initiative.getProfesores().isEmpty()) {
                for (Profesores profesor : initiative.getProfesores()) {
                    profesores.append(profesor.getNombre()).append(" ").append(profesor.getApellido1()).append("\n");
                }
            } else {
                profesores.append("No hay profesores disponibles\n");
            }
            profesoresTextView.setText(profesores.toString());

            // Metas
            StringBuilder metas = new StringBuilder("Metas:\n");
            if (initiative.getMetas() != null && !initiative.getMetas().isEmpty()) {
                for (Metas meta : initiative.getMetas()) {
                    metas.append(meta.getDescripcion()).append("\n");
                }
            } else {
                metas.append("No hay metas disponibles\n");
            }
            metasTextView.setText(metas.toString());
        }
    }
}
