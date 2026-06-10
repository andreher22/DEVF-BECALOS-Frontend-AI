/**
 * ARCHIVO DE CONTROL: Manipulación del DOM y Eventos
 */
import { GuessGame } from './gameLogic.js';

// Instanciar el juego con la configuración de 10 intentos
const game = new GuessGame(10);

// Nodos del DOM
const guessInput = document.getElementById('guess-input');
const btnGuess = document.getElementById('btn-guess');
const btnRestart = document.getElementById('btn-restart');
const attemptsLeftSpan = document.getElementById('attempts-left');
const guessHistorySpan = document.getElementById('guess-history');
const feedbackMessage = document.getElementById('feedback-message');

function renderUI(result) {
  // Actualizar estadísticas numéricas
  attemptsLeftSpan.textContent = game.attemptsLeft;
  guessHistorySpan.textContent = game.history.length > 0 ? game.history.join(', ') : '-';

  // Reiniciar estilos de alerta previos
  feedbackMessage.className = 'message';

  if (result) {
    feedbackMessage.textContent = result.message;
    feedbackMessage.classList.add(`msg-${result.status}`);
  } else {
    feedbackMessage.textContent = '';
  }

  // Interrupción de controles si concluye la partida
  if (game.isGameOver) {
    guessInput.disabled = true;
    btnGuess.disabled = true;
    btnRestart.classList.remove('hidden');
  } else {
    guessInput.disabled = false;
    btnGuess.disabled = false;
    btnRestart.classList.add('hidden');
  }
}

function handleSubmission() {
  const inputVal = parseInt(guessInput.value, 10);

  // Validaciones del DOM de rango numérico
  if (isNaN(inputVal) || inputVal < 1 || inputVal > 100) {
    feedbackMessage.className = 'message msg-high';
    feedbackMessage.textContent = '⚠️ Ingresa una cifra válida que esté entre 1 y 100.';
    return;
  }

  // Comprobación de números duplicados (Funcionalidad extra de experiencia de usuario)
  if (game.history.includes(inputVal)) {
    feedbackMessage.className = 'message msg-high';
    feedbackMessage.textContent = `🚩 ¡Ya habías intentado con el ${inputVal}! No gastes tus intentos.`;
    return;
  }

  const result = game.processGuess(inputVal);
  renderUI(result);
  
  guessInput.value = '';
  guessInput.focus();
}

// Vinculación de disparadores (Event Listeners)
btnGuess.addEventListener('click', handleSubmission);

// Habilitar envío rápido presionando la tecla "Enter"
guessInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleSubmission();
});

// Botón de restauración del juego
btnRestart.addEventListener('click', () => {
  game.init();
  renderUI(null);
  guessInput.value = '';
  guessInput.focus();
});

// Auto-focus de inicio
guessInput.focus();




// instala antes de correr
// npm install
// npm run dev