# 🖥️ CryptoInvestment Frontend (SPA)

Esta es la aplicación web (SPA) que sirve como panel para que los usuarios consulten, visualicen y gestionen su portafolio de criptomonedas en tiempo real.

---

## 🚀 Tecnologías principales

- **React.js** + **Vite** (Single Page Application)
- **Lightweight Charts** (gráficos de precios)
- **WebSocket** (actualización en tiempo real)
- **REST API** (comunicación con el backend Node.js)

---

## 📌 Características principales

- Selección y visualización de criptomonedas personalizadas.
- Visualización de precio, cambio porcentual y volumen en tiempo real.
- Actualización automática sin recargar la página (WebSocket).
- Historial de precios con consultas por rango de fechas.
- Interfaz responsiva para móviles, tablets y desktop.
- Autenticación de usuario (login, registro, JWT).
- Gestión de favoritos y preferencias de usuario.

---

## ⚙️ Instalación y configuración

1. Entra a la carpeta `frontend`:
  ```bash
  cd frontend
  ```
2. Instala dependencias:
  ```bash
  npm install
  ```
3. Ejecuta la aplicación en modo desarrollo:
  ```bash
  npm run dev
  ```
4. (Opcional) Configura el archivo `.env` si necesitas personalizar la URL del backend u otras variables.

---

## 🔌 Comunicación con el backend

- **REST API:**
  - Consulta de criptomonedas, historial, login, registro, favoritos, etc.
- **WebSocket:**
  - Actualización en tiempo real de precios y notificaciones.
  - El frontend se conecta usando el JWT obtenido tras el login:
    ```js
    const ws = new WebSocket('ws://localhost:3001/?token=TU_JWT_AQUI');
    ```

---

## 📦 Estructura sugerida

```
src/
  components/      # Componentes reutilizables (gráficos, tablas, etc.)
  pages/           # Vistas principales (Dashboard, Login, Registro, etc.)
  services/        # Lógica de comunicación con el backend (API, WebSocket)
  hooks/           # Custom hooks (ej: useAuth, useCryptoData)
  styles/          # Estilos globales y por componente
```

---

## 🧪 Pruebas

- Pruebas funcionales: selección y visualización de criptos, consulta histórica, login/registro.
- Pruebas no funcionales: responsividad, velocidad de actualización, experiencia de usuario.

---

## 👨‍💻 Autor

Frontend desarrollado por @pedrozopayares [Javier Pedrozo] como parte del reto **CryptoInvestment**.
