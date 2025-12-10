# ----------------------------------------------------------------------
# ETAPA 1: BUILDER (Construcción de la Aplicación React)
# Utilizamos una imagen robusta de Node.js para instalar dependencias y compilar.
# ----------------------------------------------------------------------
FROM node:20-alpine AS builder

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración de dependencias (package.json y package-lock.json)
# Esto optimiza el caché: si las dependencias no cambian, Docker no reinstala.
COPY package*.json ./

# Instala todas las dependencias del proyecto
RUN npm install

# Copia el resto del código fuente del proyecto
COPY . .

# Ejecuta el comando de construcción de React. 
# Esto genera los archivos estáticos optimizados en la carpeta 'build'.
RUN npm run build

# ----------------------------------------------------------------------
# ETAPA 2: PRODUCTION (Servidor de Producción Ligero)
# Utilizamos Nginx Alpine, que es muy pequeño y solo sirve los archivos estáticos.
# ----------------------------------------------------------------------
FROM nginx:alpine AS production

# Copia los archivos de configuración de Nginx (si tuvieras un archivo 'nginx.conf' personalizado)
# Si no tienes uno personalizado, Nginx usará la configuración por defecto.
# Opcional: COPY nginx.conf /etc/nginx/conf.d/default.conf

# Remueve la configuración por defecto para simplificar
RUN rm /etc/nginx/conf.d/default.conf

# Agrega una configuración simple para servir archivos estáticos (Necesario para React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos compilados desde la etapa 'builder'
# La carpeta 'build' generada por 'npm run build' contiene la aplicación.
COPY --from=builder /app/build /usr/share/nginx/html

# Puerto por defecto de Nginx
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]