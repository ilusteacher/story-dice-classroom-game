const categories = {
  Character: [
    "A brave astronaut",
    "A clever fox",
    "A shy dragon",
    "A magical teacher",
    "A pirate with a map",
    "A robot inventor",
    "A superhero student",
    "A curious mermaid",
    "A giant rabbit",
    "A time-traveling baker"
  ],
  Setting: [
    "A floating island",
    "A hidden jungle cave",
    "A moonlit library",
    "A snowy city square",
    "A glowing underwater kingdom",
    "A mysterious castle",
    "A desert oasis",
    "A crowded space station",
    "A farm in the clouds",
    "A giant pumpkin patch"
  ],
  Object: [
    "A golden compass",
    "A glowing lantern",
    "A talking notebook",
    "A crystal key",
    "A rocket backpack",
    "A music box",
    "A magical umbrella",
    "A silver telescope",
    "A treasure chest",
    "A rainbow backpack"
  ],
  Problem: [
    "The lights suddenly go out",
    "A storm traps everyone inside",
    "The map has disappeared",
    "A mysterious puzzle must be solved",
    "A dragon needs a friend",
    "The city starts to float away",
    "A secret code is missing",
    "A giant monster is on the loose",
    "The moon has fallen from the sky",
    "A treasure is hidden in plain sight"
  ],
  Action: [
    "jumped across the rooftops",
    "whispered a secret spell",
    "built a brave plan",
    "ran through the tunnel",
    "danced under the stars",
    "shared a laugh with everyone",
    "climbed the tallest tower",
    "solved a puzzle with teamwork",
    "used courage to speak up",
    "traded a promise for a clue"
  ],
  Twist: [
    "and the villain was actually a lost friend",
    "and the treasure was a book of stories",
    "and the sky began singing",
    "and the problem was a giant misunderstanding",
    "and everyone discovered a secret power",
    "and the setting changed into a dream world",
    "and the object was alive all along",
    "and the team learned the value of kindness",
    "and the adventure was only the beginning",
    "and the class was the true heroes all along"
  ]
};

const state = {
  round: 1,
  points: 0,
  sentences: []
};

const classNameInput = document.getElementById("className");
const storyStarter = document.getElementById("storyStarter");
const storyTextarea = document.getElementById("storyTextarea");
const storyFeed = document.getElementById("storyFeed");
const roundCount = document.getElementById("roundCount");
const storyPoints = document.getElementById("storyPoints");

const teamNames = [
  "The Moon Mappers",
  "Rainbow Rebels",
  "Dream Team Doodles",
  "The Brave Story Sprouts",
  "Fantastic Fable Friends",
  "The Sparkle Squad",
  "Galaxy Geniuses",
  "The Curious Comets"
];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function updateScoreboard() {
  roundCount.textContent = state.round;
  storyPoints.textContent = state.points;
}

function buildStorySentence() {
  const character = randomItem(categories.Character);
  const setting = randomItem(categories.Setting);
  const object = randomItem(categories.Object);
  const problem = randomItem(categories.Problem);
  const action = randomItem(categories.Action);
  const twist = randomItem(categories.Twist);

  return {
    character,
    setting,
    object,
    problem,
    action,
    twist,
    sentence: `${character} traveled to ${setting} with a ${object}. Suddenly, ${problem.toLowerCase()}. They ${action}, ${twist}.`
  };
}

function renderDice(values) {
  document.getElementById("diceCharacter").textContent = values.character;
  document.getElementById("diceSetting").textContent = values.setting;
  document.getElementById("diceObject").textContent = values.object;
  document.getElementById("diceProblem").textContent = values.problem;
  document.getElementById("diceAction").textContent = values.action;
  document.getElementById("diceTwist").textContent = values.twist;
}

function rollDice() {
  const result = buildStorySentence();
  renderDice(result);
  storyStarter.textContent = result.sentence;
  storyTextarea.value = result.sentence + " ";
  state.points += 10;
  updateScoreboard();
}

function addSentence() {
  const text = storyTextarea.value.trim();

  if (!text) {
    storyTextarea.focus();
    return;
  }

  const sentenceNode = document.createElement("div");
  sentenceNode.className = "story-entry";
  sentenceNode.textContent = text;

  const emptyMessage = storyFeed.querySelector(".empty-message");
  if (emptyMessage) {
    emptyMessage.remove();
  }

  storyFeed.prepend(sentenceNode);
  state.sentences.unshift(text);
  state.points += 5;
  state.round += 1;
  updateScoreboard();
  storyTextarea.value = "";
  storyStarter.textContent = "A new challenge is ready. Roll again!";
}

function randomTeamName() {
  const newName = randomItem(teamNames);
  classNameInput.value = newName;
}

function resetGame() {
  state.round = 1;
  state.points = 0;
  state.sentences = [];
  storyFeed.innerHTML = '<p class="empty-message">No sentences yet. Start the adventure!</p>';
  storyTextarea.value = "";
  storyStarter.textContent = "Press “Roll Story Dice” to create a wild story challenge.";
  document.getElementById("diceCharacter").textContent = "?";
  document.getElementById("diceSetting").textContent = "?";
  document.getElementById("diceObject").textContent = "?";
  document.getElementById("diceProblem").textContent = "?";
  document.getElementById("diceAction").textContent = "?";
  document.getElementById("diceTwist").textContent = "?";
  updateScoreboard();
}

document.getElementById("rollDice").addEventListener("click", rollDice);
document.getElementById("addSentence").addEventListener("click", addSentence);
document.getElementById("randomTeamName").addEventListener("click", randomTeamName);
document.getElementById("resetGame").addEventListener("click", resetGame);

updateScoreboard();
