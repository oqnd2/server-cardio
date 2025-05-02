# Servidor de Autenticación y Monitoreo de BPM con Express.js

Este es un servidor en **Node.js** con **Express.js** que maneja autenticación de usuarios utilizando **bcrypt** para encriptar contraseñas y **JWT** para la gestión de sesiones. Además, ahora permite el envío de datos de ritmos cardíacos (BPM) y su almacenamiento en la base de datos. Este servidor es utilizado para un proyecto usando **ESP32** con sensor de ritmo cardiaco.

## Características
- Registro de usuarios con contraseñas encriptadas.
- Inicio de sesión con generación de **JSON Web Token (JWT)**.
- Conexión a base de datos **MySQL**.
- Manejo de variables de entorno con **dotenv**.
- Separación de rutas para mayor organización.
- Envío y almacenamiento de datos de BPM de los usuarios.

## Tecnologías utilizadas 
- Node.js
- Express.js
- MySQL
- bcrypt
- jsonwebtoken (JWT)
- dotenv
