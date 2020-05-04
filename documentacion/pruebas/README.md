
[[_TOC_]]


---

# Pruebas

Esta documentación describe pruebas internas efectuadas por los miembros del equipo de desarrollo. 

## Pruebas internas
### Prueba 1: Registro y login usuarios (user/pass)

| **Fecha** | 01/05/2020  | **Versión** | 0.2.62 |  **Autor** | ASIER |
| --- | --- | --- | --- | --- | --- |
| **SO** | Android | **Plataforma** | Web | **Estado** | Completada |

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

### Prueba 2: Login con Google Web

| **Fecha** | 02/05/2020  | **Versión** | 0.2.62 |  **Autor** | PABLO |
| --- | --- | --- | --- | --- | --- |
| **SO** | Windows | **Plataforma** | Web | **Estado** | Completada |

**Descripción del escenario inicial**:
Se valida que es posible iniciar sesión vía Google en la Web.

**Proceso**:
(1) Se hace click en el botón "LOG IN CON GOOGLE"; (2) Aparece una ventana emergente que gestiona el inicio de sesión de google; (3) El usuario inicia sesión usando su nombre y correo de google;
 
**Resultado esperado**:
Él puede iniciar sesión usando su cuenta de Google.

**Resultado final**:
El usuario ha iniciado sesión mediante Google Auth.

**Imágenes**

| ![imagenes/t2/1.PNG](imagenes/t2/1.PNG) | ![imagenes/t2/2.PNG](imagenes/t2/2.PNG) | ![imagenes/t2/3.PNG](imagenes/t2/3.PNG) | 
| :---: | :---: | :---: | 
| Pantalla de login | Gestión de login de google | Inicio de sesión correcto | 

---

### Prueba 3: Login con Google Android

| **Fecha** | 02/05/2020  | **Versión** | 0.2.62 |  **Autor** | PABLO |
| --- | --- | --- | --- | --- | --- |
| **SO** | Android | **Plataforma** | App | **Estado** | Completada |

**Descripción del escenario inicial**:
Se valida que es posible iniciar sesión vía Google en la aplicación de Android.

**Proceso**:
(1) Se hace click en el botón "LOG IN CON GOOGLE"; (2) Aparece una ventana emergente que gestiona el inicio de sesión de google. Elegimos con que usuario de google queremos iniciar sesión; (3) El usuario inicia sesión usando su nombre y correo de google;
 
**Resultado esperado**:
Él puede iniciar sesión usando su cuenta de Google.

**Resultado final**:
El usuario ha iniciado sesión mediante Google Auth.

**Imágenes**

| ![imagenes/t3/1.PNG](imagenes/t3/1.jpg) | ![imagenes/t3/2.PNG](imagenes/t3/2.jpg) | ![imagenes/t3/3.PNG](imagenes/t3/3.jpg) | 
| :---: | :---: | :---: | 
| Pantalla de login | Gestión de login de google | Inicio de sesión correcto | 

---

### Prueba 4: Logout funcional

| **Fecha** | 02/05/2020  | **Versión** | 0.2.62 |  **Autor** | PABLO |
| --- | --- | --- | --- | --- | --- |
| **SO** | Android | **Plataforma** | App | **Estado** | Completada |

**Descripción del escenario inicial**:
Se valida que es posible cerrar sesión una vez dentro de tu cuenta.

**Proceso**:
(1) Se hace click en el botón representado como tres puntos verticales; (2) Se hace click en el icono del perfil representado con una persona; (3) Se hace click en el botón "Log out"; (4) El usuario ha cerrado sesión satisfactoriamente.
 
**Resultado esperado**:
Él puede cerrar sesión.

**Resultado final**:
El usuario ha cerrado sesión.

**Imágenes**

| ![imagenes/t4/1.PNG](imagenes/t4/1.jpg) | ![imagenes/t4/2.PNG](imagenes/t4/2.jpg) | ![imagenes/t4/3.PNG](imagenes/t4/3.jpg) | ![imagenes/t4/4.PNG](imagenes/t4/4.jpg) | 
| :---: | :---: | :---: | :---: |
| Pantalla de la aplicación | Menu representado por tres puntos verticales | Botón de Log out | Log out correcto |

---

### Prueba 5: Crear un nuevo viaje

| **Fecha** | 02/05/2020  | **Versión** | 0.2.62 |  **Autor** | PABLO |
| --- | --- | --- | --- | --- | --- |
| **SO** | Windows | **Plataforma** | Web | **Estado** | Completada |

**Descripción del escenario inicial**:
Se valida que es posible crear un viaje.

**Proceso**:
(1) Se hace click en el botón "NUEVO VIAJE" situado en la barra lateral; (2) Se abre el formulario correspondiente al viaje; (3) Se rellena con la información del viaje necesaria y se hace click en el botón "CREAR"; (4) El usuario ha creado un viaje; (5) El viaje creado sale en la feed del usuario y de todos los participantes registrados que estén en el viaje.
 
**Resultado esperado**:
El usuario puede crear un viaje.

**Resultado final**:
El usuario ha creado un viaje.

**Imágenes**

| ![imagenes/t5/1.PNG](imagenes/t5/1.PNG) | ![imagenes/t5/2.PNG](imagenes/t5/2.PNG) | ![imagenes/t5/3.PNG](imagenes/t5/3.PNG) | ![imagenes/t5/4.PNG](imagenes/t5/4.PNG) | ![imagenes/t5/5.PNG](imagenes/t5/5.PNG) | 
| :---: | :---: | :---: | :---: | :---: | 
| Pantalla de feed del usuario | Formulario de creación de viaje | Campos del formulario rellenos | Viaje creado correctamente | Feed del usuario |

---

### Prueba 6: Editar un viaje

| **Fecha** | 02/05/2020  | **Versión** | 0.2.62 |  **Autor** | PABLO |
| --- | --- | --- | --- | --- | --- |
| **SO** | Windows | **Plataforma** | Web | **Estado** | Completada |

**Descripción del escenario inicial**:
Se valida que es posible editar un viaje.

**Proceso**:
(1) Se hace click en el viaje que se quiera editar; (2) En el resumen del viaje se hace click en el botón "Editar viaje"; (3) Se abre el formulario de viaje con los datos en sus respectivos campos; (4) El usuario cambia los datos y le hace click al botón "Editar"; (5) El viaje se ha cambiado.
 
**Resultado esperado**:
El usuario puede editar un viaje.

**Resultado final**:
El usuario ha editado un viaje.

**Imágenes**

| ![imagenes/t6/1.PNG](imagenes/t6/1.PNG) | ![imagenes/t6/2.PNG](imagenes/t6/2.PNG) | ![imagenes/t6/3.PNG](imagenes/t6/3.PNG) | ![imagenes/t6/4.PNG](imagenes/t6/4.PNG) | ![imagenes/t6/5.PNG](imagenes/t6/5.PNG) | 
| :---: | :---: | :---: | :---: | :---: | 
| Pantalla de feed del usuario | Resumen del viaje | Campos del formulario rellenos | Viaje editado | Resumen del viaje editado |

---

### Prueba 7: Borrar un viaje

| **Fecha** | 02/05/2020  | **Versión** | 0.2.62 |  **Autor** | PABLO |
| --- | --- | --- | --- | --- | --- |
| **SO** | Windows | **Plataforma** | Web | **Estado** | Completada |

**Descripción del escenario inicial**:
Se valida que es posible borrar un viaje.

**Proceso**:
(1) Se hace click en el viaje que se quiera borrar; (2) En el resumen del viaje se hace click en el botón "Editar viaje"; (3) Se abre el formulario de viaje con los datos en sus respectivos campos. En la parte inferior aparecen los botones para borrar/archivar el viaje. Se hace click en el botón "Borrar"; (4) Se pide confirmación del borrado; (5) El viaje pasa a pendiente de borrar hasta que se haga el borrado diario de viajes.
 
**Resultado esperado**:
El usuario puede borrar un viaje.

**Resultado final**:
El usuario ha borrado un viaje.

**Imágenes**

| ![imagenes/t7/1.PNG](imagenes/t7/1.PNG) | ![imagenes/t7/2.PNG](imagenes/t7/2.PNG) | ![imagenes/t7/3.PNG](imagenes/t7/3.PNG) | ![imagenes/t7/4.PNG](imagenes/t7/4.PNG) | ![imagenes/t7/5.PNG](imagenes/t7/5.PNG) | 
| :---: | :---: | :---: | :---: | :---: | 
| Pantalla de feed del usuario | Resumen del viaje | Botón de borrado | Confirmación del borrado | Viaje en pendiente de borrar |

---

### Prueba 8: Archivar un viaje

| **Fecha** | 02/05/2020  | **Versión** | 0.2.62 |  **Autor** | PABLO |
| --- | --- | --- | --- | --- | --- |
| **SO** | Windows | **Plataforma** | Web | **Estado** | Completada |

**Descripción del escenario inicial**:
Se valida que es posible archivar un viaje.

**Proceso**:
(1) Se hace click en el viaje que se quiera archivar; (2) En el resumen del viaje se hace click en el botón "Editar viaje"; (3) Se abre el formulario de viaje con los datos en sus respectivos campos. En la parte inferior aparecen los botones para borrar/archivar el viaje. Se hace click en el botón "Archivar"; (4) Se pide confirmación del archivado; (5) El viaje pasa ha archivado.
 
**Resultado esperado**:
El usuario puede archivar un viaje.

**Resultado final**:
El usuario ha archivado un viaje.

**Imágenes**

| ![imagenes/t8/1.PNG](imagenes/t8/1.PNG) | ![imagenes/t8/2.PNG](imagenes/t8/2.PNG) | ![imagenes/t8/3.PNG](imagenes/t8/3.PNG) | ![imagenes/t8/4.PNG](imagenes/t8/4.PNG) | ![imagenes/t8/5.PNG](imagenes/t8/5.PNG) | 
| :---: | :---: | :---: | :---: | :---: | 
| Pantalla de feed del usuario | Resumen del viaje | Botón de archivado | Confirmación del archivado | Viaje archivado |

---

### Prueba 9: Restaurar un viaje

| **Fecha** | 02/05/2020  | **Versión** | 0.2.62 |  **Autor** | PABLO |
| --- | --- | --- | --- | --- | --- |
| **SO** | Windows | **Plataforma** | Web | **Estado** | Completada |

**Descripción del escenario inicial**:
Se valida que es posible restaurar un viaje borrado/archivado.

**Proceso**:
(1) Se hace click en el viaje que se quiera restaurar; (2) En el resumen del viaje saldrá un mensaje avisando de que el viaje está pendiente de borrar/archivado. Hacemos click en "Cancelar" situado al final del mensaje; (3)(4) El viaje pasa a estar activo de nuevo.
 
**Resultado esperado**:
El usuario puede restaurar un viaje borrado/archivado.

**Resultado final**:
El usuario ha restaurado un viaje.

**Imágenes**

| ![imagenes/t9/1.PNG](imagenes/t9/1.PNG) | ![imagenes/t9/2.PNG](imagenes/t9/2.PNG) | ![imagenes/t9/3.PNG](imagenes/t9/3.PNG) | ![imagenes/t9/4.PNG](imagenes/t9/4.PNG) | 
| :---: | :---: | :---: | :---: |
| Feed del usuario. Viaje borrado | Resumen del viaje | Viaje restaurado | Feed del usuario. Viaje restaurado |

---

### Prueba 10: Añadir usuario existente un viaje ya creado

| **Fecha** | 02/05/2020  | **Versión** | 0.2.62 |  **Autor** | PABLO |
| --- | --- | --- | --- | --- | --- |
| **SO** | Android/Windows | **Plataforma** | Web | **Estado** | Completada |

**Descripción del escenario inicial**:
Se valida que es posible añadir un usuario existente en la BBDD a un viaje y que al mismo le salga en su propia feed.

**Proceso**:
(1) Se hace click en el viaje al que se quiera añadir una persona; (2) Hacemos click en "Editar viaje" para añadir la persona nueva; (3) Añadimos el nuevo participante usando el correo con el que se ha registrado; (4) Iniciamos sesión con ese usuario y observamos su feed. Entramos en el viaje; (5) Vemos que sale el viaje creado por el otro usuario.
 
**Resultado esperado**:
El usuario puede añadir un usuario existente y que salga en su feed.

**Resultado final**:
El usuario ha añadido a otro usuario existente satisfactoriamente.

**Imágenes**

| ![imagenes/t10/1.PNG](imagenes/t10/1.PNG) | ![imagenes/t10/2.PNG](imagenes/t10/2.PNG) | ![imagenes/t10/3.PNG](imagenes/t10/3.PNG) | ![imagenes/t10/4.PNG](imagenes/t10/4.PNG) | ![imagenes/t10/5.PNG](imagenes/t10/5.PNG) | 
| :---: | :---: | :---: | :---: | :---: |
| Feed del usuario | Resumen del viaje | Añadir participante | Feed del segundo usuario | Resumen en el que se ve el viaje al que esta invitado |

---

### Prueba 11: Crear un nuevo gasto

| **Fecha** | 03/05/2020  | **Versión** | 0.2.62 |  **Autor** | PABLO |
| --- | --- | --- | --- | --- | --- |
| **SO** | Windows | **Plataforma** | Web | **Estado** | Completada |

**Descripción del escenario inicial**:
Teniendo un viaje creado, añadir un gasto vinculado a dicho viaje.

**Proceso**:
(1) Se hace click en el viaje; (2) Se hace click en el botón "Nuevo gasto"; (3) Aparece el formulario en pantalla; (4) Se rellena el formulario. En este caso cada persona paga una cantidad; (5) Se revisa en la pestaña de gastos.

**Resultado esperado**:
El gasto es creado y se ve reflejado en el resumen del viaje.

**Resultado final**:
Se crea el gasto correctamente

**Imágenes**

| ![imagenes/t11/1.PNG](imagenes/t11/1.PNG) | ![imagenes/t11/2.PNG](imagenes/t11/2.PNG) | ![imagenes/t11/3.PNG](imagenes/t11/3.PNG) | ![imagenes/t11/4.PNG](imagenes/t11/4.PNG) | ![imagenes/t11/5.PNG](imagenes/t11/5.PNG) |
| :---: | :---: | :---: | :---: | :---: |
| Click en el viaje | Nuevo gasto | Formulario nuevo gasto | Rellenar campos | Revisar que esté bien formado

---

### Prueba 12: Editar un gasto

| **Fecha** | 03/05/2020  | **Versión** | 0.2.62 |  **Autor** | PABLO |
| --- | --- | --- | --- | --- | --- |
| **SO** | Windows | **Plataforma** | Web | **Estado** | Completada |

**Descripción del escenario inicial**:
Existe un viaje con uno o varios gastos previamente creados.

**Proceso**:
(1) En el gasto hacemos click en "Editar gasto"; (2) Se abre el formulario gasto con los campos rellenos; (3) Se edita el gasto y se hace click en "Editar"; (4) Se revisa el gasto.

**Resultado esperado**:
El gasto es editado y los cambios se ven reflejados en el resumen del viaje.

**Resultado final**:
El gasto se ha editado correctamente

**Imágenes**

| ![imagenes/t12/1.PNG](imagenes/t12/1.PNG) | ![imagenes/t12/2.PNG](imagenes/t12/2.PNG) | ![imagenes/t12/3.PNG](imagenes/t12/3.PNG) | ![imagenes/t12/4.PNG](imagenes/t12/4.PNG) |
| :---: | :---: | :---: | :---: |
| Click en editar gasto | Formulario sin cambios | Formulario con cambios | Gasto editado

---

### Prueba 13: Borrar/Restaurar un gasto

| **Fecha** | 03/05/2020  | **Versión** | 0.2.62 |  **Autor** | PABLO |
| --- | --- | --- | --- | --- | --- |
| **SO** | Windows | **Plataforma** | Web | **Estado** | Completada |

**Descripción del escenario inicial**:
Existe un viaje creado donde se disponen de uno o varios gastos.

**Proceso**:
(1) Se hace click en el botón "Eliminar gasto"; (2) Se confirma el borrado; (3) Se va a gastos borrados; (4) Se hace click en "Restaurar gasto"; (5) Se comprueba que se ha restaurado.

**Resultado esperado**:
Los gastos pueden ser borrados, una vez borrados pueden ser restaurados correctamente.

**Resultado final**:
El gasto se ha borrado/restaurado correctamente

**Imágenes**

| ![imagenes/t13/1.PNG](imagenes/t13/1.PNG) | ![imagenes/t13/2.PNG](imagenes/t13/2.PNG) | ![imagenes/t13/3.PNG](imagenes/t13/3.PNG) | ![imagenes/t13/4.PNG](imagenes/t13/4.PNG) | ![imagenes/t13/5.PNG](imagenes/t13/5.PNG) |
| :---: | :---: | :---: | :---: | :---: |
| Click en eliminar gasto | Confirmación | Gastos eliminados. Click en restaurar | Confirmación de restaurado | Gasto restaurado |

---

### Prueba 14: Crear un nuevo pago

| **Fecha** | 03/05/2020  | **Versión** | 0.2.62 |  **Autor** | PABLO |
| --- | --- | --- | --- | --- | --- |
| **SO** | Windows | **Plataforma** | Web | **Estado** | Completada |

**Descripción del escenario inicial**:
Se dispone de un viaje con multiples participantes.

**Proceso**:
(1) Se hace click en el viaje; (2) Se hace click en "Nuevo pago"; (3) Se abre el formulario; (4) Se rellena el formulario; (5) Se comprueba el pago.

**Resultado esperado**:
Es posible crear un pago entre dos participantes y esté se ve reflejado en el resumen del viaje.

**Resultado final**:
El pago ha sido creado correctamente

**Imágenes**

| ![imagenes/t14/1.PNG](imagenes/t14/1.PNG) | ![imagenes/t14/2.PNG](imagenes/t14/2.PNG) | ![imagenes/t14/3.PNG](imagenes/t14/3.PNG) | ![imagenes/t14/4.PNG](imagenes/t14/4.PNG) | ![imagenes/t14/5.PNG](imagenes/t14/5.PNG) |
| :---: | :---: | :---: | :---: | :---: |
| Click en el viaje | Nuevo gasto | Formulario de gasto | Formulario relleno | Gasto creado

---

### Prueba 15: Borrar/Restaurar un pago

| **Fecha** | 03/05/2020  | **Versión** | 0.2.62 |  **Autor** | PABLO |
| --- | --- | --- | --- | --- | --- |
| **SO** | Windows | **Plataforma** | Web | **Estado** | Completada |

**Descripción del escenario inicial**:
Se dispone de un viaje con un pago.

**Proceso**:
(1) Se hace click en "Eliminar pago"; (2) Se confirma el borrado; (3) Se hace click en "Restaurar pago" en el pago eliminado; (4) Se confirma la restauración; (5) Se comprueba que se ha restaurado.

**Resultado esperado**:
El pago puede ser borrado y aparece en el apartado de viajes borrados. El pago puede ser restaurado.

**Resultado final**:
El pago ha sido borrado y restaurado

**Imágenes**

| ![imagenes/t15/1.PNG](imagenes/t15/1.PNG) | ![imagenes/t15/2.PNG](imagenes/t15/2.PNG) | ![imagenes/t15/3.PNG](imagenes/t15/3.PNG) | ![imagenes/t15/4.PNG](imagenes/t15/4.PNG) | ![imagenes/t15/5.PNG](imagenes/t15/5.PNG) |
| :---: | :---: | :---: | :---: | :---: |
| Click en borrar | Confirmar borrado | Click en restaurar | Confirmar restauración | Gasto borrado y restaurado

---

### Prueba 16: Resumen de cuentas correcto

| **Fecha** | 03/05/2020  | **Versión** | 0.2.62 |  **Autor** | PABLO |
| --- | --- | --- | --- | --- | --- |
| **SO** | Windows | **Plataforma** | Web | **Estado** | Completada |

**Descripción del escenario inicial**:
Se dispone de un viaje con multiples gastos y pagos.

**Proceso**:
(1) Se crean gastos; (2) Se crean gastos eliminados; (3) Se crean pagos; (4) Se crean pagos eliminados; (5) Se comprueban las cuentas de un participante; (6) Se comprueban las cuentas de un segundo participante.

**Resultado esperado**:
El resumen de cuentas pendientes entre participantes es correcto y se actualiza sin tener en cuenta gastos y pagos eliminados.

**Resultado final**:
El resumen de cuentas es correcto y se actualiza

**Imágenes**

| ![imagenes/t16/1.PNG](imagenes/t16/1.PNG) | ![imagenes/t16/2.PNG](imagenes/t16/2.PNG) | ![imagenes/t16/3.PNG](imagenes/t16/3.PNG) | ![imagenes/t16/4.PNG](imagenes/t16/4.PNG) | ![imagenes/t16/5.PNG](imagenes/t16/5.PNG) | ![imagenes/t16/6.PNG](imagenes/t16/6.PNG) |
| :---: | :---: | :---: | :---: | :---: | :---: |
| Gastos | Gastos eliminados | Pagos | Pagos eliminados | Comprobación 1 | Comprobación 2 |

---

### Prueba 17: Cambiar entre temas


| **Fecha** | 03/05/2020  | **Versión** | 0.2.62 |  **Autor** | PABLO |
| --- | --- | --- | --- | --- | --- |
| **SO** | Windows | **Plataforma** | Web | **Estado** | Completada |

**Descripción del escenario inicial**:
Un usuario de la aplicación con sesión iniciada.

**Proceso**:
(1) Se hace click botón arriba a la derecha representado con una persona; (2) Se hace click en perfil; (3) Se hace click en el tema que se quiera en los botones "Dark/Light"; (4) La página cambia de color; (5) Los cambios de color se mantienen.

**Resultado esperado**:
El usuario puede alternar entre los dos temas disponibles (Claro/Oscuro). El cambio es valido solo para el navegador actual.

**Resultado final**:
Es posible cambiar entre temas

**Imágenes**

| ![imagenes/t17/1.PNG](imagenes/t17/1.PNG) | ![imagenes/t17/2.PNG](imagenes/t17/2.PNG) | ![imagenes/t17/3.PNG](imagenes/t17/3.PNG) | ![imagenes/t17/4.PNG](imagenes/t17/4.PNG) | ![imagenes/t17/5.PNG](imagenes/t17/5.PNG) |
| :---: | :---: | :---: | :---: | :---: |
| Click en icono | Click en perfil | Botón de cambiar tema| El tema cambia | El tema se mantiene

---

### Prueba 18: Cambiar nombre de usuario

| **Fecha** | 03/05/2020  | **Versión** | 0.2.62 |  **Autor** | PABLO |
| --- | --- | --- | --- | --- | --- |
| **SO** | Windows | **Plataforma** | Web | **Estado** | Completada |

**Descripción del escenario inicial**:
Un usuario de la aplicación con sesión iniciada.

**Proceso**:
(1) Se hace click botón arriba a la derecha representado con una persona; (2) Se hace click en perfil; (3) Se ven los datos del perfil; (4) Se cambia el nombre y se da a "Guardar".

**Resultado esperado**:
El usuario puede cambiar el nombre de su cuenta.

**Resultado final**:
Es posible cambiar el nombre de usuario

**Imágenes**

| ![imagenes/t18/1.PNG](imagenes/t18/1.PNG) | ![imagenes/t18/2.PNG](imagenes/t18/2.PNG) | ![imagenes/t18/3.PNG](imagenes/t18/3.PNG) | ![imagenes/t18/4.PNG](imagenes/t18/4.PNG) |
| :---: | :---: | :---: | :---: |
| Click en icono | Click en perfil | Perfil | El nombre se cambia |

---

### Prueba 19: Cambiar contraseña

| **Fecha** | 03/05/2020  | **Versión** | 0.2.62 |  **Autor** | PABLO |
| --- | --- | --- | --- | --- | --- |
| **SO** | Windows | **Plataforma** | Web | **Estado** | Completada |

**Descripción del escenario inicial**:
Un usuario de la aplicación con sesión iniciada.

**Proceso**:
(1) Se hace click botón arriba a la derecha representado con una persona; (2) Se hace click en perfil; (3) Se hace click en el botón "Solicitar cambio de contraseña"; (4) Sale que ha sido solicitado; (5) Se va al correo y se hace click en el enlace; (6) Se pide nueva contraseña; (7) Contraseña cambiada; (8) Se vuelve a iniciar sesión; (9) Inicio de sesión correcto.

**Resultado esperado**:
El usuario puede solicitar y cambiar su contraseña.

**Resultado final**:
Es posible cambiar la contraseña

**Imágenes**

| ![imagenes/t19/1.PNG](imagenes/t19/1.PNG) | ![imagenes/t19/2.PNG](imagenes/t19/2.PNG) | ![imagenes/t19/3.PNG](imagenes/t19/3.PNG) | ![imagenes/t19/4.PNG](imagenes/t19/4.PNG) | ![imagenes/t19/5.PNG](imagenes/t19/5.PNG) | ![imagenes/t19/6.PNG](imagenes/t19/6.PNG) | ![imagenes/t19/7.PNG](imagenes/t19/7.PNG) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Click en cambio contraseña | Cambio solicitado | Correo | Contraseña nueva | Contraseña cambiada | Volver a iniciar sesión | Inicio correcto |

---


### Prueba 20: Presupuesto

| **Fecha** | 03/05/2020  | **Versión** | 0.2.62 |  **Autor** | PABLO |
| --- | --- | --- | --- | --- | --- |
| **SO** | Windows | **Plataforma** | Web | **Estado** | Completada |

**Descripción del escenario inicial**:
Un viaje sin un presupuesto asignado con gastos.

**Proceso**:
(1) Se crea viaje in presupuesto; (2) Se rellena con gastos; (3) Se comprueban los gastos; (4) Se edita el viaje; (5) Se añade presupuesto; (6) Se comprueba el presupuesto si se refleja.

**Resultado esperado**:
Es posible asignar un presupuesto a un viaje y el grafico de presupuesto es actualizado con los gastos no eliminados.

**Resultado final**:
El presupuesto se adecuá correctamente

**Imágenes**

| ![imagenes/t20/1.PNG](imagenes/t20/1.PNG) | ![imagenes/t20/2.PNG](imagenes/t20/2.PNG) | ![imagenes/t20/3.PNG](imagenes/t20/3.PNG) | ![imagenes/t20/4.PNG](imagenes/t20/4.PNG) | ![imagenes/t20/5.PNG](imagenes/t20/5.PNG) | ![imagenes/t20/6.PNG](imagenes/t20/6.PNG) |
| :---: | :---: | :---: | :---: | :---: | :---: |
| Sin presupuesto vació | Sin presupuesto relleno | Gastos | Editar Viaje | Añadir presupuesto | Presupuesto reflejado |

---

## Pruebas externas

En esta fase se incluye un resumen del feedback obtenido de posibles usuarios de la aplicación.
El formulario usado es el siguiente: https://forms.gle/UdqMDLPismvTzduZ9

| Pregunta | Respuesta | 
| --- | --- |
| Plataforma | xx% PC Escritorio <br> xx% Navegador móvil <br> xx% App Android |
| Valoración media del sitio | |
| Valoración media de facilidad de uso | |
| Valoración media de utilidad del sitio web  | |

Problemas detectados: 
- NA

Resumen de sugerencias:
- NA


## Tracking de errores

Durante la fase final del proyecto sé implemento un sistema de tracking de errores. El servicio se llama [Rollbar](https://rollbar.com/) y permite
auditar en la aplicación en tiempo de ejecución. El funcionamiento es sencillo, al generarse un error este es enviado a la API de Rollbar donde 
los desarrolladores del proyecto obtienen un resumen detallado para poder darle solución. 

Durante este proceso se han detectado los siguientes errores en la aplicación gracias a Rollbar:

| Issue | Resumen error | Notas adicionales | Estado | 
| --- | --- | --- | --- |
| #46 | TypeError: Cannot read property 'data' of undefined | | Solucionado |
| #47 | TypeError: Cannot read property 'style' of undefined | | Solucionado |
| #48 | FirebaseError: Missing or insufficient permissions. | | Solucionado |
| #50 | FirebaseError: Function DocumentReference.set() called with invalid data. | | Solucionado |
| #53 | TypeError: undefined is not a function | Solucionado de manera indirecta | Solucionado |
| #55 | FIRESTORE (7.13.2) INTERNAL ASSERTION FAILED | | Solucionado |
| #56 | ReferenceError: Proxy is not defined | IE no esta soportado (Limitado por Angular) | Solucionado |
| #57 | Error: This browser is not supported or 3rd party cookies and data may be disabled. | | Solucionado |
| #59 | TypeError: Cannot read property '********@gmail.com' of undefined | | Solucionado |
| #60 | Firebase: No Firebase App '[DEFAULT]' has been created | | Solucionado |

Los detalles como autor, fechas y solución se encuentran disponibles dentro del issue. 
Todos los issues generado vía Rollbar disponen de la etiqueta [Rollbar](https://gitlab.com/pabil/bote-dw/-/issues?scope=all&utf8=%E2%9C%93&state=all&label_name[]=Rollbar)
