let gameShow = document.querySelectorAll(".game-block");
let over = document.getElementById("over");
let cong = document.getElementById("cong");

function show() {
  // Add Class is-flipped After The Duration
  gameShow.forEach((gameShow) => {
    gameShow.classList.add("is-flipped");
  });

  // Wait Duration
  setTimeout(() => {
    // Remove Class is-flipped After The Duration
    gameShow.forEach((gameShow) => {
      gameShow.classList.remove("is-flipped");
    });
  }, duration);
}

// Select The Start Game Button
document.querySelector(".control-buttons span").onclick = function () {
  // Prompt Window To Ask For Name
  let yourName = prompt("Whats Your Name?");

  // If Name Is Empty
  if (yourName == null || yourName == "") {
    // Set Name To Unknown
    document.querySelector(".name span").innerHTML = "Unknown";

    // Name Is Not Empty
  } else {
    // Set Name To Your Name
    document.querySelector(".name span").innerHTML = yourName;
  }

  // Remove Splash Screen
  document.querySelector(".control-buttons").remove();
  show();

  let timeLeft = 10 * 60; // 10 minutes in seconds
  const display = document.querySelector(".time span");
  const gameOver = document.getElementById("gameOver");

  const interval = setInterval(function () {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    // Format the display
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    if (counter == 30) {
      display.textContent = "Win Win Win";
    } else {
      if (timeLeft <= 0) {
        clearInterval(interval);
        display.textContent = "Game Over";
        gameOver.play();
        over.classList.add("over");
        over.style.display = "inline-block";
      } else {
        display.textContent = `${minutes}:${seconds}`;
        timeLeft--;
        // console.log("timeLeft :" , timeLeft);
      }
    }
  }, 1000);
};

document.querySelector(".try").onclick = function () {
  location.reload();
};
// Effect Duration
let duration = 1000;

// Select Blocks Container
let blocksContainer = document.querySelector(".memory-game-blocks");

// Create Array From Game Blocks
let blocks = Array.from(blocksContainer.children);

// Create Range Of Keys
// let orderRange = [...Array(blocks.length).keys()];

let orderRange = Array.from(Array(blocks.length).keys());

// console.log(orderRange);
shuffle(orderRange);
// console.log(orderRange);

// Add Order Css Property To Game Blocks
blocks.forEach((block, index) => {
  // Add CSS Order Property
  block.style.order = orderRange[index];

  // Add Click Event
  block.addEventListener("click", function () {
    // Trigger The Flip Block Function
    flipBlock(block);
  });
});

// Flip Block Function
function flipBlock(selectedBlock) {
  // Add Class is-flipped
  selectedBlock.classList.add("is-flipped");

  // Collect All Flipped Cards
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );

  // If Theres Two Selected Blocks
  if (allFlippedBlocks.length === 2) {
    // console.log('Two Flipped Blocks Selected');

    // Stop Clicking Function
    stopClicking();

    // Check Matched Block Function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

// Stop Clicking Function
function stopClicking() {
  // Add Class No Clicking on Main Container
  blocksContainer.classList.add("no-clicking");

  // Wait Duration
  setTimeout(() => {
    // Remove Class No Clicking After The Duration
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}
let counter = 0;
// Check Matched Block
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");

  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");

    document.getElementById("success").play();
    counter = counter + 2;
    if (counter == 30) {
      cong.classList.add("congrats-container");
      cong.style.display = "inline-block";
      document.getElementById("win").play();
    }
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);

    document.getElementById("fail").play();
  }
}

// Shuffle Function
function shuffle(array) {
  // Settings Vars
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    // Get Random Number
    random = Math.floor(Math.random() * current);

    // Decrease Length By One
    current--;

    // [1] Save Current Element in Stash
    temp = array[current];

    // [2] Current Element = Random Element
    array[current] = array[random];

    // [3] Random Element = Get Element From Stash
    array[random] = temp;
  }
  return array;
}

// Current Array [9, 2, 10, 4, 5, 6, 7, 3, 1, 8]
/*
    [1] Save Current Element in Stash
    [2] Current Element = Random Element
    [3] Random Element = Get Element From Stash
  */
