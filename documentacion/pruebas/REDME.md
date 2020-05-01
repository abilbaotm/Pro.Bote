
[[_TOC_]]


---

# Pruebas

Esta documentación describe pruebas internas efectuadas por los miembros del equipo de desarrollo. 

## Pruebas internas
### Prueba 1: Registro y login usuarios (user/pass)

| Fecha | 01/05/2020  | | |  Autor | ASIER |
| --- | --- | --- | --- | --- | --- |
| **Plataforma** | Android Web | **Versión** | 0.2.62 | **Estado** | Completada |

**Descripción del escenario inicial**:
Se valida que es posible crear un usuario desde el formulario de login

**Proceso**:
(1) Se verifica que el usuario no existe; (2) Se accede al formulario de registro y se procede al registro; (3) El sitio web solicita al usuario que se valide el correo;
(4) El usuario recibe un correo electrónico con un link; (5) La cuenta es validada gracias al link; (6) El usuario puede iniciar sesión y (7) sus datos son correctos.
 
**Resultado esperado**:
El usuario se registra y puede iniciar sesión.

**Resultado final**:
El usuario ha podido registrarse y ha podido iniciar sesión. Sus datos son correctos.

**Imágenes**

| ![imagenes/t1/1.PNG](imagenes/t1/1.PNG) | ![imagenes/t1/2.PNG](imagenes/t1/2.PNG) | ![imagenes/t1/3.PNG](imagenes/t1/3.PNG) | ![imagenes/t1/4.PNG](imagenes/t1/4.PNG) | ![imagenes/t1/5.PNG](imagenes/t1/5.PNG) | ![imagenes/t1/6.PNG](imagenes/t1/6.PNG) | ![imagenes/t1/7.PNG](imagenes/t1/7.PNG) | 
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Pantalla de login | El login no existe | Pantalla de registro| Correo de verificación | Proceso verificación | Usuario iniciado | Perfil del usuario |

---

