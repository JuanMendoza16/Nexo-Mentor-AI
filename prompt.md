## Prompt completo para reabrir el proyecto NexoMentorAI

Estoy desarrollando un sitio web educativo llamado **NexoMentorAI**, centrado en enseñar sobre Modelos de Lenguaje de Gran Escala (LLM). El proyecto consta de varias páginas interconectadas con un **navbar mejorado** (menús desplegables, barra de búsqueda integrada con filtros) y un diseño con paleta basada en amarillos con gradientes que reflejan calidad y modernidad.

---

## Contexto general del sitio

- El navbar incluye logo, menú con submenus, explorer y búsqueda con filtros para recursos.
- Páginas implementadas o diseñadas: Inicio, Módulos (con módulos desplegables tipo acordeón), Recursos (lista de recursos con filtros dinámicos de búsqueda y tipo), Simulador (interactivo), Inicio/Registro sesión con opción de login Google.
- El diseño usa colores primarios #ffbb00 y un amarillo claro secundario, con fondos oscuros y textos claros para buen contraste.
- Se aplican patrones de diseño modernos: State, Observer, Command, Factory para el simulador, con gráficos hechos a mano para mostrar métricas loss y accuracy.
- El simulador tiene funcionalidades: cargar dataset, preprocesar, entrenar con animación de métricas, mostrar resultados, reiniciar.
- La barra de búsqueda del navbar está completamente integrada con Javascript que filtra la lista de recursos según texto y filtro por tipo, actualizando en tiempo real.

---

## Páginas y funcionalidades definidas

## Navbar

- Menús desplegables con estructura accesible, botón menú tipo dropdown.
- Barra de búsqueda que filtra recursos dinámicamente usando checkboxes de filtro y búsqueda por keywords.

## Inicio

- Página estática con hero, módulos destacados y beneficios.

## Módulos

- Lista de módulos con acordeones desplegables que muestran contenido educativo con resumen, imágenes y botones a simulador o recursos.

## Recursos

- Listado de recursos con tarjetas, filtros dinámicos y búsqueda integrada.

## Simulador

- Interface dividida en panel lateral de navegación y contenido principal.
- Paleta amarilla con gradientes, botones estilizados con hover y estados.
- Patrón State para controlar acciones habilitadas.
- Patrón Observer para actualización en tiempo real de métricas.
- Visualización de métricas Loss y Accuracy en canvas con animación.
- Flujo de pasos con checkmarks mostrando progreso.
- Botón "Mostrar Resultados" habilitado al entrenar, que despliega resumen detallado de métricas y dataset.
- Botón reiniciar para resetear simulación y estado.

## Inicio/Registro sesión

- Formulario combinado para login o registro con validaciones.
- Botón para iniciar sesión con Google integrando Google Identity Services (requiere Client ID de Google).
- Alternancia entre formularios de forma accesible.

---

## Código principal y patrones usados

- Simulador en JS modular usando clases: MiniChart (canvas), SimulatorContext (gestiona estado y UI), Commands y States.
- Uso de flexbox y grid para layout responsive.
- Estilos CSS con variables customizadas para colores y sombras.
- Eventos en botones para cambio de estado con habilitación/deshabilitación dinámica.
- Canvas animados sin librerías externas para gráficos.

---

## Qué espero que continúe el asistente AI en próximas interacciones

- Continuar mejorando la UI y funcionalidad (introducir más etapas simuladas, mejoras gráficas, mejor UX).
- Extender la búsqueda y filtros con características avanzadas (paginación, orden, favoritos).
- Mejorar formularios con validaciones más complejas.
- Añadir integración backend simulada o real para sesiones y simulador.
- Revisar accesibilidad y rendimiento.
- Preparar despliegue y documentación.

---

Por favor, déjate guiar por este contexto para continuar el desarrollo, mejoras y nuevas funcionalidades del sitio NexoMentorAI, comenzando justo donde se quedó el código y diseño anteriormente.