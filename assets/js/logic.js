// create variable for the interactive elements
var startScreenEl = document.querySelector("#start-screen");
var startQuizEl = document.querySelector("#start");
var questionsEl = document.querySelector("#questions");
var questionTitleEl = document.querySelector("#question-title");
var choicesEl = document.querySelector("#choices");
var choiceListEl = choicesEl.childNodes;


// create varaible for the functions
let questionNum = 0;

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
    questionsEl.setAttribute("class", "start");
    questionTitleEl.textContent = myQuestions[i].question;
    for(const [key, value] of Object.entries(myQuestions[i].answers)) {
        console.log(key + ": " + value);
        var choiceBlock = document.createElement("p");
        choiceBlock.textContent = key + ": " + value;
        choicesEl.appendChild(choiceBlock);
    }
    for(let i = 0; i < choiceListEl.length; i++) {
    choiceListEl[i].addEventListener("click", clickChoice)  
    }
}

function clearQuestion() {
    questionTitleEl.textContent = "";
    choicesEl.textContent = "";
}

function clickChoice() {
    if(questionNum < myQuestions.length) {
        clearQuestion();
        questionNum++;
        showQuestion(questionNum);
    } else {
        return;
    }
}

startQuizEl.addEventListener("click", startQuiz);


