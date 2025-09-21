# Mini CRUD Seguro – Frontend (React/Vite)

Frontend para el Mini CRUD Seguro de Tareas. Sigue estos pasos **la primera vez** que clones el proyecto.

## 🚀 Requisitos
- Node.js 18+ (recomendado 20) y npm
- Git
- Backend corriendo (NestJS) o URL de API

## 📦 Clonar e instalar
```bash
git clone https://github.com/5Cristian/CRUD_FRONTEND.git
cd CRUD_FRONTEND
npm ci
```

> Si no tienes `package-lock.json`, usa `npm install`.

## 🔐 Variables de entorno
Crea un archivo **.env** en la raíz del proyecto con la URL del backend:

```env
# URL del backend (NestJS)
VITE_API_URL=http://localhost:3000
```

> En producción, apunta a tu dominio o IP pública. No subas `.env` con credenciales.

## ▶️ Ejecutar en desarrollo
```bash
npm run dev
```
La app quedará (por defecto) en `http://localhost:5173`

## 🔗 Flujo básico
1. **Registro/Login** contra `VITE_API_URL` → obtiene _token JWT_.
2. El token se guarda (ej. `localStorage`) y se envía en cada request:
   - Header: `Authorization: Bearer <token>`
3. CRUD de tareas:
   - Listar, crear, ver, actualizar y eliminar.

## 🧪 Pruebas (si están configuradas)
```bash
npm test
```

## 🏗️ Construir para producción
```bash
npm run build
npm run preview     # previa local del build
```

## ✅ Checklist de primer uso
- [ ] Node instalado
- [ ] `.env` creado con `VITE_API_URL`
- [ ] Dependencias instaladas (`npm ci`)
- [ ] App corriendo (`npm run dev`)

---

> ¿Problemas comunes?
> - **CORS** → Asegúrate de permitir el origen del frontend en el backend.
> - **404 al hacer fetch** → Revisa `VITE_API_URL` y que el backend esté levantado.
> - **Variables de entorno no leídas** → En Vite deben empezar con `VITE_`.
