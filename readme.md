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
