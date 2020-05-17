# Firebase 
## Hosting

Firebase permite hostear nuestro proyecto. Para ello ejecuta los siguientes comandos desde una línea de comandos en la carpeta del proyecto (necesario configurar firebase):

IMPORTANTE: Eliminar fichero .firebaserc incluido en este proyecto para poder configurar el proyecto con un proyecto Firebase diferente

Compila el sitio web:
```
ng build
? What do you want to use as your public directory? dist
? Configure as a single-page app (rewrite all urls to /index.html)? No
```

Inicia sesión en `Firebase`:

```
firebase login
? Allow Firebase to collect CLI usage and error reporting information? No

```
Te redirigirá a la página de verificación de google para que des permisos para que pueda acceder a firebase

Inicializa `Hosting` en el proyecto local:

```
firebase init
? Are you ready to proceed? Yes
? Which Firebase CLI features do you want to set up for this folder? Hosting: Configure and deploy Firebase Hosting sites
? Please select an option: Use an existing project
? Select a default Firebase project for this directory: probote-8407f (probote)
? What do you want to use as your public directory? dist
? Configure as a single-page app (rewrite all urls to /index.html)? No
? File dist/index.html already exists. Overwrite? No
```
Despliega el sitio web, este comando devolverá la URL donde se encuentra el sitio web.

```
firebase deploy --only hosting
```

---

[Inicio documentación](../README.md) - [>>Siguiente Documento >>](functions.md)
