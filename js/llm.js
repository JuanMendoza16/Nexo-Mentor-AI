const simulateBtn = document.getElementById('simulateBtn');
const userInput = document.getElementById('userInput');
const responseArea = document.getElementById('responseArea');
const statusMessage = document.getElementById('statusMessage');

simulateBtn.addEventListener('click', () => {
    const inputText = userInput.value.trim();
    if (!inputText) {
        statusMessage.textContent = "Por favor, ingresa un texto para simular.";
        return;
    }

    statusMessage.textContent = "Simulando respuesta...";
    responseArea.textContent = '';

    // Simulación de retraso para mostrar "procesando"
    setTimeout(() => {
        // Simulación simple de respuesta (aquí implementarías la lógica real o llamada API)
        const simulatedResponse = `Respuesta simulada para:\n${inputText}\n\nEsta es una respuesta generada por NexoMentorAI.`;
        responseArea.textContent = simulatedResponse;
        statusMessage.textContent = "Simulación completada.";
    }, 1500);
});