package com.dam.aplicacionandroid.adapters;

import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.dam.aplicacionandroid.R;
import com.dam.aplicacionandroid.activities.InitiativeDetailsActivity;
import com.dam.aplicacionandroid.models.Iniciatives;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class IniciativeAdapter extends RecyclerView.Adapter<IniciativeAdapter.ViewHolder> {

    private List<Iniciatives> iniciativas;
    private final SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm", Locale.getDefault());

    public IniciativeAdapter(List<Iniciatives> iniciativas) {
        this.iniciativas = iniciativas;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.lista_iniciativas, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Iniciatives iniciativa = iniciativas.get(position);

        holder.textViewTitulo.setText(iniciativa.getTitulo());
        holder.textViewHoras.setText(iniciativa.getHoras() + " h");

        // Formatear fechas antes de mostrarlas
        holder.textViewFechaInicio.setText(formatDate(iniciativa.getFechaInicio()));
        holder.textViewFechaFinal.setText(formatDate(iniciativa.getFechaFinal()));

        // Manejar clics en los elementos del RecyclerView
        holder.itemView.setOnClickListener(v -> {
            Intent intent = new Intent(v.getContext(), InitiativeDetailsActivity.class);
            intent.putExtra("INICIATIVE", iniciativa); // Pasar la iniciativa seleccionada
            v.getContext().startActivity(intent);
        });
    }

    @Override
    public int getItemCount() {
        return iniciativas.size();
    }

    public void updateData(List<Iniciatives> newIniciativas) {
        this.iniciativas = newIniciativas;
        notifyDataSetChanged();
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView textViewTitulo, textViewHoras, textViewFechaInicio, textViewFechaFinal;

        ViewHolder(View itemView) {
            super(itemView);
            textViewTitulo = itemView.findViewById(R.id.textViewTitulo);
            textViewHoras = itemView.findViewById(R.id.textViewHoras);
            textViewFechaInicio = itemView.findViewById(R.id.textViewFechaInicio);
            textViewFechaFinal = itemView.findViewById(R.id.textViewFechaFinal);
        }
    }

    private String formatDate(Date date) {
        return (date != null) ? dateFormat.format(date) : "Fecha no disponible";
    }
}