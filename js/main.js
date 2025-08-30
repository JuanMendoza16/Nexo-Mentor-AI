// Pequeño script para accesibilidad del dropdown
document.querySelectorAll('.dropdown-toggle').forEach(button => {
    button.addEventListener('click', () => {
        const expanded = button.getAttribute('aria-expanded') === 'true' || false;
        button.setAttribute('aria-expanded', !expanded);
        const menu = button.nextElementSibling;
        if (menu) {
            menu.style.display = expanded ? 'none' : 'block';
        }
    });
});

// Cerrar dropdowns si se hace click fuera
document.addEventListener('click', e => {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown-toggle').forEach(button => {
            button.setAttribute('aria-expanded', 'false');
            if (button.nextElementSibling)
                button.nextElementSibling.style.display = 'none';
        });
    }
});