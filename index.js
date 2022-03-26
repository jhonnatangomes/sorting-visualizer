function generateRandomNumber({ min = 0, max }) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function generateRandomColor() {
  const colorArray = [
    generateRandomNumber({ max: 255 }),
    generateRandomNumber({ max: 255 }),
    generateRandomNumber({ max: 255 }),
  ];
  return `rgb(${colorArray.join(",")})`;
}

function renderBars(bars) {
  bars.forEach((bar) => {
    const domBar = document.createElement("div");
    domBar.classList.add("bar");
    domBar.style.backgroundColor = bar.color;
    domBar.style.height = `${bar.height}px`;
    barsContainer.appendChild(domBar);
  });
}

function highlightBar(bar) {
  bar.style.opacity = "0.3";
}

function unhighlightAllBars(bars) {
  bars.forEach(unhighlightBar);
}

function unhighlightBar(bar) {
  bar.style.opacity = "1";
}

function highlightBars(bars, indexArr, firstIndex, secondIndex, counter) {
  const firstBar = bars[indexArr[firstIndex]];
  const secondBar = bars[indexArr[secondIndex]];
  setTimeout(() => {
    unhighlightAllBars(bars);
    highlightBar(firstBar);
    highlightBar(secondBar);
  }, ANIMATION_SPEED * counter);
}

function swapBars(bars, indexArr, firstIndex, secondIndex, counter) {
  const firstEl = bars[indexArr[firstIndex]];
  const secondEl = bars[indexArr[secondIndex]];
  const firstDistance = (secondIndex - indexArr[firstIndex]) * 50;
  const secondDistance = (firstIndex - indexArr[secondIndex]) * 50;
  setTimeout(() => {
    firstEl.style.transform = `translate(${firstDistance.toString()}px)`;
    secondEl.style.transform = `translate(${secondDistance.toString()}px)`;
  }, ANIMATION_SPEED * counter);
}

function bubbleSort(arr, bars) {
  let globalCounter = 1;
  const newArr = [...arr];
  const indexArr = arr.map((_, i) => i);
  let isSorted = false;
  while (!isSorted) {
    isSorted = true;
    for (let i = 0; i < newArr.length - 1; i++) {
      highlightBars(bars, indexArr, i, i + 1, globalCounter);
      if (newArr[i] > newArr[i + 1]) {
        swapBars(bars, indexArr, i, i + 1, globalCounter);
        swapTwoItems(newArr, i, i + 1);
        swapTwoItems(indexArr, i, i + 1);
        isSorted = false;
      }
      globalCounter++;
    }
  }
  setTimeout(() => unhighlightAllBars(bars), ANIMATION_SPEED * globalCounter);
  return newArr;
}

function trocaVogais(string) {
  let resultado = [];
  let palavra = ""
  for ( let i = 0 ; i < string.length ; i++) {
    if ( string[i] == "a" || string[i] == "e" ||
       string[i] == "i" || string[i] == "o" ||
       string[i] == "u" ) {
      resultado.push("1");
     palavra = palavra + resultado[i];
    } else {
      resultado.push(string[i]); 
      palavra = palavra + resultado[i];
    }
  }
  return palavra;
}

function selectionSort(arr, bars) {
  const newArr = [...arr];
  const indexArr = newArr.map((_, i) => i);
  let globalCounter = 1;
  for (let i = 0; i < newArr.length; i++) {
    let smallest = i;
    for (let j = i + 1; j < newArr.length; j++) {
      highlightBars(bars, indexArr, i, j, globalCounter);
      if (newArr[j] < newArr[smallest]) {
        smallest = j;
      }
    }
    if (smallest !== i) {
      swapBars(bars, indexArr, i, smallest, globalCounter);
      swapTwoItems(newArr, i, smallest);
      swapTwoItems(indexArr, i, smallest);
    }
    globalCounter++;
  }
  setTimeout(() => unhighlightAllBars(bars), ANIMATION_SPEED * globalCounter);
  return newArr;
}

function revertBarPositions(bars) {
  bars.forEach((bar) => (bar.style.transform = "translate(0px)"));
}

function swapTwoItems(arr, firstIndex, lastIndex) {
  const tmp = arr[firstIndex];
  arr[firstIndex] = arr[lastIndex];
  arr[lastIndex] = tmp;
}

function runAlgorithm(name, ...args) {
  revertBarPositions(args[1]);
  if (name === "bubble-sort") bubbleSort(...args);
  if (name === "selection-sort") selectionSort(...args);
}

const ANIMATION_SPEED = 200;
const ARRAY_SIZE = 10;
const barsContainer = document.querySelector(".bars");
const bars = new Array(ARRAY_SIZE).fill(0).map((_) => ({
  color: generateRandomColor(),
  height: generateRandomNumber({ min: 50, max: 500 }).toString(),
}));

renderBars(bars);
const domBars = document.querySelectorAll(".bar");
const barHeights = [];

domBars.forEach((bar) =>
  barHeights.push(Number(bar.style.height.replace("px", "")))
);
