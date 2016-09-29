$(document).ready(function() {

    score = 0;
    question = 0;
    i = 60;
    $('#storeTable').hide();
    $('#unansweredTable').hide();
    if (question == 0) {
        newQuestion();
    }

    // Timer
    var refreshIntervalId = setInterval(function() {
        if (i == 0) {
            calculate();
            compare();
            newQuestion();
            i = 60;
        }
        if (question > 20) {
            clearInterval(refreshIntervalId);
        }

        i--;
        $("#timer").text("Timer:" + " " + i);

    }, 1000);

    // Forms a new question ; Shows the final evaluation.
    function newQuestion() {

        i = 60;
        question++;

        $("#userInput").val("");
        if (question > 20) {
            alert("Your Score is" + " " + score);
            $('#storeTable').show();
            $('#unansweredTable').show();
            $("#container").hide();

        }
        // To avoid Infinity : Math.floor(Math.random()*(max-min+1)+min);
        numberOne = Math.floor(Math.random() * (20 - 1 + 1) + 1);
        numberTwo = Math.floor(Math.random() * (20 - 1 + 1) + 1);
        operators = ["+", "-", "*", "/"];
        operator = operators[Math.floor(Math.random() * operators.length)];
        questionString = numberOne + operator + numberTwo;

        $("#mainQuestion").text("Question No." + " " + question + " " + "Evaluate :" + " " + questionString);
    }

    // Evaluate the question string.
    function calculate() {
        if (operator === "+") {
            answer = (parseFloat(numberOne, 10) + parseFloat(numberTwo, 10));
        } else if (operator === "-") {
            answer = (parseFloat(numberOne, 10) - parseFloat(numberTwo, 10));
        } else if (operator === "/") {
            answer = (parseFloat(numberOne, 10) / parseFloat(numberTwo, 10));
        } else if (operator === "*") {
            answer = (parseFloat(numberOne, 10) * parseFloat(numberTwo, 10));
        }
    }

    // Compare the actual answer to the user input.
    function compare() {
        if (i == 0) {
            unanswered();
        } else if ($("#userInput").val() === "" || $("#userInput").val() != answer) {
            store();
        } else if ($("#userInput").val() == answer) {
            score++;
            $("#footer").text("Score :" + score);
        }

    }

    // Stores the value of incorrect answers in a Table.
    function store() {
        $('#storeTable').append("<tr><td>" + questionString + "</td><td>" + answer + "</td></tr>");

    }

    //Stores the value of unanswered questions.
    function unanswered() {
        $('#unansweredTable').append("<tr><td>" + questionString + "</td><td>" + answer + "</td></tr>");
    }

    $("#submit").on('click', function() {

        calculate();
        compare();
        newQuestion();

    });

});
