# La Ruta del Cóndor: Exploradores del Ecuador

Aplicación web educativa interactiva para **5.º de EGB (8 a 9 años)** sobre las regiones naturales, provincias, relieve y tradiciones del Ecuador, con trato formal pedagógico de «usted».

---

## 🌟 Características Principales

1. **Privacidad Infantil y Espacio Seguro:**
   - Ingreso únicamente mediante **código de clase o alias** (ejemplo: `CONDOR-07`, `JaguarAzul`).
   - No recopila nombres reales, correos electrónicos ni información de identificación personal (IIP).

2. **12 Estaciones en las 4 Regiones Naturales:**
   - **Costa:** Manabí, Llanuras del Litoral y Marimba.
   - **Sierra:** Pichincha y Andes, Volcanes del Callejón Interandino y Fiestas del Sol (Inti Raymi).
   - **Amazonía:** Biodiversidad de Napo/Yasuní, Bosque Lluvioso y Pueblos Ancestrales.
   - **Galápagos:** Islas Volcánicas, Fauna Única (Tortugas e Iguanas) y Guardianes de la Reserva.

3. **Herramientas de Clase para el Docente:**
   - **Selector de cronómetro por pregunta:** Sin límite, 20s, 30s (recomendado), 45s o 60s. Alerta visual suave en los últimos 5 segundos.
   - **Configuración de vidas:** 1 a 10 vidas o sin límite. Ganancia de +1 vida al completar cada estación y mensaje amable sin descalificación abrupta al llegar a 0.
   - **Lectura en voz alta accesible:** Botones con voz para cada indicación, pregunta y retroalimentación mediante Web Speech API.
   - **Exportación de resultados:** Descarga directa en **CSV** y **JSON** para el registro de calificaciones del docente.

4. **Tecnología Ligera y Despliegue Estático:**
   - **Cero dependencias externas:** Todos los gráficos (Tupak, mapa, avatares, paisajes e insignias) son **SVG inline** generados por código.
   - No requiere Node.js, compilación ni servidor backend para funcionar. Se puede abrir haciendo doble clic en `index.html`.

---

## 🚀 Cómo Publicar en GitHub

1. Cree un nuevo repositorio en [GitHub](https://github.com/new) (puede ser público o privado).
2. Suba todos los archivos de esta carpeta (`index.html`, `netlify.toml`, `.gitignore`, `css/` y `js/`).
3. El archivo `.gitignore` ya está configurado para evitar que suba claves o archivos basura de su computadora.

---

## 🌐 Cómo Desplegar en Netlify

### Opción A: Despliegue Rápido (Netlify Drop)
1. Inicie sesión en [Netlify](https://app.netlify.com/).
2. Vaya a la sección **Sites** y arrastre la carpeta `la-ruta-del-condor` (o el archivo `.zip`) a la zona de **Netlify Drop**.
3. En pocos segundos tendrá una dirección web pública lista para compartir con sus estudiantes.

### Opción B: Conexión con GitHub
1. En Netlify, elija **Add new site > Import an existing project > GitHub**.
2. Seleccione su repositorio.
3. Deje el campo **Build command** vacío y en **Publish directory** escriba `.` (o déjelo por defecto).
4. Haga clic en **Deploy**. Cada cambio que suba a GitHub se actualizará automáticamente.

---

## 📋 Configurar su Encuesta Docente

El botón *"Ir a la encuesta de satisfacción"* al final de la expedición utiliza la variable `SURVEY_URL`.
Para colocar su propio enlace de **Google Forms** o **Microsoft Forms**:

1. Abra el archivo `js/data.js`.
2. En la línea 12, reemplace el enlace de ejemplo:
   ```javascript
   const SURVEY_URL = window.__ENV__?.SURVEY_URL || 'https://forms.gle/su-formulario-aqui';
   ```
3. O si lo prefiere en Netlify, agregue la variable de entorno `SURVEY_URL` en: **Site configuration > Environment variables**.
