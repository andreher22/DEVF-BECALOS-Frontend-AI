# Servidor Express — Proyecto Final Módulo 7 (Parte 4)

Servidor básico con Express: primer paso de integración entre front-end y
back-end para el proyecto DevfSeek.

## Objetivo de esta entrega

Configurar un proyecto de NPM, instalar Express y levantar un servidor con
un endpoint que responda `Hola Mundo`.

## Pasos seguidos

1. `npm init -y` — inicializa el proyecto de NPM.
2. `npm install express` — instala Express como dependencia.
3. `server.js` — servidor básico con un endpoint `GET /`.
4. Pruebas manuales con `curl` para confirmar que responde correctamente.

## Cómo correrlo

```bash
npm install
npm start
```

El servidor queda escuchando en `http://localhost:8080`.

## Cómo probarlo

```bash
curl http://localhost:8080
# → Hola Mundo
```

También se puede abrir `http://localhost:8080` directamente en el
navegador. Se verificó que responde con status `200 OK` y
`Content-Type: text/html; charset=utf-8`.

## Siguientes pasos

Esta entrega es la base para las siguientes partes del proyecto: agregar
rutas CRUD, conectar con el front-end de React y, más adelante, persistir
datos en una base de datos (MongoDB).

## Repositorio de referencia

Basado en la estructura de [DevfSeek](https://github.com/carlosDevf/DevfSeek/tree/parte-4/express),
usado únicamente como guía de aprendizaje.
