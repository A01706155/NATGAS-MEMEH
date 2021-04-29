[![Contributors][contributors-shield]][contributors-url]
# MEMEH
### Installation
* Clonar el repositorio de github en la terminal donde quiera que sea guardada. 
```sh
  git clone https://github.com/A01706155/NATGAS-MEMEH.git
  ```
Al hacer el clone del repositorio es importante:
* Utilizar los scripts dentro de las carpetas "Proyecto/sql". 
  * Para crear la estructura de la base de datos se utiliza el archivo "create.sql" que debe ejecutarse dentro del DBMS.

* Para instalar todas las dependencias necesarias de la aplicación, desde una terminal se debe ingresar a la carpeta "Proyecto" en donde se deberá ejecutar el siguiente comando
```sh
  npm install
  ```
* Una vez finalizada la instalación de las dependencias desde la misma carpeta "Proyecto" se debe ejecutar el siguiente comando para encender el servidor
```sh
  npm start
  ```
* Desde cualquier navegador ingresar a la ruta "localhost:3000/users/login" e ingresar al sistema con las siguientes credenciales:
```sh
    Nombre de Usuario: admin
    Contraseña: 123
```
[contributors-shield]: https://img.shields.io/github/contributors/A01706155/NATGAS-MEMEH.svg?style=for-the-badge
[contributors-url]: https://github.com/A01706155/NATGAS-MEMEH/graphs/contributors
