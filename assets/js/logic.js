// create DOM elements
var startScreenEl = document.querySelector("#start-screen");
var startQuizEl = document.querySelector("#start");
var questionsEl = document.querySelector("#questions");
var questionTitleEl = document.querySelector("#question-title");
var choicesEl = document.querySelector("#choices");
var choiceListEl = choicesEl.childNodes;
var answerResultEl = document.querySelector("#answer-result");
var resultEl = document.querySelector("#result");
var endScreenEl = document.querySelector("#end-screen");
var correctAudio = new Audio("./assets/sfx/correct.wav");
var wrongAudio = new Audio("./assets/sfx/incorrect.wav");
var finalScoreEl = document.querySelector("#final-score");
var initalsEl = document.querySelector("#initials");
var timerEl = document.querySelector("#time");
var submitBtnEl = document.querySelector("#submit");
var feedbackEl = document.querySelector("#feedback");


// create varaible for the functions
let questionNum = 0;
let userChoice = "";
let correctCounter = 0;
let isCorrect = false;
let timerCount = 0;
var timer;




// function to hide the start screen
function hideStartScreen() {
    startScreenEl.setAttribute("class", "hide");
}

// function to start the quiz
function startQuiz() {
    // hide the start screen
    hideStartScreen();
    // start the timer
    startTimer();
    // show current question
    showQuestion(questionNum);
    console.log("Current question is [" + questionNum + "]");
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
function showEndScreen() {
    questionsEl.setAttribute("class", "hide");
    answerResultEl.setAttribute("class", "hide");
    endScreenEl.setAttribute("class", "show");
    finalScoreEl.textContent = correctCounter;
}

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
        correctAudio.play();
    } else {
        console.log("You choose the wrong answer!");
        isCorrect = false;
        // if the answer is wrong, 10 seconds will be substracted from the timer
        timerCount = timerCount - 10;
        wrongAudio.play();
    }
}

// function to show if the previous question is correct
function displayResult() {
    answerResultEl.setAttribute("class", "result")
    if(isCorrect) {
        resultEl.textContent = "Correct answer!";
    } else {
        resultEl.textContent = "Wrong answer!";
    }
}

// function to hide the result message of the previous question
function hideResult() {
    answerResultEl.setAttribute("class", "hide")
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

    if(questionNum < myQuestions.length-1) {
        clearQuestion();
        displayResult();
        setTimeout(hideResult,1500);
        questionNum++;
        showQuestion(questionNum);
        console.log("Current question is [" + questionNum + "]");
    } else {
        questionNum++;
        showEndScreen();
        console.log("Current question is No." + questionNum);
    }
}

// function to set the timer for the quiz
function startTimer() {
    // set 2 minutes for the whole quiz
    timerCount = 60;
    timer = setInterval(function() {
        timerCount--;
        timerEl.textContent = timerCount;
        if(timerCount > 0 && questionNum === myQuestions.length) {
            clearInterval(timer);
            timerEl.textContent = 0;
            showEndScreen();
        }
        if(timerCount <= 0) {
            clearInterval(timer);
            timerEl.textContent = 0;
            showEndScreen();
        }
    }, 1000);

}


// function to check the initals
function checkInitials(input) {
    let letters = /^[A-Z]+$/;
    if(!input.value.match(letters)) {
        alert("Sorry, only capital characters valid!");
        return;
    }
}

function saveScore(event) {
    event.preventDefault();
    checkInitials(initalsEl);

    let newScore = {
    initials: initalsEl.value,
    score: correctCounter
    };
    console.log(newScore);

    let highScoresArr = [];
    let tempArr = JSON.parse(localStorage.getItem("highScores"));

    if(localStorage.getItem("highScores") === null) {
        highScoresArr.push(newScore);
        localStorage.setItem("highScores", JSON.stringify(highScoresArr)) 
    } else {
        // compare the new score and saved score. If same user, save the higher score
        tempArr.forEach(element => {
            if(element.initials === newScore.initials) {
                if(element.score <= newScore.score){
                    element.score = newScore.score;
                }
            } else {
                tempArr.push(newScore);
            }
        });
        localStorage.setItem("highScores", JSON.stringify(tempArr));
    }
    endScreenEl.setAttribute("class", "hide")
    feedbackEl.setAttribute("class", "feedback show");
    

}


startQuizEl.addEventListener("click", startQuiz);


submitBtnEl.addEventListener("click", saveScore);

