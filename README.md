# Servidor de Autenticación y Monitoreo de BPM con Express.js

Este es un servidor en Node.js con Express.js que maneja la autenticación de usuarios utilizando bcrypt para encriptar contraseñas y JWT para la gestión de sesiones. Además, permite el envío de datos de ritmo cardíaco desde dispositivos como el ESP32 y su almacenamiento en una base de datos MySQL.

El servidor también implementa un canal de comunicación en tiempo real utilizando WebSocket, permitiendo la transmisión inmediata de datos de BPM a clientes conectados autenticados, ideal para visualizar el ritmo cardíaco en interfaces en vivo, como animaciones en Three.js.

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
