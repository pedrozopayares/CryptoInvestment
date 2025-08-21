
# 🛠️ CryptoInvestment Backend (Node.js API)

Este backend provee una API REST y WebSocket para la gestión y consulta de criptomonedas, usuarios y favoritos, con autenticación JWT y persistencia en MySQL.

---

## 🚀 Tecnologías principales

- **Node.js** + **Express**
- **MySQL** (persistencia)
- **Drizzle ORM** (acceso a datos tipado)
- **JWT** (autenticación)
- **WebSocket** (`ws`, tiempo real)

---

## 📦 Instalación y configuración

1. Clona el repositorio.
2. Cambia el nombre del archivo de entorno y configúralo:
	```bash
	cp .env.example .env
	# Edita las variables de conexión a MySQL, JWT_SECRET y API Key de CoinMarketCap
	```
3. Entra a la carpeta backend:
	```bash
	cd backend
	```
4. Levanta los servicios con Docker:
	```bash
	docker-compose up --build
	```
5. Espera a que la base de datos esté lista y luego ejecuta las migraciones de Drizzle:
	```bash
	npm run db:push
	```

---

## 🔑 Autenticación y rutas principales

### REST API

- `POST   /api/v1/auth/register` — Registro de usuario
- `POST   /api/v1/auth/signin`   — Login, retorna JWT
- `POST   /api/v1/auth/signout`  — Logout (invalida JWT)
- `GET    /api/v1/auth/user`     — Usuario autenticado (requiere JWT)
- `GET    /api/v1/admin/user`    — Usuario autenticado (requiere JWT, ruta protegida)

### WebSocket (tiempo real)

- **URL:** `ws://localhost:3001/?token=TU_JWT_AQUI`
- Solo usuarios autenticados pueden conectar (el backend valida el JWT al conectar)
- Permite enviar y recibir mensajes en tiempo real

---

## 📂 Estructura relevante

```
src/
  controllers/    # Lógica de endpoints (REST)
  middleware/      # Middlewares (ej: tokenValidation)
  routes/          # Definición de rutas Express
  services/        # Lógica de negocio y acceso a datos
  db/              # Conexión y esquema Drizzle
```

---

## 🗄 Modelo de base de datos (MySQL)

- **cryptocurrencies**: Info básica de cada cripto
- **prices**: Historial de precios
- **users**: Usuarios registrados (autenticación)
- **user_favorites**: Favoritos de usuario

---

## 🧪 Pruebas

Puedes probar los endpoints con Postman, Insomnia o curl. Ejemplo de registro:

```bash
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"usuario","email":"correo@ejemplo.com","password":"secreto"}'
```

---

## 🔌 WebSocket: ejemplo de conexión

```js
const ws = new WebSocket('ws://localhost:3001/?token=TU_JWT_AQUI');
ws.onopen = () => ws.send('Hola WebSocket');
ws.onmessage = (event) => console.log('Mensaje:', event.data);
ws.onclose = (event) => console.log('Cerrado:', event.code, event.reason);
```

---

## 👨‍💻 Autor

Desarrollado por @pedrozopayares [Javier Pedrozo] para el reto **CryptoInvestment**.
