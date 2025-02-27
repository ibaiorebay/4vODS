package com.dam.aplicacionandroid.utils;

import com.dam.aplicacionandroid.models.Asignaturas;
import com.dam.aplicacionandroid.models.Contratantes;
import com.dam.aplicacionandroid.models.Iniciatives;
import com.dam.aplicacionandroid.models.Metas;
import com.dam.aplicacionandroid.models.Profesores;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

public class MockIniciatives {

    private static final Random random = new Random();

    public static List<Iniciatives> getMockIniciatives() {
        List<Iniciatives> mockList = new ArrayList<>();

        for (int i = 1; i <= 20; i++) {
            mockList.add(new Iniciatives(
                    i,
                    random.nextInt(100) + 10, // Horas aleatorias entre 10 y 110
                    "Iniciativa " + i,
                    new Date(), // Fecha de inicio actual
                    new Date(System.currentTimeMillis() + (1000L * 60 * 60 * 24 * (i + 3))), // Fecha final en el futuro
                    getMockAsignaturas(),
                    getMockContratantes(),
                    getMockProfesores(),
                    getMockMetas()
            ));
        }

        return mockList;
    }

    private static ArrayList<Asignaturas> getMockAsignaturas() {
        ArrayList<Asignaturas> asignaturas = new ArrayList<>();
        asignaturas.add(new Asignaturas(101, "Curso 1", "Matemáticas"));
        asignaturas.add(new Asignaturas(102, "Curso 2", "Historia"));
        asignaturas.add(new Asignaturas(103, "Curso 3", "Física"));
        return asignaturas;
    }

    private static ArrayList<Contratantes> getMockContratantes() {
        ArrayList<Contratantes> contratantes = new ArrayList<>();
        contratantes.add(new Contratantes(201, "Empresa A", "Empresa de tecnología"));
        contratantes.add(new Contratantes(202, "Empresa B", "Organización educativa"));
        return contratantes;
    }

    private static ArrayList<Profesores> getMockProfesores() {
        ArrayList<Profesores> profesores = new ArrayList<>();
        profesores.add(new Profesores(301, "Juan", "Pérez", "Gómez", new Date(1980 - 1900, 5, 15)));
        profesores.add(new Profesores(302, "María", "López", "Fernández", new Date(1975 - 1900, 8, 20)));
        return profesores;
    }

    private static ArrayList<Metas> getMockMetas() {
        ArrayList<Metas> metas = new ArrayList<>();
        metas.add(new Metas(1, "A", "Erradicar la pobreza extrema"));
        metas.add(new Metas(2, "B", "Garantizar la educación inclusiva"));
        metas.add(new Metas(3, "C", "Promover la igualdad de género"));
        return metas;
    }
}