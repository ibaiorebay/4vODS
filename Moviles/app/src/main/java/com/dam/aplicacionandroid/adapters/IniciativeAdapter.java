package com.dam.aplicacionandroid.adapters;

import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.dam.aplicacionandroid.R;
import com.dam.aplicacionandroid.models.Iniciatives;

import java.util.List;

public class IniciativeAdapter extends RecyclerView.Adapter<IniciativeAdapter.DataHolder> {
    private List<Iniciatives> iniciativas;
    private OnItemClickListener itemListener;
    public IniciativeAdapter(List<Iniciatives> iniciativas, OnItemClickListener listener){
        this.iniciativas = iniciativas;
        this.itemListener = listener;
    }
    @NonNull
    @Override
    public DataHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.lista_iniciativas,parent,false);
        return new DataHolder(view);
    }
    @Override
    public void onBindViewHolder(@NonNull DataHolder holder, int position) {
        holder.asingData(itemListener);
    }

    @Override
    public int getItemCount() {
        return iniciativas.size();
    }

    public class DataHolder extends RecyclerView.ViewHolder {

        public DataHolder(@NonNull View itemView) {
            super(itemView);

        }
        public void asingData(OnItemClickListener onItemClickListener){

            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    onItemClickListener.onItemClick();
                }
            });
        }
    }
    public interface OnItemClickListener{
        void onItemClick();
    }
}
