let lyricEasy = [];
let score = 0;


fetch('data.json')
    .then(response => response.json())
    .then(data => {
        lyricEasy = data;
        showLyric();
        document.getElementById("nextLyric").disabled = true;
        document.getElementById("confirmAnswerButton").disabled = false;
    })
    .catch(error => console.error('Error fetching lyric data:', error));

    function getRandomItem(array) {
        const easyItems = array.filter(item => item.difficulty === "easy");
        if (easyItems.length > 0) {
            const randomIndex = Math.floor(Math.random() * easyItems.length);
            const randomItem = lyricEasy.splice(randomIndex, 1)[0];
            return randomItem;
        } else {
            return null;
        }
    }
    

let randomItem;

function showLyric() {
    if (lyricEasy.length > 0) {
        randomItem = getRandomItem(lyricEasy);
        document.getElementById("lyricField").innerHTML = randomItem.lyric
        document.getElementById("Hint").innerHTML = randomItem.hint;
        document.getElementById("nextLyric").disabled = false;
        document.getElementById("confirmAnswerButton").disabled = true;
    }
}

function newRandomLyric() {
    if (lyricEasy.length > 0) {
        randomItem = getRandomItem(lyricEasy);
        document.getElementById("userAnswer").value = "";
        document.getElementById("lyricField").innerHTML = randomItem.lyric;
        document.getElementById("confirmAnswerText").innerHTML = "";
        document.getElementById("nextLyric").disabled = true;
        document.getElementById("confirmAnswerButton").disabled = false;
        document.getElementById("demo").innerHTML = "Click for a hint";
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
    
    document.getElementById("nextLyric").disabled = false;
    document.getElementById("confirmAnswerButton").disabled = true;
    document.getElementById("scoreDisplay").innerHTML = "Score: " + score;
}


function showHint() {
    document.getElementById("demo").innerHTML = randomItem.hint;
}

document.getElementById("demo").onclick = function() {showHint()};


document.getElementById("nextLyric").addEventListener("click", newRandomLyric);
document.getElementById("confirmAnswerButton").addEventListener("click", checkAnswer);
