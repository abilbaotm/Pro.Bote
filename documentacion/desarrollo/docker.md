# Ejecutar código en local usando Docker

Para poder ejecutar el código en local necesitarás las siguientes tecnologías instaladas en tu ordenador:
- Docker
- Git


## Instrucciones 
Las siguientes instrucciones son válidas para linux/windows

Clonar repositorio
```bash
git clone https://gitlab.com/pabil/bote-dw
cd bote-dw
```

Compilar Docker

```bash
docker build . -t probote
```
Efectuar Docker
```bash
docker run -it -p 8080:80 probote
```

El servidor de pruebas estará disponible en http://localhost:8080/


## Base de datos

Hay que tener en cuenta que por defecto se usará la base de datos de `dw-bote.firebaseapp.com`. Para poder usar una base 
de datos propia consulta el apartado de [Despliegue](../README.md#manual-de-despliegue)

---

[Inicio documentación](../README.md) - [>>Siguiente Documento >>](local.md)
