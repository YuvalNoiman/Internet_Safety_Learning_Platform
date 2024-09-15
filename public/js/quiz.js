const quizForm = document.getElementById('quiz');
const type = document.getElementById('type');
/*const q1 = document.getElementById('q1');
const q2 = document.getElementById('q2');
const q3 = document.getElementById('q3');
const q4 = document.getElementById('q4');
const q5 = document.getElementById('q5');*/
const resultDiv1 = document.getElementById('result1');
const resultDiv2 = document.getElementById('result2');
const resultDiv3 = document.getElementById('result3');
const resultDiv4 = document.getElementById('result4');
const resultDiv5 = document.getElementById('result5');
const resultDiv = document.getElementById('result');
const correctAnswersPhishing = ['c','b','d','b','a'];

function checkQuiz(type){
    let score = 0;
    let q1 = document.getElementById('q1');
    let q2 = document.getElementById('q2');
    let q3 = document.getElementById('q3');
    let q4 = document.getElementById('q4');
    let q5 = document.getElementById('q5');
    if (type === "phishing"){
        if (q1.value === correctAnswersPhishing[0]){
            resultDiv1.innerHTML = "Correct!";
            score += 1;
        }
        else{
            resultDiv1.innerHTML = "Wrong!";
        }
        if (q2.value === correctAnswersPhishing[1]){
            resultDiv2.innerHTML = "Correct!";
            score += 1;
        }
        else{
            resultDiv2.innerHTML = "Wrong!";
        }
        if (q3.value === correctAnswersPhishing[2]){
            resultDiv3.innerHTML = "Correct!";
            score += 1;
        }
        else{
            resultDiv3.innerHTML = "Wrong!";
        }
        if (q4.value === correctAnswersPhishing[3]){
            resultDiv4.innerHTML = "Correct!";
            score += 1;
        }
        else{
            resultDiv4.innerHTML = "Wrong!";
        }
        if (q5.value === correctAnswersPhishing[4]){
            resultDiv5.innerHTML = "Correct!";
            score += 1;
        }
        else{
            resultDiv5.innerHTML = "Wrong!";
        }
    }
    console.log(type);
    resultDiv.innerHTML = `Your score is ${score}/5`;
  }

quizForm.addEventListener('submit', e => checkQuiz(type.getAttribute("data-value"), e.preventDefault()))