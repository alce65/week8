# Backend con Node - Express - Mongoose

## Proyecto inicial

Se crea a partir del ejercicio inicial con express-generator
En este caso

- Se construye el scaffolding desde 0
  - Ficheros de configuración
  - Carpeta api
    - controllers
    - models
    - routes
    - config
    - public
    - **tests**
    - index.js, dirname.js
- Se utilizan módulos de ES6
  - Se soluciona el problema de \_\_dirname
- Se testea / comprueba el funcionamiento de la versión inicial, solo con tareas
  - Se completan los test en task.controller

## Usuarios

Se incorpora lo necesario para las nuevas rutas /users

- model, sin relación con el modelo Tarea
- contoller, llamando al modelo (inicialmente sin usarlo)
- router, llamando al controller
- cambios en index.js: nuevas rutas llamando al router
- testing básico del controller
- comprobaciónde la ruta get all

## Relación Usuarios - Tareas

- En el esquema de Usuarios:
  tareas: [{
  type: Schema.Types.ObjectId
  ref: 'Tarea' // nombre del modelo
  }]

  Si los usuarios tienen passwd, sse elimina en la trasformación a JSON del Schema

- En el esquema de Tareas:
  responsible: {
  type: Schema.Types.ObjectId
  ref: 'User' // nombre del modelo
  }

- Los usuarios ya creados tienen un array notas (vacio)

- Hay que actualizar las creación de tareas (addTarea) de modo que

  - reciba el userID y busque el usuario
  - actualice en la tarea al responsible
  - añada en el usuario esa tarea como asignada a el

- Para mostrar la información en basa a la relación entre colecciones (lo que equivaldría aa un JOIN) de utiliza el metodo populate() de mongoose

  - se aplica en el getAllUsers
  - se aplica en el getAllTasks
  - el segundo parámetro permite definir que campos se utilizan al completar la información

## Autenticación de usuarios (JWT)

- se crea un endpoint login

  - controller
  - router
  - llamada al router en index.js

  - recibira por post user / password
  - lo validara
  - devolvera un jwt

- en el acceso a rytas protegidas,
  - se utilizará una cabecera de Autentication
  - con el token como contenido
