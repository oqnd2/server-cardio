# Servidor de Autenticación con Express.js

Este es un servidor en **Node.js** con **Express.js** que maneja autenticación de usuarios utilizando **bcrypt** para encriptar contraseñas y **JWT** para la gestión de sesiones.

## Características ✨
- Registro de usuarios con contraseñas encriptadas.
- Inicio de sesión con generación de **JSON Web Token (JWT)**.
- Conexión a base de datos **MySQL**.
- Manejo de variables de entorno con **dotenv**.
- Separación de rutas para mayor organización.

## Tecnologías utilizadas 🛠️
- Node.js
- Express.js
- MySQL
- bcrypt
- jsonwebtoken (JWT)
- dotenv

## Instalación 🚀
1. Clona este repositorio:
   ```sh
   git clone https://github.com/tu-usuario/tu-repositorio.git
   ```
2. Entra en la carpeta del proyecto:
   ```sh
   cd nombre-del-proyecto
   ```
3. Instala las dependencias:
   ```sh
   npm install
   ```
4. Crea un archivo **.env** en la raíz del proyecto con la siguiente estructura:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=nombre_de_tu_base_de_datos
   JWT_SECRET=tu_secreto_super_seguro
   ```

