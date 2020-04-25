# Firebase 
## Hosting

Firebase permite hostear nuestro proyecto. Para ello ejectua los siguientes comandos desde una linea de comandos en la carpeta del proyecto (necesario configurar firebase):

Compila el sitio web:
```
ng build
? What do you want to use as your public directory? dist
? Configure as a single-page app (rewrite all urls to /index.html)? No
```

Inicia sesion en `Firebase`:

```
firebase login
? Allow Firebase to collect CLI usage and error reporting information? No

```
Te redirigira a la pagina de verificacion de google para que des permisos para que pueda acceder a firebase

Inicializa `Hosting` en el proyecto local:

```
firebase init
? Are you ready to proceed? Yes
? Which Firebase CLI features do you want to set up for this folder? Hosting: Configure and deploy Firebase Hosting sites
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
