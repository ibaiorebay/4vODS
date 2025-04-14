# 4vODS

## Requisitos para ejecutar el proyecto

Para hacer funcionar correctamente la página web y la aplicación móvil, es necesario seguir estos pasos:

### 1. Configuración de XAMPP
Asegúrate de tener instalado **XAMPP** y activa los siguientes módulos:
- **phpMyAdmin (MySQL)**
- **Apache**

### 2. Configuración de la base de datos
La base de datos se encuentra en `backend/db`. Para configurarla:
1. Abre **phpMyAdmin** en tu navegador.
2. Crea una nueva base de datos (si es necesario).
3. Abre el archivo de la base de datos (`.sql`) con un editor de texto (por ejemplo, Bloc de notas).
4. Copia el contenido y pégalo en la sección SQL de **phpMyAdmin**, luego ejecútalo.
5. Repite el proceso con el archivo de **inserción de datos**.

### 3. Iniciar la API en modo HTTP

Para arrancar la API, es necesario contar con **Visual Studio 2022** y tener instalada la extensión para ejecutar en **HTTP y HTTPS**.

Para visualizar los datos, la API cuenta con una página de **Swagger**, que se mostrará automáticamente cuando la API se ejecute.

Si deseas verificar los datos manualmente, puedes acceder a la siguiente URL: 
[http://localhost:5115/api/iniciativas](http://localhost:5115/api/iniciativas)

La API se encuentra en `backend/api`. Para arrancarla, sigue estos pasos:
1. Abre una terminal y navega hasta la carpeta `backend/api`.
2. Ejecuta el comando correspondiente para iniciar el servidor en modo HTTP.

En caso de que la BBDD no esté generada o no tenga los últimos cambios, se deberán ejecutar las migraciones:
1. Herramientas->Administrador de paquetes NuGet->Consola del administrador de paquetes
2. En esa consola se tendrá que poner el comando "Update-Database"
IMPORTANTE!! Si salta un error de objetos ya existentes, se deberá borrar la base de datos con el comando "Drop-Database" y luego ejecutar de nuevo el comando "Update-Database" 

### 4. Ejecutar la aplicación móvil
La aplicación móvil está desarrollada en **Android Studio**. Para ejecutarla:
1. Abre el proyecto en **Android Studio**.
2. Asegúrate de utilizar un **móvil virtual**, ya que en un dispositivo físico los datos de la API no se mostrarán.
   - Si no tienes un emulador configurado, crea uno con el modelo **Pixel 7a**, ya que la app está diseñada específicamente para este dispositivo.
3. Compila y ejecuta la app.

#### 4,5. Aplicación de React Native
La aplicación de android está siendo rehecha en React Native
1. Abrir el directorio **4vOdsApp** en la terminal
2. Hacer npm install
  - Si se va a ejecutar la aplicación en el emulador basta con hacer npm run android
  - Si se va a ejecutar en un dispositivo físico hay que:
     - Hacer npm run android
     - Descargar la aplicación **Expo Go** de la play store
     - Dentro de la aplicación escanear el código QR que sale en la terminal

### 5. Ejecutar la página web
La página web está desarrollada con **Angular**. Para ejecutarla:
1. Abre la carpeta del proyecto con **Visual Studio Code**.
2. En la terminal, cambia la ruta al directorio del proyecto.
3. Ejecuta los siguientes comandos:
   ```sh
   npm install
   ng serve
   ```
4. La aplicación estará disponible en `http://localhost:4200/`.

---

Siguiendo estos pasos, el proyecto debería ejecutarse sin problemas. ¡Buena suerte! 🚀
