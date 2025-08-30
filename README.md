# NexoMentorAI - Sitio Web Educativo para Modelos de Lenguaje Grandes (LLM)

<project>
  <name>NexoMentorAI</name>
  <description>Plataforma educativa interactiva especializada en Modelos de Lenguaje de Gran Escala (LLM).</description>
  <keywords>LLM, educación, simulador, aprendizaje, inteligencia artificial, modelos de lenguaje, recursos educativos</keywords>
  <author>Equipo NexoMentorAI</author>
  <contact>contacto@nexomentorai.com</contact>
  <license>MIT</license>
</project>

---

## 📚 Descripción general

NexoMentorAI es un sitio web educacional que permite a usuarios aprender sobre Modelos de Lenguaje de Gran Escala a través de módulos teóricos, recursos didácticos y un simulador interactivo de entrenamiento LLM. 

El sitio incluye:

- Navegación con menús desplegables y barra de búsqueda filtrada para recursos.
- Páginas de inicio estéticamente diseñadas con paleta amarilla y gradientes modernos.
- Módulos de aprendizaje desplegables con contenido accesible y visual.
- Recursos organizados con búsqueda dinámica y filtros por tipo.
- Simulador con patrón de diseño avanzado (State, Observer, Command, Factory) para simular etapas de entrenamiento, métricas con gráficos animados y control de estado.
- Formularios de inicio de sesión y registro, integrando autenticación con Google.

---

## 🚀 Páginas y Funcionalidades

### Navbar

- Logo y menús desplegables accesibles.
- Barra de búsqueda y filtros que interactúan en tiempo real con la lista de recursos.

### Inicio

- Hero section con llamada a la acción.
- Sección de módulos destacados y beneficios.

### Módulos

- Acordeones para despliegue de contenido detallado con iconos, resúmenes y enlaces a simulador o recursos.

### Recursos

- Tarjetas dinámicas filtrables por tipo y buscables por texto con interfaz interactiva.

### Simulador

- Paleta de colores inspirada en amarillos vibrantes con gradientes suaves.
- Controles para cargar dataset, preprocesar, entrenar, mostrar resultados y reiniciar.
- Visualización en canvas de métricas Loss y Accuracy con animación suave.
- Estado y flujo visual indicativo de progreso y pasos completados.
- Resultados detallados al mostrar resultados, habilitación dinámica de botones según estado.

### Inicio de sesión / Registro

- Formularios accesibles y responsivos para login y registro.
- Integración con Google Identity Services para autenticación con cuenta Google.

---

## 🎨 Diseño y Paleta de Colores

:root {
--accent: #ffbb00; /* Amarillo principal /
--accent-2: #ffd166; / Amarillo secundario claro /
--bg: #0b1020; / Fondo oscuro /
--text: #222218; / Texto oscuro /
--text-light: #fff8dc; / Texto claro /
--danger: #ff6b6b; / Error / alerta rojo /
--warn: #ffd166; / Advertencia amarillo */
}


Estilos modernos con gradientes, tipografía limpia y diseño responsive basado en CSS Grid y Flexbox.

---

## 🛠 Arquitectura y Patrones de Diseño

- **State:** Manejo de estados de simulador (Idle, DatasetLoaded, Preprocessed, Training, Finished).
- **Observer:** Notificación de cambios en métricas para actualización gráfica.
- **Command:** Encapsulación de acciones ejecutables desde UI.
- **Factory:** Generación de datos sintéticos para simular datasets y métricas.

---

## 📂 Estructura de Archivos clave

- `/index.html` - Página Inicio
- `/pages/modulos.html` - Pagina de módulos educativos
- `/pages/recursos.html` - Página de recursos con filtros y búsqueda
- `/pages/simulacion.html` - Simulador interactivo LLM
- `/pages/inicio-sesion.html` - Login/Registro con Google Sign-In
- `/css/navbar.css` - Estilos para el navbar
- `/css/styles.css` - Estilos generales y paleta
- `/img/` - Imágenes de iconos, logo y módulos
- `/docs/` - Documentos y materiales educativos

---

## ⚙️ Configuración y Ejecución

- No requiere backend: simulador y validación frontend simulados.
- Google Sign-In necesita Client ID real para integración completa.
- Para desarrollo, abrir archivos HTML directamente o montar servidor simple local.

---

## 🔧 Mejoras futuras sugeridas

- Extender simulador con más etapas y mejores gráficos (bibliotecas JS avanzadas).
- Funcionalidades mejoradas en filtros y búsqueda en recursos (paginación, favoritos).
- Integración con backend para almacenamiento de usuarios y progreso.
- Mejoras en accesibilidad y optimización de rendimiento.
- Incrementar contenido multimedia interactivo en módulos.

---

## 📬 Contacto

Para consultas o colaboraciones: [contacto@nexomentorai.com](mailto:contacto@nexomentorai.com)

---

## 📝 Licencia

Este proyecto está bajo licencia MIT. Consulta LICENSE.md para más detalles.

---

<!--- Logo -->

<svg width="120" height="40" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Logo NexoMentorAI">
  <rect width="120" height="40" fill="#ffbb00" rx="8" ry="8"/>
  <text x="60" y="25" font-family="Segoe UI, Tahoma, Geneva, Verdana, sans-serif" font-size="20" font-weight="bold" fill="#0b1020" text-anchor="middle" pointer-events="none">NexoMentorAI</text>
</svg>

---

Gracias por contribuir y seguir mejorando NexoMentorAI. ¡Vamos por una educación en IA de calidad!

---

*Archivo generado automáticamente para facilitar futuras continuaciones en el proyecto.*