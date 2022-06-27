# Guia de instalación

## Creación de la estructura

1. Creación de la conexión por consola o con herramientas descargables (ej: TablePlus). Usar la ip 127.0.0.1 y el puerto por defecto 9042 (o en el puerto e ip que se encuentre corriendo el servicio de cassandra)
1. Crear la base, en este caso llamada ´bdnr´
1. Crear la tabla de ´vehicleobservation´, utilizando el siguiente comando:

```
USE bdnr;
CREATE TABLE VehicleObservation (
Id INT,
time timestamp,
observation varchar,
value double,
PRIMARY KEY (Id, time,observation)
) WITH CLUSTERING ORDER BY (time DESC);
```

## Uso del proyecto

1. Crear el archivo .env usando como guía .env.example (puede requerir ser modificado para conectarse con la ip y puerto correspondiente)
1. Instalar las dependencias con: ``npm install``
1. Ejecutar la aplicacion con: ``node index.js``
1. Importar la coleccion de Postman
