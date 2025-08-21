
# 📊 CryptoInvestment

CryptoInvestment es una aplicación web **fullstack** que permite a un grupo de inversores en criptomonedas visualizar el rendimiento de un conjunto personalizado de criptos, con precios actualizados, cambios porcentuales y volumen de mercado en tiempo real, además de un historial consultable por rango de fechas.  

---

## 🚀 Tecnologías

- **Frontend:** React.js + Vite (SPA, Single Page Application)
- **Backend:** Node.js + Express
- **Base de datos:** MySQL
- **API de datos:** [CoinMarketCap API](https://coinmarketcap.com/api/) (clave API gratuita)
- **Gráficos:** [Lightweight Charts](https://www.tradingview.com/lightweight-charts/)
- **Control de versiones:** Git + GitHub

---

## 📌 Características principales

- Selección de criptomonedas personalizadas.
- Visualización de precio, cambio porcentual y volumen en tiempo real.
- Actualización automática sin recargar la página.
- Historial de precios con consultas por rango de fechas.
- Interfaz responsiva para múltiples dispositivos.
- Persistencia de datos en MySQL.

---

## 📂 Estructura del proyecto

```

/frontend
/backend

````

---

## ⚙️ Instalación y configuración

### 1. Clonar repositorios
```bash
git clone https://github.com/pedrozopayares/cryptoinvestment.git
````



### 2. Configurar el backend

```bash
# 1. Cambia el nombre del archivo de entorno y configúralo
cp .env.example .env
# 2. Entra a la carpeta backend
cd backend
# 3. Levanta los servicios con Docker
docker-compose up --build
# 4. Espera a que la base de datos esté lista y luego ejecuta las migraciones de Drizzle
npm run db:push
```



### 3. Configurar el frontend

```bash
# 1. Entra a la carpeta frontend
cd frontend
# 2. Instala dependencias
npm install
# 3. Ejecuta la aplicación en modo desarrollo
npm run dev
```

---

## 🗄 Modelo de base de datos (MySQL)

Tablas principales:

* **cryptocurrencies**: Información básica de cada criptomoneda.
* **prices**: Historial de precios y métricas.
* **users** *(opcional)*: Para autenticación y preferencias de usuario.

Modelo ER:
*(Incluir aquí el diagrama generado en formato PNG o enlace a la herramienta usada)*

---

## 🔌 Integración con CoinMarketCap API

* Endpoint listado de criptos: `/v1/cryptocurrency/listings/latest`
* Endpoint datos actuales: `/v1/cryptocurrency/quotes/latest`
* Endpoint histórico: `/v1/cryptocurrency/ohlcv/historical`

Las pruebas de endpoints se realizaron con **Postman** antes de la implementación.

---

## 🧪 Pruebas

* **Pruebas funcionales**:

  * Selección y visualización de criptos.
  * Consulta histórica por rango de fechas.
* **Pruebas no funcionales**:

  * Responsividad en móviles, tablets y desktop.
  * Velocidad de actualización.
  * Uso eficiente de recursos.

---

## 📦 Entregables

* Repositorios GitHub de frontend y backend.
* Script SQL de la base de datos.
* Modelo ER.
* Vídeo explicativo de la arquitectura, componentes y flujo de datos.

---

## 👨‍💻 Autor

Proyecto desarrollado por @pedrozopayares [Javier Pedrozo] como parte del reto **CryptoInvestment**.
