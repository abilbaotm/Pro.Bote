# Aplicaciones moviles (Apache Cordova)

NOTA: No recomendamos este método para generar las versiones móviles. Usar los artefactos generado con el servicio de CI/CD. Más info en [README.md](/README.md#Android)

NOTA 2: El login con Google *no* está disponible en las APKs generadas con este método, [más info](#login-google-nativo).

## Pre requisitos

- Completado los pasos descritos en: [local.md](local.md)
- Apache Cordova instalado en el equipo: [#apache-cordova](#apache-cordova)
- SDK de Android

## Apache Cordova

Es posible instalar Apache Cordova con el siguiente comando:
```
npm install -g cordova
```

## Generar sitio estático

Para poder generar la aplicación es necesario generar el proyecto web, para ello es necesario el siguiente comando:

```
node_modules/.bin/ng build --prod --base-href . --output-path CordovaMobileApp/www/
```

## Generar APK

Desde la carpeta de `CordovaMobileApp` ejecutar los siguientes comandos:


```
cd CordovaMobileApp
# eliminar plataforma android
cordova platform rm android
# añadir plataforma android
cordova platform add android
# contruir aplicación android
cordova build android --release
```

El artefacto resultante del comando anterior aparecerá en la siguiente ruta: `CordovaMobileApp/platforms/android/app/build/outputs/apk/`

## Login Google Nativo

Es posible que el Login nativo no este disponible en APKs generadas de manera local. Por motivos de seguridad las llamadas a la API de OAuth de Google solo son vilidas
por las aplicaciones generadas y firmadas vía CI.
Para una implementación propia necesitara los siguientes recursos/tareas:

- https://developers.google.com/identity/protocols/oauth2
- https://github.com/EddyVerbruggen/cordova-plugin-googleplus#3-google-api-setup
- https://gitlab.com/pabil/bote-dw/-/blob/b692251f335a065abf58da49af77ef3a95db4db1/CordovaMobileApp/package.json#L36-39


---

[Inicio documentación](../README.md) - [>>Siguiente Documento >>](cicd.md)

