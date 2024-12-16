

//Function for button click
const button25s = document.getElementById('button25s');
const button60s = document.getElementById('button60s');
const restart_btn_25 = document.getElementById('restart_btn_25s');
const restart_btn_60 = document.getElementById('restart_btn_60s');

// Add event listeners for buttons with different time limit
button25s.addEventListener('click', () => {
  restart_btn_60.style.display = "none";
  startGame(25);
});

button60s.addEventListener('click', () => {
  restart_btn_25.style.display = "none";
  startGame(60);
})

restart_btn_25.addEventListener('click', () => {
  startGame(25);
});

restart_btn_60.addEventListener('click', () => {
  startGame(60);
})







// define the time limit
let TIME_LIMIT;

// define quotes to be used
let quotes_array = [
  "Life is what happens to you while you're busy making other plans.",
  "Success consists of going from failure to failure without loss of enthusiasm.",
  "Push yourself, because no one else is going to do it for you.",
  "Failure is the condiment that gives success its flavor.",
  "Wake up with determination. Go to bed with satisfaction.",
  "It's going to be hard, but hard does not mean impossible.",
  "Learning never exhausts the mind.",
  "The only way to do great work is to love what you do.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Failure is success if we learn from it.",
  "Success does not consist in never making mistakes but in never making the same one a second time.",
  "Only those who dare to fail greatly can ever achieve greatly.",
  "If you're not prepared to be wrong, you'll never come up with anything original.",
  "Failure should be our teacher, not our undertaker. Failure is delay, not defeat. It is a temporary detour, not a dead end. Failure is something we can avoid only by saying nothing, doing nothing, and being nothing.",
  "I have not failed. I've just found 10,000 ways that won't work."
];

//Default display for showTest as false
let showTest = document.querySelector(".showTest");
showTest.style.display = "none";

// variable display option for during test statistics and results
let show_test_stats = document.querySelector(".testStats");
let show_results = document.querySelector(".result");
show_results.style.display = "none";

// selecting required elements
let timer_display = document.getElementById('timer');
let accuracy_text = document.querySelectorAll(".curr_accuracy");
let error_text = document.querySelectorAll(".curr_errors");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let quote_text = document.querySelector(".quote");
//let restart_btn = document.querySelector(".restart_btn");
let accuracy_group = document.querySelector(".accuracy");
let input_area = document.querySelector(".type-area");
let testDiv = document.querySelectorAll(".testDiv");


let timeLeft;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo;
let timer = null;

//function to change quote
function updateQuote() {
  // Generate a random quote index
  quoteNo = Math.floor(Math.random() * quotes_array.length);
  quote_text.textContent = null;
  current_quote = quotes_array[quoteNo];
  // console.log(current_quote);

  // separate each character and make an element 
  // out of each of them to individually style them
  current_quote.split('').forEach(char => {
    const charSpan = document.createElement('span')
    charSpan.innerText = char;
    quote_text.appendChild(charSpan);
  })


}

//function to get the typed test by user
function processCurrentInput() {
  //get curr input and split
  curr_input = input_area.value;
  curr_input_array = curr_input.split('');

  //increment total chars typed
  characterTyped++;

  errors = 0;
 
  quoteSpanArray = quote_text.querySelectorAll('span');
  quoteSpanArray.forEach((char, index) => {
    let typedChar = curr_input_array[index]

    // character not currently typed
    if (typedChar == null) {
      char.classList.remove('correct_char');
      char.classList.remove('incorrect_char');

      // correct character
    } else if (typedChar === char.innerText) {
      char.classList.add('correct_char');
      char.classList.remove('incorrect_char');

      // incorrect character
    } else {
      char.classList.add('incorrect_char');
      char.classList.remove('correct_char');

      // increment number of errors
      errors++;
    }
  });


  // display the number of errors
  error_text.forEach((ele) => {
    ele.textContent = total_errors + errors;
  });

  // update accuracy text
  let correctCharacters = (characterTyped - (total_errors + errors));
  let accuracyVal = ((correctCharacters / characterTyped) * 100);

  accuracy_text.forEach((element) => {
    element.textContent = Math.round(accuracyVal);
  });

  // if current text is completely typed
  // irrespective of errors
  if (curr_input.length == current_quote.length) {
    updateQuote();

    // update total errors
    total_errors += errors;

    // clear the input area
    input_area.value = "";
  }
}


function startGame(timeLimit) {
  TIME_LIMIT= timeLimit
  timeLeft= TIME_LIMIT;
  resetValues();
  updateQuote();

  testDiv.forEach((ele) => {
    ele.style.display = "none";
  })

  // clear old and start a new timer
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function resetValues() {

  timeLeft = TIME_LIMIT;
  timeElapsed = 0;
  errors = 0;
  total_errors = 0;
  accuracy = 0;
  characterTyped = 0;
  quoteNo = 0;
  input_area.disabled = false;

  //reset displays
  showTest.style.display = "block";
  show_results.style.display = 'none';

  input_area.value = "";
  quote_text.textContent = 'Click on the area below to start the game.';
  accuracy_text.textContent = 100;
  timer_display.textContent = 'Timer: ' +TIME_LIMIT + 's';
  error_text.forEach( ele => ele.textContent = 0 );
  //restart_btn.style.display = "none";
  show_test_stats.style.display = "block";
}


//function to update timer
function updateTimer() {
  if (timeLeft > 0) {
    // decrease the current time left
    timeLeft--;

    // increase the time elapsed
    timeElapsed++;

    // update the timer display
    timer_display.textContent = 'Timer: ' +timeLeft + 's';
  }
  else {
    // finish the game
    finishGame();
  }
}

function finishGame() {
  // stop the timer
  clearInterval(timer);
  show_test_stats.style.display = "none";
  show_results.style.display = "block";


  // disable the input area
  input_area.disabled = true;

  // show finishing text
  quote_text.textContent = "Click on restart to start a new game.";
  input_area.value = quote_text.textContent;

  // display restart button
  //restart_btn.style.display = "block";

  // calculate cpm and wpm
  cpm = Math.round(((characterTyped / timeElapsed) * 60));
  wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));

  // update cpm and wpm text
  cpm_text.textContent = cpm;
  wpm_text.textContent = wpm;

  // display the cpm and wpm
  show_results.style.display = 'block';
}

function goToHome() {
  // Hide elements with the 'result' and 'showTest' classes
  document.querySelectorAll('.result, .showTest').forEach((ele) => {
    ele.style.display = 'none';
  });

  // Show elements with the 'testDiv' class
  document.querySelectorAll('.testDiv').forEach((ele) => {
    ele.style.display = 'block';
  });
}