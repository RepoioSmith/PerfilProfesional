# 🚀 Portafolio Profesional & Task Manager

Este repositorio contiene el código fuente de mi Portafolio Profesional Web, el cual incluye un sistema integrado de **Gestión de Tickets (Task Manager)** con autenticación y un panel de administración (Dashboard).

El proyecto demuestra habilidades Full Stack utilizando **Python (Flask)** para el backend y **JavaScript/Bootstrap** para el frontend, implementando prácticas modernas de DevOps como **Docker** y **CI/CD**.

---

## 📋 Características

### 🌐 Frontend (Público)
- **Diseño Responsivo:** Creado con HTML5, CSS3 y Bootstrap 5.
- **Showcase de Proyectos:** Sección dinámica para mostrar trabajos destacados.
- **Formulario de Contacto:** Integración funcional con **Formspree** para envío de correos.

### 🔐 Backend & Dashboard (Privado)
- **Autenticación Segura:** Registro e Inicio de Sesión usando **JWT (JSON Web Tokens)**.
- **Gestión de Tickets (CRUD):**
  - Crear tickets con prioridades (Alta, Media, Baja).
  - Visualizar listado de tareas.
  - Eliminar tickets con confirmación de seguridad.
- **API RESTful:** Backend construido con Flask para servir datos al frontend.
- **Base de Datos:** Conexión a **MongoDB** para persistencia de usuarios y tickets.

---

## 🛠️ Tecnologías Utilizadas

### Backend
- ![Python](https://img.shields.io/badge/Python-3.13-blue)
- **Flask:** Framework principal.
- **Flask-PyMongo:** Conector para MongoDB.
- **Flask-JWT-Extended:** Manejo de autenticación.
- **Flask-Bcrypt:** Hashing de contraseñas.
- **Flask-CORS:** Manejo de seguridad Cross-Origin.

### Frontend
- ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) ![Bootstrap](