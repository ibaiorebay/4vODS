package com.dam.aplicacionandroid.activities;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.dam.aplicacionandroid.R;
import com.dam.aplicacionandroid.models.Iniciatives;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class InitiativeDetailsActivity extends AppCompatActivity {

    private TextView tvTitle, tvHours, tvStartDate, tvEndDate, tvDescription, tvType, tvProductFinal, tvNueva, tvDifusion;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_initiative_details);

        // Vincular los TextViews definidos en el layout
        tvTitle = findViewById(R.id.tvTitle);
        tvHours = findViewById(R.id.tvHours);
        tvStartDate = findViewById(R.id.tvStartDate);
        tvEndDate = findViewById(R.id.tvEndDate);
        tvDescription = findViewById(R.id.tvDescription);
        tvType = findViewById(R.id.tvType);
        tvProductFinal = findViewById(R.id.tvProductFinal);
        tvNueva = findViewById(R.id.tvNueva);
        tvDifusion = findViewById(R.id.tvDifusion);

        // Recuperar datos del Bundle recibido
        Bundle bundle = getIntent().getExtras();
        if(bundle != null) {
            int idIniciativa = bundle.getInt("Codigo");
            String titulo = bundle.getString("Titulo");
            int horas = bundle.getInt("Horas");
            String fechaInicioStr = bundle.getString("FechaInicio");
            String fechaFinStr = bundle.getString("FechaFinal");
            String descripcion = bundle.getString("Descripcion");
            String tipo = bundle.getString("Tipo");
            String productoFinal = bundle.getString("ProductoFinal");
            boolean nueva = bundle.getBoolean("Nueva");
            String difusion = bundle.getString("Difusion");

            String fechaInicio = fechaInicioStr;
            String fechaFin = fechaFinStr;

            // Crear instancia de Initiative (nueva entidad)
            Iniciatives initiative = new Iniciatives(idIniciativa, titulo, horas, fechaInicio, fechaFin, descripcion, tipo, productoFinal, nueva, difusion);

            // Asignar los datos a los TextViews
            tvTitle.setText(initiative.getTitulo());
            tvHours.setText("Horas: " + initiative.getHoras());
            tvStartDate.setText("Fecha de inicio: " + initiative.getFechaInicio());
            tvEndDate.setText("Fecha de fin: " + initiative.getFechaFin());
            tvDescription.setText("Descripción: " + initiative.getDescripcion());
            tvType.setText("Tipo: " + initiative.getTipo());
            tvProductFinal.setText("Producto Final: " + initiative.getProductoFinal());
            tvNueva.setText("Nueva: " + (initiative.isNueva() ? "Sí" : "No"));
            tvDifusion.setText("Difusión: " + initiative.getDifusion());
        }
        Button btn = (Button) findViewById(R.id.back);
        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(InitiativeDetailsActivity.this, MainActivity.class);
                startActivity(intent);
            }
        });
    }
}
