/**
 * MÓDULO: Motor lógico del Juego (ES Modules)
 */
export class GuessGame {
  constructor(maxAttempts = 10) {
    this.maxAttempts = maxAttempts;
    this.init();
  }

  init() {
    this.secretNumber = Math.floor(Math.random() * 100) + 1;
    this.attemptsLeft = this.maxAttempts;
    this.history = [];
    this.isGameOver = false;
    // Pista técnica visible solo en consola para desarrollo
    console.log(`[Cheat Code] Número secreto generado: ${this.secretNumber}`);
  }

  processGuess(userNumber) {
    if (this.isGameOver) return { status: 'gameover' };

    this.attemptsLeft--;
    this.history.push(userNumber);

    if (userNumber === this.secretNumber) {
      this.isGameOver = true;
      return { status: 'win', message: '🎉 ¡Impresionante! Has adivinado el número secreto.' };
    }

    if (this.attemptsLeft <= 0) {
      this.isGameOver = true;
      return { status: 'lose', message: `💥 Se agotaron tus intentos. El número real era el ${this.secretNumber}.` };
    }

    if (userNumber > this.secretNumber) {
      return { status: 'high', message: '📈 Te pasaste. El número secreto es MENOR.' };
    } else {
      return { status: 'low', message: '📉 Muy abajo. El número secreto es MAYOR.' };
    }
  }
}