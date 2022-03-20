const barsContainer = document.querySelector(".bars");
const bars = new Array(15).fill(0).map((_) => ({
  color: generateRandomColor(),
  height: generateRandomNumber({ min: 50, max: 500 }).toString(),
}));

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
  bar.style.opacity = "0.5";
}

function visuallyIterateBars(bars) {
  for (let i = 0; i < bars.length; i++) {
    setTimeout(() => highlightBar(bars[i]), i * 500);
  }
}

function bubbleSort(arr) {
  let isSorted = false;
  while (!isSorted) {
    isSorted = true;
    for (let i = 0; i < arr.length - 1; i++) {
      const heightCurrent = parseInt(arr[i].style.height.replace("px", ""));
      const heightNext = parseInt(arr[i + 1].style.height.replace("px", ""));
      if (heightCurrent > heightNext) {
        const tmp = arr[i];
        const tmpNext = arr[i + 1];
        const siblingElement =
          i === arr.length - 2
            ? arr[i].previousElementSibling
            : arr[i + 1].previousElementSibling;
        barsContainer.removeChild(arr[i]);
        barsContainer.removeChild(arr[i + 1]);
        if (i === arr.length - 2) {
          siblingElement.insertAdjacentElement("afterend", tmpNext);
          tmpNext.insertAdjacentElement("afterend", tmp);
        } else {
          siblingElement.insertAdjacentElement("beforebegin", tmp);
          tmp.insertAdjacentElement("beforebegin", tmpNext);
        }
      }
    }
  }
}

renderBars(bars);
const domBars = document.querySelectorAll(".bar");

bubbleSort(domBars);
