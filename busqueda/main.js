window.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('.main__input');
    const text = document.querySelector('.main__text');

    input.addEventListener('keydown', (e) => {
        const search = input.value.trim();
        if (search !== '' && e.code === 'Enter') {
            const regex = new RegExp(search, 'gi'); // búsqueda global y sin distinción mayúsculas/minúsculas
            text.innerHTML = text.textContent.replace(regex, match => `<span class="text__search">${match}</span>`);
        }
    });
});