// create variable for the interactive elements
var startScreenEl = document.querySelector("#start-screen");
var startQuizEl = document.querySelector("#start");
var questionsEl = document.querySelector("#questions");
var questionTitleEl = document.querySelector("#question-title");
var choicesEl = document.querySelector("#choices");

// function to hide the start screen
function hideStartScreen() {
    startScreenEl.setAttribute("class", "hide");
}

function startQuiz() {
    hideStartScreen();
    showQuestion(2);
}

function showQuestion(i){
    questionsEl.setAttribute("class", "start");
    questionTitleEl.textContent = myQuestions[i].question;
    for(const [key, value] of Object.entries(myQuestions[i].answers)) {
        console.log(key + ": " + value);
        var choiceBlock = document.createElement("p");
        choiceBlock.textContent = key + ": " + value;
        choicesEl.appendChild(choiceBlock);
    }
}


startQuizEl.addEventListener("click", startQuiz);