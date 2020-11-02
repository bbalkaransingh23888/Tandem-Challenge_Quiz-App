const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-content"));
const gameScore = document.getElementById('gameScore');


let currentQuestion = {};
let acceptAnswers = false;
let score = 0;
let questionCount = 0;
let remainingQuestions = [];

let questions = []

fetch("questions.json").then(response => {
    return response.json();
}).then(loadQuestions => {
    questions = loadQuestions;
    startGame();
})
.catch( error => {
    console.error(error);
})

//Constants

const maxQuestions = 10;
const correctValue = 10;

startGame = () => {
    questionCount = 0;
    score = 0;
    remainingQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if(remainingQuestions.length === 0 || questionCount >= maxQuestions){
        //end quiz
        localStorage.setItem('lastScore', score);
        return window.location.assign("end-quiz.html")
    }

    questionCount++;
    const quizIndex = Math.floor(Math.random() * remainingQuestions.length);
    currentQuestion = remainingQuestions[quizIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( (choice) => {
        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number]
    })

    remainingQuestions.splice(quizIndex, 1);
    acceptAnswers = true;
}

choices.forEach( (choice) => {
    choice.addEventListener("click", (e) => {
        if(!acceptAnswers) return;

        acceptAnswers = false;
        const answerSelect = e.target;
        const answerChoice = answerSelect.dataset["number"]

        let classApply = 'incorrect';
            if(answerChoice == currentQuestion.answer) {
                classApply = 'correct';
            }

        if (classApply === 'correct'){
            countScore(correctValue)
        }

        answerSelect.parentElement.classList.add(classApply);

        setTimeout( () => {
            answerSelect.parentElement.classList.remove(classApply);
            getNewQuestion();
        }, 700);

        
    })
})

countScore = (num) => {
    score += num;
    gameScore.innerText = score;
}
