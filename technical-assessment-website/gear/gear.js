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
    let comments = JSON.parse(localStorage.getItem("gearComments")) || [];
    comments.push({name, comment});
    localStorage.setItem("gearComments", JSON.stringify(comments)); //converts to string

    loadComments();
}

// loads comments
function loadComments(){
    let comments = JSON.parse(localStorage.getItem("gearComments")) || [];
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
//localStorage.removeItem("gearComments");

// quizzes
//gear quiz
let ans = document.getElementById("ans-reveal");

//creates the quiz results for disciplines page
function quizResults() {
    let results = JSON.parse(localStorage.getItem("gearQuizResults"));
    
    //if there are no results so far, the progress bars are 0%
    if (!results) {
        results = {
            wrong: 0,
            right: 0
        };

        // add the results to local storage
        localStorage.setItem("gearQuizResults", JSON.stringify(results));
    }
}
function wrongAnsLameGear(){
    ans.innerHTML = "<h4><b>Incorrect: </b>Epee fencers do not wear lames because the whole body is already target area.</h4>";
    ans.style.color = "#910707";

    let results = JSON.parse(localStorage.getItem("gearQuizResults"));
    results["wrong"]++;

    localStorage.setItem("gearQuizResults", JSON.stringify(results));

    updateQuizBars();
}

function wrongAnsGloveGear(){
    ans.innerHTML = "<h4><b>Incorrect: </b>Gloves are only worn on the dominant hand in fencing.</h4>";
    ans.style.color = "#910707";

    let results = JSON.parse(localStorage.getItem("gearQuizResults"));
    results["wrong"]++;

    localStorage.setItem("gearQuizResults", JSON.stringify(results));

    updateQuizBars();
}

function rightAnsGear(){
     ans.innerHTML = "<h4><b>Correct!</b></h4>";
     ans.style.color = "#099e06";

     let results = JSON.parse(localStorage.getItem("gearQuizResults"));
    results["right"]++;

    localStorage.setItem("gearQuizResults", JSON.stringify(results));

    updateQuizBars();
}

function updateQuizBars() {
    let results = JSON.parse(localStorage.getItem("gearQuizResults"));
    let total = results.right + results.wrong;

    // Prevent divide-by-zero when no one has answered yet
    if (total === 0) {
        document.getElementById("right-results").value = 0;
        document.getElementById("wrong-results").value = 0;
        return;
    }
    let wrongVal = (results.wrong / total) * 100;
    let rightVal = (results.right / total) * 100;
    document.getElementById("percentWrong").innerHTML = String(Math.round(wrongVal)) + "%";
    document.getElementById("percentRight").innerHTML = String(Math.round(rightVal)) + "%";


    document.getElementById("wrong-results").value = wrongVal;
    document.getElementById("right-results").value = rightVal;
}


// techniques quiz
function wrongAnsTech(){
    ans.innerHTML = "<h4><b>Incorrect: </b>Reread the section on parry 4";
    ans.style.color = "#910707";
}

function rightAnsTech(){
     ans.innerHTML = "<h4><b>Correct!</b></h4>";
     ans.style.color = "#099e06";
}


window.onload = function () {
    loadComments();
    quizResults();
    updateQuizBars();   
};

