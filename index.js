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

function swapBars(firstEl, nextEl, firstDistance, nextDistance) {
  firstEl.style.transform = `translate(${firstDistance.toString()}px)`;
  nextEl.style.transform = `translate(${nextDistance.toString()}px)`;
}

function highlightBars(bars, firstBar, secondBar) {
  unhighlightAllBars(bars);
  highlightBar(firstBar);
  highlightBar(secondBar);
}

function bubbleSort(arr, bars) {
  let globalCounter = 1;
  const newArr = [...arr];
  const indexArr = arr.map((_, i) => i);
  let isSorted = false;
  while (!isSorted) {
    isSorted = true;
    for (let i = 0; i < newArr.length - 1; i++) {
      setTimeout(
        highlightBars,
        200 * globalCounter,
        bars,
        bars[indexArr[i]],
        bars[indexArr[i + 1]]
      );
      if (newArr[i] > newArr[i + 1]) {
        if (bars) {
          setTimeout(
            swapBars,
            200 * globalCounter,
            bars[indexArr[i]],
            bars[indexArr[i + 1]],
            (i + 1 - indexArr[i]) * 50,
            (i - indexArr[i + 1]) * 50
          );
        }
        swapTwoItems(newArr, i, i + 1);
        swapTwoItems(indexArr, i, i + 1);
        isSorted = false;
      }
      globalCounter++;
    }
  }
  setTimeout(() => unhighlightAllBars(bars), 200 * globalCounter);
  return newArr;
}

function selectionSort(arr, bars) {
  const newArr = [...arr];
  const indexArr = newArr.map((_, i) => i);
  let globalCounter = 1;
  for (let i = 0; i < newArr.length; i++) {
    let smallest = i;
    for (let j = i + 1; j < newArr.length; j++) {
      setTimeout(
        highlightBars,
        200 * globalCounter,
        bars,
        bars[indexArr[i]],
        bars[indexArr[j]]
      );
      if (newArr[j] < newArr[smallest]) {
        smallest = j;
      }
      globalCounter++;
    }
    if (smallest !== i) {
      setTimeout(
        swapBars,
        200 * globalCounter,
        bars[indexArr[i]],
        bars[indexArr[smallest]],
        (smallest - indexArr[i]) * 50,
        (i - indexArr[smallest]) * 50
      );
      swapTwoItems(newArr, i, smallest);
      swapTwoItems(indexArr, i, smallest);
    }
  }
  setTimeout(() => unhighlightAllBars(bars), 200 * globalCounter);
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

const barsContainer = document.querySelector(".bars");
const bars = new Array(10).fill(0).map((_) => ({
  color: generateRandomColor(),
  height: generateRandomNumber({ min: 50, max: 500 }).toString(),
}));

renderBars(bars);
const domBars = document.querySelectorAll(".bar");
const barHeights = [];

domBars.forEach((bar) =>
  barHeights.push(Number(bar.style.height.replace("px", "")))
);
