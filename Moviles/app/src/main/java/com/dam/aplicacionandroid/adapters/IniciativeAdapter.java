package com.dam.aplicacionandroid.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.dam.aplicacionandroid.R;
import com.dam.aplicacionandroid.models.Iniciatives;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class IniciativeAdapter extends RecyclerView.Adapter<IniciativeAdapter.ViewHolder> {

    private List<Iniciatives> initiatives;
    private OnItemClickListener itemListener;

    // Formato para mostrar las fechas en 'dd-MM-yyyy'
    private final SimpleDateFormat displayDateFormat = new SimpleDateFormat("dd-MM-yyyy", Locale.getDefault());

    public IniciativeAdapter(List<Iniciatives> initiatives, OnItemClickListener listener) {
        this.initiatives = initiatives;
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
        Iniciatives initiative = initiatives.get(position);

        Log.d("InitiativeAdapter", "Initiative at position " + position + ": " + initiative.getTitulo());

        holder.textViewTitulo.setText(initiative.getTitulo());
        holder.textViewHoras.setText(initiative.getHoras() + " h");

        // Formatear y mostrar las fechas si están disponibles
        Date fechaInicio = initiative.getFechaInicio();
        Date fechaFin = initiative.getFechaFin();

        if (fechaInicio != null) {
            holder.textViewFechaInicio.setText(displayDateFormat.format(fechaInicio));
        } else {
            holder.textViewFechaInicio.setText("Fecha no disponible");
        }

        if (fechaFin != null) {
            holder.textViewFechaFinal.setText(displayDateFormat.format(fechaFin));
        } else {
            holder.textViewFechaFinal.setText("Fecha no disponible");
        }

        // Configurar el listener con los nuevos parámetros de la entidad
        holder.bindData(
                initiative.getIdIniciativa(),
                initiative.getTitulo(),
                initiative.getHoras(),
                fechaInicio,
                fechaFin,
                initiative.getDescripcion(),
                initiative.getTipo(),
                initiative.getProductoFinal(),
                initiative.isNueva(),
                initiative.getDifusion(),
                itemListener
        );
    }

    @Override
    public int getItemCount() {
        return initiatives.size();
    }

    public void updateData(List<Iniciatives> newInitiatives) {
        this.initiatives = newInitiatives;
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

        public void bindData(final int idIniciativa,
                             final String titulo,
                             final int horas,
                             final Date fechaInicio,
                             final Date fechaFin,
                             final String descripcion,
                             final String tipo,
                             final String productoFinal,
                             final boolean nueva,
                             final String difusion,
                             final OnItemClickListener onItemClickListener) {

            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    onItemClickListener.onItemClick(
                            idIniciativa,
                            titulo,
                            horas,
                            fechaInicio,
                            fechaFin,
                            descripcion,
                            tipo,
                            productoFinal,
                            nueva,
                            difusion
                    );
                }
            });
        }
    }

    public interface OnItemClickListener {
        void onItemClick(int idIniciativa,
                         String titulo,
                         int horas,
                         Date fechaInicio,
                         Date fechaFin,
                         String descripcion,
                         String tipo,
                         String productoFinal,
                         boolean nueva,
                         String difusion);
    }
}
