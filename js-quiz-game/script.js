window.onload = console.log("Created by: Albert Tromsa");

//array of 25 questions
const questions = [
    {
        question: "What is the boiling point of water at sea level in Celsius?", //questions
        answers: ["100°C","90°C","105°C","95°C",], //ans
        correctAns: 0 //rignt ans index
    },

    {
        question: "What is the hardest natural substance on Earth?",
        answers: ["Graphite","Diamond","Air","Ruby",],
        correctAns: 1
    },
    
    {
        question: "Which is the longest river in the world?",
        answers: ["Dnipro","Dniester","Amazon","Nile",],
        correctAns: 2
    },

    {
        question: "Which country is nicknamed the Land of the Rising Sun",
        answers: ["Thailand","Vietnam","China","Japan",],
        correctAns: 3
    },

    {
        question: "What is the smallest unit of life?",
        answers: ["Cell","Ant","Molecule","Atom",],
        correctAns: 0
    },

    {
        question: "Which language has the most native speakers in the world?",
        answers: ["Spanish","Chinese","English","Hindi",],
        correctAns: 1
    },

    {
        question: "What year did the Titanic sink?",
        answers: ["1908","1902","1912","1939",],
        correctAns: 2
    },

    {
        question: "In Greek mythology, who is the god of the sea?",
        answers: ["Zeus","Yanek","Apollo","Poseidon",],
        correctAns: 3
    },

    {
        question: "How many continents are there on Earth?",
        answers: ["7","11","9","5",],
        correctAns: 0
    },

    {
        question: "Which country has won the most FIFA World Cups?",
        answers: ["Germany","Brazil","Italy","France",],
        correctAns: 1
    },

    {
        question: "What is the main ingredient in guacamole?",
        answers: ["Onion","Tomato","Avocado","Potato",],
        correctAns: 2
    },

    {
        question: "What is the largest ocean on Earth?",
        answers: ["Arctic","Atlantic","Indian","Pacific",],
        correctAns: 3
    },

    {
        question: "Which gas do plants absorb from the atmosphere during photosynthesis?",
        answers: ["Carbon dioxide","Nitrogen","Methane","Oxygen",],
        correctAns: 0
    },

    {
        question: "How many days are there in a leap year?",
        answers: ["365","366","364","360",],
        correctAns: 1
    },

    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Saturn","Jupiter","Mars","Venus",],
        correctAns: 2
    },

    {
        question: "What is the capital of France?",
        answers: ["London","Berlin","Rome","Paris",],
        correctAns: 3
    },

    {
        question: "What’s the national flower of Japan?",
        answers: ["Cherry blossom","Rose","Sunflower","Tulip",],
        correctAns: 0
    },

    {
        question: "How many elements are in the periodic table?",
        answers: ["98","118","28","108",],
        correctAns: 1
    },

    {
        question: "What is the name of the world's first artificial satellite?",
        answers: ["Atom 2","Copernicus MK1","Sputnik 1","Raphael",],
        correctAns: 2
    },

    {
        question: "What was the name of the ancient Egyptian sun god?",
        answers: ["Ba","Ta","Ma","Ra",],
        correctAns: 3
    },

    {
        question: "What is the highest-grossing film of all time?",
        answers: ["Avatar","Avengers: Endgame","Titanic","Star Wars: The Force Awakens",],
        correctAns: 0
    },

    {
        question: "What is a group of crows called?",
        answers: ["Gang","Murder","Group","Party",],
        correctAns: 1
    },

    {
        question: "What animal has the largest brain relative to body size?",
        answers: ["Crocodile","Giraffe","Dolphin","Whale",],
        correctAns: 2
    },

    {
        question: "In what year did World War II end?",
        answers: ["1918","1941","1947","1945",],
        correctAns: 3
    },

    {
        question: "In what decade was the internet created?",
        answers: ["1960s","1970s","1980s","1950s",],
        correctAns: 0
    }
]

//declearing all variables
let already_picked = new Array(questions.length);
already_picked.fill(true); //fill array size of questions array with true
//console.log(already_picked)

let randomQuestion = []; //creating object for random question fow ruture
let buttons = document.getElementsByClassName('ans_button');

let table = document.querySelectorAll('.table_row');
let prizeCount = 0;
localStorage.setItem("prizeCount", prizeCount)

let time_out_var = null; //variable for timer
let helpers = document.querySelectorAll('.helpers'); //get all helpers

let allow_to_helpers = false; //to freeze helpers whene needed
let localCounter = 0; //to control flow on localStorage



//i need to delay some code to get right data from html
window.onload = setTimeout(start_up, 1000);
function start_up() {
    document.getElementById('player_name').textContent = localStorage.getItem("name");

    helpers = document.querySelectorAll('.helpers');
    console.log("Helpers found: ", helpers);

    //adding listeners for all helpers
    for(let i = 0; i < helpers.length; i++){
        helpers[i].addEventListener('click', helpers_func, false);
    }
}



//function for inceasing prize "rate" of player && for updating table
function increasePrize () {
    prizeCount++

    table = document.querySelectorAll('.table_row');
    //console.log(table);
    //to highlight right row
    table[(table.length - prizeCount)].style.backgroundColor = "hsla(65, 78%, 68%, 0.436)";

    //to remove hignlight from previous row. if stat. to prevent errors
    if (prizeCount > 1) {
       table[(table.length - prizeCount +1)].style.backgroundColor = "transparent"; 
    }

    //update prizeCount in localStorge
    localStorage.setItem("prizeCount", prizeCount)
    console.log("prizeCount is: ", prizeCount)
}



//load random question on screen
function pickNPlaceRandomQuestion() {
    allow_to_helpers = true; //allow helpers for now
    
    //do-while to get unique question 
    do {
        randInt = parseInt(Math.random() * (questions.length) -1);
    } while (!already_picked[randInt]) ;

    already_picked[randInt] = false; //block this question for future
    console.log("already_picked table now is: ", already_picked)
    //console.log("random number for question is: ", randInt);
    
    randomQuestion = questions[randInt]; //update randomQuestion with new question
    console.log("\nQuestion to put: " + randomQuestion.question);

    //put question
    document.getElementById('question_field').textContent = randomQuestion.question;
    
    //to save question in localStorage with unique number
    if (localCounter == prizeCount)
    {
        localStorage.setItem(`Q-${prizeCount}`, randomQuestion.question)
        localCounter++
    }
    
    //run timer to 15s
    time_out_var = setTimeout(time_out, 15000);

    //get array of buttons
    buttons = document.getElementsByClassName('ans_button');

    //some actions with buttons
    for (let i = 0; i < buttons.length; i++) {
        //set answer
        buttons[i].textContent = randomQuestion.answers[i];
        buttons[i].addEventListener('click', ans_checker, false); //add lis...
        console.log(`button num${i} is: ` + buttons[i].textContent);
        //reset some style
        buttons[i].style.visibility = 'visible';
        buttons[i].style.backgroundColor = 'rgb(70, 61, 166)';
    }
}



//func to check player answer - runs when btn clicked
function ans_checker (e) {
    clearTimeout(time_out_var); //clear timer to prevent game stop

    console.log(e.target.textContent, "Button clicked!!! ALERT ALERT", randomQuestion.answers[randomQuestion.correctAns], "Right answer!")
    
    //checker itself
    if (e.target.textContent == randomQuestion.answers[randomQuestion.correctAns]) {
        //answer is right
        // alert("ALERT YOU ARE RIGHT!");
        e.target.style.backgroundColor = 'hsla(65, 78%, 68%, 0.436)';
        increasePrize()

        //save answer with unique name
        if (localCounter == prizeCount)
            {
                localStorage.setItem(`A-${prizeCount -1}`, e.target.textContent)
            }

        if (prizeCount != 15) {
            //put new question
            setTimeout(pickNPlaceRandomQuestion, 1000);
        }
        else{
            //player won 1M!
            console.log("\n\nALERT YOU WIN!!!");
            console.log("prizeCount is: ", prizeCount);
            close_game() 
        }
    }
    else {
        //wrong answer
        localStorage.setItem(`A-${prizeCount}`, e.target.textContent);
        // alert("ALERT YOU LOOSE! - CLOSE GAME!");
        console.log("prizeCount is: ", prizeCount);
        e.target.style.backgroundColor = 'hsla(0, 78%, 68%, 0.436)';
        close_game();  
    }  
}



//close game if time up!
function time_out() {
    localStorage.setItem(`A-${prizeCount}`, "Not Answered!")
    alert("NO TIME LEFT!");
    console.log("NO TIME LEFT!");
    close_game();
}



//function for helpers
function helpers_func (e) {
    //console.log(e.target.alt)

    //get helper by it alt value
    if (e.target.alt == "50-50" && allow_to_helpers){
        let a = 0; //just local counter

        do { //a can't be the same index as right answer
            a = parseInt(Math.random() *4)
        } while (a == randomQuestion.correctAns);

        //hide all instead right answer and one random
        for(let i = 0; i < buttons.length; i++) {
            if (i != randomQuestion.correctAns && i != a){
                buttons[i].style.visibility = 'hidden';
            }
        }
        e.target.style.visibility = 'hidden'; //disable this helper
        allow_to_helpers = false; //freeze helpers for now to prevent errors
    }

    //the same idea for others helpers
    else if ((e.target.alt == "public" && allow_to_helpers) || (e.target.alt == "phone" && allow_to_helpers)){
        let a = parseInt(Math.random() *4)
        for(let i = 0; i < buttons.length; i++) {
            if (i != a) {
                buttons[i].style.visibility = 'hidden';
            }
        }
        e.target.style.visibility = 'hidden';
        allow_to_helpers = false;
    }
}



//close game and go to summapy page
function close_game () {
    window.location.href = 'summary_page/summary_page.html'
}


//to start the game after 3s after htmp load
window.onload = setTimeout(pickNPlaceRandomQuestion, 3000); //run on html load + 5s
