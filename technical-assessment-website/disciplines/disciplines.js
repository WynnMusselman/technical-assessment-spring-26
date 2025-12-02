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
    let comments = JSON.parse(localStorage.getItem("discComments")) || [];
    comments.push({name, comment});
    localStorage.setItem("discComments", JSON.stringify(comments)); //converts to string

    loadComments();
}

// loads comments
function loadComments(){
    let comments = JSON.parse(localStorage.getItem("discComments")) || [];
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
//localStorage.removeItem("discComments");

// quizzes
// disciplines quiz
let ans = document.getElementById("ans-reveal");

//creates the quiz results for disciplines page
function quizResults() {
    let results = JSON.parse(localStorage.getItem("discQuizResults"));
    
    //if there are no results so far, the progress bars are 0%
    if (!results) {
        results = {
            wrong: 0,
            right: 0
        };

        // add the results to local storage
        localStorage.setItem("discQuizResults", JSON.stringify(results));
    }
}

function wrongAnsDisc(){
    ans.innerHTML = "<h4><b>Incorrect: </b>Look at the lame worn by the fencers</h4>";
    ans.style.color = "#910707";

    let results = JSON.parse(localStorage.getItem("discQuizResults"));
    results["wrong"]++;

    localStorage.setItem("discQuizResults", JSON.stringify(results));

    updateQuizBars();
}

function rightAnsDisc(){
     ans.innerHTML = "<h4><b>Correct!</b></h4>";
     ans.style.color = "#099e06";

    let results = JSON.parse(localStorage.getItem("discQuizResults"));
    results["right"]++;

    localStorage.setItem("discQuizResults", JSON.stringify(results));

    updateQuizBars();
}

function updateQuizBars() {
    let results = JSON.parse(localStorage.getItem("discQuizResults"));
    let total = results.right + results.wrong;

    // Prevent divide-by-zero when no one has answered yet
    if (total === 0) {
        document.getElementById("right-results").value = 0;
        document.getElementById("wrong-results").value = 0;
        return;
    }
    let wrongVal = (results.wrong / total) * 100;
    let rightVal = (results.right / total) * 100;
    document.getElementById("percentWrongDisc").innerHTML = String(Math.round(wrongVal)) + "%";
    document.getElementById("percentRightDisc").innerHTML = String(Math.round(rightVal)) + "%";


    document.getElementById("wrong-results").value = wrongVal;
    document.getElementById("right-results").value = rightVal;
}


window.onload = function () {
    loadComments();
    quizResults();
    updateQuizBars();   
};

