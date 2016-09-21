$(document).ready(function() {
    jsonObj = [];
    individualId = 0;
    $("#form").submit(function(event) {
        name = $.trim($("#name").val().toLowerCase());
        email = $("#email").val();
        if (name == '' || email == '') {
            alert("Please fill the details!");
            event.preventDefault();
        } else {
            var div = $('<div class="personalContact"> ' + name + '<br/>' + email + '<br/><button id="delete">Delete</button></div>');
            $("#contacts").append(div);
            $("#delete").css("width:50px; height:20px;");
            $("#name").val('');
            $("#email").val('');
            item = {};
            item["id"] = individualId;
            item["name"] = name;
            item["email"] = email;
            jsonObj.push(item);
            div.attr("data-index", individualId);
            div.attr("data-name", name);
            jsonString = JSON.stringify(jsonObj);
            event.preventDefault();
            individualId++
        }
    });

    $("#contacts").on("click", "#delete", function() {
        var div = $(this).parent();
        var indexno;
        div.remove();

        $.each(jsonObj, function(index, info) {
            if (info.id === div.data('index')) {
                indexno = index;
            }
        });
        jsonObj.splice(indexno, 1);
    });

    $("#search").keyup(function() {
        searchval = $("#search").val().toLowerCase();;
        $(".personalContact").each(function(index, element) {
            if (!$(element).data('name').startsWith(searchval)) {
                $(element).hide();
            } else {
                $(element).show();
            }
        });
    });
});