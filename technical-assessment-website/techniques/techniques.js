// submit name
function submitComment(){
    // submit name and comment
    let name = document.getElementById("nameInput").value;
    let comment = document.getElementById("commentInput").value;

    //if the user decides to not enter a name, they are anonymous
    if(name === ""){
        name = "Anonymous User";
    }

    // erases name and comment field
    document.getElementById("nameInput").value = "";
    document.getElementById("commentInput").value = "";

    // comment list
    let comments = JSON.parse(localStorage.getItem("techComments")) || [];
    comments.push({name, comment});
    localStorage.setItem("techComments", JSON.stringify(comments)); //converts to string

    loadComments();
}

// loads comments
function loadComments(){
    let comments = JSON.parse(localStorage.getItem("techComments")) || [];
    let commentTable = document.getElementById("commentSection");

    // clears current table so there arent any duplicates
    clearComments();

    for (let i = 0; i < comments.length; i++){
        let newRow = commentTable.insertRow();
        let nameCell = newRow.insertCell(0);
        let commentCell = newRow.insertCell(1);

        nameCell.innerHTML = comments[i].name;
        commentCell.innerHTML = comments[i].comment;
    }
}

// clears all current comments so there are no duplicates
function clearComments() {

    let commentTable = document.getElementById("commentSection");
    
    //Clears table but keeps the header
    while (commentTable.rows.length > 1) {
        commentTable.deleteRow(1);
    }
}
// uncomment to remove all comments
//localStorage.removeItem("techComments");

// quizzes
// techniques quiz
let ans = document.getElementById("ans-reveal");

//creates the quiz results for techniques page
function quizResults() {
    let results = JSON.parse(localStorage.getItem("dQuizResults"));
    
    //if there are no results so far, the progress bars are 0%
    if (!results) {
        results = {
            wrong: 0,
            right: 0
        };

        // add the results to local storage
        localStorage.setItem("techQuizResults", JSON.stringify(results));
    }
}


// techniques quiz
function wrongAnsTech(){
    ans.innerHTML = "<h4><b>Incorrect: </b>Reread the section on parry 4";
    ans.style.color = "#910707";

    let results = JSON.parse(localStorage.getItem("discQuizResults"));
    results["wrong"]++;

    localStorage.setItem("techQuizResults", JSON.stringify(results));

    updateQuizBars();
}

function rightAnsTech(){
    ans.innerHTML = "<h4><b>Correct!</b></h4>";
    ans.style.color = "#099e06";

    let results = JSON.parse(localStorage.getItem("discQuizResults"));
    results["right"]++;

    localStorage.setItem("techQuizResults", JSON.stringify(results));

    updateQuizBars();
}


function updateQuizBars() {
    let results = JSON.parse(localStorage.getItem("techQuizResults"));
    let total = results.right + results.wrong;

    // Prevent divide-by-zero when no one has answered yet
    if (total === 0) {
        document.getElementById("right-results").value = 0;
        document.getElementById("wrong-results").value = 0;
        return;
    }
    let wrongVal = (results.wrong / total) * 100;
    let rightVal = (results.right / total) * 100;
    document.getElementById("percentWrongTech").innerHTML = String(Math.round(wrongVal)) + "%";
    document.getElementById("percentRightTech").innerHTML = String(Math.round(rightVal)) + "%";


    document.getElementById("wrong-results").value = wrongVal;
    document.getElementById("right-results").value = rightVal;
}


// fencing game
const fencerStand = document.getElementById("fencer-stand");
const fencerLunge = document.getElementById("fencer-lunge");
let currMove = document.getElementById("curr-move");
let player;

let gameArea = {
    canvas : document.getElementById("game"),
    start : function() {
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateGameArea, 20);
        this.context.canvas.height = innerHeight; 
        this.context.canvas.width = innerWidth;
        this.context.canvas.style.imageRendering = 'auto';
        
    },
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}


function startGame(){
    player = new component(30, 30, 0, 20);
    gameArea.start();
}

//the player
function component(width, height, x, y){
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.currentImage = fencerStand;

    this.update = function(){
        ctx = gameArea.context;
        //this.x, this.y, this.width, this.height
        ctx.drawImage(this.currentImage, this.x, this.y, 450, 600);
    }
}

//the player moves on key presses
window.addEventListener('keydown', (event) => {
            switch (event.key) { 
                case "a": //retreat
                    player.x -= 20;
                    if(currMove.innerHTML === "Lunge!" || currMove.innerHTML === "Advance Lunge!" || currMove.innerHTML === "Redouble!"){
                        player.currentImage = fencerStand;
                    }
                    currMove.innerHTML = "Retreat!"
                    break;
                case "d": //advance
                    player.x += 20;
                    if(currMove.innerHTML === "Lunge!" || currMove.innerHTML === "Advance Lunge!" || currMove.innerHTML === "Redouble!"){
                        player.currentImage = fencerStand;
                    }
                    currMove.innerHTML = "Advance!"
                    break;
                case "w": //lunge
                    player.x += 70;
                    if(currMove.innerHTML === "Lunge!" || currMove.innerHTML === "Advance Lunge!" || currMove.innerHTML === "Redouble!"){
                        currMove.innerHTML = "Redouble!"
                    }
                    else if(currMove.innerHTML === "Advance!"){
                        currMove.innerHTML = "Advance Lunge!"
                    }
                    else{
                        currMove.innerHTML = "Lunge!"
                    }
                    player.currentImage = fencerLunge;
                    break;
            }
        });

function retreatBtn(){
    player.x -= 20;
    if(currMove.innerHTML === "Lunge!" || currMove.innerHTML === "Advance Lunge!" || currMove.innerHTML === "Redouble!"){
        player.currentImage = fencerStand;
    }
    currMove.innerHTML = "Retreat!"
}

function advanceBtn(){
    player.x += 20;
    if(currMove.innerHTML === "Lunge!" || currMove.innerHTML === "Advance Lunge!" || currMove.innerHTML === "Redouble!"){
        player.currentImage = fencerStand;
    }
    currMove.innerHTML = "Advance!"
}

function lungeBtn(){
    player.x += 70;
    if(currMove.innerHTML === "Lunge!" || currMove.innerHTML === "Advance Lunge!" || currMove.innerHTML === "Redouble!"){
        currMove.innerHTML = "Redouble!"
    }
    else if(currMove.innerHTML === "Advance!"){
        currMove.innerHTML = "Advance Lunge!"
    }
    else{
        currMove.innerHTML = "Lunge!"
    }
    player.currentImage = fencerLunge;
}

function updateGameArea(){
    gameArea.clear();

    player.update();
}


window.onload = function () {
    loadComments();
    quizResults();
    updateQuizBars(); 
    startGame(); 
};

