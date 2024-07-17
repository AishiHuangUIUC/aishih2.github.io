// main.js

let currentScene = 1;

function updateScene() {
  if (currentScene === 1) {
    renderScene1();
  } else if (currentScene === 2) {
    renderScene2();
  } else if (currentScene === 3) {
    renderScene3();
  }
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    currentScene = (currentScene % 3) + 1;
    updateScene();
  }
});

updateScene();
