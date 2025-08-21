# INFORME TÉCNICO: CryptoInvestment

## Descripción General

CryptoInvestment es una aplicación web fullstack diseñada para que inversores en criptomonedas puedan visualizar, analizar y gestionar un portafolio personalizado de activos digitales. El sistema ofrece precios en tiempo real, historial de precios, métricas de mercado y una experiencia de usuario responsiva y moderna. La arquitectura integra un frontend SPA en React/Vite y un backend Node.js/Express, con persistencia en MySQL y comunicación en tiempo real vía WebSocket.

---

## Arquitectura y Tecnologías

### Frontend
- **Framework:** React.js + Vite (SPA)
- **Gráficos:** Lightweight Charts (TradingView)
- **Comunicación:** REST API y WebSocket (actualización en tiempo real)
- **Gestión de estado:** Redux Toolkit
- **Estilos:** TailwindCSS
- **Autenticación:** JWT (manejo de sesión y protección de rutas)
- **Responsividad:** Adaptado a móviles, tablets y desktop

### Backend
- **Framework:** Node.js + Express
- **Base de datos:** MySQL
- **ORM:** Drizzle ORM (tipado y migraciones)
- **Autenticación:** JWT
- **WebSocket:** ws (actualización de precios y notificaciones en tiempo real)
- **Integración externa:** CoinMarketCap API (datos de mercado)

---

## Funcionalidades Técnicas Clave

- **Selección y visualización de criptomonedas personalizadas**
- **Actualización automática y en tiempo real** (WebSocket y polling)
- **Historial de precios** con consultas por rango de fechas
- **Gestión de favoritos y preferencias de usuario**
- **Autenticación segura** (login, registro, JWT)
- **Persistencia robusta** en MySQL
- **Interfaz responsiva** y experiencia fluida

---

## Comunicación y Flujos de Datos

### REST API
- Consulta de criptomonedas, historial, login, registro, favoritos, etc.
- Endpoints protegidos por JWT para operaciones de usuario

### WebSocket
- Actualización en tiempo real de precios y notificaciones
- Conexión autenticada mediante JWT como query param
- Permite recibir eventos broadcast desde el backend

#### Ejemplo de conexión WebSocket:
```js
const ws = new WebSocket('ws://localhost:3001/?token=TU_JWT_AQUI');
ws.onopen = () => ws.send('Hola WebSocket');
ws.onmessage = (event) => console.log('Mensaje:', event.data);
ws.onclose = (event) => console.log('Cerrado:', event.code, event.reason);
```

---


## Base de Datos

El sistema utiliza MySQL como motor de base de datos relacional, garantizando integridad y consistencia en la gestión de la información. El modelo de datos está optimizado para operaciones de consulta y escritura frecuentes, con tablas principales para criptomonedas (`cryptocurrencies`), historial de precios (`prices`), usuarios (`users`) y favoritos de usuario (`user_favorites`). Se emplean claves foráneas para mantener la integridad referencial entre usuarios, monedas y precios. El backend accede a la base de datos mediante Drizzle ORM, lo que permite migraciones tipadas y consultas seguras. Además, los índices en campos clave (como `cryptocurrencyId`, `userId` y `createdAt`) mejoran el rendimiento en búsquedas y agregaciones, especialmente para el historial y los favoritos. La estructura está preparada para escalar y soportar grandes volúmenes de datos históricos y operaciones concurrentes.

---

## Estructura del Proyecto

```
/crypto-investment
  /frontend
    src/components/
    src/pages/
    src/services/
    src/hooks/
    src/styles/
  /backend
    src/controllers/
    src/middleware/
    src/routes/
    src/services/
    src/db/
```

---

## Instalación y Puesta en Marcha

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/pedrozopayares/cryptoinvestment.git
   ```
2. **Backend:**
   - Instalar dependencias, configurar `.env` (MySQL, JWT, API Key CoinMarketCap), y ejecutar con `npm run build && npm start`.
3. **Frontend:**
   - Instalar dependencias y ejecutar con `npm run dev`.

---

## Pruebas y Validación
- Pruebas funcionales: selección y visualización de criptos, consulta histórica, login/registro.
- Pruebas no funcionales: responsividad, velocidad de actualización, experiencia de usuario.
- Pruebas de integración: comunicación REST y WebSocket, persistencia y actualización en tiempo real.

---

## Autoría

Desarrollado por @pedrozopayares [Javier Pedrozo] como parte del reto **CryptoInvestment**.
