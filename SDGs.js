document.getElementById("first").style.marginLeft = "15px";
document.getElementById("second").style.marginLeft = "15px";
document.getElementById("third").style.marginLeft = "15px";
document.getElementById("fourth").style.marginLeft = "15px";
document.getElementById("fifth").style.marginTop = "13px";
document.getElementById("fifth").style.marginLeft = "4px";
document.getElementById("sixth").style.marginTop = "13px";
document.getElementById("seventh").style.marginTop = "18px";
document.getElementById("eighth").style.marginTop = "18px";
document.getElementById("ninth").style.marginTop = "10px";
document.getElementById("ninth").style.marginRight = "50px";
document.getElementById("ninth").style.marginLeft = "-15px";
document.getElementById("tenth").style.marginLeft = "-29px";
document.getElementById("eleventh").style.marginLeft = "-29px";
document.getElementById("eleventh").style.marginTop = "-7.4px";
document.getElementById("twelveth").style.marginLeft = "-29px";
document.getElementById("twelveth").style.marginTop = "-8px";
document.getElementById("thirteenth").style.marginLeft = "-36px";
document.getElementById("thirteenth").style.marginTop = "-20px";
document.getElementById("fourteenth").style.marginTop = "-20px";
document.getElementById("fourteenth").style.marginLeft = "-25px";
document.getElementById("fifteenth").style.marginLeft = "-18px";
document.getElementById("fifteenth").style.marginTop = "-27px";
document.getElementById("sixteenth").style.marginTop = "-30px";
document.getElementById("sixteenth").style.marginLeft = "-5px";
document.getElementById("seventeenth").style.marginTop = "-27px";
document.getElementById("eighteenth").style.marginTop = "-27px";
document.getElementById("nineteenth").style.marginTop = "-15px";
document.getElementById("nineteenth").style.marginLeft = "11px";
document.getElementById("twentieth").style.marginLeft = "15px";
document.getElementById("twentieth").style.marginTop = "-6.3px";

window.alert(
  "If the mark lands on a number that has already been chosen when you spin, the wheel will automatically spin again. Enjoy!"
);
let popUp = document.getElementById("questionBox");
let stopArrow = document.getElementById("stop");
let wheel = document.getElementById("wheel");
let button = document.getElementById("spin");

let rotation = 0;
let compilation = [];
let isSpinning = false;
let isLastSpin = false; // marks if this is the final spin
let spinLocked = false; // prevents spins after the last one

button.onclick = () => {
  if (isSpinning || spinLocked) return;

  if (compilation.length === 20) {
    isLastSpin = true; // mark this spin as the final one
    console.log("last spin");
    LastMessage();
    wheel.style.opacity = "0";
    stopArrow.style.opacity = "0";
    button.style.display = "none";
    return;
  }

  isSpinning = true;
  spinWheel();

  if (isLastSpin) {
    // after showing number & question, show final message
    setTimeout(() => {
      LastMessage();

      wheel.style.opacity = "0";
      stopArrow.style.opacity = "0";

      spinLocked = true; // lock spins forever
    }, 42000);
  }
};

function spinWheel() {
  if (spinLocked) return; // prevent spins after game ends

  let extra = Math.floor(Math.random() * 3000) + 1000;
  rotation += extra;
  wheel.style.transition = "4s";
  wheel.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {
    let result = getWinningSegment(rotation); // number they got
    handleResult(result); // show the number and question
  }, 4200); // wait for spin animation
}

function getWinningSegment(rotation) {
  const segments = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
  ];

  const segmentCount = segments.length;
  const segmentAngle = 360 / segmentCount;

  const normalized = ((rotation % 360) + 360) % 360;
  const index = Math.floor((360 - normalized) / segmentAngle) % segmentCount;

  return segments[index];
}

// ----------------------
// HANDLE RESULTS + RESPIN
// ----------------------
function handleResult(result) {
  console.log("Winning segment:", result);

  if (compilation.includes(result)) {
    console.log("Duplicate! Spinning again...");
    spinWheel();
    popUp.style.display = "none";
    wheel.style.opacity = "1";
    stopArrow.style.opacity = "1";
    return;
  }

  compilation.push(result);
  console.log(compilation);
  isSpinning = false;

  wheel.style.opacity = "0";
  stopArrow.style.opacity = "0";
  displayNumber(result);

  setTimeout(() => displayQuestion(result), 3000);
  setTimeout(() => displayAnswer(result), 33000);

  setTimeout(() => {
    popUp.style.display = "none";
    wheel.style.opacity = "1";
    stopArrow.style.opacity = "1";
  }, 40000);
}

function displayNumber(result) {
  popUp.style.display = "flex";
  popUp.textContent = `You selected number ${result}!`;
  popUp.style.fontSize = "60px";
  popUp.style.fontWeight = "400";
}

function displayQuestion(result) {
  let qnDisplay = SDGs[result];

  popUp.style.display = "flex";

  let html = `<h2 class="question">${qnDisplay.question}</h2>`;

  // Loop through existing answers only
  for (let key of Object.keys(qnDisplay.answers)) {
    html += `<div class="answers">${key.toUpperCase()}:</> ${
      qnDisplay.answers[key]
    }</div>`;
  }

  popUp.innerHTML = html;
  popUp.style.flexDirection = "column";
}

function displayAnswer(result) {
  let qnDisplay = SDGs[result];
  let html = `<h3 class="correctAnswer">Correct Answer: ${qnDisplay.correct}</h3>`;
  popUp.innerHTML = html;
}

function LastMessage() {
  popUp.style.display = "flex";
  popUp.textContent =
    "You have answered all questions on the SDGs, on to the next!";
  console.log("last");
  popUp.style.fontSize = "40px";
}

const SDGs = {
  1: {
    question: "How many Sustainable Development Goals (SDGs) are there?",
    answers: {
      a: "17",
      b: "10",
      c: "19",
      d: "8",
    },
    correct: "17",
  },
  2: {
    question:
      "My belly is full. I have every day at least 1 meal. Which SDG is this sentence directly related to?  ",
    answers: {
      a: "SDG 4",
      b: "SDG 8",
      c: "SDG 2",
      d: "SDG 14",
    },
    correct: "SDG 2",
  },
  3: {
    question: "Which among these is the leading cause of death in the world?",
    answers: {
      a: "shark attacks",
      b: "road accidents",
      c: "unsanitary environment",
      d: "war",
    },
    correct: "unsanitary environment",
  },
  4: {
    question:
      "How much time should a child aged 5 to 17 do physical activity each day?",
    answers: {
      a: "15 mins",
      b: "1 hour",
      c: "2 hours",
      d: "3 hours",
    },
    correct: "1 hour",
  },
  5: {
    question: "Some energies are called renewable. Why?",
    answers: {
      a: "Because they do not pollute",
      b: "Because you can recharge it from your cell phone",
      c: "Because they are new",
      d: "Because they can be reconstituted by nature quickly",
    },
    correct: "Because they can be reconstituted by nature quickly",
  },
  6: {
    question:
      "Every 15 seconds, a worker dies from a work-related accident or illness. What is the main cause of these deaths?",
    answers: {
      a: "Occupational illness",
      b: "Accidents",
      c: "Earthquake",
      d: "Cancer",
    },
    correct: "Occupational illness",
  },
  7: {
    question: "What is the 2nd most used renewable energy in the world?",
    answers: {
      a: "solar",
      b: "nuclear",
      c: "nuclear",
      d: "wind",
    },
    correct: "wind",
  },
  8: {
    question:
      "Africa produces 70% of the world's cocoa, what % does it receive from its chocolate manufacturing?",
    answers: {
      a: "38%",
      b: "Same 70%",
      c: "Less than 5%",
      d: "11%",
    },
    correct: "Less than 5%",
  },
  9: {
    question:
      "Which SDG specifically addresses the challenge of 'Climate Action'?",
    answers: {
      a: "SDG 12",
      b: "SDG 14",
      c: "SDG 9",
      d: "SDG 13",
    },
    correct: "SDG 13",
  },
  10: {
    question:
      "'The new solar panels on our roof mean my children can now study after dark.' Which SDG is this directly related to?",
    answers: {
      a: "SDG 4: Quality Education",
      b: "SDG 7: Affordable and Clean Energy",
      c: "SDG 11: Sustainable Cities and Communities",
      d: "SDG 13: Climate Action",
    },
    correct: "SDG 7: Affordable and Clean Energy",
  },
  11: {
    question: "The SDGs are only targeted at developing countries.",
    answers: {
      a: "True",
      b: "False",
    },
    correct: "False",
  },
  12: {
    question:
      "SDG 5 aims to achieve gender equality and empower all women and girls.",
    answers: {
      a: "True",
      b: "False",
    },
    correct: "True",
  },
  13: {
    question:
      "SDG 6: Clean Water and Sanitation is only about providing drinking water.",
    answers: {
      a: "True",
      b: "False",
    },
    correct: "False",
  },
  14: {
    question: "How can access to information help people escape poverty?",
    answers: {
      a: "It encourages economic growth and development.",
      b: "It facilitates exchange and communication",
      c: "It enables us to obtain accessible and user-friendly content",
      d: "All the above",
    },
    correct: "All the above",
  },
  15: {
    question:
      "The SDGs were the first UN development agenda to specifically include goals for developed countries.",
    answers: {
      a: "True",
      b: "False",
    },
    correct: "True",
  },
  16: {
    question:
      "What is the primary purpose of a country's Voluntary National Review (VNR) within the SDG framework?",
    answers: {
      a: "To request international funding from the UN.",
      b: "To set binding, global environmental standards.",
      c: "To assess present their official SDG progress report to the UN.",
      d: "To receive a mandatory performance grade from other nations.",
    },
    correct: "To assess present their official SDG progress report to the UN",
  },
  17: {
    question:
      "The primary forum where countries present their Voluntary National Reviews (VNRs) is:",
    answers: {
      a: "The UN General Assembly General Debate.",
      b: "The G20 Summit.",
      c: "The World Economic Forum in Davos.",
      d: "The UN High-level Political Forum on Sustainable Development (HLPF).",
    },
    correct:
      "The UN High-level Political Forum on Sustainable Development (HLPF)",
  },
  18: {
    question:
      "The principle of 'Leave No One Behind' (LNOB) in the 2030 Agenda primarily requires:",
    answers: {
      a: "Focusing aid only on the least developed countries.",
      b: "hieving all goals in every country simultaneously.",
      c: "Reaching the poorest and most marginalized first, with disaggregated data.",
      d: "Prioritizing economic growth over social inclusion.",
    },
    correct:
      "Reaching the poorest and most marginalized first, with disaggregated data",
  },
  19: {
    question: "What global framework did the SDGs officially replace?",
    answers: {
      a: "The Universal Declaration of Human Rights",
      b: "The Paris Agreement",
      c: "un framework convention on climate change",
      d: "The Millennium Development Goals (MDGs)",
    },
    correct: "The Millennium Development Goals (MDGs)",
  },
  20: {
    question:
      "In what year were the SDGs officially adopted by UN member states?",
    answers: {
      a: "2000",
      b: "2015",
      c: "2012",
      d: "2020",
    },
    correct: "2015",
  },
};
