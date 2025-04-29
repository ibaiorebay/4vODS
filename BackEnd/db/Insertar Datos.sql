-- Insertar datos en la tabla ODS
INSERT INTO ODS (ID_ODS, NOMBRE, DESCRIPCION, DIMENSION) VALUES
(1, 'Fin de la Pobreza', 'Erradicar la pobreza en todas sus formas.', 'Social'),
(2, 'Hambre Cero', 'Acabar con el hambre y promover la seguridad alimentaria.', 'Social'),
(3, 'Salud y Bienestar', 'Garantizar una vida sana y promover el bienestar.', 'Social');

-- Insertar datos en la tabla METAS
INSERT INTO METAS (ID_META, ID_ODS, DESCRIPCION) VALUES
(1, 1, 'Reducir a la mitad la proporción de personas en pobreza.'),
(2, 2, 'Asegurar el acceso a alimentos seguros, nutritivos y suficientes.'),
(3, 3, 'Reducir la mortalidad infantil y mejorar la salud global.');

-- Insertar datos en la tabla INICIATIVAS
INSERT INTO INICIATIVAS (ID_INICIATIVA, TITULO, HORAS, FECHA_INICIO, FECHA_FIN, DESCRIPCION, TIPO, PRODUCTO_FINAL, NUEVA, DIFUSION) VALUES
(1, 'Banco de Alimentos', 50, '01-03-2024', '01-06-2024', 'Iniciativa para recolectar alimentos para comunidades vulnerables.', 'Proyecto', 'Reporte de impacto', TRUE, 'Redes sociales y prensa'),
(2, 'Charla Nutrición', 10, '15-04-2024', '15-04-2024', 'Charla educativa sobre nutrición y hábitos saludables.', 'Charla', 'Material informativo', TRUE, 'Escuelas y redes sociales');

-- Insertar datos en la tabla METAS_INICIATIVA
INSERT INTO METAS_INICIATIVA (ID_INICIATIVA, ID_META) VALUES
(1, 2),
(2, 3);

-- Insertar datos en la tabla PROFESORES
INSERT INTO PROFESORES (ID_PROFESOR, NOMBRE, APELLIDO1, APELLIDO2, FECHA_NACIMIENTO) VALUES
(1, 'Carlos', 'Gómez', 'Pérez', '1980-05-20'),
(2, 'María', 'López', 'García', '1975-08-15');

-- Insertar datos en la tabla PROFESORES_INICIATIVA
INSERT INTO PROFESORES_INICIATIVA (ID_PROFESOR, ID_INICIATIVA) VALUES
(1, 1),
(2, 2);

-- Insertar datos en la tabla ENTIDAD
INSERT INTO ENTIDAD (ID_ENTIDAD, NOMBRE, DESCRIPCION) VALUES
(1, 'Cruz Roja', 'Organización humanitaria internacional.'),
(2, 'Banco de Alimentos', 'Organización para la recolección y distribución de alimentos.');

-- Insertar datos en la tabla ENTIDAD_INICIATIVA
INSERT INTO ENTIDAD_INICIATIVA (ID_ENTIDAD, ID_INICIATIVA) VALUES
(1, 1),
(2, 1);

-- Insertar datos en la tabla CURSO
INSERT INTO CURSO (ID_CURSO, NOMBRE) VALUES
(1, 'Primero de Bachillerato'),
(2, 'Segundo de Bachillerato');

-- Insertar datos en la tabla ASIGNATURA
INSERT INTO ASIGNATURA (ID_ASIGNATURA, ID_CURSO, NOMBRE) VALUES
(1, 1, 'Biología'),
(2, 2, 'Ciencias Sociales');

-- Insertar datos en la tabla ASIGNATURAS_INICIATIVA
INSERT INTO ASIGNATURAS_INICIATIVA (ID_ASIGNATURA, ID_INICIATIVA) VALUES
(1, 1),
(2, 2);