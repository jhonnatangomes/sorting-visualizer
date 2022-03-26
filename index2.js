function trocaVogais(string) {
  let palavra = '';
  let globalCounter = 0;
  for (let i = 0; i < string.length; i++) {
    setTimeout(increaseFontSize, 1000 * globalCounter, spans[i]);
    globalCounter++;
    if (
      string[i] == 'a' ||
      string[i] == 'e' ||
      string[i] == 'i' ||
      string[i] == 'o' ||
      string[i] == 'u'
    ) {
      setTimeout(highlightVowel, 1000 * globalCounter, spans[i]);
      globalCounter++;
      setTimeout(changeTo1, 1000 * globalCounter, spans[i]);
      palavra = palavra + '1';
    } else {
      setTimeout(highlightConsonant, 1000 * globalCounter, spans[i]);
      palavra = palavra + string[i];
    }
    globalCounter++;
    setTimeout(unhighlightLetter, 1000 * globalCounter, spans[i]);
  }
  return palavra;
}

function increaseFontSize(letter) {
  letter.style.fontSize = '150px';
}

function highlightVowel(letter) {
  letter.style.color = 'green';
}

function changeTo1(letter) {
  letter.innerText = '1';
}

function highlightConsonant(letter) {
  letter.style.color = 'red';
}

function unhighlightLetter(letter) {
  letter.style.fontSize = '100px';
  letter.style.color = 'black';
}

const palavraInicial = 'henrique';

const letras = palavraInicial.split('');

const main = document.querySelector('main');

for (let i = 0; i < letras.length; i++) {
  const span = document.createElement('span');
  span.innerText = letras[i];
  main.appendChild(span);
}
const spans = document.querySelectorAll('span');

trocaVogais(palavraInicial);
