$(document).ready(function() {
    var testNumLength = function(number) {
        if (number.length > 15) {
            number = "";
            totaldiv.text("Err");
        }
    };
    var number = "";
    var newnumber = "";
    var operator = "";
    var answer = "";
    var totaldiv = $("#total");
    var decimalCount = 0;
    totaldiv.text("0");
    $("#numbers a").not("#clear,#clearall,#button").click(function() {
        number += $(this).text();
        totaldiv.text(number);
        testNumLength(number);
    });
    $(".operators a").not("#equals").click(function() {
        operator = $(this).text();

        newnumber = number;
        number = "";
        totaldiv.text("0");
        decimalCount = 0;

    });


    function decimalclickHandler(event) {
        if (decimalCount == 0) {
            number += $(this).text();
            totaldiv.text(number);
            decimalCount++;
        }
    }

    $('#button').on('click', decimalclickHandler);



    $("#clear,#clearall").click(function() {
        number = "";
        totaldiv.text("0");
        if ($(this).attr("id") === "clearall") {
            newnumber = "";
            decimalCount = 0;
        }
    });
    $("#equals").click(function() {

        if (operator === "+") {
            answer = (parseFloat(newnumber, 10) + parseFloat(number, 10)).toString(10);
        } else if (operator === "-") {
            answer = (parseFloat(newnumber, 10) - parseFloat(number, 10)).toString(10);
        } else if (operator === "/") {
            answer = (parseFloat(newnumber, 10) / parseFloat(number, 10)).toString(10);
        } else if (operator === "*") {
            answer = (parseFloat(newnumber, 10) * parseFloat(number, 10)).toString(10);
        }
        totaldiv.text(answer);
        testNumLength(answer);
        newnumber = "";
        number = answer;
    });
});