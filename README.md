# Quiz Wave

Quiz Wave API presenta los endpoints para la gestión de usuarios, preguntas y
colecciones de preguntas.

## Descripción

Este proyecto presenta una serie de endpoints que permite el registro de
usuarios a la api. Estos usuarios podrán crear preguntas y colecciones, que
posteriormente podrán ser usadas para implementarlos en un juego de preguntas.
Este juego se llevará a cabo a través de otra API que implementará esta api.

## Empezando 🚀

Estas instrucciones te guiarán para obtener una copia de este proyecto en
funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

### Prerrequisitos 📋

Para ejecutar este proyecto tendrás que crear un archivo para las variables de
entorno. Este archivo se debe llamar `.env` y debe ser creado en la raíz del
proyecto. La estructura de este archivo debería verse algo así:

```env
NODE_ENV=development
PORT=YOUR_PORT
HOSTNAME=YOUR_HOST
MONGODB_URI=YOUR_MONGODB_URI
```

La URI de MongoDB debería ser como el siguiente ejemplo:

```bash
mongodb://0.0.0.0:27017/db-name
```

### Instalación 🔧

Clonar el repo

```sh
git clone https://github.com/briansleonel/quiz-wave-api
```

Moverse a la carpeta del proyecto

```sh
cd quiz-wave-api
```

Instalar las dependencias del proyecto

```sh
npm install
```

## Documentación 📖

Puede encontrar la documentación del proyecto y encontrar todos los endpoints
disponibles para usarlos a través del siguiente enlace.

_[Documentación](https://example.com)_

## Construido con 🛠️

-   [Typescript](https://www.typescriptlang.org/) - El lenguaje utilizado
-   [Expressjs](https://expressjs.com/) - El framework web utilizado
-   [NPM](https://www.npmjs.com/) - Gestión de dependencias
-   [MongoDB](https://www.mongodb.com/) - Sistema de base de datos
-   [JsonWebToken](https://jwt.io/) - Creación de tokens de acceso
-   [Swagger](https://swagger.io/) - Documentación de la API
-   [Zod](https://zod.dev/) - Validación de datos

## Autores ✒️

-   **González, Brian Leonel** - [briansleonel](https://github.com/briansleonel)
