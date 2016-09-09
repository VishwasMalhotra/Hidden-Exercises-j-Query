$(document).ready(function() {
    $('#game_table').hide();
    x = true; 
    a = 0; 
    clickCounter = 0;
    var lastclicked;
    var secondclicked; 

    var createImage = function(src) {
        var img = new Image();
        img.src = src;
        return img;

    };

    images = [];

    for (i = 0; i <= 17; i++) {
        images.push(createImage("images/image_" + [i] + ".jpg"));
    }
    var numbersArray = [];
    for (var i = 0; i < 36; i++) {
        numbersArray.push(i);
    }

    for (i = 0; i < images.length; i++) {
        one = numbersArray[Math.floor(Math.random() * numbersArray.length)];

        q = Math.floor(one / 6);
        r = Math.floor(one % 6);

        var removeItem = one;

        numbersArray = jQuery.grep(numbersArray, function(value) {
            return value != removeItem;
        });

        two = numbersArray[Math.floor(Math.random() * numbersArray.length)];
        qOne = Math.floor(two / 6);
        rOne = Math.floor(two % 6);

        var removeItem = two;

        numbersArray = jQuery.grep(numbersArray, function(value) {
            return value != removeItem;
        });

        $('#game_table tr:eq(' + q + ') td:eq(' + r + ')').append(images[i]);
        $('#game_table tr:eq(' + qOne + ') td:eq(' + rOne + ')').append($(images[i]).clone());
    }


    $('#game_table tr td').find('img').hide();


    $('#game_table tr td').on('click', function(event) {
        if (x == true) {
            clickCounter++;
            if (clickCounter == 1) {
                $(this).find('img').show();
                lastclicked = $(this).find('img');
            }
            if (clickCounter == 2) {
                $(this).find('img').show();
                secondclicked = $(this).find('img');
                x = false;
                compare();

            }

            if ($('td').find('img:visible').length == 36) {
                clearInterval(refreshIntervalId);
                alert("You Win! You took " + a + " seconds!");
                $('#game_table').hide();
            }
        }
    });

    function compare() {

        if (lastclicked.attr("src") != secondclicked.attr("src") || (lastclicked.parent()[0] === secondclicked.parent()[0])) {

            setTimeout(function() {
                lastclicked.hide();
                secondclicked.hide();
                x = true;
            }, 1000);


        }
        if (lastclicked.attr("src") == secondclicked.attr("src") && (lastclicked.parent()[0] != secondclicked.parent()[0])) {
            lastclicked.parent().off('click');
            secondclicked.parent().off('click');
            x = true;
        }

        clickCounter = 0;
    }

    $("#clone").on('click', function() {

        $("#clone").prop("disabled", true);
        $('#game_table').show();
        refreshIntervalId = setInterval(function() {
            a++;
            $("#timer").text("Timer(s):" + " " + a);
        }, 1000);
    });
});