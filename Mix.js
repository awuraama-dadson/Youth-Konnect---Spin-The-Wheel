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
    let qnDisplay = mixQuestions[result];

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
    let qnDisplay = mixQuestions[result];
    let html = `<h3 class="correctAnswer">Correct Answer: ${qnDisplay.correct}</h3>`;
    popUp.innerHTML = html;
  }

  function LastMessage() {
    popUp.style.display = "flex";
    popUp.textContent = "You have come to the end of the game!";
    console.log("last");
    popUp.style.fontSize = "40px";
  }

  const mixQuestions = {
    1: {
      question:
        "A recent report on an August 2025 incident revealed that a Ghana Air Force helicopter crash was caused by what primary factor?",
      answers: {
        a: "Poor visibility and bad weather",
        b: "Mechanical failure",
        c: "Pilot error",
        d: "Bird strike",
      },
      correct: "Poor visibility and bad weather",
    },
    2: {
      question:
        "Ghana transitioned from a constitutional monarchy to a republic in which year, following a national referendum? ",
      answers: {
        a: "1957",
        b: "1966",
        c: "1960",
        d: "1979",
      },
      correct: "1960",
    },
    3: {
      question:
        "The Ashanti Empire, a major pre-colonial power in what is now central Ghana, was renowned for its centralized government and what symbolic artifact representing its sovereignty?",
      answers: {
        a: "The Golden Throne",
        b: "The Iron Mask",
        c: "The Golden Stool",
        d: "The Silver Drum",
      },
      correct: "The Golden Stool",
    },
    4: {
      question:
        "In 1966, Kwame Nkrumah was overthrown in a coup while he was abroad. Where was he visiting at the time?",
      answers: {
        a: "United States",
        b: "China",
        c: "United Kingdom",
        d: "Soviet Union",
      },
      correct: "China",
    },
    5: {
      question:
        "The ancient Kingdom of Ghana, after which the modern nation is named, was primarily known for controlling trade in which two key resources across the Sahara Desert?",
      answers: {
        a: "Gold and ivory",
        b: "Slaves and spices",
        c: "Iron and timber",
        d: "Gold and salt",
      },
      correct: "Gold and salt",
    },
    6: {
      question:
        "Which military leader staged multiple coups in Ghana, including one in 1981 that ousted President Hilla Limann, and later transitioned to democratic rule in the 1990s?",
      answers: {
        a: "Jerry Rawlings",
        b: "Ignatius Acheampong",
        c: "Akwasi Afrifa",
        d: "Frederick Akuffo",
      },
      correct: "Jerry Rawlings",
    },
    7: {
      question:
        "The system of transferring power, resources, and responsibilities from the central government to local authorities is known as: ",
      answers: {
        a: "Federalism",
        b: "Privatization",
        c: " Nationalization ",
        d: "Decentralization",
      },
      correct: "Decentralization",
    },
    8: {
      question:
        "Which of the following is NOT a type of local government unit in Ghana? ",
      answers: {
        a: "Municipal Assembly",
        b: "Metropolitan Assembly",
        c: "Regional Assembly ",
        d: "Zonal Council ",
      },
      correct: "Regional Assembly",
    },
    9: {
      question: "A traditional area in Ghana is typically ruled by a: ",
      answers: {
        a: "Member of Parliament ",
        b: "District Chief Executive ",
        c: "Regional Minister",
        d: "Paramount Chief or Queen Mother",
      },
      correct: "Paramount Chief or Queen Mother",
    },
    10: {
      question:
        "Which of the following is a key function of traditional authorities in Ghana's administration?",
      answers: {
        a: "Passing national legislation",
        b: "Serving as custodians of land and culture",
        c: "Appointing District Chief Executives",
        d: "Auditing district accounts",
      },
      correct: "Serving as custodians of land and culture",
    },
    11: {
      question:
        "How are traditional authorities primarily integrated into the modern local government system? ",
      answers: {
        a: "They automatically become Members of Parliament",
        b: "They have representation in the District Assemblies.",
        c: "They form the executive committee of the Regional Coordinating Council",
        d: "They report directly to the Ministry of Finance. ",
      },
      correct: "They have representation in the District Assemblies.",
    },
    12: {
      question: "The Local Government Service (LGS) was established to: ",
      answers: {
        a: "Replace traditional authorities ",
        b: "Provide a unified professional and technical support service for local government",
        c: "Collect taxes on behalf of the central government only ",
        d: "Manage national security at the local level",
      },
      correct:
        "Provide a unified professional and technical support service for local government",
    },
    13: {
      question:
        "Which key planning document is prepared by every District Assembly to guide its development?",
      answers: {
        a: "National Budget ",
        b: "Medium-Term Development Plan",
        c: "Presidential Manifesto",
        d: "Chief Justice's Report ",
      },
      correct: "Medium-Term Development Plan",
    },
    14: {
      question:
        "Unit Committees form the base of Ghana's local government system. How many Unit Committees is a typical electoral area divided into?",
      answers: {
        a: "One",
        b: "Ten",
        c: "Twenty",
        d: "Five",
      },
      correct: "Five",
    },
    15: {
      question:
        "The legal framework for Ghana's current local government system is primarily provided by: ",
      answers: {
        a: "The Independence Act, 1957",
        b: "Local Governance Act, 2016 (Act 936)",
        c: "The Criminal Offences Act",
        d: "The Education Act ",
      },
      correct: "Local Governance Act, 2016 (Act 936)",
    },
    16: {
      question: "A key challenge facing Ghana's decentralisation system is:",
      answers: {
        a: "The complete absence of traditional authority involvement",
        b: "The lack of a constitution ",
        c: "Inadequate financial resources and delays in releasing funds to districts.",
        d: "The election of District Chief Executives",
      },
      correct:
        "Inadequate financial resources and delays in releasing funds to districts",
    },
    17: {
      question:
        "A significant domestic debt exchange programme (DDEP) in late 2022/2023 led to major protests from which group, who argued their pensions were being unfairly restructured? ",
      answers: {
        a: "University students",
        b: "Cocoa farmers ",
        c: "Commercial drivers",
        d: "Individual bondholders and pensioner groups",
      },
      correct: "Individual bondholders and pensioner groups",
    },
    18: {
      question:
        "The 'Proper Human Sexual Rights and Ghanaian Family Values Bill, 2021' (Anti-LGBTQ+ Bill) proposes criminalization not just for same-sex acts, but also for: ",
      answers: {
        a: "International travel",
        b: "Owning private property",
        c: "Advocacy, funding, and public support for LGBTQ+ persons",
        d: "Using social media",
      },
      correct: "Advocacy, funding, and public support for LGBTQ+ persons",
    },
    19: {
      question:
        "What has been a major social concern regarding the use of digital platforms and mobile money in Ghana?",
      answers: {
        a: "They are too expensive",
        b: "They are banned in rural areas",
        c: "They are only available in English",
        d: "A rise in sophisticated mobile money fraud ('Sakawa') and cybercrime",
      },
      correct:
        "A rise in sophisticated mobile money fraud ('Sakawa') and cybercrime",
    },
    20: {
      question:
        "Increased advocacy for a ‘Affirmative Action Bill’ in Ghana focuses on promoting:",
      answers: {
        a: "Rights for people with disabilities ",
        b: "Greater gender equality and women's representation in governance",
        c: "Ethnic minority languages ",
        d: "Tax breaks for startups ",
      },
      correct:
        "Greater gender equality and women's representation in governance",
    },
  };
};
