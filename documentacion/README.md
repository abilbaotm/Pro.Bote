# PRO.BOTE

En este apartado se encuentra toda la documentación relacionada con este proyecto. Actualmente este proyecto se encuentra en producción
y es accesible desde Internet sin necesidad de ejecutar las siguientes tareas. Los detalles sobre la version publica en producción se encuentran
en el [README.md](/README.md) de la raíz del proyecto.

## Manual de implantación

El manual de implantación se divide en dos manules en funcion de los intereses de la implantación:
- [Manual de desarrollo](#manual-de-desarrollo): incluye instrucciones para poder recreear de manera local el proyecto.
- [Manual de despliegue](#manual-de-despliegue): incluye instrucciones para poder deplegar la aplicacion en un entorno real de producción. Para poder efectuar este manual es necesario
disponer de un entorno [local](desarrollo/local.md) la aplicación web.

### Manual de desarrollo

Las siguientes instrucciones son útiles para poder recreear de manera local el proyecto.

| # | documento | Resumen |
|---| --------- | ------- |
| 1 | [docker.md](desarrollo/docker.md) | Ejecutar el proyecto de manera local usando Docker. Esta es la manera más sencilla de lanzar el proyecto de manera local. |
| 2 | [local.md](desarrollo/local.md)| Ejecutar el proyecto de manera local usando el Host. Útil para usar un IDE y proceder con el [Manual de despliegue](#manual-de-despliegue). | 
| 3 | [cordova.md](desarrollo/cordova.md) | Crear aplicación android de manera local | 
| 4 | [cicd.md](desarrollo/cicd.md) | Uso de CI/CD | 
 
NOTA 1: Para ejecutar el proyecto de manera local existen dos metidos: [docker.md](desarrollo/docker.md) o [local.md](desarrollo/local.md). Solo es necesario usar uno de ellos. 

NOTA 2: Este proyecto por defecto está configurado para usar la base de datos `dw-bote.firebaseio.com` tal y como se especifica en los archivos de entorno 
[environment.prod.ts](/src/environments/environment.prod.ts) y [environment.ts](/src/environments/environment.ts). El procedimiento para usar una solución
propia de Firebase se detalla en el [Manual de despliegue](#manual-de-despliegue)

### Manual de despliegue

Las siguientes instrucciones son útiles para poder desplegar el proyecto web usando las tecnologías de Firebase (Producción).
En este proceso se detallan las instrucciones a seguir para poder crear una base de datos y todos los servicios necesarios para poder
desplegar el proyecto a un entorno de producción.

| # | documento | Resumen |
|---| --------- | ------- |
| 1 | [firebase.md](despliegue/firebase.md) | Configurar un nuevo proyecto Firebase  |
| 2 | [firestore.md](despliegue/firestore.md) | Habilitar base de datos en tiempo real (`Firebase Firestore`) | 
| 3 | [authentication.md](despliegue/authentication.md) | Habilitar login/registro de usuarios (`Firebase Authentication`) | 
| 4 | [hosting.md](despliegue/hosting.md) | Habilitar el hosting (`Firebase Hosting`)  |
| 5 | [functions.md](despliegue/functions.md) | Habilitar funciones del proyecto (`Firebase Functions`) |

Para poder ejecutar de manera local usando un nuevo proyecto de Firebase deberá de seguir como mínimo los pasos de despliegue números 1, 2 y 3.
Prueba el nuevo proyecto de Firebase usando los pasos especificados en [docker.md](desarrollo/docker.md) o [local.md](desarrollo/local.md) del [Manual de desarrollo](#manual-de-desarrollo).
                                                                                                                                                     



## Manual de usuario

Las siguientes instrucciones son útiles para conocer el funcionamiento de la aplicación web. Estas referencias son validas para la version de navegador
así como la aplicación para dispositivos moviles.


| # | documento | Resumen |
|---| --------- | ------- |
| 1 | [registro.md](usuario/registro.md) | Registrarse en el aplicativo  |
| 2 | [login.md](usuario/login.md) | Login en el aplicativo | 
| 3 | [inicio.md](usuario/resumen.md) | Página inicio del aplicativo | 
| 4 | [perfil.md](usuario/perfil.md) | Cambios en el perfil de usuario | 
| 5 | [resumen.md](usuario/resumen.md) | Resumen de un viaje | 
| 6 | [viajes.md](usuario/viajes.md) | Gestionar viajes  |
| 7 | [gastos.md](usuario/gastos.md) | Gestionar gastos |
| 8 | [pagos.md](usuario/pagos.md) | Gestionar pagos |
| 9 | [extra.md](usuario/extra.md) | Información adicional |

## Registro de pruebas

Durante el proceso final de desarrollo se ejecutaron multiples test para validar que 
todas las funciones y características del proyecto funcionaban.

Las pruebas realizadas se encuentran el la sección de [pruebas](pruebas).
