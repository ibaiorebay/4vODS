package com.dam.aplicacionandroid.adapters;

import android.content.Intent;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.dam.aplicacionandroid.R;
import com.dam.aplicacionandroid.activities.InitiativeDetailsActivity;
import com.dam.aplicacionandroid.models.Asignaturas;
import com.dam.aplicacionandroid.models.Contratantes;
import com.dam.aplicacionandroid.models.Iniciatives;
import com.dam.aplicacionandroid.models.Metas;
import com.dam.aplicacionandroid.models.Profesores;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class IniciativeAdapter extends RecyclerView.Adapter<IniciativeAdapter.ViewHolder> {

    private List<Iniciatives> iniciativas;
    private OnItemClickListener itemListener;

    // SimpleDateFormat para analizar las fechas en el formato 'yyyy-MM-dd' de la API
    private final SimpleDateFormat apiDateFormat = new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault());

    // SimpleDateFormat para mostrar las fechas en el formato 'dd-MM-yyyy'
    private final SimpleDateFormat displayDateFormat = new SimpleDateFormat("dd-MM-yyyy", Locale.getDefault());

    public IniciativeAdapter(List<Iniciatives> iniciativas, OnItemClickListener listener) {
        this.iniciativas = iniciativas;
        this.itemListener = listener;
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

        Log.d("IniciativeAdapter", "Iniciativa en posición " + position + ": " + iniciativa.getTitulo());

        holder.textViewTitulo.setText(iniciativa.getTitulo());
        holder.textViewHoras.setText(iniciativa.getHoras() + " h");

        String fechaInicio = iniciativa.getFechaInicio();
        String fechaFinal = iniciativa.getFechaFinal();

        Log.d("IniciativeAdapter", "Fecha Inicio: " + fechaInicio);
        Log.d("IniciativeAdapter", "Fecha Fin: " + fechaFinal);

        if (fechaInicio != null) {
            holder.textViewFechaInicio.setText(fechaInicio);
        } else {
            holder.textViewFechaInicio.setText("Fecha no disponible");
        }

        if (fechaFinal != null) {
            holder.textViewFechaFinal.setText(fechaFinal);
        } else {
            holder.textViewFechaFinal.setText("Fecha no disponible");
        }

        holder.asingData(iniciativas.get(position).getCodIniciativa(), iniciativas.get(position).getTitulo(),
                iniciativas.get(position).getHoras(), iniciativas.get(position).getFechaInicio(),
                iniciativas.get(position).getFechaFinal(), iniciativas.get(position).getAsignaturas(),
                iniciativas.get(position).getContratantes(), iniciativas.get(position).getProfesores(),
                iniciativas.get(position).getMetas(), itemListener);
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

        public void asingData(int codigo, String titulo, int horas, String fechaInicio, String fechaFinal,
                              ArrayList<Asignaturas> asignaturas, ArrayList<Contratantes> contratantes,
                              ArrayList<Profesores> profesores, ArrayList<Metas> metas,
                              OnItemClickListener onItemClickListener) {

            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    onItemClickListener.onItemClick(codigo, titulo, horas, fechaInicio, fechaFinal,
                            asignaturas, contratantes, profesores, metas);
                }
            });
        }
    }

    public interface OnItemClickListener {
        void onItemClick(int codigo, String titulo, int horas, String fechaInicio, String fechaFinal,
                         ArrayList<Asignaturas> asignaturas, ArrayList<Contratantes> contratantes,
                         ArrayList<Profesores> profesores, ArrayList<Metas> metas);
    }
}
