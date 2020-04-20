# Ejecutar codigo en local

Para poder ejecutar el codigo en local necesitaras las siguinetes tecnologias instaladas en tu ordenador:
- Docker
- Git


##Instrucciones 
Las siguientes instrucciones son validas para linux/windows

Clonar repositorio
```bash
git clone https://gitlab.com/pabil/bote-dw
cd bote-dw
```

Compilar docker

```bash
docker build . -t probote
```
Ejectura docker
```bash
docker run -it -p 8080:80 probote
```

El servidor de pruebas estara disponible en http://localhost:8080/
