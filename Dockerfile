# imagen1:dependencias - instalacion de dependencias solo si son requeridas
FROM node:19-alpine3.15 AS deps
#esto permite tener las depedencias en memoria cache y usarlas se requieran
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# imagen2:build - construccion de la aplicacion con las dependencias en la memoria cache
FROM node:19-alpine3.15 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# imagen3:production - imagen de produccion, copia todos los archivos y correrlo
FROM node:19-alpine3.15 AS runer

# establecer el directorio de trabajo
WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install --prod

COPY --from=builder /app/dist ./dist

CMD ["node", "dist/main"]
