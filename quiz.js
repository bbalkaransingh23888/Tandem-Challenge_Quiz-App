const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-content'));

let currentQuestion = {};
let acceptAnswers = false;
let score = 0;
let questionCount = 0;
let remainingQuestions = [];

let quizQuestions = []

fetch("questions.json").then(response => {
    return response.json();
}).then(loadQuestions => {
    quizQuestions = loadQuestions;
    startGame();
})
.catch( error => {
    console.error(error);
})

//Constants

//const maxQuestions = 10;

startGame = () => {
    questionCount = 0;
    score = 0;
    remainingQuestions = [...quizQuestions];
    getNewQuestion();
};

getNewQuestion = () => {
    if(remainingQuestions.length === 0){
        //end quiz
        //return window.location.assign("end-quiz.html")
    }

    questionCount++;
    const quizIndex = Math.floor(Math.random() * remainingQuestions.length);
    currentQuestion = remainingQuestions[quizIndex];
    question.innerText = currentQuestion;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number]
    })

    remainingQuestions.splice(quizIndex, 1);
    acceptAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptAnswers) return;

        acceptAnswers = false;
        const answerSelect = e.target;
        const answerChoice = answerSelect.dataset["number"]

        let classApply = 'incorrect';
            if(answerChoice == currentQuestion.answer) {
                classApply = 'correct';
                console.log(classApply)
            }

        answerSelect.parentElement.classList.add(classApply);

        setTimeout( () => {
            answerSelect.parentElement.classList.remove(classApply);
            getNewQuestion();
        }, 1000);

        
    })
})

startGame();
