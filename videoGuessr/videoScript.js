let data1 = [];
let score = 0;
let randomItem;

const video = document.getElementById('videoPlayer');
video.addEventListener ('loadedmetadata', function() {
  video.currentTime = 60;
});

fetch('data1.json')
    .then(response => response.json())
    .then(data => {
        data1 = data;
        showLyric();
        document.getElementById("nextVideo").disabled = true;
        document.getElementById("confirmAnswerButton").disabled = false;
    })
    .catch(error => console.error('Error fetching lyric data:', error));

function getRandomItem(array) {
    if (array.length > 0) {
        const randomIndex = Math.floor(Math.random() * array.length);
        const randomItem = array.splice(randomIndex, 1)[0];
        return randomItem;
    } else {
        return null;
    }
}

function showLyric() {
    if (data1.length > 0) {
        randomItem = getRandomItem(data1);
        document.getElementById("videoPlayer").src = randomItem.video;
        document.getElementById("nextVideo").disabled = true;
        document.getElementById("confirmAnswerButton").disabled = false;
    }
}

function newRandomLyric() {
    if (data1.length > 0) {
        randomItem = getRandomItem(data1);
        document.getElementById("userAnswer").value = "";
        document.getElementById("videoPlayer").src = randomItem.video;
        document.getElementById("confirmAnswerText").innerHTML = "";
        document.getElementById("nextVideo").disabled = true;
        document.getElementById("confirmAnswerButton").disabled = false;
    }
}

function checkAnswer() {
    const userAnswer = document.getElementById("userAnswer").value.trim();
    const correctAnswer = randomItem.answer;

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        document.getElementById("confirmAnswerText").innerHTML = "Correct! The answer is: " + correctAnswer;
        score++;
    } else {
        document.getElementById("confirmAnswerText").innerHTML = "Incorrect! The correct answer is: " + correctAnswer;
        score = 0;
    }

    document.getElementById("nextVideo").disabled = false;
    document.getElementById("confirmAnswerButton").disabled = true;
    document.getElementById("scoreDisplay").innerHTML = "Score: " + score;
}

function showHint() {
    document.getElementById("demo").innerHTML = randomItem.hint;
}

document.getElementById("nextVideo").addEventListener("click", newRandomLyric);
document.getElementById("confirmAnswerButton").addEventListener("click", checkAnswer);
document.getElementById("demo").onclick = function() { showHint() };
