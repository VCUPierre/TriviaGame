$(document).ready(function(){
    startOrFinish("start");
})
var questionAnswers = [1,2,3,2,0]; //answers in order from left to right starting with Q1 , Q2, ...

$(document).on("click", "#StartBtn" , function() {
    $("#Start-Finish").addClass("d-none");
    $("#Form").removeClass("d-none");
    timer();
});
$(document).on("click","#SubmitBtn" ,function() {
    startOrFinish("end");
});
$(document).on("click","#restartBtn" ,function() {
    location.reload();
});

function startOrFinish(eventVerb){
    $("#Start-Finish").empty();
    var jumbotron = $("<div>", {id: "jumbotron", class: "jumbotron mt-5 glassJumbo text-center"});
    var title1 = $("<h1>", {class: "display-3"});
    var title2 = $("<h1>", {class: "display-4"});
    var breakLine = $("<hr>", {class: "my-y"});
    title2.text("You don't know 'The Office' Trivia Game");

    if (eventVerb === "start"){
        title1.text("Welcome to");
        var button = $("<button>", {class: "btn"});
        var aTag = $("<a>", {class: "btn btn-primary btn-cust", role: "button", id: "StartBtn"});
        aTag.text("Start");
        button.append(aTag);
        $("#Start-Finish").append(jumbotron);
        $("#jumbotron").append(title1,title2,breakLine,button);
    } else if (eventVerb === "end"){
        $("#Form").addClass("d-none");
        $("#Start-Finish").removeClass("d-none");
        var array = answerCheck()
        var button = $("<button>", {class: "btn"});
        var aTag = $("<a>", {class: "btn btn-primary btn-cust", role: "button", id: "restartBtn"});
        var resultsTitle = $("<h1>");
        var correct = $("<h2>", {id: "correct"});
        var incorrect = $("<h2>", {id: "incorrect"});
        var notAnswered = $("<h2>", {id: "notAnswered"});
        correct.text("Correct Answers: "+ array[0]);
        incorrect.text("Incorrect Answers: "+ array[1]);
        notAnswered.text("Unanswered: " +array[2]);
        resultsTitle.text("***Results***");
        aTag.text("Play Again");
        button.append(aTag);
        $("#Start-Finish").append(jumbotron);
        $("#jumbotron").append(title2,breakLine,resultsTitle,correct,incorrect,notAnswered,aTag);
    } else{
        // place holder future
    }
}

function timer() {
  var timer2 = "1:01";
  var interval = setInterval(function() {
    var timer = timer2.split(':');
    var minutes = parseInt(timer[0], 10);
    var seconds = parseInt(timer[1], 10);
    --seconds;
    minutes = (seconds < 0) ? --minutes : minutes;
    seconds = (seconds < 0) ? 59 : seconds;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    $('.countdownTimer').html(minutes + ':' + seconds);
    if (minutes < 0) 
        clearInterval(interval);
    if ((seconds <= 0) && (minutes <= 0)) { 
        clearInterval(interval);
        startOrFinish("end");
    }
    timer2 = minutes + ':' + seconds;
  }, 1000);
}

function answerCheck(){
    var correct = 0, incorrect = 0, notAnswer = 0;
    /*let q0 = parseInt($("#Q1 input[type='radio']:checked").val());
    let q1 = parseInt($("#Q2 input[type='radio']:checked").val());
    let q2 = parseInt($("#Q3 input[type='radio']:checked").val());
    console.log("Q1: " + q0);
    console.log("Q2: " + q1);
    console.log("Q3: " + q2);
    */
     
    for (let i = 1; i <= questionAnswers.length; i++){
        let q = parseInt($("#Q"+i+" input[type='radio']:checked").val());
        console.log("Q"+i+": "+ q)
        if ( q === questionAnswers[i - 1]){
            correct++;
        } else if (!q && q !== 0){
            notAnswer++;
        } else {
            incorrect++;
        }
    }
    console.log("Correct: " + correct);
    console.log("Incorrect: " + incorrect);
    console.log("NoAnswered: " + notAnswer);
    return [correct,incorrect,notAnswer];
}