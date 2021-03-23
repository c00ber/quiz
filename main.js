const option1 = document.querySelector('.option1'),
   option2 = document.querySelector('.option2'),
   option3 = document.querySelector('.option3'),
   option4 = document.querySelector('.option4');

const optionsElements = document.querySelectorAll('.option');

const question = document.getElementById('question');

const numberOfQuestion = document.getElementById('number-of-question'),
   numberOfAllQuestion = document.getElementById('number-of-all-questions');

let indexOfQuestion,
   indexOfPage = 0;

let score = 0

const btnNext = document.getElementById('btn-next'),
   answersTracker = document.getElementById('answers-tracker');

const btnTryAgain = document.getElementById('btn-try-again'),
   correctAnswer = document.getElementById('correct-answer'),
   numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2');

const questions = [
   {
      question: 'На сколько дефуза сокращают время разминирования?',
      options: [
         '7,5 сек.',
         '6 сек.',
         '5 сек.',
         '2,5 сек.'],
      rightAnswer: 2
   },
   {
      question: 'За убийство с какого оружия платят больше всего?',
      options: [
         'Дробовик',
         'Граната',
         'Винтовка',
         'Пистолет'],
      rightAnswer: 0
   },
   {
      question: 'Какой урон наносит AK-47 в голову(без брони)?',
      options: [
         '84',
         '100',
         '96',
         '143'],
      rightAnswer: 3
   },
   {
      question: 'Сколько времени горит молотов?',
      options: [
         '5 сек.',
         '4,7 сек.',
         '8 сек.',
         '3,6 сек.'],
      rightAnswer: 1
   },
   {
      question: 'Какое действие слышат окружающие игроки?',
      options: [
         'Переключение зума',
         'Снятие/одевание глушителя',
         'Переключение режимов на фамасе или глоке',
         'Все варианты'],
      rightAnswer: 3
   },
   {
      question: 'Сколько патронов в обойме P250?',
      options: [
         '8',
         '14',
         '13',
         '11'],
      rightAnswer: 2
   },
];
numberOfAllQuestion.innerHTML = questions.length;

const load = () => {
   question.innerHTML = questions[indexOfQuestion].question;

   option1.innerHTML = questions[indexOfQuestion].options[0];
   option2.innerHTML = questions[indexOfQuestion].options[1];
   option3.innerHTML = questions[indexOfQuestion].options[2];
   option4.innerHTML = questions[indexOfQuestion].options[3];
   console.log(indexOfPage);

   numberOfQuestion.innerHTML = indexOfPage + 1;
   console.log(indexOfPage);
   indexOfPage++;
   console.log(indexOfPage);
}
const completedAnswers = [];

const randomQuestion = () => {
   let randomNumber = Math.floor(Math.random() * questions.length);
   let hitDuplicate = false;

   if (indexOfPage == questions.length) {
      quizOver();
   } else {
      if (completedAnswers.length > 0) {
         completedAnswers.forEach(item => {
            if (item == randomNumber) {
               hitDuplicate = true;
            }
         });
         if (hitDuplicate) {
            randomQuestion();
         } else {
            indexOfQuestion = randomNumber;
            load();
         }
      }
      if (completedAnswers.length == 0) {
         indexOfQuestion = randomNumber;
         load();
      }
   }
   completedAnswers.push(indexOfQuestion);
}

const checkAnswer = el => {
   if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
      el.target.classList.add('correct');
      updateAnswerTracker('correct');
      score++;
   } else {
      el.target.classList.add('wrong');
      updateAnswerTracker('wrong');
   }
   disabledOptions();
}
const disabledOptions = () => {
   optionsElements.forEach(item => {
      item.classList.add('disabled');
      if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
         item.classList.add('correct');
      }
   })
}

for (option of optionsElements) {
   option.addEventListener('click', e => checkAnswer(e)
   )
}

const enableOptions = () => {
   optionsElements.forEach(item => {
      item.classList.remove('correct', 'wrong', 'disabled');
   })
}

const answerTracker = () => {
   questions.forEach(() => {
      const div = document.createElement('div');
      answersTracker.appendChild(div);
   })
}
const updateAnswerTracker = status => {
   answersTracker.children[indexOfPage - 1].classList.add(`${status}`)
}

const validate = () => {
   if (!optionsElements[0].classList.contains('disabled')) {
      alert('Вам нужно выбрать один из вариантов ответа!');
   } else {
      randomQuestion();
      enableOptions();
   }
}



const quizOver = () => {
   document.querySelector('.quiz-over-modal').classList.add('active');
   correctAnswer.innerHTML = score;
   numberOfAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
   window.location.reload();
}
btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
   validate();
})

window.addEventListener('load', () => {
   randomQuestion();
   answerTracker();
})