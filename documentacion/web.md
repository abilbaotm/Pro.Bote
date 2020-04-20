# Ejecutar código en local

Para poder ejecutar el código en local necesitaras las siguientes tecnologías instaladas en tu ordenador:
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

Hay que tener en cuenta que por defecto se usara la base de datos de dw-bote.firebaseapp.com. Para poder usar una base 
de datos propia consulta el documento [basededatos.md](basededatos.md)
