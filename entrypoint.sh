#!/bin/sh
# entrypoint.sh

# Reemplaza el placeholder ${API_URL} en el archivo index.html
# con el valor de la variable de entorno API_URL, y guarda el resultado 
# en un nuevo archivo temporal, luego reemplaza el original.

# La variable de entorno API_URL se inyecta desde docker-compose.yml

# La instrucción 'envsubst' reemplaza variables de shell ($VAR)
# Es más robusto que un simple 'sed' para este propósito.
# Asegúrate de que envsubst está disponible en la imagen base (nginx:alpine lo tiene).
envsubst '$$API_URL' < /usr/share/nginx/html/index.html > /tmp/index.html
mv /tmp/index.html /usr/share/nginx/html/index.html

# Ejecuta el comando principal de Nginx
exec nginx -g 'daemon off;'