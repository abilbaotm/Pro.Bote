# PRO.BOTE

En este apartado se encuentra toda la documentación relacionada con este proyecto. Actualmente este proyecto se encuentra en producción
y es accesible desde Internet sin necesidad de ejecutar las siguientes tareas. Los detalles sobre la version publica en producción se encuentran
en el [README.md](/README.md) de la raíz del proyecto.

## Manual de implantación

El manual de implantación se divide en dos manuales en función de los intereses de la implantación:
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
 
NOTA 1: Para ejecutar el proyecto de manera local existen dos métodos: [docker.md](desarrollo/docker.md) o [local.md](desarrollo/local.md). Solo es necesario usar uno de ellos. 

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

Las siguientes instrucciones son útiles para conocer el funcionamiento de la aplicación web. Estas referencias son válidas para la versión de navegador
así como la aplicación para dispositivos móviles.


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

## Bibliografía

Durante el desarrollo del proyecto se consultaron los siguientes recursos:
- [Angular 8 y Firestore](https://medium.com/angular-chile/angular-6-y-firestore-b7f270adcc96)
- [Cloud Scheduler API](https://console.cloud.google.com/apis/library/cloudscheduler.googleapis.com?_ga=2.106107008.24171351.1585506820-2022136465.1579352491&project=dw-bote&folder&organizationId)
- [Integrating Google Sign-In into your web app](https://developers.google.com/identity/sign-in/web/sign-in)
- [How to create a signed APK file using Cordova command line interface?](https://stackoverflow.com/questions/26449512/how-to-create-a-signed-apk-file-using-cordova-command-line-interface)
- [fix(android): Back button fix for SDK28](https://github.com/apache/cordova-plugin-splashscreen/pull/225)
- [Continuous Delivery en Android con Gitlab CI, Fabric Beta, Google Play y Fastlane.](https://medium.com/@harttyn/continuous-delivery-en-android-con-gitlab-ci-fabric-beta-google-play-y-fastlane-9d2dca0c7077)
- [Abiro PhoneGap Image Generator](https://pgicons.abiro.com/)
- [Protect Your HTTP Firebase Cloud Functions](https://dev.to/daviddalbusco/protect-your-http-firebase-cloud-functions-1ii6)
- [How to create signed android apk with Apache Cordova](https://www.linkedin.com/pulse/how-create-signed-android-apk-apache-cordovausing-cordova-ghatul/)
