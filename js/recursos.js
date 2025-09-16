/*
    Función para filtrar recursos según búsqueda y filtros seleccionados
*/

/*

const searchInput = document.getElementById('searchInput');
const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
const resourceItems = document.querySelectorAll('.resource-item');

function filterResources() {
    const searchTerm = searchInput.value.toLowerCase();
    const activeFilters = Array.from(filterCheckboxes)
        .filter(chk => chk.checked)
        .map(chk => chk.value);

    resourceItems.forEach(item => {
        const type = item.getAttribute('data-type');
        const title = item.querySelector('h2').textContent.toLowerCase();
        const description = item.querySelector('p').textContent.toLowerCase();

        const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
        const matchesFilter = activeFilters.includes(type);

        if (matchesSearch && matchesFilter) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

searchInput.addEventListener('input', filterResources);
filterCheckboxes.forEach(chk => chk.addEventListener('change', filterResources));

*/

/*
    Función para filtrar recursos según los filtros seleccionados
*/

const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
const resourceCategories = document.querySelectorAll('.resource-category');

function filterResources() {
    const activeFilters = Array.from(filterCheckboxes)
        .filter(chk => chk.checked)
        .map(chk => chk.value);

    resourceCategories.forEach(item => {
        const type = item.getAttribute('data-type');

        // Mostrar el ítem sólo si el tipo está en los filtros activos o si no hay filtros seleccionados
        if (activeFilters.length === 0 || activeFilters.includes(type)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

filterCheckboxes.forEach(chk => chk.addEventListener('change', filterResources));

// Opcional: llamar a filterResources al cargar para aplicar filtros iniciales
filterResources();