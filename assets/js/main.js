let currentQuestionIndex = 0;
let correctCount = 0;
let currentTime = 120; // Declare currentTime at a higher scope
let Timer = document.getElementById('Timer');
let questionElement = document.getElementById('question');
let choicesElement = document.getElementById('choices');
let feedbackElement = document.getElementById('feedback');
let startButton = document.getElementById('startButton');
let saveToStorage=document.getElementById('saveToStorage');
let intials=document.getElementById('Highscore');
let highscores=document.getElementById('highscores');
let startInterval; // Declare startInterval at a higher scope

const startQuiz = () => {
  startInterval = setInterval(() => {
    currentTime--;
    if (currentTime >= 0) {
      Timer.textContent = "Time: " + currentTime;
    } else {
      Timer.textContent = 'Time: 0';
      clearInterval(startInterval);
      feedbackElement.textContent = 'Time\'s up! Your score is: ' + correctCount;
      document.getElementById('score').style.display='block';
      document.getElementById('question').style.display='none';
      document.getElementById('choices').style.display='none';
    }
  }, 1000);
  startButton.style.display = "none";

  displayQuestion(currentQuestionIndex); // Display the first question when starting the quiz
}

const displayQuestion = (index) => {
  document.getElementById('mainText').style.display='none';
  document.getElementById('mainHeading').style.display='none';
  const currentQuestion = questions[index];
  if (currentQuestion) {
    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = '';
    Object.keys(currentQuestion.choices).forEach(key => {
      const button = document.createElement('button');
      button.innerText = currentQuestion.choices[key];
      button.style.display = "block"; // Add this to make buttons display as block
      button.addEventListener('click', () => {
        checkAnswer(key, currentQuestion);
        setTimeout(() => {
          feedbackElement.textContent = ''; // Clear feedback after a delay
          displayQuestion(currentQuestionIndex); // Move to the next question after a delay
        }, 2000); // 2 second delay
      });
      choicesElement.appendChild(button);
    });
  } else {
    currentTime = 0; // Set time to 0 when the quiz is finished
    Timer.textContent = 'Time: 0';
    document.getElementById('score').style.display='block';
    document.getElementById('question').style.display='none';
    document.getElementById('choices').style.display='none';
    feedbackElement.textContent = 'Quiz finished! Your score is: ' + correctCount;
    clearInterval(startInterval); // Stop the timer when the quiz is finished
  }
}

const checkAnswer = (key, question) => {
  if (key === question.answer) {
    feedbackElement.textContent = 'Correct!';
    correctCount++;
  } else {
    feedbackElement.textContent = 'Incorrect';
    currentTime -= 10; // Subtract 10 seconds if the answer is incorrect
  }
  // Prepare for the next question
  currentQuestionIndex++;
}

const addToLocalStorage=(name,score)=>{
    localStorage.setItem(name,score);
    location.reload();
}
const viewHighScore=()=>{
    document.getElementById('main').style.display='none';
    document.getElementById('quiz').style.display='none';
    document.getElementById('score').style.display='none';
    document.getElementById('viewScores').style.display='flex';
    document.getElementById('viewScores').style.textAlign='center';
    document.getElementById('viewScores').style.justifyContent='center';
    document.getElementById('viewScores').style.alignItems='center';
    document.getElementById('viewScores').style.flexDirection='column'; // ensure children are stacked vertically
    
    let tableHTML = '<table id="tableScore" style="margin: auto; border-collapse: collapse; width: 50%;">';
    tableHTML += '<tr><th style="border: 1px solid black;">User</th><th style="border: 1px solid black;">HighScore</th></tr>';
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        tableHTML += `<tr><td style="border: 1px solid black;">${key}</td><td style="border: 1px solid black;">${value}</td></tr>`;
    }
    tableHTML += '</table>';

    document.getElementById('viewScores').innerHTML = tableHTML;

    const button = document.createElement('button');
    button.id = 'homeButton';
    button.textContent = 'Back to Quiz';
    button.addEventListener('click',()=>{
        location.reload();
    })

    document.getElementById('viewScores').appendChild(button);
}


startButton.addEventListener('click', () => {
  startQuiz();
});

saveToStorage.addEventListener('click',()=>{
    addToLocalStorage(intials.value,correctCount);
})
highscores.addEventListener('click',()=>{
    viewHighScore();
})
