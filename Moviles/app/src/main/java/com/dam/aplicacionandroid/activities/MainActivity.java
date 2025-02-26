package com.dam.aplicacionandroid.activities;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.dam.aplicacionandroid.R;
import com.dam.aplicacionandroid.adapters.IniciativeAdapter;
import com.dam.aplicacionandroid.models.Iniciatives;

import io.realm.Realm;
import io.realm.RealmResults;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Realm realm;
        RealmResults<Iniciatives> results;
        RecyclerView recycler;
        IniciativeAdapter adapter;

        recycler = (RecyclerView) findViewById(R.id.recyclerView);
        realm = Realm.getDefaultInstance();
        realm.beginTransaction();
        //realm.copyToRealm();
        realm.commitTransaction();
        results = realm.where(Iniciatives.class).findAll();
        adapter = new IniciativeAdapter(results/*, new IniciativeAdapter.OnItemClickListener() {
            @Override
            public void onItemClick() {

            }
        }*/);
        recycler.setAdapter(adapter);
        recycler.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false));
    }
}