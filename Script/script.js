//grab our inject id
let inject = document.getElementById("inject");
let HP1Questions = [];
let HP2Questions = [];
let HP3Questions = [];
let difficulty = 0;
let c = document.getElementById("c");
let triviaQ = [];
// let correct = document.getElementById('correct');
// let counter = document.getElementById('counter');

//make fetch into a function
function loadHTML(url) {
  fetch(url)
    .then((data) => data.text()) //data holds data pulled from page, put it into text format
    .then((response) => {
      if (url == "../site/mainMenu.html") {
        loadMainMenu(response); //response is holding the url (the response given)
      } else if (url == "../site/instructions.html") {
        loadInstructions(response);
      } else if (url == "../site/lvlSelect.html") {
        loadLvlSelect(response);
      } else if (url == "../site/harrypotter.html" && difficulty == 1) {
        loadGame(response, HP1Questions);
      } else if (url == "../site/harrypotter.html" && difficulty == 2) {
        loadGame(response, HP2Questions);
      } else if (url == "../site/harrypotter.html" && difficulty == 3) {
        loadGame(response, HP3Questions);
      } else if (url == "../site/win.html") {
        loadWin(response);
        console.log(response);
      } else if (url == "../site/gameOver.html") {
        loadGameOver(response);
      }
    });
}

function getQuestions(url) {
  fetch(url)
    .then((data) => data.json()) //json because it's in json format (??)
    .then((response) => {
      for (let i = 0; i < 20; i++) {
        // difficulty = 1;
        HP1Questions.push(response.harryPotter1[i]);
        //HP1Questions = harrypotter1 if not just grabbing the first 20questions
      }
      //console.log(HP1Questions);
      for (let j = 0; j < 20; j++) {
        // difficulty = 2;
        HP2Questions.push(response.harryPotter2[j]);
      }
      // console.log(HP2Questions);

      for (let k = 0; k < 20; k++) {
        // difficulty = 3;
        HP3Questions.push(response.harryPotter3[k]);
      }
      // console.log(HP3Questions);
    });
}

function loadMainMenu(html) {
  //inject.innerHTML = response;
  inject.innerHTML = html;
  //make button clickable
  let injectLvl = document.getElementById("injectLvl");
  injectLvl.addEventListener("click", function (e) {
    // console.log('start button works');
    loadHTML("../site/instructions.html");
  });
}

function loadInstructions(html) {
  inject.innerHTML = html;
  let ready = document.getElementById("ready");
  ready.addEventListener("click", function (e) {
    loadHTML("../site/lvlSelect.html");
  });
}

function loadLvlSelect(html) {
  inject.innerHTML = html;
  let injectHP = document.getElementById("injectHP");
  injectHP.addEventListener("click", function (e) {
    loadHTML("../site/harrypotter.html");
    difficulty = 1;
  });
  let injectHP2 = document.getElementById("injectHP2");
  injectHP2.addEventListener("click", function (e) {
    loadHTML("../site/harrypotter.html");
    difficulty = 2;
  });
  let injectHP3 = document.getElementById("injectHP3");
  injectHP3.addEventListener("click", function (e) {
    loadHTML("../site/harrypotter.html");
    difficulty = 3;
  });
}

function loadWin(html) {
  //display # of questions answered correctly, button to play again (ennervate), easter egg button
  inject.innerHTML = html;
  // let tally = document.getElementById('tally');
  // tally.innerText = `Congratulations! You got ${totalScore} out of ${totalQuestions} questions right!`;
  let ennervate = document.getElementById("ennervate");
  ennervate.addEventListener("click", function (e) {
    //starts play again
    loadHTML("../site/lvlSelect.html");
  });
  // let easterEgg = document.getElementById('easterEgg');
  // easterEgg.addEventListener('click', function(e){

  // });
}

function loadGameOver(html) {
  //display # of questions answered correctly, button to play again (ennervate)
  inject.innerHTML = html;
  let ennervate = document.getElementById("ennervate");
  ennervate.addEventListener("click", function (e) {
    //starts play again
    loadHTML("../site/lvlSelect.html");
  });
}

function loadGame(html, questions) {
  inject.innerHTML = html;
  //console.log(questions);
  // let triviaQ = [];
  let totalQuestions = 20;
  let totalScore = 0;
  let timer = 30;
  let Q = document.getElementById("Q");
  Q.innerText = questions[0].Q;
  let qNum = 0;
  let interval;

  // let correct = document.getElementById('correct');
  let counter = document.getElementById("counter");

  let a1 = document.getElementById("a1");
  a1.innerText = questions[0].a1;
  let a2 = document.getElementById("a2");
  a2.innerText = questions[0].a2;
  let a3 = document.getElementById("a3");
  a3.innerText = questions[0].a3;
  let a4 = document.getElementById("a4");
  a4.innerText = questions[0].a4;
  let c = document.getElementById("c");

  counter.innerText = timer;
  //counter--;
  console.log(HP1Questions);
  //loadQuestion();

  a1.addEventListener("click", function (e) {
    checkAnswer(e.target.innerText);
    updateTime(e.target.innerText);
    console.log("a1");
  });
  a2.addEventListener("click", function (e) {
    checkAnswer(e.target.innerText);
    updateTime(e.target.innerText);
    console.log("a2");
  });
  a3.addEventListener("click", function (e) {
    checkAnswer(e.target.innerText);
    updateTime(e.target.innerText);
    console.log("a3");
  });
  a4.addEventListener("click", function (e) {
    checkAnswer(e.target.innerText);
    updateTime(e.target.innerText);
    console.log("a4");
  });

  //checks answer is correct and keeps score of total answered correctly
  function checkAnswer(answer) {
    if (difficulty == 1) {
      triviaQ = HP1Questions;
    } else if (difficulty == 2) {
      triviaQ = HP2Questions;
    } else {
      triviaQ = HP3Questions;
    }

    if (answer === triviaQ[qNum].c) {
      totalScore++;
    } else {
      //do nothing but code block below
    }
    console.log(score.innerText);
    score.innerText = `${totalScore}`;
    timer = 30;
    counter.innerText = timer;
    nextQuestion();
  }

  function nextQuestion() {
    qNum++;
    //cycle through all the questions
    if (qNum < totalQuestions) {
      console.log(qNum);
      loadQuestion();
    } else {
      console.log("winPageFires");
      clearInterval(interval);
      loadHTML("../site/win.html");
      //loadWin();
    }
  }

  function updateTime() {
    timer--;
    if (timer == 0) {
      loadHTML("../site/win.html");
      //counter.innerText = timer;
    } else {
      counter.innerText = timer;
    }
  }

  function loadQuestion() {
    clearInterval(interval);
    Q.innerText = triviaQ[qNum].Q;
    a1.innerText = triviaQ[qNum].a1;
    a2.innerText = triviaQ[qNum].a2;
    a3.innerText = triviaQ[qNum].a3;
    a4.innerText = triviaQ[qNum].a4;
    interval = setInterval(updateTime, 1000);
  }
}

loadHTML("../site/mainMenu.html");

getQuestions("../Data/data.json");
