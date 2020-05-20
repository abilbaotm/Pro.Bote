# Ejecutar código en local de manera nativa

Para poder ejecutar el proyecto de manera nativa el sistema host necesitará las siguientes tecnologías: 
- Git
- Node.js

Las siguientes instrucciones son válidas para linux/windows

Clonar repositorio
```
git clone https://gitlab.com/pabil/bote-dw
cd bote-dw
```

## Instalar dependencias del proyecto

Este proyecto requiere de múltiples dependencias descritas en el paquete [pacakage.json](package.json), para proceder a 
la instalación es necesario el siguiente comando:
```
npm install
```
Este proceso creará la carpeta `node_modules`.

## Ejecutar proyecto

Angular pone a nuestra disposicion con la ayuda de node.js un servidor diseñado para desarrollar y probar este proyecto en local.
Es posible lanzar el servidor con esta aplicación web con el siguiente comando:

```
ng serve
```


---

[Inicio documentación](../README.md) - [>>Siguiente Documento >>](cordova.md)
