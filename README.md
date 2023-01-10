<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en el desarrollo

1. Clonar el repositorio
2. Tener nest-CLI instalado
```
npm i -g @nestjs/cli
```
3. Ejecutar
```
npm i
```
4. Levantar la imagen de la base de datos
```
docker-compose up -d
```
5. Reconstruir la base de datos con nuestro semilla de 650 pokemon
```
localhost:3000/api/seed/
```

## Stack usado
* MongoDB
* Nest

## Importante
* Instalar la version menor de Axios funcional en Nest
```
npm i axios@0.27.2
```