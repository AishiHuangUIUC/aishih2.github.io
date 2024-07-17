// main.js

let currentScene = 1;
let olympicData = null;

function updateScene() {
  if (currentScene === 1) {
    renderScene1(olympicData);
  } else if (currentScene === 2) {
    renderScene2(olympicData);
  } else if (currentScene === 3) {
    renderScene3(olympicData);
  }
}

// Load data and initialize visualization
d3.csv("data/athlete_events.csv").then(data => {
  olympicData = data;
  updateScene();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    currentScene = (currentScene % 3) + 1;
    updateScene();
  }
});
