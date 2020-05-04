const question = document.querySelector(".question-text");
const choices = document.querySelectorAll(".choice-text");
const counter = document.querySelector("#count");
const scoreText = document.querySelector("#score");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");

const getNextIdx = (idx = -1, length, direction) => {
  switch (direction) {
    case "next":
      return (idx + 1) % length;
    case "prev":
      return (idx == 0 && length - 1) || idx - 1;
    default:
      return idx;
  }
};

let idx;
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1,
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3,
  },
  {
    question: 'How do you call a function named "myFunction"?',
    choice1: "call myFunction",
    choice2: "call function myFunction()",
    choice3: "myFunction()",
    choice4: "myFunction",
    answer: 3,
  },
  {
    question: " Where is the correct place to insert a JavaScript?",
    choice1: "Both the <head> and <body> sections",
    choice2: "The <body> section",
    choice3: "The <head> section",
    choice4: "In a <p> tag",
    answer: 1,
  },
  {
    question: " How do you create a function in JavaScript?",
    choice1: "function = myFunction",
    choice2: "function myFunction()",
    choice3: "function:myFunction()",
    choice4: "def myFunction()",
    answer: 2,
  },
];

//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];

  getNewIndexAndRenderQuestion("next");
};

next.addEventListener("click", function (e) {
  if (acceptingAnswers) {
    alert("You are yet to pick an answer");
    return;
  }
  getNewIndexAndRenderQuestion("next");
});
// prev.addEventListener("click", function (e) {
//   getNewIndexAndRenderQuestion("prev");
// });

getNewIndexAndRenderQuestion = direction => {
  idx = getNextIdx(idx, 5, direction);
  questionCounter++;
  currentQuestion = availableQuesions[idx];
  question.innerText = currentQuestion.question;
  if (questionCounter > 5) {
    next.disabled = true;
    alert(`Game Over! \nYou scored ${score} out of 5.`);
    return window.location.assign("/");
  }

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
    choice.parentElement.classList.remove("correct");
    choice.parentElement.classList.remove("incorrect");
  });
  counter.innerText = idx + 1;
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    if (classToApply === "incorrect") {
      let siblings = [];
      node = choice.parentNode.parentNode.firstChild;

      while (node) {
        if (node !== this && node.nodeType === Node.ELEMENT_NODE)
          siblings.push(node);
        node = node.nextElementSibling || node.nextSibling;
      }

      siblings.forEach(n => {
        if (n.lastElementChild.dataset["number"] == currentQuestion.answer) {
          n.classList.add("correct");
        }
      });
    }
    selectedChoice.parentElement.classList.add(classToApply);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
