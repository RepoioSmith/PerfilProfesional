# Usamos una imagen ligera de Python (la versión 3.13 que usas localmente)
FROM python:3.13-slim

# Evita que Python genere archivos .pyc y permite ver logs en tiempo real
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# 1. Copiamos solo los requirements primero (para aprovechar la caché de Docker)
COPY requirements.txt .

# 2. Instalamos las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# 3. Copiamos el resto del código del Backend
COPY . .

# Exponemos el puerto 5000
EXPOSE 5000

# COMANDO DE ARRANQUE:
# Usamos Gunicorn (servidor de producción) en lugar de 'python run.py'
# -w 4: Usa 4 "workers" para manejar más tráfico simultáneo
# -b 0.0.0.0:5000: Escucha en todas las interfaces en el puerto 5000
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "run:app"]