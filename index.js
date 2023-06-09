const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Функция для генерации случайного числа (1 или 2)
function generateRandomNumber() {
  return Math.floor(Math.random() * 2) + 1;
}

// Функция для записи результатов в лог-файл
function logResult(result, logFile) {
  fs.appendFileSync(logFile, `${result}\n`, 'utf8');
}

function playGame(logFile) {
  console.log('Добро пожаловать в игру "Орёл или решка"!');
  console.log('Угадайте, выпадет ли орёл (1) или решка (2).');

  rl.question('Введите вашу догадку (1 - орёл, 2 - решка): ', (guess) => {
    const parsedGuess = parseInt(guess);

    if (isNaN(parsedGuess) || (parsedGuess !== 1 && parsedGuess !== 2)) {
      console.log('Пожалуйста, введите 1 для орла или 2 для решки.');
      playGame(logFile);
    } else {
      const result = generateRandomNumber();
      const resultText = (result === parsedGuess) ? 'Вы угадали!' : 'Вы не угадали.';

      console.log(`Результат: ${resultText}`);
      logResult(resultText, logFile);

      rl.question('Хотите сыграть ещё раз? (да/нет): ', (playAgain) => {
        if (playAgain.toLowerCase() === 'да') {
          playGame(logFile);
        } else {
          console.log('Спасибо за игру. До свидания!');
          rl.close();
        }
      });
    }
  });
}

// Имя файла для логирования результатов
const logFileName = process.argv[2];

if (!logFileName) {
  console.log('Пожалуйста, укажите имя файла для логирования результатов.');
  process.exit(1);
}

console.log(`Результаты будут сохранены в файле: ${logFileName}`);

// Очистить файл перед началом игры
fs.writeFileSync(logFileName, '', 'utf8');

playGame(logFileName);
