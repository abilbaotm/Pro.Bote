# CI/CD

Este proyecto usa Gitlab-CI/CD para su integración y despliegue. Este documento realiza un resumen de las tareas
que se ejecutan en este servicio

## Tareas

| stage | nombre | tarea | ramas |
| ----- | ------ | ----- | ----- |
| .pre | prerequisites | Instalar todas las dependencias necesarias | Todas | 
| .pre | get_version | Solicitar a función [vPublicacion](../despliegue/functions.md#vpublicacion) la versión de publicación a usar en esta build | Exclusiva `master` |
| build | build_web | Genera la versión web del proyecto | Todas |
| build | build_android | Genera el proyecto para Android | Todas |
| deploy | deploy_web | Despliega el sitio web generado por `build_web`  | Exclusiva `master` |
| deploy | deploy_android | Despliega la aplicación generada por `build_android` | Exclusiva `master` |


Las tareas de este proyecto se encuentran definidas en el fichero [/.gitlab-ci.yml](/.gitlab-ci.yml)


---

[Inicio documentación](../README.md)
