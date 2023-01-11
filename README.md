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

4. Clonar el archivo ````.env.template``` y renombrar la copia a ```.env```

5. Levantar la imagen de la base de datos
```
docker-compose up -d
```

6. Llenar las variables de entorno definidas en el ```.env```

7. Ejecutar la aplicación en el dev
```
npm run start:dev
```

8. Reconstruir la base de datos con nuestro semilla de 650 pokemon
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