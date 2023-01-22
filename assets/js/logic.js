// create variable for the interactive elements
var startScreenEl = document.querySelector("#start-screen");
var startQuizEl = document.querySelector("#start");
var questionsEl = document.querySelector("#questions");
var questionTitleEl = document.querySelector("#question-title");
var choicesEl = document.querySelector("#choices");
var choiceListEl = choicesEl.childNodes;
var answerResultEl = document.querySelector("#answer-result")
var resultEl = document.querySelector("#result")

// create varaible for the functions
let questionNum = 0;
let userChoice = "";
let correctCounter = 0;
let wrongCounter = 0;
let isCorrect = false;


// function to hide the start screen
function hideStartScreen() {
    startScreenEl.setAttribute("class", "hide");
}

function startQuiz() {
    hideStartScreen();
    // show current question
    showQuestion(questionNum);
}

// function to show new questions. when answer was chosen, a new new question was shown.
function showQuestion(i){
    questionsEl.setAttribute("class", "show");
    questionTitleEl.textContent = myQuestions[i].question;
    for(const [key, value] of Object.entries(myQuestions[i].answers)) {
        //console.log(key + ": " + value);
        var choiceBlock = document.createElement("p");
        choiceBlock.textContent = key + ": " + value;
        choicesEl.appendChild(choiceBlock);
    }
    for(let i = 0; i < choiceListEl.length; i++) {
    choiceListEl[i].addEventListener("click", clickChoice)  
    }
}

// function to show end screen


// function to clear the previous question and choices
function clearQuestion() {
    questionTitleEl.textContent = "";
    choicesEl.textContent = "";
}

// function to check user's choice
function checkChoice() {
    if(userChoice === myQuestions[questionNum].correctAnswer) {
        console.log("You choose the right answer!");
        correctCounter++;
        isCorrect = true;
    } else {
        console.log("You choose the wrong answer!");
        wrongCounter++;
        isCorrect = false;
    }
}

// function to display result for current question
function displayResult() {
    answerResultEl.setAttribute("class", "result")
    if(isCorrect) {
        resultEl.textContent = "You choose the right answer!";
    } else {
        resultEl.textContent = "You choose the wrong answer!";
    }
}


// function to define the actions when the choice was clicked
function clickChoice(event) {
    // get the user's choice
    var userClick =event.target;
    userChoice = userClick.textContent[0];
    
    // console log the user choice and the correct answer
    console.log("User choose " + userChoice);
    console.log("The right answer is " + myQuestions[questionNum].correctAnswer);

    checkChoice();

    if(questionNum < myQuestions.length) {
        clearQuestion();
        displayResult();
        questionNum++;
        showQuestion(questionNum);
    } else {
        
    }
}

startQuizEl.addEventListener("click", startQuiz);


